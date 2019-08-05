// pages/company/company.js
const app =getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({
  data: {
    recList:[],
    //地址三级开始
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],                //获取所有省数组
    citys: [],                    //获取所有城市数组
    areas: [],                    //获取所有区数组
    province: '',                 //获取选中的省
    city: '',                     //获取选中的市
    area: '',                     //获取选中的区
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true,              //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getRecruitList()                      //公司及第三方职位列表

    /*********地址 */
    this.provinces(0, 0);
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    /*********地址 */
  },


  /***********地址开始**************** */
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },

  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },

  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    let areaInfo = that.data.province.area_name + ',' + that.data.city.area_name + ',' + that.data.area.area_name
    that.setData({
      areaInfo: areaInfo,
      pCode: that.data.province.code,
      cCode: that.data.city.code,
      aCode: that.data.area.code
    })
    this.getRecruitList()
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      this.provinces(provinceNum, 0);
      this.setData({
        value: [provinceNum, 0, 0]
      })
    } else if (this.data.value[1] != cityNum) {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, 0]
      })
    } else {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  provinces: function (code, index) {
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          provinces: res.data.data,
          province: res.data.data[that.data.value[0]]
        })
        that.citys(res.data.data[code].code, index);
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  citys: function (code, index) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length == 0) {
          that.setData({
            areas: '',
            citys: ''
          })
          return
        }
        that.setData({
          citys: res.data.data,
          city: res.data.data[that.data.value[1]]
        })
        that.areas(res.data.data[index].code);
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  areas: function (code) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          areas: res.data.data,
          area: res.data.data[that.data.value[2]]
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  /***********地址结束**************** */


  getRecruitList(){
    var that =this,
        _opt ={
          'regtype':1,
          'province': that.data.pCode,
          'city': that.data.cCode,
          'district': that.data.aCode
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
      this.setData({
        recList: res.data.data
      })
    })
  },
  onShareAppMessage: function () {
    return
  }
})