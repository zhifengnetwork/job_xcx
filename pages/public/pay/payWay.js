// pages/public/pay/payWay.js
import ServerData from '../../../utils/serverData.js';
const util = require('../../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [ 
      { name: '1', value: '余额支付', checked: 'true'  },
      { name: '2', value: '微信支付'}
    ],
    way:1,                                   //支付类型 默认余额，充值是没有月
    pBgC: '',                                //动态获背景颜色   
    styleBg:'',                              //动态添加style
    vip_type:1,                              //开头会员类型 1:月,2：季,3:年
    isClick:false,
    money:'',                                //充值额度
    deposityp:'',                            //用于区分是否走充值接口
    pType:'' ,                               //用于判断是否显示余额充值框

    rid:'',                                   //用于区分是否是预订
    // isShow: false,
    // paswAarry:[],
    password:''                              //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viptype ="",
        money="",
        id="",
        dtyp=""
    if ('undefined'!=typeof(options.vip_type)){
        viptype =options.vip_type
    }
   
    if ('undefined'!=typeof(options.money)){
        money =options.money
    }
    if ('undefined'!=typeof(options.deposityp)){
       dtyp =options.deposityp
    }
    if ('undefined'!=typeof(options.id)){
        id =options.id
    }
    if ('undefined'!=typeof(options.pType)){
        this.data.radioItems.shift();
        // this.data.radioItems[0].isClick=true
        this.setData({
            radioItems: this.data.radioItems,
            way:2,
            pType:options.pType
        })
    }
    this.setData({
        pBgC: util.loginIdentity().pBgC,
        styleBg: util.loginIdentity().styleBg,
        vip_type:viptype,
        rid:id,
        money:money,
        deposityp:dtyp
    })
    this.passwordForm= this.selectComponent('#password');   //调密码弹框
  },
  getPasswordEvent(data){
    var info =data.detail
    if(info.password.length===6){   
      this.openVip()
      // this.setData({
      //   isShow: false
      // })
  }
},
  selectPay: function (e) {       //支付方式
    this.setData({
      way: e.detail.value
    })
  },

  saveInfo(){
    if('undefined'!= typeof (this.data.vip_type) && this.data.vip_type!=""){
        if(this.data.way==1){ //余额支付需要输入密码
          // console.log(this.data.password)
          this.passwordForm.showPopup()
        }else{
            this.openVip()    //其他支付方式支付
            // console.log(this.data.vip_type)
        }
    }
    if('undefined' != typeof(this.data.deposityp) && this.data.deposityp!=""){    //充值
       this.toDeposits()
    }
    if('undefined' != typeof (this.data.rid) && this.data.rid!=""){       //  预订
        this.getPayUrl(this.data.rid)
    }
  },

  toDeposits(){   //充值
    // console.log(this.data.momey)
    var that =this
    var _opt ={
       'money':new Number(this.data.money),
       'pay_type':this.data.way
    }
    if(this.data.isClick){ return}
    this.setData({
        isClick:true
    })
    ServerData.deposits(_opt).then((res) =>{
      // console.log(res.data)
        if(res.data.status==5){
            that.getPayUrl(res.data.data)
        } 
        else if (res.data.status == -1) {
            wx.redirectTo({
              url: '../../login/login'
            })
        } 
        else {
            ServerData._wxTost(res.data.msg)
        }
        this.setData({
          isClick:false
        }) 
    })
  },
  openVip(){
      var that =this
      var _opt ={
        'vip_type': this.data.vip_type,
        'pay_type':this.data.way,
        'password':this.data.password

      }
      if(this.data.isClick){
        return
      }
      this.setData({
          isClick:true
      })
      ServerData.registerVip(_opt).then((res) =>{
          if(res.data.status==1){
              ServerData._wxTost(res.data.msg)
              // console.log(that.data.way)
              setTimeout(() =>{
                  wx.navigateBack({
                    delta: 1,
                  })
              },1500)
          } 
          if(res.data.status==5){
              that.getPayUrl(res.data.data)
          }
          else if (res.data.status == -1) {
              wx.redirectTo({
                url: '../../login/login'
              })
          } 
          else {
              ServerData._wxTost(res.data.msg)
          }
          this.setData({
            isClick:false
        })
          // console.log(res.data)
      })
  },
  getPayUrl(id){
      ServerData.rechargePay({'recharge_id':id}).then((res) =>{
          console.log(res)
          var info =res.data.data
          if(res.data.status==1){   //吊起外部链接
              // window.location.href =res.data.data+'?recharge_id='+id
              wx.requestPayment({
                timeStamp: info.timeStamp,
                nonceStr: info.nonceStr,
                package: info.package,
                signType: info.signType,
                paySign: info.paySign,
                success(res) {
                    wx.navigateBack({
                      delta: 2,
                    })
                 },
                fail(res) { 
                    console.log(res)
                    ServerData._wxTost(res.data.msg)
                }
              })
          }
          else if(res.data.status==8){      //未绑定微信支付，跳去绑定
              wx.redirectTo({
                url: '../setting'
              })
          }
          else if (res.data.status == -1) {
            wx.redirectTo({
              url: '../../login/login'
            })
          } 
          else {
              ServerData._wxTost(res.data.msg)
          }
      })
  }
})