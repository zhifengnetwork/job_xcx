// pages/userInfo/myInfo.js
const app =getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tInfo: {
      clas: 'company-bColor-1',
      text: "我的",
      hiringData:''
    }
  },

  hiring: function () {
		ServerData.hiring({}).then((res) => {
			console.log(res)
			if (res.data.status == 1) {
				this.setData({
					hiringData: res.data.data
				})
      }else if(res.data.status == -1) {
          wx.redirectTo({
            url: '../../login/login'
          })
      }
      else {
				ServerData._wxTost(res.data.msg)
			}
		})
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app)
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
    this.hiring();
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