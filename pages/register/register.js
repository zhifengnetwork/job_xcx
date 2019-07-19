import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,
    mobile: '',
    mCode: '',
    password:'',
    comPasd:'',
    color: '#ccc',
    show: false,              //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      {name:'个人',id:0}, 
      {name:'企业',id:1},
      {name: '第三方',id:2} 
    ],                        //下拉列表的数据
    index: 0,                  //选择的下拉列表下标
    // nIndex:3,
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  clickCode: function () {     //发送验证码
    var that = this,
        mobile = that.data.mobile,
        reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号!')
    }
    var _opt = { 'mobile': mobile}
    ServerData.verifyCode(_opt).then((res) => {
      if(res.data.status==1){
        settime(that)
      }
      console.log(res)
    });
  },
  saveRegister() {        //注册账号
    var that =this,
      type =0;        
    if (!that.verifyUserInfo()){return}
    that.data.index == 0 ? type = 3 : type = that.data.index
    console.log(type)
    var _opt = {
      'type': type,
      'mobile': that.data.mobile,
      'code': that.data.mCode,
      'pwd': that.data.password,
      'pwd2': that.data.comPasd
      }
    ServerData._register(_opt).then((res) => {       //保存注册信息
      wx.removeStorageSync('token')
      if (res.data.status == 1) {
        // settime(that)
        wx.setStorageSync('token', res.data.data.token);
        //跳转 3 跳转到个人信息录入 ，不是3就跳转到企业信息录入
        if(type==3){
          wx.redirectTo({
            url: '../personalMessage/personalMessage'
          })
            // wx.navigateTo({
            //   url: '../personalMessage/personalMessage'
            // })
        } else {
          wx.redirectTo({
            url: '../personalMessage/personalMessage'
          })
        }
        //跳转
      }
      // console.log(res.data.data.token)
    });
  },
  verifyUserInfo(){             //验证输入信息
    var mobile = this.data.mobile
    var mCode =this.data.mCode
    var password = this.data.password
    var comPasd = this.data.comPasd
    var reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile==""){
      ServerData._wxTost('请正确输入手机号!')
      return false
    }
    if (isNaN(mCode) || mCode == "" || mCode.length!=6){
      ServerData._wxTost('请正确输入验证码')
      return false
    }
    if (password==""){
      ServerData._wxTost('请输入密码')
      return false
    }
    if(comPasd == "") {
      ServerData._wxTost('请输确认密码')
      return false
    }
    if(comPasd!= password) {
      ServerData._wxTost('两次密码不相符')
      return false
    }
    return true
  },

  getVale: function (e) {
    this.data.mobile = ''
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
    if (e.detail.value != '' && this.data.mCode != '') {
      this.setData({
        color: '#ff54b5'
      })
    }
    if (e.detail.value == '' || this.data.mobile == '') {
      this.setData({
        color: '#ccc'
      })
    }

  },
  getVale2: function (e) {
    this.data.mCode = ''
    if (e.detail.value != '') {
      this.setData({
        mCode: e.detail.value
      })
    }
    if (this.data.mobile != '' && e.detail.value != '') {
      this.setData({
        color: '#ff54b5'
      })
    }
    if (e.detail.value == '' || this.data.mobile == '') {
      this.setData({
        color: '#ccc'
      })
    }

  },
  getPassword(e){
    this.setData({
      password: e.detail.value
    })
  },

  comfirnPasd(e){
    this.setData({
      comPasd: e.detail.value
    })
  },
  deletetext: function (e) {
    this.setData({
      inputValue: '',
      status: false
    })
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let index = 
    this.setData({
      index: e.currentTarget.dataset.index,         //获取点击的下拉列表的下标
      nIndex: e.currentTarget.dataset.index, 
      show: !this.data.show
    });
  },
  personal:function(e){
    var index =this.data.index;
    var id = this.data.selectData[index].id
    if(id==0){
      wx.navigateTo({
        url: '../personalMessage/personalMessage'
      })
    }else{
      wx.navigateTo({
        url: 'fillInInformation/fillInInformation'
      })
    }
  }
})
// 倒计时事件 单位s
var countdown = 10;
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