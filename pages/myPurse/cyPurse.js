// pages/userInfo/myPurse.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
	data: {
		savaStatus: 1,
		saveMoney: 10, 
		selectMsg: '月',
    	num:'',
		moneyData:{},
		vip_type:1,
		// resType:'',
		pColor: '',                          //动态获取字体颜色
		pBgC: '',                            //动态获背景颜色                 
		pBC1: '',                             //动态获边框颜色   
		// imgSrc:''
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		// if(util.loginIdentity().resType==)
		// var type =util.loginIdentity().resType
		// var img =type=='company'? 'yes_pop.png' :(type=='userInfo'?'yes_green.png':'yes_blue.png')
		this.setData({
			pBgC: util.loginIdentity().pBgC,
			pBC1: util.loginIdentity().pBC1,
			pColor: util.loginIdentity().pColor,
			// resType:util.loginIdentity().resType,
			// imgSrc:img
		})



		console.log('dddd',this.data.resType)
		this.getMyPurse()
	},

	getMyPurse() {
		ServerData.myPurse({}).then((res) => {
			console.log(res)
			this.setData({
				moneyData: res.data.data,
				saveMoney: res.data.data.month_money,
        		num: res.data.data.month_num
			})
		})
	},

	setInfo() {
      
	},

	changSelect: function (e) {
    // console.log(this.data.moneyData)
		var that = this,
			status = e.currentTarget.dataset.status,
			money = "",
			msg = "",
      num = '',
      vip_type
		if (status == 1) {
			money = that.data.moneyData.month_money
			msg = "月",
      num = that.data.moneyData.month_num
      vip_type=1
		}
		if (status == 2) {
			money = that.data.moneyData.quarter_money
			msg = "季"
      num = that.data.moneyData.quarter_num
      vip_type=2
		}
		if (status == 3) {
			money = that.data.moneyData.year_money
      num = that.data.moneyData.year_num
			msg = "年"
      vip_type=3
		}
		this.setData({
			savaStatus: status,
			saveMoney: money,
			selectMsg: msg,
      num: num,
      vip_type: vip_type
		});
	},
	
	toPays: function (e) {
		wx.showLoading({
			title: '跳转中...',
		})

		setTimeout(function () {
			wx.hideLoading()
		}, 2000)
	}
})

