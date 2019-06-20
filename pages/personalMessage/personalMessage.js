const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    date: '',
    array: ['硕士', '博士', '本科' ,'大专', '高技','高中以下'],
    showDialog: false,
    items: [
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士' },
      { name: '本科', value: '本科' },
      { name: '大专', value: '大专' },
      { name: '高中以下', value: '高中以下' }],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    value1:"",
    positiveImg: '',
    oppositeImg: ''
    
   
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
  // 日期选择器
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  /*点击选择学历,弹框消失 s*/
  click: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      showDialog: !that.data.showDialog
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value1)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    console.log(this.data.value1)
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

  //  上传身份证正反面  s
  addPosPic: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          positiveImg: tempFilePaths
        })
      }
    })
  },
  addOppPic: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          oppositeImg: tempFilePaths
        })
      }
    })
  },
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