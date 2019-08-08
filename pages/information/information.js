// pages/information/infomation.js
import ServerData from '../../utils/serverData.js';
const app =getApp();
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    cStatus:0,
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.messageList()
  },

  messageList(){
      var that =this
      ServerData.messageList({}).then((res) =>{
          if(res.data.code==1){
              console.log(res.data.data)
              var info = res.data.data
              for(var i in info){
                info[i].create_time = ServerData._timeStampForwardAate(info[i].create_time)
              }
              that.setData({
                  array: info
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