// pages/userInfo/editInfo.js
const payArray =[];
for(let i =1; i <= 20; i++){
  // i=i+1000-1;
  payArray.push(i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
    payArray: payArray,
    index: 0,
    items: [
      { name: 'wuman', value: '女', checked: 'true' },    //性别选择
      { name: 'man', value: '男' }
    ],
    paysIndex:0,
    jobArray: ['会计', 'WEB前端开发', '业务员'],
    jobIndex: 0,
    work:false,
    aducational: false,
    workInfo: "",
    aducationalInfo: ""
  },
  saveWork: function (e) {    //保存公司成就输入框的信息
    this.setData({ workInfo: e.detail.value })
  },
  saveAducational: function (e) {
    this.setData({ aducationalInfo: e.detail.value })  //保存名人介绍输入框的信息
  },
  addWorkExperience:function(e){
    var status = this.data.work;
    this.setData({ 
      work: !status,
      aducational: false,
    })
  },
  addEducationalExperience:function(e){
    var status =this.data.aducational;
    this.setData({
      aducational:!status,
      work: false
    })
  },
  saveInfo:function(){
    this.setData({ 
      aducational:false,
      work:false
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  jobChange: function (e) {
    this.setData({
      jobIndex: e.detail.value
    })
  },
  paysChange: function (e) {
    this.setData({
      paysIndex: e.detail.value
    })
  },
  saveEditInfo:function(){
    wx.redirectTo({
      url: 'userCenter',
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