// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-9g2i0p1ee3361499",
  //traceUser: true
  
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  //console.log(event);
  //const wxContext = cloud.getWXContext()
 try{
   if(typeof event.data=='string'){
     event.data = eval('('+event.data+')'); //eval字符串转成json语句
   }
   if( event.doc){
      return await db.collection(event.collection)
        .doc(event.doc)
          .update({
            data:{
              ...event.data
            }
          })
    }
   else{
      return await db.collection(event.collection)
        .where({...event.where})
          .update({
            data:{
              ...event.data
            }
          })
   }
 }catch(e){
   console.error(e)
 }
}

 