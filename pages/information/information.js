// pages/information/infomation.js
import ServerData from '../../utils/serverData.js';
const app =getApp();
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    cStatus:0,
    array:[],
    page:1,
    rows:10,
    isMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.messageList()
  },
  lookMore(){
      this.setData({
          page:this.data.page+1
      })
      this.messageList()
  },
  messageList(){
      var that =this,
          newArray=[]
      ServerData.messageList({page:that.data.page,limit:that.data.rows}).then((res) =>{
          if(res.data.code==1){
            var info = res.data.data
            if(info.length>0){
                for(var i in info){
                  info[i].create_time = ServerData._timeStampForwardAate(info[i].create_time)
                }
                if(that.data.page == 1) {
                  newArray = info
                } else {
                  newArray = [...that.data.array, ...info]
                }
                this.setData({
                  array: newArray,
                  isMore:true
                })
            }
          }
          else if (res.data.code == -1) {
              wx.redirectTo({
                url: '../login/login'
              })
          }
          else {
              ServerData._wxTost(res.data.msg)
              this.setData({
                isMore: false
              })
          }
      })
  }
})