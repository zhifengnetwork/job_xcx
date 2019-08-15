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
    regtypeMsg: '企业',                       // 1位公司，2为第三方  默认1 
    pageNum: 1,                         // 设置加载的第几次，默认是第一次  
    isNoData: false,               //"上拉加载"的变量，默认false，隐藏  
    noMoreData: false,       //“没有数据”的变量，默认false，隐藏  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.regtype = options.regtype
    var msg =''
    if (options.regtype==2){
      msg = '服务商'
    }else{
      msg = '企业'
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
          if (that.data.pageNum!=1){
            that.setData({
              noMoreData: true,            //不是第一页并且没有数据了 则显示:"没有更多数据提示语"
            }); 
          }else{
            that.setData({
              isNoData: true,                    //当前页面为1并且没有数据，则显示:'没有数据提示文本 ' 
            }); 
          }
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