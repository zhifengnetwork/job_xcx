import ServerData from '../../../utils/serverData.js';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    regionCode: ["440000", "440100", "440105"],
    tempFilePaths: [],
    hiddenName: false,
    pics: [                                               
      {src: '', hiddenName: true, newSrc: '' }
    ],
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    icCardPic: {src: '', hiddenName: true, newSrc: '' },
    isShow: true,
    contacts:'',
    mobiel:'',
    tel:'',
    cName:'',
    cType:'',
    cExp:''
  },


  saveInfo: function () {               //保存信息到服务器
    var that = this,
      province = "",
      city = "",
      district = ""
    if (!that._verifyInfo()) { return }
    var _opt = {
      'contacts': that.data.contacts,
      'mobile': that.data.mobiel,
      'telephone': that.data.tel,
      'company_name': that.data.cName,
      'type': that.data.cType,
      'desc': that.data.cExp,
      'province': that.data.regionCode[0],
      'city': that.data.regionCode[1],
      'district': that.data.regionCode[2],
      'c_img': that.data.icCardPic.newSrc,
      'image': that._getPicSrc(),
    }
    ServerData._registerUserInfo(_opt).then((res) => {
      if (res.status == 1) {
        wx.navigateTo({
          url: '../public/audit'
        })
      } 
      else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },

  getContacts(e){                                    
    this.setData({
       contacts: e.detail.value
    })
  },
  getMobiel(e) {
    this.setData({
      mobiel: e.detail.value
    })
  },
  getTel(e){
    this.setData({
      tel: e.detail.value
    })
  },
  getCName(e){
    this.setData({
      cName: e.detail.value
    })
  },
  getCType(e){
    this.setData({
      cType: e.detail.value
    })
  },
  getCExp(e){
    this.setData({
      cExp: e.detail.value
    })
  },

  _verifyInfo() {
    var that = this;
    if (that.data.contacts == "") {
      ServerData._wxTost('请输入联系人')
      return false
    }
    if (that.data.mobiel == "" || !ServerData._zzVerifyMobile(that.data.mobiel)) {
      ServerData._wxTost('请正确输入手机号')
      return false
    }
    if (that.data.tel == "" || !ServerData._zzVerifyPhone(that.data.tel)) {
      ServerData._wxTost('请正确输入固定电话')
      return false
    }
    if (that.data.cName == "") {
      ServerData._wxTost('请输入公司名称')
      return false
    }
    if (that.data.cType == "") {
      ServerData._wxTost('请输入公司类型')
      return false
    }
    if (that.data.cExp == "") {
      ServerData._wxTost('请输入公司简介')
      return false
    }
    if (that.data.icCardPic.src == "" ) {
      ServerData._wxTost('请输入上传营业执照')
      return false
    }
    return true
  },

  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      regionCode: e.detail.code
    })
  },

  addIdCardPic: function (e) {                                    //营业执照上传
    var _this = this,
       data = _this.data.icCardPic
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        data.src = imgSrc;
        data.hiddenName = false;
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            data.newSrc = dat.data
            console.log(data.newSrc)
            _this.setData({
              icCardPic: data
            })
          }
        })
      }
      //
    })
  },

  /*********************上传其他资料**************************** */
  _getPicSrc() {                                   //获取资料的图片路径 并返回数组
    var srcArry = [],
      that = this,
      pics = that.data.pics
    for (var i in pics) {
      if (pics[i].src != "") {
        srcArry.push(pics[i].newSrc)
      }
    }
    return srcArry
  },  
  addImgBox: function (e) {                         //添加一张新的资料图片
    var json = { src: '', hiddenName: true };
    this.data.pics.push(json)
    this.setData({
      pics: this.data.pics
    })
  },
  addWordPic: function (e) {                       //显示图片并上传到服务器
    var _this = this
    var id = e.currentTarget.dataset.id
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        var data = _this.data.pics[id]
        data.src = imgSrc;
        data.hiddenName = false;
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            data.newSrc = dat.data
            console.log(data.newSrc)
            _this.setData({
              pics: _this.data.pics
            })
          }
        })
        _this.setData({
          pics: _this.data.pics
        })
      }
      //
    })
  },

 /********************其他资料结束 */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})