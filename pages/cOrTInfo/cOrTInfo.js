// pages/cOrTInfo/cOrTInfo.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cList:[],
      companyId:'',
      pColor:'',                            //动态获z字体颜色 
      pBgC: '',                            //动态获背景颜色       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          pColor: util.loginIdentity().pColor,
          companyId: options.company_id,
          pBgC: util.loginIdentity().pBgC,
      })
      this.lookCompany()
  },

  lookCompany() {         // 要传给后台的参数
    var _opt = {
        company_id: this.data.companyId
    }
    ServerData.lookCompany(_opt).then((res) => {
      if (res.data.status == 1) {
        // console.log(res.data.data)
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

})