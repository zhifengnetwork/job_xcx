// pages/company/company.js
const app = getApp();
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({
  data: {
    recList: [],
    listArry:[],
    pBgC: '',                            //动态获背景颜色    
    row: 10,                            // 条数
    regtype: 1,                         // 1位公司，2为第三方  默认1 ，
    regtypeMsg: '公司',                       // 1位公司，2为第三方  默认1 
    pageNum: 1,                         // 设置加载的第几次，默认是第一次  
    searchLoading: false,               //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,       //“没有数据”的变量，默认false，隐藏  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.regtype = options.regtype
    var msg =''
    if (options.regtype==2){
      msg = '第三方'
    }else{
      msg = '公司'
    }
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      regtypeMsg: msg
    })
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getRecruitList(this)                      //公司及第三方职位列表



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => { // 用这种方法调用，this指向Page
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  scrollLower() {
    var that =this
    if (that.data.listArry==""){
      return
    }
    ServerData._showLoading('加载中')
    that.getRecruitList(that)
  },


  getRecruitList(that) {
     var  _opt = {
        'regtype': that.data.regtype,
        'province': '',
        'city': '',
        'district': '',
        'rows':that.data.row,
        'page': that.data.pageNum
      }
    ServerData.recruitHot(_opt).then((res) => {
      var status = res.data.status
      if (status == 1) {
        if(res.data.data==""){
          that.setData({
              searchLoadingComplete: true,            //把“没有数据”设为true，显示  
          }); 
          that.data.listArry =[]
        }else{
            if (that.data.pageNum==1){
                var dataList = res.data.data
                that.setData({
                  recList: dataList,
                })
                that.data.listArry = res.data.data
            }else{
              var recl = [...that.data.recList, ...res.data.data]
              that.data.listArry = res.data.data
              that.setData({
                recList: recl,
              })
            }

            that.data.pageNum++;
        }

      } else if (status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  onShareAppMessage: function () {
    return
  }
})