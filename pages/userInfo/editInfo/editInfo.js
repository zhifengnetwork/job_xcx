// pages/userInfo/editInfo.js
import ServerData from '../../../utils/serverData.js';
const payArray =[];
for(let i =1; i <= 20; i++){
  // i=i+1000-1;
  payArray.push(i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUData:[],
    array: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
    payArray: payArray,
    index: 0,                              //到岗时间
    items: [
      { name: '2', value: '女', checked: true },    //性别选择
      { name: '1', value: '男', checked: false}
    ],
    gender: 2,                            //性别
    paysIndex:5,                           //薪资
    jobArray: [],
    // job_type:'',
    showDialog: false,                                      //学历弹框
    xLInfo:'请选择学历',
    xLItem: [                                                // 学校类型
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士' },
      { name: '本科', value: '本科' },
      { name: '大专', value: '大专' },
      { name: '高中以下', value: '高中以下' }
    ],
    jobIndex: 0,
    work:false,
    aducational: false, 
    workInfo: "",                           //工作经验
    aducationalInfo: "",                    //教育经历
    
    old: "",                                //年龄
    mz: "",                                 //民族
    wordOld: "",                            //工龄
    wordIndex:1,
    explain: "",                            //说明

    //地址三级开始
    // animationAddressMenu: {},
    // addressMenuIsShow: false,
    // value: [0, 0, 0],
    areaInfo:'',
    // provinces: [],                //获取所有省数组
    // citys: [],                    //获取所有城市数组
    // areas: [],                    //获取所有区数组
    // province: '',                 //获取选中的省
    // city: '',                     //获取选中的市
    // area: '',                     //获取选中的区
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true, 
    showTST:true,
    isShow:false,
    addressBoxShow:true,
    name: "",                               //姓名
    rangeList:['男', '女'],                 //性别
    rangeText: '',
    endTime: '',                         //时间选择器 当前时间
    birthDate: '',                       //出生年月
    educationList:['初中','高中','大专','本科'],  //学历
    educationText: '', 
    workYearList: ['三年及以下','3-5年','5-10年','10年以上'], //工作年限
    workYearText: '',
    stateList: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],  //当前状态
    stateText:'',
    typeList: ['土木工程','建筑工程','电气','其他'],  //求职类型
    typeText: '',
    isShowPost: false,     //显示期望岗位
    postList:[],    //选中的期望岗位
    monthlyList:['不限','3k-4k','5k-6k','8k-9k'],  //期望月薪
    monthlyText:'',
    phone: '',   //联系方式
    pics: [                                                 // 职业证书
      { src: '', hiddenName: true, newSrc: '',name: '' }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCategoryList()
      /*********地址 */
      this.addressForm = this.selectComponent('#address');
      /*********地址 */

    this.setData({
      endTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    })
  },
  //监听选择器
  changPicker: function(e){
    this.setData({
      [e.currentTarget.dataset.text]: this.data[e.currentTarget.dataset.list][e.detail.value]
    })
  },
  //出生年份 选择器
  bindBirthDate: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthDate: e.detail.value
    })
  },
  //监听联系方式输入框
  inputPhone(e) {
    this.setData({ phone: e.detail.value })
  },
  //选中期望岗位
  choosePostList: function(e){
    let list = []
    list.push(e.currentTarget.dataset.index)
    this.setData({
      postList: list
    })
  },
  //删除期望岗位
  closePostList: function(){
    this.setData({
      postList: []
    })
  },
  //选择职业证书
  addWordPic: function (e) {
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
  //添加证书
  addImgBox: function (e) {
    var json = { src: '', hiddenName: true };
    this.data.pics.push(json)
    this.setData({
      pics: this.data.pics
    })
  },
  //删除证书
  deleteImgBox: function ({ currentTarget: { dataset: { index }}}){
    console.log(index)
    this.data.pics.splice(index,1)
    this.setData({
      pics: this.data.pics
    })
  },
  //证书名字
  getPicName: function(e){
    this.data.pics[e.currentTarget.dataset.index]['name'] = e.detail.value
    this.setData({
      pics: this.data.pics
    })
  },
  //期望岗位弹窗
  closePost: function () {
    this.setData({ isShowPost: !this.data.isShowPost });
  },
  onShow(){
    this.initUserInfo()
  },

  initUserInfo(){
    var that =this,
        areaInfo=''
    ServerData.initUserInfo({}).then((res) =>{
        if (res.data.status == 1) {
          var info = res.data.data
          var isShow=true
          var job_type = ServerData.returnIndex(info.job_type,that.data.jobArray,true)
          var salary = ServerData.returnIndex(info.salary, that.data.payArray, false)
          if('undefined'==typeof(salary)){
            salary=0
          }
          var daogang_time = ServerData.returnIndex(info.daogang_time, that.data.array, false)
          if ('undefined' == typeof (daogang_time)){
            daogang_time=0
          }
          var work_age = ServerData.returnIndex(info.work_age, that.data.payArray, false)
          if ('undefined' == typeof (work_age)){
            work_age=0
          }
          if(!(info.province_str=="" && info.city_str=="" &&  info.district_str=="")){
              areaInfo =info.province_str+  ',' + info.city_str+  ',' +info.district_str
              isShow=false
          }
          var item = that.data.items
          var t =''
          for (var i in item){
            item[i].checked =false
            if (item[i].name == info.gender){
                t =i
            }
          }
          item[t].checked =true
          this.setData({ 
              getUData: info,
              name: info.name,
              gender: info.gender,
              wordIndex:work_age,
              old: info.age,
              mz: info.nation,
              workInfo: info.experience,
              aducationalInfo: info.education,
              explain: info.desc,
              jobIndex: job_type,
              paysIndex: salary,
              index: daogang_time,
              xLInfo:info.school_type,
              showTST:isShow,
              areaInfo: areaInfo,
              pCode: info.province,                   
              cCode: info.city,                  
              aCode: info.district,                  
          })
        } else if (res.data.status == -1) {
          wx.redirectTo({
            url: '../../login/login'
          })
        } 
        else if (res.data.status == -3) {
          ServerData._wxTost(res.data.msg)
          setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
          },1500)
        }
        else {
          ServerData._wxTost(res.data.msg)
        }
    })
  },

  getCategoryList(){
      var that =this
      ServerData.categoryList({}).then((res) => {
          if(res.data.status==1){
            this.setData({ jobArray: res.data.data })
          } else if (res.data.status == -1){
              wx.redirectTo({
                url: '../../login/login'
              })
          }else{
              ServerData._wxTost(res.data.msg)
          }
      })
  },

  saveEditInfo: function () {      //保存数据
    var that =this
    if (!that._verifyInfo()){return}
    var _opt={
      'name': that.data.name,
      'gender': that.data.gender,
      'age': that.data.old,
      'nation': that.data.mz,
      'job_type': that.data.jobArray[that.data.jobIndex].cat_id,
      'work_age': that.data.payArray[that.data.wordIndex],
      'daogang_time': that.data.array[that.data.index],
      'salary': that.data.payArray[that.data.paysIndex],
      'experience': that.data.workInfo,
      'education': that.data.aducationalInfo,
      'person_desc': that.data.explain,
      'province': that.data.pCode,
      'city': that.data.cCode,
      'district': that.data.aCode,
      'school_type':that.data.xLInfo
    }
    ServerData.editUserInfo(_opt).then((res)=>{
      if(res.data.status==1){
        ServerData._wxTost(res.data.msg);
        setTimeout(function(){
          wx.redirectTo({
            url: '../userCenter/userCenter',
          })
        },1500)
      }else{
         ServerData._wxTost(res.data.msg);
      }
    })
  },

  _verifyInfo(){
      var that =this
      if (that.data.name==""){
          ServerData._wxTost('请输入姓名');
          return false
      }
      if (that.data.old == "") {
        ServerData._wxTost('请输入年龄');
        return false
      }
      if (that.data.mz == "") {
        ServerData._wxTost('请输入民族');
        return false
      }
      if (that.data.workInfo == "") {
        ServerData._wxTost('请输入工作经历');
        return false
      }
      if (that.data.aducationalInfo == "") {
        ServerData._wxTost('请输入教育经历');
        return false
      }
      if (that.data.explain == "") {
        ServerData._wxTost('请输入个人说明');
        return false
      } 
      return true   
  },
  /*点击选择学历,弹框消失 s*/
  xLChange: function (e) {
    var that = this
    that.setData({
      showDialog: !that.data.showDialog,
      xLInfo:e.currentTarget.dataset.name,
      addressBoxShow:true
    });
  },
  toggleDialog(e) {

    this.setData({
      showDialog: !this.data.showDialog,
      addressBoxShow:this.data.showDialog
    });
  },
/*点击选择学历,end s*/
  getName(e){
    this.setData({ name: e.detail.value })
  },
  getOld(e) {
    this.setData({ old: e.detail.value })
  },
  radioChange(e){
    this.setData({gender: e.detail.value})
  },
  getMZ(e) {
    this.setData({ mz: e.detail.value })
  },
  getExplain(e) {
    this.setData({ explain: e.detail.value })
  },
  saveWork: function (e) {    //保存公司成就输入框的信息
    this.setData({ workInfo: e.detail.value })
  },
  saveAducational: function (e) {
    this.setData({ aducationalInfo: e.detail.value })  //保存名人介绍输入框的信息
  },
  addWorkExperience:function(e){
    var status = this.data.work;
    this.setData({ 
      work: !status,
      aducational: false,
    })
  },
  addEducationalExperience:function(e){
    var status =this.data.aducational;
    this.setData({
      aducational:!status,
      work: false
    })
  },
  saveInfo:function(){
    this.setData({ 
      aducational:false,
      work:false
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  jobChange: function (e) {
    this.setData({
      jobIndex: e.detail.value
    })
  },
  wordChange:function (e) {
    this.setData({
      wordIndex: e.detail.value
    })
  },
  paysChange: function (e) {
    this.setData({
      paysIndex: e.detail.value
    })
  },


 /********************其他资料结束 */
  /***********地址开始**************** */
  tabEvent(data){      //接收传过来的参数
    var info =data.detail
    console.log(info.isShow)
    this.setData({
        areaInfo: info.areaInfo,
        pCode: info.pCode,
        cCode: info.cCode,
        aCode: info.aCode,
        showTST: info.showTST,
        addressBoxShow:info.isShow,
    })
    // this.hiring()             //主页信息
},

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
      this.addressForm.showPopup()
      this.addressForm.startAddressAnimation(true)
      this.setData({
        addressBoxShow:false
      })
  }
  /***********地址结束**************** */



})