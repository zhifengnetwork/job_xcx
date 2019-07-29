// pages/userInfo/headPortrait.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icCardPic: { src: '', hiddenName: true, newSrc: '' },
    pBgC: '',                            //动态获背景颜色  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pBgC: util.loginIdentity().pBgC,
    })
  },
  saveHeaderPic(){
      var that =this,
        head_pic = that.data.icCardPic.newSrc
      if (head_pic == "") { return ServerData._wxTost("请选择头像")}
      ServerData.uploadHeadpic({ 'head_pic': head_pic}).then((res) =>{
        if(res.data.status==1){
          ServerData._wxTost(res.data.msg)
          setTimeout(()=>{
              wx.navigateBack({
                  delta:1
              })
            // that.onLoad()
            // wx.navigateTo({
            //   url: '../userCenter/userCenter'
            // })
          },1000)
        }
        ServerData._wxTost(res.data.msg)
      })
  },
  addIdCardPic: function (e) {                                    //头像上传
    var _this = this,
      data = _this.data.icCardPic
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        data.src = imgSrc;
        data.hiddenName = false;
        _this.setData({
              icCardPic: data
            })
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})