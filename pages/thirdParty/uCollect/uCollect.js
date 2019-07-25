// pages/company/uCollect.js
import ServerData from '../../../utils/serverData.js';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 3,
    regtype:''
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    that.UcList();
  },
  
  UcList: function () {
    var _opt = {
			regtype: this.data.currentTab
		}
		ServerData.Ucollect(_opt).then((res) => {
			console.log(res)
			if (res.data.status == 1) {
				this.setData({
					UcData: res.data.data
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
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
    this.UcList();
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