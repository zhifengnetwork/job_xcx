// pages/userInfo/myPurse.js
import ServerData from '../../../utils/serverData.js';
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
    vip_type:1
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
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
    console.log(this.data.moneyData)
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

