
Page({

  data:{
    pics: [
      {src: '', hiddenName: true}
    ]
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      value: 'show'
    })
  },
  addIdCardPic: function (e) {   //身份证上传
    var _this = this
    var id = e.currentTarget.dataset.id
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        var data = _this.data.pics[id]
        data.src = imgSrc;
        data.hiddenName = false;
        _this.setData({
          pics: _this.data.pics
        })
      }
      //
    })
  },
  addImgBox: function (e) {
    var json = { src: '', hiddenName: true};
    this.data.pics.push(json)
    console.log(this.data.pics)
    this.setData({
      pics: this.data.pics
    })
  },
  formSubmit:function(){
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1500
    })
    setTimeout(function(){
      wx.navigateTo({
        url: 'userCenter',
      })
    },2000)
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

  },

  //  上传身份证正反面  s
  // addPosPic: function () {
  //   var that = this;
  //   wx.chooseImage({
  //     success: function (res) {
  //       var tempFilePaths = res.tempFilePaths
  //       that.setData({
  //         positiveImg: tempFilePaths
  //       })
  //     }
  //   })
  // }
})