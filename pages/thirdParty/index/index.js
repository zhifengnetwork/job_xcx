//index.js

import ServerData from '../../../utils/serverData.js';
const app = getApp()          //获取应用实例
const util = require('../../../utils/util.js');  //通用方法
Page({
  data: {
    list: [],
    indicatorDots: true,
    autoplay: true,               //自动播放
    interval: 3000,               //播放间隔
    duration: 1000,               //停留时间
    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标
  },
  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.getUserInfo()             //主页信息
    this.getCategoryList()         //职位列表
  },
  getUserInfo: function () {
    var that = this,
      _opt = {
        'job_type': that.data.job_type
      }
    ServerData.userVisit(_opt).then((res) => {
      // console.log(res.data)
      if (res.data.status == 1) {
        that.setData({
          list: res.data.data
        })

      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login',
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  getCategoryList() {
    var that = this
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        var newArry=[]
        newArry.push({ cat_id:'', cat_name: "选择人才"})


        this.setData({ jobArray: res.data.data})
        console.log(res.data.data)
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  }
})
