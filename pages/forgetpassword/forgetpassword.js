
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: null,
    padw:'',
    padw2:'',
    code:'',
    status: false,
    timer: '', //定时器名字
    fasongtext: '发送验证码',
    tangchu: false, //是否显示弹出框
    codeIsCanClick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onShareAppMessage: function() {
  },
  deletetext: function(e) {

    this.setData({
      mobile: '',
      status: false
    })
  },
  getVale: function(e) {
    if (e.detail.value != '') {
      this.setData({
        status: true,
        mobile: e.detail.value
      })
    } else {
      this.setData({
        status: false
      })

    }
  },

  getPawd(e){
    this.setData({
      padw: e.detail.value
    })
  },
  getPawd2(e){
    this.setData({
      padw2: e.detail.value
    })
  },
  getCode(e){
    this.setData({
      code: e.detail.value
    })
  },

  clickCode: function () {     //发送验证码
    var that = this,
      mobile = that.data.mobile,
      reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile == "") {
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

  // 点击完成出现弹框
  complete: function() {
    var that = this,
      mobile = that.data.mobile,
      padw = that.data.padw,
      padw2 = that.data.padw2,
      code = that.data.code,
      reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号')
    }
    if (isNaN(code) || code == "" || code.length !=6) {
      return ServerData._wxTost('请正确输入验证码')
    }
    if (padw == "" || padw2 == "") {
      return ServerData._wxTost('请输入密码 或 确认密码')
    }
    if (padw != padw2) {
      return ServerData._wxTost('两次密码不相符')
    }
    var _opt = { 
      'mobile': mobile, 
      'password1': padw, 
      'password2': padw2,
      'code': code,  
    }
    ServerData.forgetPawd(_opt).then((res)=>{
       if(res.data.status==1){
            this.setData({ tangchu: true})
            setTimeout(function () {    //关闭弹框
              that.setData({
                tangchu: false
              })
            }, 1000)
            setTimeout(function () {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 1500)
       }else{
          ServerData._wxTost(res.data.msg)
       }
    })
  },  
})
/***
 * 倒计时事件 单位s
 */
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