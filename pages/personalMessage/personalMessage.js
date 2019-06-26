const date = new Date();
const years=date.getFullYear();
const mouths =date.getMonth()+1;
const das=date.getDate();
//获取应用实例
const app = getApp();
Page({
  data: {
    array: ['硕士', '博士', '本科' ,'大专', '高技','高中以下'],
    items: [
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士' },
      { name: '本科', value: '本科' },
      { name: '大专', value: '大专' },
      { name: '高中以下', value: '高中以下' }],
    radioItems: [
      { me: 'wuman', value: '女', checked: 'true' },
      { me: 'man', value: '男' }
    ],
    icCardPic:[
      { msg: '点击上传身份证正面照', src: '', hiddenName:true},
      { msg: '点击上传身份证反面照', src: '', hiddenName: true}
    ],
    addImgs:1,
    index: 0,
    showDialog: false,
    date: years + '-' + mouths + '-' + das,
    date1: years + '-' + mouths + '-' + das,
    //添加一张
    pics: [],
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isShow: true
  },
  picketchang: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  picketChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      value: 'show'
    })
  },
  addIdCardPic:function(e){   //身份证上传
    var _this = this
    var id = e.currentTarget.dataset.id
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:function(res){
        var imgSrc = res.tempFilePaths[0];
        var data = _this.data.icCardPic[id]
        data.src = imgSrc;
        data.hiddenName=false;
        _this.setData({
          icCardPic: _this.data.icCardPic
        })
      }
      //
    })
  },
  //添加一张
  chooseImage: function (e) {
    var _this = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        // 控制触发添加图片的最多时隐藏
        if (pics.length >= 9) {
          _this.setData({
            isShow: (!_this.data.isShow)
          })
        } else {
          _this.setData({
            isShow: (_this.data.isShow)
          })
        }
        _this.setData({
          pics: pics
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /*点击选择学历,弹框消失 s*/
  click: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      showDialog: !that.data.showDialog
    });
  },
  changSex:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  radioChange: function (e) {
    var that = this
    that.setData({
      value1: e.detail.value
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  freetoBack:function(){
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
 /*点击选择学历,弹框消失 e*/

  
  saveInfo:function(){
    wx.navigateTo({
      url: '../public/audit'
    })
  }
  // formSubmit: function (e) {
  //   // user 
  //   var that = this;
  //   var idnum = this.data.idNum;
  //   var token = getApp().globalData.userInfo.token;
  //   var consignee = this.data.consignee;
  //   var idImg = [this.data.positiveImg, this.data.oppositeImg]
  //   //保存并上传
  //   this.uploadFiles(0, idImg, 'positive', idnum, consignee, token);
  //   this.uploadFiles(1, idImg, 'opposite', idnum, consignee, token);

  // },
  // uploadFiles: function (index, idImg, name, idnum, consignee, token) {
  //   var that = this;
  //   wx.uploadFile({
  //     url: 'https://www.chiccityhk.com/api/my/addidcard',
  //     filePath: idImg[index][0],
  //     name: name,
  //     header: {
  //       'content-type': 'multipart/form-data'
  //     }, // 设置请求的 header
  //     formData: {
  //       consignee: consignee,
  //       idnum: idnum,
  //       name: name,
  //       token: token
  //     },
  //     success: function (res) {
  //       if (index == 1) {
  //         var res = JSON.parse(res.data);
  //         if (res.status_code == 200) {
  //           wx.showToast({
  //             title: '保存成功',
  //             duration: 1000
  //           });
  //           if (that.data.returnTo == 1)
  //             setTimeout(function () {
  //               wx.navigateTo({
  //                 url: '../../order/ordersubmit/index'
  //               });
  //             }, 1000);
  //           else {
  //             setTimeout(function () {
  //               wx.navigateBack();
  //             }, 2000)
  //           }
  //         }
  //       }
  //     },
  //     fail: function (res) {
  //       wx.showToast({
  //         title: '保存失败',
  //         duration: 1000
  //       });
  //     }
  //   });
  // },
  // //  上传身份证正反面  e


 
})