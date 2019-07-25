// pages/userInfo/privacySettings.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type:'',
      is_show:'',
      item:{}
  },
  
  switch1Change(e){
      console.log(e)
      var that =this,
          is_show = 0,
          show = e.detail.value,
          _opt=''

      if(show){is_show = 1}  
      _opt = {
        'type': e.currentTarget.dataset.index,
        'is_show': is_show
      }
      ServerData.changPSetting(_opt).then((res) => {      //隐私设置操作
          console.log(res)
          ServerData._wxTost(res.data.msg)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that =this
      ServerData.privacySetting({}).then((res) => {      //获取隐私设置
        console.log(res)
        if (res.data.status==1){
            that.setData({ item: res.data.data })
        }else{
            ServerData._wxTost(res.data.msg)
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})