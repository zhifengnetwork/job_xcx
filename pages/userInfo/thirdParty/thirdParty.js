// pages/company/company.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tInfo: {
      clas: 'company-bColor-1',
      text: "我的"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);
  },
})