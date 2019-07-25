// pages/company/editInfo.js
import ServerData from '../../../utils/serverData.js';

const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
	years.push(i)
}
for (let i = 1; i <= 12; i++) {
	months.push(i)
}

for (let i = 1; i <= 31; i++) {
	days.push(i)
}

const averageSalary = [];
for (let i = 1; i <= 20; i++) {
	averageSalary.push(i);
}


Page({
	data: {
		companyName: '', //公司名称
		companyType: '', //公司类型
		years: years, //年份数组
		year:date.getFullYear(),
		months: months, //月份数组
		month:2,
		days: days, // 天数组
		day:2,
		value: [9999, 1, 1],
		companyScale:'', //公司规模
		companyIntroduce:'', //公司介绍
		hotRecruitment: ['会计', 'WEB前端开发', '业务员'], //热招职位
		jobIndex:0, //热招职位索引
		averageSalary:averageSalary, //平均薪资
		paysIndex: 2, //平均薪资索引
		isAchievement:false, //是否显示成就
		isPerson:false, //是否显示名人介绍
		achiInfo:'', //公司成就
    	personInfo:'' //名人介绍
	},

	/**
	 * 编辑公司名称
	 */
	getCompanyName: function (e) {
		this.setData({
			companyName: e.detail.value
		})
	},

	/**
	 * 编辑公司类型
	 */
	getCompanyType: function (e) {
		this.setData({
			companyType: e.detail.value
		})
	},

	/**
	 * 成立时间
	 */
	yearsChang: function (e) {
		const val = e.detail.value
		this.setData({
			year: this.data.years[val[0]],
			month: this.data.months[val[1]],
			day: this.data.days[val[2]]
		})
	},

	/**
	 * 公司规模
	 */
	getcompanyScale:function(e){
		this.setData({
			companyScale: e.detail.value
		})
	},

	/**
	 * 
	 * 热招职位
	 */
	jobChange: function (e) {
		this.setData({
			jobIndex: e.detail.value
		})
	},

	/**
	 * 
	 * 平均薪资
	 */
	paysChange: function (e) {
		this.setData({
			paysIndex: e.detail.value
		})
	},

	/**
	 * 编辑公司成就框显示与隐藏
	 */
	addAchievementBox: function (e) {  
		var status = this.data.achievement;
		this.setData({
			isAchievement: !status,
			isPerson: false,
		})
	},

	/** 
	* 保存公司成就输入框的信息
	*/
	saveAchievement:function(e){    
		this.setData({
			achiInfo: e.detail.value
		})
	},

	/**
	 * 编辑名人介绍框显示与隐藏
	 */
	addFamousPersonBox: function (e) {
		var status = this.data.person;
		this.setData({
			isPerson: !status,
			isAchievement: false
		})
	},

	/**
	 * 保存名人介绍输入框的信息
	 */
	savePerson:function(e){
		this.setData({ 
			personInfo: e.detail.value 
		})  
	},

	/**
	 * 公司介绍
	 */
	getcompanyIntroduce:function(e){
		this.setData({
			companyIntroduce: e.detail.value
		})
	},
	

	/**
	 * 校验数据
	 */
	verifyData: function () {
		if (this.data.companyName == "") {
			ServerData._wxTost('公司名称不能为空');
			return false
		}
		else if (this.data.companyType == "") {
			ServerData._wxTost('公司类型不能为空');
			return false
		}
		else if (this.data.companyScale == "") {
			ServerData._wxTost('请填写公司规模');
			return false
		}
		else if (this.data.achiInfo == "") {
			ServerData._wxTost('请填写公司成就');
			return false
		}
		else if (this.data.personInfo == "") {
			ServerData._wxTost('请填写名人介绍');
			return false
		}
		else if (this.data.companyIntroduce == "") {
			ServerData._wxTost('公司介绍不能空');
			return false
		}
		else {
			return true;
		}
	},

	/**
	 * 保存数据
	 */
	saveEditInfo: function () {
		
		if (!this.verifyData()) {
			return false
		}
		// 传参到后台
		var _opt = {
			company_name: this.data.companyName,
			type: this.data.companyType,
			open_year: this.data.year,
			open_month: this.data.month,
			open_day: this.data.day,
			contacts_scale: this.data.companyScale,
			introduction:this.data.personInfo,
			achievement:this.data.achiInfo,
			desc:this.data.companyIntroduce
		}
		
		ServerData.editCompany(_opt).then((res) => {
			if (res.data.status == 1) {
				ServerData._wxTost(res.data.msg);
				setTimeout(() => {
					wx.redirectTo({
						url: '../cUserInfo/cUserInfo',
					})
				}, 1100)
			} else {
				ServerData._wxTost(res.data.msg);
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