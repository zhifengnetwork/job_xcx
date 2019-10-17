// pages/company/company.js
const app =getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({
  data: {
    recList:[],
    //地址三级开始
    // animationAddressMenu: {},
    // addressMenuIsShow: false,
    // value: [0, 0, 0],
    // provinces: [],                //获取所有省数组
    // citys: [],                    //获取所有城市数组
    // areas: [],                    //获取所有区数组
    // province: '',                 //获取选中的省
    // city: '',                     //获取选中的市
    // area: '',                     //获取选中的区
    areaInfo:'',
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,              //是否选择人才
    showTST:true,                 //是否选择地址
    page:1,
    rows:10,
    isMore:false,

    pColor:'',                            //动态获z字体颜色 
    pBgC: '',                            //动态获背景颜色                 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.hideHomeButton) wx.hideHomeButton()
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getCompanyList()                      //公司及第三方职位列表

    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */

    this.setData({
      pColor: util.loginIdentity().pColor,
      pBgC: util.loginIdentity().pBgC
    })

  },


  /***********地址开始**************** */
  tabEvent(data){      //接收传过来的参数
    var info =data.detail
    this.setData({
        areaInfo: info.areaInfo,
        pCode: info.pCode,
        cCode: info.cCode,
        aCode: info.aCode,
        showTST: info.showTST
    })
    this.getCompanyList()
    // this.hiring()             //主页信息
},

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
      this.addressForm.showPopup()
      this.addressForm.startAddressAnimation(true)
  },

  /***********地址结束**************** */


  lookMore(){
      this.setData({
          page:this.data.page+1
      })
      this.getCompanyList()
  },
  getCompanyList(){
    var that =this,
        _opt ={
          'regtype':1,
          'province': that.data.pCode,
          'city': that.data.cCode,
          'district': that.data.aCode,
          'page': that.data.page,
          'rows': that.data.rows
        }
    ServerData.companyList(_opt).then((res) =>{
        var status = res.data.status,
            newArray=[]
        if(status==1){
          if (res.data.data.length>0){
              if (that.data.page == 1) {
                  newArray = res.data.data
              } else {
                  newArray = [...that.data.recList, ...res.data.data]
              }
              var tt = res.data.data.length >=that.data.rows? true :false
              this.setData({
                recList: newArray,
                isMore:tt
              })
          }else{
              this.setData({
                isMore: false,
              })
              // ServerData._wxTost('没有数据了')
          }

          if(that.data.page ==1 && res.data.data==""){
              this.setData({
                  recList:[],
              })
          }
        }else if(status==-1){
            wx.redirectTo({
              url: '../../login/login'
            })
        }else{
           ServerData._wxTost(res.data.msg)
        }
    })
  },
  onShareAppMessage: function () {
    return
  }
})