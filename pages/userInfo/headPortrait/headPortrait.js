// pages/userInfo/headPortrait.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icCardPic: { src: '', hiddenName: true, newSrc: '' },
  },

  saveHeaderPic(){
      var that =this,
        head_pic = that.data.icCardPic.newSrc
      if (head_pic == "") { return ServerData._wxTost("请选择头像")}
      ServerData.uploadHeadpic({ 'head_pic': head_pic}).then((res) =>{
        if(res.data.status==1){
          ServerData._wxTost(res.data.msg)
          setTimeout(()=>{
            wx.navigateTo({
              url: '../userCenter/userCenter'
            })
          },1000)
        }
        ServerData._wxTost(res.data.msg)
      })
  },
  addIdCardPic: function (e) {                                    //头像上传
    var _this = this,
      data = _this.data.icCardPic
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        data.src = imgSrc;
        data.hiddenName = false;
        _this.setData({
          icCardPic: data
        })
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            data.newSrc = dat.data
            console.log(data.newSrc)
            _this.setData({
              icCardPic: data
            })
          }
        })
      }
      //
    })
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