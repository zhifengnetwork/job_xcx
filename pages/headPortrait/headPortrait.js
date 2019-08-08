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
        head_pic = that.data.icCardPic.newSrc,
        type = wx.getStorageSync('savePostion'),
        src=""
      if (head_pic == "") { return ServerData._wxTost("请选择头像")}
      ServerData.uploadHeadpic({ 'head_pic': head_pic}).then((res) =>{
        if(res.data.status==1){
          ServerData._wxTost(res.data.msg)
          if(type==1){
            src ='../company/cUserInfo/cUserInfo'
          }
          if (type == 2) {
            src = '../thirdParty/thirdInfo/thirdInfo'
          }
          if (type == 3) {
            src = '../userInfo/userCenter/userCenter'
          }
          setTimeout(()=>{
            wx.redirectTo({                   //跳转个人信息注册
              url: src
            })
          },1000)
        }
        ServerData._wxTost(res.data.msg)
      })
  },

  createMap(ctx) {
    let that = this;
    ctx.draw(true, function () {
      wx.showLoading({
        title: '压缩中',
      })
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'photo_canvas',
          fileType: "jpg",
          success: function (res) {
            console.log(res)
            var imgSrc = res.tempFilePath,
                data = that.data.icCardPic
            wx.hideLoading();
            data.src = imgSrc;
            data.hiddenName = false;
            that.setData({
              icCardPic: data
            })
            ServerData.uploadFile(imgSrc).then((res) => {
              var dat = JSON.parse(res.data)
              if (dat.status == 1) {
                data.newSrc = dat.data
                console.log(data.newSrc)
                that.setData({
                  icCardPic: data
                })
              }
            })
          },
          fail(res) {
            if (res.errMsg === "canvasToTempFilePath:fail:create bitmap failed") {
              console.log("导出map失败")
            }
          }
        }, this)
      }, 200);

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
        console.log(res)
        wx.getImageInfo({
            src: imgSrc,
            success:function(res){
              var ctx = wx.createCanvasContext('photo_canvas')
              var towidth = 500; //按宽度500px的比例压缩
              var toheight = Math.trunc(500 * res.height / res.width);
              _this.setData({
                canvas_h: toheight
              })
              ctx.drawImage(imgSrc, 0, 0, res.width, res.height, 0, 0, towidth, toheight)
              _this.createMap(ctx);
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