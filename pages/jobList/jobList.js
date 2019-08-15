// pages/company/jobList.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    page: 1,
    isDel: false,
    isCheck: true,
    recruitData: [],
    dStatus: 0,
    id: '',
    noData:false,
    moreDataBtn:false,
    pColor: '',                            //动态获背景颜色  
    pBgC: '',                            //动态获背景颜色    
  },

  showDelectBox(e) {
    var status = e.currentTarget.dataset.aa,
      newS = ""
    if (status == 0) {
      newS = 1
    } else {
      newS = 0
    }
    this.setData({ dStatus: newS })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recruit()
    this.setData({ 
        pColor: util.loginIdentity().pColor,
        pBgC: util.loginIdentity().pBgC
    })
  },

  recruit() {
    var that =this,
        newArray=[],
        _opt = {'page':that.data.page}
    ServerData.recruit(_opt).then((res) => {
      if (res.data.status == 1) {
          var data = res.data.data
          if (data.length<1){
              that.data.noData =true
          }else{
              that.data.moreDataBtn=true
            if (that.data.page==1){
                  newArray = data
              }else{
                  newArray = [...that.data.recruitData, ...data]
              }
          }
          for (var i in data) {
            data[i].selected = false
          }
          this.setData({
            recruitData: newArray,
            noData:that.data.noData,
            moreDataBtn: that.data.moreDataBtn
          })
      } 
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } 
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

  // 删除招工信息
  deleteRecruit() {
    var list = this.data.recruitData,
      arry = ''
    for (var i in list) {
      if (list[i].selected) {
        arry = arry + ',' + list[i].id
      }
    }
    arry = arry.substr(1);
    if (arry == "") {
      return ServerData._wxTost('请选择要删除的信息')
    }
    var _opt = {
      'ids': arry,
    }
    ServerData.deleteRecruit(_opt).then((res) => {
      var that =this
      if (res.data.status == 1) {
        // 轻提示调用
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          that.onLoad()
        }, 2000)
        this.setData({ dStatus: 0 })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  changItemStatus(e) {
    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = this.data.recruitData
    list[index].selected = !list[index].selected; // 改变状态
    this.setData({
      recruitData: list
    });
  }
})