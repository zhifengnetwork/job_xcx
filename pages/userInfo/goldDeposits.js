// pages/userInfo/goldDeposits.js
Page({
  data: {
     arr: [
       { 
        "isShow": true,
         "money":10,
         "id": 0
         },
       {
         "isShow": false,
         "money": 20,
         "id": 1
       },
       {
         "isShow": false,
         "money": 50,
         "id": 2
       },
       {
         "isShow": false,
         "money": 100,
         "id": 3
       }
    ],
    saveStatus:0,
    saveMoney:0
  },
  changMoney:function(e){
    var val = e.detail.value;
    this.setData({saveMoney:val})
  },
  selectGoldNumber:function(e){
    let query = e.currentTarget.dataset['index'];
    var that = this.data
    this.setData({
      saveStatus:query,
      saveMoney: e.currentTarget.dataset.money
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