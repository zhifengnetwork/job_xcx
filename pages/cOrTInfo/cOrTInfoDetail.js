// pages/cOrTInfo/cOrTInfo.js

import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cList: [],          //公司列表
    pList: [],          //公司招聘列表
    companyId:'',
    pBgC: '',                            //动态获背景颜色  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.id,
      pBgC: util.loginIdentity().pBgC
    })
    this.lookCompany()
    this.getRecruitList()
  },

  lookCompany() {         // 要传给后台的参数
    var _opt = {
      // company_id: this.data.companyId
      company_id:88
    }
    ServerData.lookCompany(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          cList: res.data.data,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  getRecruitList(){         // 要传给后台的参数
    var _opt = {
      company_id:this.data.companyId
    }
    ServerData.getRecruitList(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          pList: res.data.data,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
})