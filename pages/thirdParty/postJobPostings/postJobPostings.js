import ServerData from '../../../utils/serverData.js';

const years = [];
for (let i = 1; i < 12; i++) {
	years.push(i);
}

const pays = []
for (let i = 1; i < 12000; i++) {
	i = i + 1000 - 1;
	pays.push(i);
}

// 薪资范围
const salaryArray = ["面议","1k", "2k", "3k", "4k", "5k", "6k", "7k", "8k", "9k", "10k", "11k", "12k", "13k", "14k", "15k", "16k", "17k", "18k", "19k", "20k", "21k", "22k", "23k", "24k", "25k"]

Page({
	data: {
		title: '', //标题
		jobArray: [], //工种
		jobIndex: 0, //工种索引
		workAge:'', //工龄
		salaryArray: salaryArray, //薪资
		salaryIndex: 0, //最低薪资索引
		salaryIndex2: 1, //最高薪资索引
		selectShow:false, //默认隐藏
		isNeed:0, //是否需要证书
		certificate:[
			{ name: '0', value: '无需证书', checked: 'true' },
			{ name: '1', value: '需要证书' }
		],
		details:'' //详情
	},

    /**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCategoryList();
	},

	/**
	 * 获取工种数据
	 */
	getCategoryList() {
		ServerData.categoryList({}).then((res) => {
			if (res.data.status == 1) {
				this.setData({
					jobArray: res.data.data
				})
				// console.log(this.data.jobArray)
			} else if (res.data.status == -1) {
				wx.redirectTo({
					url: '../../login/login'
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
		})
	},

	// 拿到标题
	getTitle: function (e) {
		this.setData({
			title: e.detail.value
		});
	},

	/**
	 * 选择工种
	 */
	jobChange: function (e) {
		this.setData({
			jobIndex: e.detail.value
		})
	},
	
	/**
	 * 获取工龄
	 */
	getWorkAge:function(e){
		this.setData({
			workAge:e.detail.value
		})
	},

	/**
	 * 选择薪资范围
	 */
	salaryChange: function (e) {
		this.setData({
			salaryIndex: e.detail.value,
			salaryIndex2: parseInt(e.detail.value) + 1,
			selectShow:true
		})
		if(this.data.salaryIndex == 0){
			this.setData({
				selectShow:false,
			})
		}
		if(this.data.salaryIndex == this.data.salaryArray.length -1){
			this.setData({
				salaryIndex2:this.data.salaryArray.length -1
			})
		}
		
	},

	/**
	 * 是否需要证书
	 */
	radioChange:function(e){
		this.setData({
			isNeed:e.detail.value
		})
	},

	/**
	 * 职位描述
	 */
	getDetails:function(e){
		this.setData({
			details:e.detail.value
		})
	},

	/**
	 * 校验数据
	 */
	verifyData: function () {
		if (!/^[\S\s]{2,50}$/.test(this.data.title)) {
			ServerData._wxTost('标题长度2-50');
			return false
		}
		else if(this.data.workAge == "") {
			ServerData._wxTost('请输入工龄');
			return false
		}
		else if (!/^[\S\s]{10,200}$/.test(this.data.details)) {
			ServerData._wxTost('职位描述长度10-200');
			return false
		}
		else {
			return true;
		}
	},

	/**
	 * 保存数据
	 */
	saveEditRecruit: function () {
		if (!this.verifyData()) {
			return false
		}
		var salary = this.data.salaryArray[this.data.salaryIndex]+'—'+this.data.salaryArray[this.data.salaryIndex2]
		if(this.data.salaryIndex == 0){
			salary = this.data.salaryArray[this.data.salaryIndex]
		}
		// 传参到后台
		var _opt = {
			type:this.data.jobArray[this.data.jobIndex].cat_id,
			work_age:this.data.workAge,
			salary:salary,
			title:this.data.title,
			require_cert:this.data.isNeed,
			detail:this.data.details,		
		}
		ServerData.editRecruit(_opt).then((res) => {
			if(res.data.status == 1){
				ServerData._wxTost('保存成功,信息需管理员审核');
				setTimeout(() => {
					wx.redirectTo({
						url: '../thirdInfo/thirdInfo',
					})
				},2000)
			}else{
				ServerData._wxTost(res.data.msg);
			}
		})
	},

	/**
	 * 跳转用户中心首页
	 */
	saveInfo: function () {
		wx.redirectTo({
			url: '../thirdInfo/thirdInfo'
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