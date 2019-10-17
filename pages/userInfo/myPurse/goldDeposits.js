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
    saveMoney: 10,
    		// resType:'',
		pColor: '',                          //动态获取字体颜色
		pBgC: '',                            //动态获背景颜色                 
		pBC1: '',                             //动态获边框颜色   
		imgSrc:''
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
      var type =util.loginIdentity().resType
      var img =type=='company'? 'yes_pop.png' :(type=='userInfo'?'yes_green.png':'yes_blue.png')
      this.setData({
        pBgC: util.loginIdentity().pBgC,
        pBC1: util.loginIdentity().pBC1,
        pColor: util.loginIdentity().pColor,
        // resType:util.loginIdentity().resType,
        imgSrc:img
      })

  },

  // toGoldDeposits(){
  //   ServerData._showLoading('该功能正在建设中...')
  //   setTimeout(() => {
  //     wx.redirectTo({
  //       url: '../userCenter/userCenter'
  //     })
  //   }, 1000)
  // },
})