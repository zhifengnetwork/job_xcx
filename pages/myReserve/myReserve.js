// pages/company/myReserve.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    bookListData:[],
    isShowR:false,                       // 没有数据是显示 
    pageNum: 1,                         // 设置加载的第几次，默认是第一次  
    searchLoading: false,               //"上拉加载"的变量，默认false，隐藏  
    noMoreData: false,       //“没有数据”的变量，默认false，隐藏  
    pColor: '',                          //动态获取字体颜色
    pBgC: '',                            //动态获背景颜色                 
    pBC1: ''                             //动态获边框颜色   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookList();
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1
    })
  },
  onShow(){
      wx.getSystemInfo({
        success: (res) => { // 用这种方法调用，this指向Page
          this.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
  },

  bookList: function () {
    var that =this
		ServerData.bookingList({'page': that.data.pageNum}).then((res) => {
			if (res.data.status == 1) {
          var sstatus =false,
              nodata =false
          if(res.data.data.length<1){
            if (that.data.pageNum == 1){
                sstatus = true
            }else{
              nodata=true
            } 
          }
          this.setData({
            bookListData: res.data.data,
            isShowR:sstatus,
            noMoreData: nodata
          })
			}else if (status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
				ServerData._wxTost(res.data.msg)
			}
		})
  },
  scrollLower() {
    var that =this
    if (that.data.listArry==""){
      return
    }
    ServerData._showLoading('加载中')
    that.bookList()
  }
})