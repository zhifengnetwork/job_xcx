// pages/company/postionDetail.js
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
    isCollect: 0,
		recruitDetail: [], // 公司详情
		isCollect: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 接收id
		this.setData({
			id: options.id
		});
	},

	/**
	 * 公司职位详情数据
	 */
	reqDetails: function () {
		// 要传给后台的参数
		var _opt = {
			id: this.data.id
		}
		ServerData.recruitDetail(_opt).then((res) => {
			if (res.data.status == 1) {
				this.setData({
					recruitDetail: res.data.data,
					isCollect: res.data.data.is_collection
				})
			} else   if (res.data.status == -1) {
				wx.redirectTo({
				  url: '../../login/login'
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
		})
	},

	/**
	 * 收藏/取消收藏
	 */
	onCollection: function (e) {
		var statuss = e.currentTarget.dataset.stu
		if (e.currentTarget.dataset.stu == 0) {
			statuss = 1
		} else {
			statuss = 0
		}
		this.setData({
			isCollect: statuss
		})
		// 要传给后台的参数
		var _opt = {
			'type': 1,
			'to_id': this.data.id
		}
		ServerData.collection(_opt).then((res) => {
			if (res.data.status == 1) {
				// 轻提示调用
				ServerData._wxTost(res.data.msg)
			} else {
				ServerData._wxTost(res.data.msg)
			}
		});

	},	

	// 拨打号码
	callWithHim: function () {
		wx.makePhoneCall({
			phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
		})
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
		this.reqDetails(); //请求数据
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