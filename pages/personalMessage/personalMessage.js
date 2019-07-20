import ServerData from '../../utils/serverData.js';
const date = new Date();
const years=date.getFullYear();
const mouths =date.getMonth()+1;
const das=date.getDate();

const app = getApp();                                      //获取应用实例
Page({
  data: {
    name: '',                                               // 姓名
    school: '',                                             // 毕业学校
    profession: '',                                         // 职业
    items: [                                                // 学校类型
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士' },
      { name: '本科', value: '本科' },
      { name: '大专', value: '大专' },
      { name: '高中以下', value: '高中以下' }],
    radioItems: [                                          // 性别
      { id: '2', value: '女', checked: 'true' },
      { id: '1', value: '男' }
    ],
    sex:2,
    icCardPic: [                                           // 身份证
      { msg: '点击上传身份证正面照', src: '', hiddenName:true, newSrc:''},
      { msg: '点击上传身份证反面照', src: '', hiddenName: true, newSrc: ''}
    ],
    showDialog: false,                                      //学历弹框
    date: years + '-' + mouths + '-' + das,                 //出生年月
    date1: years + '-' + mouths + '-' + das,                //毕业时间
    pics: [                                                 //添加一张 职业证书
      { src: '', hiddenName: true, newSrc: ''}
    ],
    all: {},                                                //所有证书名
    picArray: []                                            //所有img
  },
  getName(e) {                                          // 姓名
    this.setData({ name: e.detail.value})
  },
  getScholl(e) {                                       // 毕业学校
    this.setData({ school: e.detail.value })
  },
  getProfession(e){
    this.setData({ profession: e.detail.value })        // 职业名称
  },
  picketchang: function (e) {                           // 出生日期
    this.setData({
      date: e.detail.value
    })
  },
  picketChange1: function (e) {                         //  毕业时间
    this.setData({
      date1: e.detail.value
    })
  },
  saveInfo(){
    var that =this,
        birth_year="",
        birth_month="",
        birth_day="",
        bityhDate = this.data.date.split('-'),
        graduate = this.data.date1.split('-'),
        title = Object.values(that.data.all)
    var _opt = { 
      'name': that.data.name,
      'gender': that.data.sex,
      'birth_year': bityhDate[0],
      'birth_month': bityhDate[1],
      'birth_day': bityhDate[2],
      'school': that.data.school,
      'school_type': that.data.value1,
      'graduate_year': graduate[0],
      'graduate_month': graduate[1],
      'graduate_day': graduate[2],
      'careers': that.data.profession,
      'idcard_front': that.data.icCardPic[0].newSrc,
      'idcard_back': that.data.icCardPic[1].newSrc,
      'image': that._getPicSrc(),
      'title': title
    }

    ServerData._registerUserInfo(_opt).then((res) => {
        if (res.data.status == 1) {
            wx.navigateTo({
              url: '../public/audit'
            })
        }else{
            ServerData._wxTost(res.data.msg)
        }
    });
    //
  },
  _verifyInfo(){
    var that =this;
    if (that.data.name==""){
      ServerData._wxTost('请输入名字')
      return false
    }
    if (that.data.school==""){
      ServerData._wxTost('请输入毕业学校')
      return false
    }
    if (that.data.profession == "") {
      ServerData._wxTost('请输入职业名称')
      return false
    }
    if (that.icCardPic[0].src == "" || that.icCardPic[1].src == ""){
      ServerData._wxTost('请输入上传身份证')
      return false
    }
    return true
  },
  _getPicSrc(){                                   //获取证书的图片路径
     var srcArry =[],
         that =this,
         pics = that.data.pics
    for (var i in pics){
      if(pics[i].src !=""){
        srcArry.push(pics[i].newSrc)
      }
    }
    return srcArry
  },
  getPicName(e){                                   //获取证书的证书名
    var all = this.data.all;
    var iname = e.target.dataset.iname;
    all[iname] = e.detail.value;
    this.setData({
      all: all
    });
  },
  
  onLoad: function (options) {
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
        ServerData.uploadFile(imgSrc).then((res)=>{
          var dat =JSON.parse(res.data)
          if (dat.status==1){
              data.newSrc = dat.data
            console.log(data.newSrc)
              _this.setData({
                 icCardPic: _this.data.icCardPic
              })
          }
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
addImgBox: function (e) {
    var json = { src: '', hiddenName: true };
    this.data.pics.push(json)
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
  changSex:function(e){       //性别
    this.setData({
      sex: e.detail.value
    })
  },
  radioChange: function (e) {
    var that = this
    that.setData({
      value1: e.detail.value
    })
  },
  toggleDialog(e) {
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

  
  // saveInfo:function(){
  //   wx.navigateTo({
  //     url: '../public/audit'
  //   })
  // }
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