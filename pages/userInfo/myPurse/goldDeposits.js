// pages/userInfo/goldDeposits.js
import ServerData from '../../../utils/serverData.js';
Page({
  data: {
    arr: [
      {
        "isShow": true,
        "money": 10,
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
    saveStatus: 0,
    saveMoney: 10
  },
  changMoney: function (e) {
    var val = e.detail.value;
    this.setData({ saveMoney: val })
  },
  selectGoldNumber: function (e) {
    let query = e.currentTarget.dataset['index'];
    var that = this.data
    this.setData({
      saveStatus: query,
      saveMoney: e.currentTarget.dataset.money
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toGoldDeposits(){
    ServerData._showLoading('该功能正在建设中...')
    setTimeout(() => {
      wx.redirectTo({
        url: '../userCenter/userCenter'
      })
    }, 1000)
  },
})