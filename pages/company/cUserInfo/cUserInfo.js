// pages/infomation/infomation.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userData:{},
    timer:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		util.getStorageItem('savePostion', app)   //获取底部导航
		this.requserData();
	},

	/**
	 * 获取公司信息
	 */
	requserData:function(){
		ServerData.userInfo({}).then((res) => {
			if (res.data.status == 1) {

        var time = ServerData._timeStampForwardAate(res.data.data.vip_time)
        // console.log(time)
				this.setData({
					userData: res.data.data,
          timer: time
				})
				console.log(this.data.userData)
			}  
			else if (res.data.status == -1){
				wx.redirectTo({
					url: '../../login/login'
				})
			}else{
				ServerData._wxTost(res.data.msg)
			}
		})
	},

	/**
	 * 跳转到发布职位
	 */
	toEdit: function () {
		wx.navigateTo({
			url: '../postJobPostings/postJobPostings',
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