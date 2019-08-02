// pages/userInfo/setting.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pBgC:'',
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var t =''
    if ('undefined' != typeof (options.openid)){
      t = options.openid
      console.log(options.openid)
    }
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      openid:t
    })

    console.log(this.data.openid)
  },

  binWx(){
      var that =this
      wx.login({
          success: res => {
            var _opt ={
              code: res.code
            }
            ServerData.bindWeixin(_opt).then((res) =>{
                console.log(res.data.status)
                if (res.data.status==1){
                    ServerData._wxTost(res.data.msg)
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta: 1
                        })
                    },1000)
                } else if (res.data.status == -1){
                    wx.redirectTo({
                      url: '../login/login'
                    })
                }else{
                    ServerData._wxTost(res.data.msg)
                }
            })
          }
      })
  },


  save: function () {
    wx.navigateTo({
      url: '../public/editMobile'
    })
  },
  password: function () {
    wx.navigateTo({
      url: '../public/password'
    })
  },
  unLogin(){
    wx.removeStorageSync('token')
    wx.removeStorageSync('savePostion')
    wx.navigateTo({
      url: '../login/login'
    })

  }
})