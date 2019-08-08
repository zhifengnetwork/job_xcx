// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
// import commonData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tInfo: {
      clas: 'third-bColor-1',
      text: "我的",
    },
    hiringData: [],
    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标
    row: 100,                     //默认拿一百条
    page: 1                        //默认第一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app)
    this.hiring()
    this.getCategoryList()         //职位列表
    // console.log(this.data.jobIndex)
  },
  hiring: function () {
    var _opt = {
      'rows': this.data.row,
      'page': this.data.page,
      'type': this.data.job_type,
      'kw':''

    }
    ServerData.hiring(_opt).then((res) => {
      // console.log(res)
      if (res.data.status == 1) {
        this.setData({
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

        // console.log(that.data.jobArray)
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
    // console.log(e)
    this.setData({
      jobIndex: e.detail.value,
      job_type: this.data.jobArray[e.detail.value].cat_id
    })
    console.log(this.data.jobArray[e.detail.value].cat_id)
    this.hiring()             //主页信息
  }

})