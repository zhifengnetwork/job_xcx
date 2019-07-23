// pages/company/company.js
const app = getApp();
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({
  data: {
    recList: [],
    regtype: 1,                         // 1位公司，2为第三方  默认1 
    searchPageNum: 1,                   // 设置加载的第几次，默认是第一次  
    searchLoading: false,               //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,       //“没有数据”的变量，默认false，隐藏  
    // isFromSearch: true                //用于判断recList数组是不是空数组，默认true，空的数组  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.regtype = options.regtype
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getRecruitList()                      //公司及第三方职位列表
  },
  getRecruitList() {
    // ServerData.toLogin(_opt).then((res) => {          //请求数据
    var that = this,
      _opt = {
        'regtype': that.data.regtype,
        'province': '',
        'city': '',
        'district': '',
        'rows':5,
        'page': that.data.searchPageNum
      }
    ServerData.recruitHot(_opt).then((res) => {
      var status = res.data.status
      if (status == 1) {
        console.log(res.data.data.length)
        if(res.data.data.length<1){
          that.setData({
              searchLoadingComplete: true,            //把“没有数据”设为true，显示  
              searchLoading: false                    //把"上拉加载"的变量设为false，隐藏  
          }); 
        }else{
            let dataList = [];
            //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
            that.data.searchPageNum==1 ? dataList = res.data.data : dataList = that.data.recList.concat
            this.setData({
              recList: dataList,
              searchLoading: true             //把"上拉加载"的变量设为false，显示 
            })
        }

      } else if (status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
      // console.log(that.data.recList)
      // this.setData({
      //   recList: res.data.data
      // })
    })
  },

  
  searchScrollLower: function () {                                //滚动到底部触发事件  
    let that = this;
    console.log(2)
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {

          that.setData({
              searchPageNum: that.data.searchPageNum + 1,         //每次触发上拉事件，把searchPageNum+1  
              isFromSearch: false                                 //触发到上拉事件，把isFromSearch设为为false  
          })
          // that.fetchSearchList();
          that.getRecruitList()
      }
  }     
})