// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiringData: [],
    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标
    row: 200,                     //默认拿一百条
    page:1,                        //默认第一页
    //地址三级开始
    areaInfo:'',
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,              //是否选择人才
    showTST:true,                  //是否选择地址

    //
    pColor:'',                            //动态获z字体颜色 
    pBgC: '',                            //动态获背景颜色    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.hideHomeButton) wx.hideHomeButton()
    util.getStorageItem('savePostion', app)
    this.hiring()
    this.getCategoryList()         //职位列表

    /*********地址 */
    this.addressForm = this.selectComponent('#address');

    /*********地址 */
    this.setData({
        pColor: util.loginIdentity().pColor,
        pBgC: util.loginIdentity().pBgC,
    })
  },
  hiring: function () {
    var that =this
    var _opt={
      'rows': that.data.row,
      'page':that.data.page,
      'type': that.data.job_type,
      'province': that.data.pCode,
      'city': that.data.cCode,
      'district': that.data.aCode,

    }
    ServerData.hiring(_opt).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          hiringData: res.data.data
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  }, 
  getCategoryList() {
    var that = this
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        var newArry = []
        newArry.push({ cat_id: '', cat_name: "选择人才" })
        var recl = [...newArry, ...res.data.data]
        this.setData({ jobArray: recl })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  jobChange: function (e) {
    var t =e.detail.value ==0? false :true
    this.setData({
        jobIndex: e.detail.value,
        job_type: this.data.jobArray[e.detail.value].cat_id,
        site_show:t
    })
    this.hiring()             //主页信息
  },
   /********************其他资料结束 */
  /***********地址开始**************** */
  // 点击所在地区弹出选择框

  tabEvent(data){      //接收传过来的参数
    var info =data.detail
    this.setData({
        areaInfo: info.areaInfo,
        pCode: info.pCode,
        cCode: info.cCode,
        aCode: info.aCode,
        showTST: info.showTST
    })
    this.hiring()             //主页信息
},

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
      this.addressForm.showPopup()
      this.addressForm.startAddressAnimation(true)
  }
  /***********地址结束**************** */
})