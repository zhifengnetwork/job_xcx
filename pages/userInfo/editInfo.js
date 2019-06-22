// pages/userInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //到岗时间
    array: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
    objectArray: [
      {
        id: 0,
        name: '离职-随时到岗'
      },
      {
        id: 1,
        name: '在职-月内到岗'
      },
      {
        id: 2,
        name: '在职-考虑机会'
      },
      {
        id: 3,
        name: '在职-暂不考虑'
      }
    ],
    index: 0,
    //性别选择
    items: [
      { name: 'wuman', value: '女', checked: 'true'  },
      { name: 'man', value: '男' }
    ],
    time: '0k-0k',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
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