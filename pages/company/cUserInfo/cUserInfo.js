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
    this.requserData();     //初始化数据
	},

	/**
	 * 获取公司信息
	 */
	requserData:function(){
		ServerData.userInfo({}).then((res) => {
			if (res.data.status == 1) {
        var time = ServerData._timeStampForwardAate(res.data.data.vip_time)
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})