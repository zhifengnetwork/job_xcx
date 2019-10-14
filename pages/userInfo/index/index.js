
//获取应用实例
import ServerData from '../../../utils/serverData.js';
const app = getApp()
const util = require('../../../utils/util.js');  //通用方法
Page({
  data: {
    list:[],
    indicatorDots: true,
    autoplay: true,               //自动播放
    interval: 3000,               //播放间隔
    duration: 1000,               //停留时间
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
    site_show: true,              //
    showTST:true
  },
  onLoad(){
    if (wx.hideHomeButton) wx.hideHomeButton()
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.getUserInfo()

    /*********地址 */
    // this.provinces(0, 0);
    // var animation = wx.createAnimation({
    //   duration: 500,
    //   transformOrigin: "50% 50%",
    //   timingFunction: 'ease',
    // })
    // this.animation = animation;
    /*********地址 */

    /*********地址 */
    this.addressForm = this.selectComponent('#address');
     /*********地址 */

  },

  getUserInfo: function () {
      var that =this,
          _opt={
              'province': that.data.pCode,
              'city': that.data.cCode, 
              'district': that.data.aCode
          }
      ServerData.userVisit(_opt).then((res) => {
          if(res.data.status == 1){
              that.setData({
                  list:res.data.data
              })

          }else if(res.data.status ==-1){
              wx.redirectTo({
                url: '../../login/login',
              })
          }else{
              ServerData._wxTost(res.data.msg)
          }
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
    this.getUserInfo()
},

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
      this.addressForm.showPopup()
      this.addressForm.startAddressAnimation(true)
  }
  /***********地址结束**************** */

})
