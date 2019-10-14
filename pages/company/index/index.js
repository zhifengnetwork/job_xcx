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

		//地址三级开始
		// value: [0, 0, 0],
		areaInfo:'',
		pCode: '',                    //获取选中的省ID
		cCode: '',                    //获取选中的市ID
		aCode: '',                    //获取选中的区ID
		site_show: false,             //是否选择人才
		showTST:true                  //是否选择地址

	},

	onShow: function () {
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
    if (wx.hideHomeButton) wx.hideHomeButton()
		this.reqIndex(); //请求数据
		util.getStorageItem('savePostion', app)   //
    this.getCategoryList()
		
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
		/*********地址 */
	},

  getCategoryList() {
      var that = this
      ServerData.categoryList({}).then((res) => {
        if (res.data.status == 1) {
          var newArry = []
          newArry.push({ cat_id: '', cat_name: "选择人才" })
          var recl = [...newArry, ...res.data.data]
          this.setData({ jobArray: recl })
        } 
        else if (res.data.status == -1) {
            wx.redirectTo({
              url: '../../login/login'
            })
        } 
        else {
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
            'job_type': that.data.job_type,
            'province': that.data.pCode,
            'city': that.data.cCode,
            'district': that.data.aCode,
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
        ServerData._wxTost("数据请求失败!")
      })
	},

	jobChange: function (e) {
      var t =e.detail.value ==0? false :true
      this.setData({
          jobIndex: e.detail.value,
          job_type: this.data.jobArray[e.detail.value].cat_id,
          site_show:t
      })
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
	},

 /********************其他资料结束 */


  /***********地址开始**************** */
  tabEvent(data){
    // console.log(data.detail)
    var info =data.detail
    // console.log(info.aCode)
    this.setData({
        areaInfo: info.areaInfo,
        pCode: info.pCode,
        cCode: info.cCode,
        aCode: info.aCode,
        showTST: info.showTST
    })
    this.reqIndex()
},

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
      this.addressForm.showPopup()
      this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */

})
