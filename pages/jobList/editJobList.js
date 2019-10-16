import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法

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
    id: '',                           //动态id 修改信息时才能获取到
    styleBg: '',                      //动态颜色
    pBgC: '',                          //动态背景
		title: '',                        //标题
		jobArray: [],                     //工种
		jobIndex: 0,                      //工种索引
		workAge:'',                       //工龄
		salaryArray: salaryArray,         //薪资
		salaryIndex: 0,                   //最低薪资索引
		salaryIndex2: 1,                  //最高薪资索引
		selectShow:false,                 //默认隐藏
		isNeed:0,                         //是否需要证书
		certificate:[
			{ name: '0', value: '无需证书', checked: 'true' },
			{ name: '1', value: '需要证书' }
		],
		details:'', //详情
		styleBg: '',                            //动态获背景颜色  
		pBgC: '',                            //动态获背景颜色    

    postNameList:['前端','后端','老板'], //职位名称
    postNameText: '',
    experienceList:['半年','1年','3-5年','10年'], //经验要求
    experienceText:'',
    educationList:['大专','本科','专科','硕士'],  //学历要求
    educationText: '',
    salaryList:['3-5k','5-8k','10k','20k以上'], //薪资要求
    salaryText: '',
    welfareList: ['五险一金','零食','下午茶'],   //福利待遇
    welfareText: '',
    describeList: ['描述1','描述2','描述3'], //职位描述
    describeText: ''
	},

    /**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCategoryList();
		if ('undefined' != typeof (options.id)) {
		this.setData({
			id: options.id
		})
		this.getJobData()
		}
		this.setData({
		pBgC: util.loginIdentity().pBgC,
		styleBg: util.loginIdentity().styleBg,
		})
	},

	getJobData(){
		var that =this
		ServerData.goEditRecruit({ 'id': that.data.id}).then((res) => {
			if (res.data.status == 1) {
				var info = res.data.data,
					slay =info.salary.split("—"),
					salary = ServerData.returnIndex(slay[0], that.data.salaryArray),
					newSalary = 1,
					jobIndex = ServerData.returnIndex(info.type, that.data.jobArray,true)
					if (salary>0){
						newSalary = salary+1
					}
			this.setData({
				title: info.title,
				isNeed:info.require_cert,
				salaryIndex: salary,
				salaryIndex2:newSalary,
				jobIndex: jobIndex,
				workAge: info.work_age,
				details: info.detail
			})
		} else if (res.data.status == -1) {
			wx.redirectTo({
			url: '../../login/login'
			})
		} else if (res.data.status == -2) {
			setTimeout(()=>{
				wx.navigateBack({
					delta: 1
				})
			},1500)
			ServerData._wxTost(res.data.msg);
		} 
		else {
			ServerData._wxTost(res.data.msg)
		}
		})
	},

  //职位名称选择器
  changePostName: function (e) {
    // console.log('picker发送选择改变，携带值为', e)
    this.setData({
      postNameText: this.data.postNameList[Number(e.detail.value)]
    })
  },
  //经验要求选择器
  changeExperience: function (e) {
    this.setData({
      experienceText: this.data.experienceList[Number(e.detail.value)]
    })
  },
  //学历要求选择器
  changeEducation: function (e) {
    this.setData({
      educationText: this.data.educationList[Number(e.detail.value)]
    })
  },
  //薪资范围选择器
  changeSalary: function (e) {
    this.setData({
      salaryText: this.data.salaryList[Number(e.detail.value)]
    })
  },
  //福利待遇选择器
  changeWelfare: function (e) {
    this.setData({
      welfareText: this.data.welfareList[Number(e.detail.value)]
    })
  },
  //职位描述选择器
  changeDescribe: function(e) {
    this.setData({
      describeText: this.data.describeList[Number(e.detail.value)]
    })
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
			ServerData._wxTost('标题2-50');
			return false
		}
		else if(this.data.workAge == "") {
			ServerData._wxTost('请输入工作年限');
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
    var that=this
		if (!that.verifyData()) {
			return false
		}
		var salary = that.data.salaryArray[that.data.salaryIndex]+'—'+that.data.salaryArray[that.data.salaryIndex2]
		if(that.data.salaryIndex == 0){
			salary = that.data.salaryArray[that.data.salaryIndex]
		}
		// 传参到后台
		var _opt = {
      		id: that.data.id,
			type:that.data.jobArray[that.data.jobIndex].cat_id,
			work_age:that.data.workAge,
			salary:salary,
			title:that.data.title,
			require_cert:that.data.isNeed,
			detail:that.data.details,		
		}
    // return
		ServerData.editRecruit(_opt).then((res) => {
			if(res.data.status == 1){
				ServerData._wxTost('保存成功,信息需管理员审核');
				setTimeout(() => {
					wx.navigateBack({
						delta: 1
					})
				},2000)
			}else{
				ServerData._wxTost(res.data.msg);
			}
		})
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