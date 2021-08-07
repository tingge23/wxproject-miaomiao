// miniprogram/pages/index/index.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'https://img1.baidu.com/it/u=1598352183,2392749724&fm=26&fmt=auto&gp=0.jpg',
      'https://img1.baidu.com/it/u=2777480701,3081791725&fm=26&fmt=auto&gp=0.jpg',
     'https://img0.baidu.com/it/u=1204668880,1378617899&fm=26&fmt=auto&gp=0.jpg'
    ],
    listData :[],
    current:'time'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListData();
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleLinks(ev){
    //console.log(ev)
    let id = ev.target.dataset.id;
    //在服务端做点赞功能
    /* db.collection('users').doc(id).update({
      data:{
        links:5
      }
    }).then((res)=>{
      console.log(res)
    }); */
    wx.cloud.callFunction({
      name:'update',
      data:{
        collection:'users',
        doc: id,
        data:"{links:_.inc(1)}"
      } 
    }).then((res)=>{
      console.log(res);
     /*  let updated = res.result.stats.updated;
      if(updated){
        let cloneListData = [...this.data.listData];
        for(let i=0; i<cloneListData.length;i++){
          if(cloneListData[i]._id == id){
            cloneListData[i].links++;
          }
        } 
        this.setData({
        listData:cloneListData
      })
      } */
     
    })
  },
  handleCurrent(ev){
    let current = ev.target.dataset.current;
    if( current == this.data.current){
      return false;
    }
    this.setData({
      current
    },()=>{
      this.getListData();
    });
  },
  getListData(){
    db.collection('users')
    .field({
      userPhoto : true,
      nickName:true,
      links:true
    })
    .orderBy(this.data.current, 'desc')
    .get().then((res)=>{
      //console.log(res.data)
       this.setData({
        listData : res.data
      }) 
    })
  },
  handleDetail(ev){
    let id=ev.target.dataset.id;
    wx.navigateTo({
      url:'/pages/detail/detail?userId='+id
    })
  }
})