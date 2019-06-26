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
    pics: [
      { src: '', hiddenName: true }
    ]
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

addWordPic:function(e){
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
      _this.setData({
        pics: _this.data.pics
      })
    }
    //
  })
},
addImgBox: function (e) {
    var json = { src: '', hiddenName: true };
    this.data.pics.push(json)
    console.log(this.data.pics)
    this.setData({
      pics: this.data.pics
    })
  },
  /*previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },*/
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