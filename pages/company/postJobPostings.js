
const years =[];
for(let i =1; i<12;i++){
  years.push(i);
}
const pays =[]
for (let i = 1; i < 12000; i++) {
  i=i+1000-1;
  pays.push(i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: years,
    payArray:pays,
    index: 0,
    index1:0,
    paysIndex:0,
    paysIndex1:0,
    items: [
      { name: 'noNeed', value: '无需证书', checked: 'true' },
      { name: 'need', value: '需要证书' }
    ]
  },
  yearsChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  yearsChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  paysChange: function (e) {
    this.setData({
      paysIndex: e.detail.value
    })
  },
  paysChange1: function (e) {
    this.setData({
      paysIndex1: e.detail.value
    })
  },
  saveInfo:function(){
    wx.redirectTo({
      url: 'company'
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