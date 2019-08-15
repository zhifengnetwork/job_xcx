// pages/userInfo/editInfo.js
import ServerData from '../../../utils/serverData.js';
const payArray =[];
for(let i =0; i <= 20; i++){
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
    xLInfo:'',
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
    name: "",                               //姓名
    old: "",                                //年龄
    mz: "",                                 //民族
    wordOld: "",                            //工龄
    wordIndex:1,
    explain: "",                            //说明

    //地址三级开始
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areaInfo:'',
    provinces: [],                //获取所有省数组
    citys: [],                    //获取所有城市数组
    areas: [],                    //获取所有区数组
    province: '',                 //获取选中的省
    city: '',                     //获取选中的市
    area: '',                     //获取选中的区
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true, 
    showTST:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCategoryList()
      /*********地址 */
      this.provinces(0, 0);
      var animation = wx.createAnimation({
        duration: 500,
        transformOrigin: "50% 50%",
        timingFunction: 'ease',
      })
      this.animation = animation;
      /*********地址 */
  },

  returnIndex(flag,arry,isN,ispro){
    for(var i in arry){
      if (isN){
          if(ispro){
            if(arry[i].code==flag){
                return arry[i].area_name
            }
          }else{
              if(arry[i].cat_id==flag){
                return i
            }
          }
          
      }else{
        if (arry[i] == flag) {
          // console.log(arry[i])
          return i
        }
      }
    }
  },

  onShow(){
    this.initUserInfo()
  },

  initUserInfo(){
    var that =this
    ServerData.initUserInfo({}).then((res) =>{
        if (res.data.status == 1) {
          var info = res.data.data
          var isShow=false
          var job_type = this.returnIndex(info.job_type,that.data.jobArray,true)
          var salary = this.returnIndex(info.salary, that.data.payArray, false)
          if('undefined'==typeof(salary)){
            salary=0
          }
          var daogang_time = this.returnIndex(info.daogang_time, that.data.array, false)
          if ('undefined' == typeof (daogang_time)){
            daogang_time=0
          }

          var work_age = this.returnIndex(info.work_age, that.data.payArray, false)
          if ('undefined' == typeof (work_age)){
            work_age=0
          }
          var sheng =this.returnIndex(info.province, that.data.provinces, true,true)
          console.log(sheng)
          if ('undefined' == typeof (sheng)){
            sheng=''
          }
          else{
            isShow=true
          }
          var shi =this.returnIndex(info.city, that.data.citys, true,true)
          if ('undefined' == typeof (shi)){
            shi=''
          }
          var qu =this.returnIndex(info.district, that.data.areas, true,true)
          if ('undefined' == typeof (qu)){
            qu=''
          }
          let areaInfo =sheng + ',' + shi + ',' + qu
          var item = that.data.items
          var t =''
          for (var i in item){
            item[i].checked =false
            if (item[i].name == info.gender){
                t =i
            }
          }
          // console.log(that.data.provinces)
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
              areaInfo:areaInfo,
              pCode: info.province,                 //获取选中的省ID
              cCode: info.city,                    //获取选中的市ID
              aCode: info.district,
              // showTST:isShow   
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
      'desc': that.data.explain,
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
      xLInfo:e.currentTarget.dataset.name
    });
  },
  toggleDialog(e) {
    this.setData({
      showDialog: !this.data.showDialog
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
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },

  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },

  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    let areaInfo = that.data.province.area_name + ',' + that.data.city.area_name + ',' + that.data.area.area_name
    that.setData({
      areaInfo: areaInfo,
      pCode: that.data.province.code,
      cCode: that.data.city.code,
      aCode: that.data.area.code,
      showTST:false
    })
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    // console.log(value)
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      this.provinces(provinceNum, 0);
      this.setData({
        value: [provinceNum, 0, 0]
      })
    } else if (this.data.value[1] != cityNum) {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, 0]
      })
    } else {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  provinces: function (code, index) {
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1){
        that.setData({
          provinces: res.data.data,
          province: res.data.data[that.data.value[0]]
        })
        that.citys(res.data.data[code].code, index);
      } else {
        ServerData._wxTost(res.data.msg)
      }
      
    })
  },
  citys: function (code, index) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length == 0) {
          that.setData({
            areas: '',
            citys: ''
          })
          return
        }
        that.setData({
          citys: res.data.data,
          city: res.data.data[that.data.value[1]]
        })
        that.areas(res.data.data[index].code);
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  areas: function (code) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          areas: res.data.data,
          area: res.data.data[that.data.value[2]]
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  }
  /***********地址结束**************** */



})