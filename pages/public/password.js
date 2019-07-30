// pages/public/password.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,                //是否点击倒计时
    pColor: '',                          //动态获取字体颜色
    pBgC: '',                            //动态获背景颜色                 
    pBC1: '',                             //动态获边框颜色   
    mobile: '',
    mcode: '',
    pswd:'',
    pswd2:''
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({
      pBgC: util.loginIdentity().pBgC,
      pBC1: util.loginIdentity().pBC1,
      pColor: util.loginIdentity().pColor
    })
  },
  saveInfo: function () {
    var that =this,
        mobile = that.data.mobile,
        code = that.data.mcode,
        pasw=that.data.pswd,
        pswd2= that.data.pswd2

    if (!ServerData._zzVerifyMobile(mobile) || mobile == "") {
        return ServerData._wxTost('请正确输入手机号')
      }
    if (code == "" || code.length != 6 || isNaN(code)) {
      return ServerData._wxTost('请正确输入验证码')
    }

    if (pasw == "" || pswd2 == "") {
      return ServerData._wxTost('请输入密码 或 确认密码')
    }
    if (pasw != pswd2) {
      return ServerData._wxTost('两次密码不相符')
    }


    var _opt={
      'password1': pasw,
      'password2': pswd2,
      'mobile': mobile,
      'code': code
    }
    ServerData.editPassword(_opt).then((res) => {
      if (res.data.status == 1 || res.data.status == -1) {
        console.log(res)
        wx.navigateTo({
          url: '../login/login'
        })
      } 
      ServerData._wxTost(res.data.msg)
    });
  },
  getPassword(e){
    this.setData({pswd: e.detail.value,})
  },
  getPassword2(e) {
    this.setData({
      pswd2: e.detail.value,

    })
  },
  getVale: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getVale2: function (e) {
    this.setData({
      mcode: e.detail.value
    })
  },
  clickCode: function () {     //发送验证码
    var that = this,
      mobile = that.data.mobile
    if (!ServerData._zzVerifyMobile(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号!')
    }
    var _opt = { 'mobile': mobile }
    ServerData.fsCode(_opt).then((res) => {
      if (res.data.status == 1) {
        settime(that)
      }
      ServerData._wxTost(res.data.msg)
    });
  },

})

// 倒计时事件 单位s
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      codeIsCanClick: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      codeIsCanClick: false,
      last_time: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}