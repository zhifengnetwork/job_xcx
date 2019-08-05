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

    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标
	},

	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.reqIndex(); //请求数据
		util.getStorageItem('savePostion', app)   //
    this.getCategoryList()
	},

  getCategoryList() {
    var that = this
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        var newArry = []
        newArry.push({ cat_id: '', cat_name: "选择人才" })
        var recl = [...newArry, ...res.data.data]

        this.setData({ jobArray: recl })
        console.log(res.data.data)
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

	/**
	 * 请求数据
	 */
	reqIndex() {
    var that = this,
      _opt = {
        'job_type': that.data.job_type
      }
    ServerData.userVisit(_opt).then((res) => {
			if (res.data.status == 1) {
				this.setData({
					indexData: res.data.data
				})
			}
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
       else {
				ServerData._wxTost(res.data.msg)
			}
		}).catch((error) => {
			console.log("数据请求失败!")
		})
	},

  jobChange: function (e) {
    // console.log(e)
    this.setData({
      jobIndex: e.detail.value,
      job_type: this.data.jobArray[e.detail.value].cat_id
    })
    // console.log(this.data.jobArray[e.detail.value].cat_id)
    this.reqIndex()             //主页信息
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
