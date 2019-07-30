
import ServerData from '../../utils/serverData.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),          //获取用户信息是否在当前版本可用
    inputValue: null,
    status: false,
    eyekai: 0,
    is_pwd:'password',
    input1text: '',
    input2text: '',
    color: '#ccc',
    password:"",
    mobile:''
  },
  getMobile:function(e){
    var color= '#ccc';
    this.data.input1text = ''
    if (e.detail.value != '') {
      this.setData({
        status: true,
        input1text: e.detail.value
      })
    } else {
      this.setData({
        status: false
      })
      return
    }
    if (!(this.data.input2text == '' || this.data.input1text == '')){
      color = '#ff54b5';
    }
    this.setData({
      color: color,
      mobile: e.detail.value
    })
  },
  getPassword: function (e) {
    var color = '#ccc';
    this.data.input2text = ''
    if (e.detail.value != '') {
      this.setData({
        input2text: e.detail.value
      })
    }
    if (!(this.data.input2text == '' || this.data.input1text == '')) {
      color = '#ff54b5';
    }
    var val = e.detail.value;
    this.setData({ 
      password: val,
      color: color
    })
  },

  wxLogin(e){
    if (e.detail.userInfo) {//点击了“允许”按钮，
      var that = this
      wx.login({
        success: res => {
          ServerData.wxLogin({ 'code': res.code }).then((res) => {
            wx.removeStorageSync('token')
            wx.removeStorageSync('savePostion')
            var type = res.data.data.regtype       //用户状态
            if (res.data.status == 1) {
              wx.setStorageSync('token', res.data.data.token);
              wx.setStorageSync('savePostion', type);
              that.comeIndex(type)    //进入首页
            }
            else if (res.data.status == 3) {
              that.comeInInfoRegist(type)
            }
            else if (res.data.status == 4) {
              wx.redirectTo({                   //跳转个人信息注册
                url: '../register/register?code=' + res.data.data.openid + '&toke=' + res.data.data.token
              })
            } else {
              ServerData._wxTost(res.data.msg)
            }
          })
        }
      })
    }




  },

  toLogin:function(){     //保存用户身份用
    var that =this,
        password = that.data.password,
        mobile = that.data.mobile,
        reg = /^1[3|4|5|7|8|9]\d{9}$/;
    if(mobile == "" || !reg.test(mobile)){
       return ServerData._wxTost('手机号格式不正确哦!')
    }
    if (password==""){
       return ServerData._wxTost('请输入密码')
    }
    var _opt={
      'mobile': mobile,
      'password': password
    }
    ServerData.toLogin(_opt).then((res) => {          //请求数据
      var that =this
      wx.removeStorageSync('token')
      wx.removeStorageSync('savePostion')
      if (res.data.status == 1) {
          var type = res.data.data.regtype       //用户状态
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('savePostion', type);
          console.log(type)
          that.comeIndex(type)    //进入首页
      }
      else if (res.data.status == 3){            //注册账号但没有注册信息
          var type = res.data.data.regtype       //用户状态
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('savePostion', type);
          that.comeInInfoRegist(type)
      } 
      else {
          ServerData._wxTost(res.data.msg)
      }
    });  
  },
  comeInInfoRegist(type){
      if (type == 3) {
        wx.redirectTo({                   //跳转个人信息注册
          url: '../personalMessage/personalMessage'
        })
      } else {
        wx.redirectTo({                   //跳转公司信息注册
          url: '../register/fillInInformation/fillInInformation'
        })
      }
  },
  comeIndex(type){      //判断进入那个首页
      if (type == 3) {    //个人首页
        wx.redirectTo({
          url: '../userInfo/index/index'
        })
      }
      else if (type == 1) {     //企业首页
        wx.redirectTo({
          url: '../company/index/index'
        })
      }
      else if (type == 2) {     //第三方首页
        wx.redirectTo({
          url: '../thirdParty/index/index'
        })
      }
      else {
        wx.redirectTo({         //游客首页
          url: '../index/index'
        })
      }
  },
  visitorLogin(){
    wx.redirectTo({         //跳转至首页
        url: '../index/index'
    })
    wx.setStorageSync('savePostion', 0);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  showPassword: function(e){
    var newid=0;
    var that = this;
    var id = e.currentTarget.dataset.id;
    if(id==0){
      newid =1
    }
    var is_pwd = !that.data.is_pwd

    this.setData({
      is_pwd: is_pwd,
      eyekai: newid,
    })
  },
  deletetext: function(e) {
    this.setData({
      inputValue: '',
      status: false
    })
  },
  forget:function(){             //  忘记密码
    wx.navigateTo({
      url: '../forgetpassword/forgetpassword',
    })
  },  
  resister: function () {       //  注册
    wx.navigateTo({
      url: '../register/register',
    })
  }
})