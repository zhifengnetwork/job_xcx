//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';

Page({
	data: {
		mode: "scaleToFill",
		statusBarHeight: app.globalData.statusBarHeight,
		arr: [],
		indexData: [],//游客首页数据
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
	},

	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.reqIndex(); //请求数据
		util.getStorageItem('savePostion', app)   //获取底部导航
	},

	/**
	 * 请求数据
	 */
	reqIndex: function () {
		ServerData.reqIndex({}).then((res) => {
			if (res.data.status == 1) {
				this.setData({
					indexData: res.data.data
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
		}).catch((error) => {
			console.log("数据请求失败!")
		})
	},

	/**
	 * 
	 * 跳转到详情
	 */
	jumpDetails: function (e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../company/postionDetail?id=' + id
		})
	},

	getUserInfo: function (e) {
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}

})
