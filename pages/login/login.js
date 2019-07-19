
import ServerData from '../../utils/serverData.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
      if (res.data.status == 1) {
          wx.setStorageSync('token', res.data.data.token);
          var type = wx.getStorageSync('savePostion');
          console.log(type)
          console.log(res)
          if (type == 3) {
            wx.redirectTo({         //跳转至首页
              url: '../userInfo/index'
            })
          }
          else if (type == 1) {
            wx.redirectTo({         //跳转至首页
              url: '../company/index'
            })
          }
          else if (type == 2) {
            wx.redirectTo({         //跳转至首页
              url: '../thirdParty/index'
            })
          }
          else {
            wx.redirectTo({         //跳转至首页
              url: '../index/index'
            })
          }
      } else {
        ServerData._wxTost(res.data.msg)
      }
    });


      
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
  forget:function(){
    wx.navigateTo({
      url: '../forgetpassword/forgetpassword',
    })
  },
  resister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }



})