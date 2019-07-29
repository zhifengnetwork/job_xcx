import ServerData from '../../../utils/serverData.js';
Page({

  data:{
    pics: [],                                               //所有证书名
  },
  onLoad: function (options) {
    this.getUserImages()

  },

  getUserImages(){
    var that =this;
    ServerData.getUserImages({}).then((res) => {
      console.log(res.data.data.image)
        if (res.data.status==1){
              var list = res.data.data.image,
                json,
                newArry=[]
            if(list.length<1){
                json = { title: '', path:'', hiddenName: true }
                newArry.push(json)
                console.log(json)
            }else{
                for(var i in list){
                    console.log(111)
                    json = { title: list[i].title, path: list[i].path, hiddenName: false}
                    newArry.push(json) 
                }
            }
          that.setData({
            pics: newArry
          })
        } else if (res.data.status == -1) {
          wx.redirectTo({
            url: '../../login/login'
          })
        } else {
          ServerData._wxTost(res.data.msg)
        }
    })
  },

  formSubmit(){
    var that =this
    var _opt ={
      'image': that._getPicSrc().srcArry,
      'title': that._getPicSrc().titleArry
    }
    ServerData.editImages(_opt).then((res) => {
        if(res.data.status ==1){
          ServerData._wxTost('保存成功，请耐心等待审核')
          setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
          },1000)
        }else{
            ServerData._wxTost(res.data.msg)
        }
    })
  },

  _getPicSrc() {                                   //获取证书的图片路径
    var srcArry = [],
      titleArry=[],
      that = this,
      pics = that.data.pics
    for (var i in pics) {
      if (pics[i].path != "") {
        srcArry.push(pics[i].path)
      }
      if(pics[i].title !=""){
          titleArry.push(pics[i].title)
      }
    }
    return {
        titleArry: titleArry,
        srcArry: srcArry
    }
  },

  getPicName(e){                                   //获取证书的证书名
    // console.log(e)
    // var all = this.data.all,
    // var iname = e.target.dataset.iname,
    var key = e.target.dataset.key
    this.data.pics[key].title = e.detail.value
    this.setData({
      pics: this.data.pics
    });
  },

  addIdCardPic: function (e) {   //证书列表
    var _this = this
    var id = e.currentTarget.dataset.id
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        var data = _this.data.pics[id]
        // data.path = imgSrc;
        data.hiddenName = false;
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            // data.newSrc = dat.data
            data.path = dat.data;
            console.log(data.newSrc)
            _this.setData({
              pics: _this.data.pics
            })
          }
        })
      }
      //
    })
  },
  addImgBox: function (e) {
    var json = { title: '', path: '', hiddenName: true };
    this.data.pics.push(json)
    this.setData({
      pics: this.data.pics
    })
  }

})