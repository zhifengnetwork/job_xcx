// pages/company/editInfo.js
const date = new Date()
const years = []
const months = []
const days = []
const payArray = [];
for (let i = 1; i <= 20; i++) {
  payArray.push(i);
}
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years: years,
    // year: date.getFullYear(),
    months: months,
    days: days,
    value: [9999, 1, 1],
    payArray: payArray,
    paysIndex: 0,
    jobArray: ['会计', 'WEB前端开发', '业务员'],
    jobIndex: 0,
    achievement: false,
    person: false,
    achiInfo: "",
    personInfo: ""
  },
  yearsChang: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  paysChange: function (e) {
    console.log(e)
    this.setData({
      paysIndex: e.detail.value
    })
  },
  jobChange: function (e) {
    this.setData({
      jobIndex: e.detail.value
    })
  },
  saveAchievement: function (e) {    //保存公司成就输入框的信息
    this.setData({ achiInfo: e.detail.value })
  },
  savePerson: function (e) {
    this.setData({ personInfo: e.detail.value })  //保存名人介绍输入框的信息
  },
  addAchievementBox: function (e) {
    // 编辑公司成就框显示与隐藏
    var status = this.data.achievement;
    this.setData({
      achievement: !status,
      person: false,
    })
  },
  addFamousPersonBox: function (e) {
    //编辑名人介绍框显示与隐藏
    var status = this.data.person;
    this.setData({
      person: !status,
      achievement: false
    })
  },
  saveInfo: function () {
    this.setData({
      person: false,
      achievement: false
    })
  },
  saveEditInfo: function () {
    wx.redirectTo({
      url: '../cUserInfo/cUserInfo'
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