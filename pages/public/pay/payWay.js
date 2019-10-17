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
      { name: '2', value: '微信支付' }
    ],
    way:1,                                   //支付类型 默认余额，充值是没有月
    pBgC: '',                                //动态获背景颜色   
    styleBg:'',                              //动态添加style
    vip_type:1,                              //开头会员类型 1:月,2：季,3:年
    isClick:false,
    momey:'',                                //充值额度
    pType:''  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viptype ="",
        // pType="",
        momey=""
    if ('undefined'!=typeof(options.vip_type)){
      viptype =options.vip_type
    }
   
    if ('undefined'!=typeof(options.money)){
      momey =options.money
      
    }
    if ('undefined'!=typeof(options.pType)){
      
      this.data.radioItems.shift();
      // console.log(t)
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
      momey:momey
     
    })
 
  },
  selectPay: function (e) {       //性别
    this.setData({
      way: e.detail.value
    })
  },
  saveInfo(){
    if('undefined'!= typeof (this.data.vip_type) && this.data.vip_type!=""){
        this.openVip()
        console.log(this.data.vip_type)
    }
  
    if ('undefined' != typeof (this.data.pType) && this.data.pType!=""){
      console.log('deposits')
      this.toDeposits()
    }
  },

  toDeposits(){   //充值
    console.log(this.data.momey)
    var that =this
    var _opt ={
       'money':new Number(this.data.momey),
       'pay_type':this.data.way
    }
    if(this.data.isClick){ return}
    this.setData({
        isClick:true
    })
    ServerData.deposits(_opt).then((res) =>{
      console.log(res.data)
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
        'pay_type':this.data.way
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
              console.log(that.data.way)
              setTimeout(() =>{
                  wx:wx.navigateBack({
                    delta: 1,
                  })
              },1000)
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
          console.log(res.data)
      })
  },
  getPayUrl(id){
      ServerData.rechargePay({'recharge_id':id}).then((res) =>{
          console.log(res)
      })
  }
})