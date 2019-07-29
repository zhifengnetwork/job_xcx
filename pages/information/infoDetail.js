// pages/information/infoDetail.js
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dId:'',
      info:{},
      addTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      if(options){
        this.setData({ dId: options.id})
      }

      this.getDtailInfo()
  },

  getDtailInfo(){
      var that =this,
          time =''
      ServerData.messageDetail({ id: that.data.dId}).then((res) =>{
          if(res.data.code ==1){
              console.log(res.data.data)
              time = ServerData._timeStampForwardAate(res.data.data.create_time)
              that.setData({
                  info: res.data.data,
                  addTime: time
              })
          }
          else if (res.data.code == -1) {
            wx.redirectTo({
              url: '../login/login'
            })
          }
          else {
            ServerData._wxTost(res.data.msg)
          } 
      })
  }

})