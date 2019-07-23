// pages/company/company.js
const app =getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({
  data: {
    recList:[],
    recruit_hot:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getRecruitList()                      //公司及第三方职位列表
  },
  getRecruitList(){
    // ServerData.toLogin(_opt).then((res) => {          //请求数据
    var that =this,
        _opt ={
          'regtype':1,
          'province':'',
          'city':'',
          'district':''
        }
    ServerData.recruitList(_opt).then((res) =>{
        var status = res.data.status
        if(status==1){
            // that.data.recList=res.data.data
          this.setData({
            recList: res.data.data
          })
        }else if(status==-1){
            wx.redirectTo({
              url: '../../login/login'
            })
        }else{
           ServerData._wxTost(res.data.msg)
        }
      // that.data.recruit_hot =
      console.log(that.data.recList)
      this.setData({
        recList: res.data.data
      })
    })
  },
})