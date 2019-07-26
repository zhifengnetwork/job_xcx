// pages/userInfo/editInfo.js
import ServerData from '../../../utils/serverData.js';
const payArray =[];
for(let i =3; i <= 20; i++){
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
      { name: '2', value: '女', checked: 'true' },    //性别选择
      { name: '1', value: '男' }
    ],
    gender: 2,                            //性别
    paysIndex:0,                           //薪资
    jobArray: [],
    // job_type:'',
    jobIndex: 0,
    work:false,
    aducational: false, 
    workInfo: "",                           //工作经验
      aducationalInfo: "",                    //教育经历
      name: "",                               //姓名
      old: "",                                //年龄
      mz: "",                                 //民族
      wordOld: "",                            //工龄
      explain: "",                            //说明
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCategoryList()
      this.setCompanyInfo()
  },

  setCompanyInfo(){
    ServerData.setCompanyInfo({}).then((res) =>{
        if (res.data.status == 1) {
          this.setData({ getUData: res.data.data })
          console.log(res.data.data)
        } else if (res.data.status == -1) {
          wx.redirectTo({
            url: '../../login/login'
          })
        } else {
          ServerData._wxTost(res.data.msg)
        }
    })
  },

  getCategoryList(){
      var that =this
      ServerData.categoryList({}).then((res) => {
          if(res.data.status==1){
            this.setData({ jobArray: res.data.data })
            console.log(res.data.data)
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
      'work_age': that.data.wordOld,
      'daogang_time': that.data.array[that.data.index],
      'salary': that.data.payArray[that.data.paysIndex],
      'experience': that.data.workInfo,
      'education': that.data.aducationalInfo,
      'person_desc': that.data.explain
    }
    // console.log(_opt)
    ServerData.editUserInfo(_opt).then((res)=>{
      console.log(res)
      if(res.data.status==1){
          wx.redirectTo({
            url: '../userCenter/userCenter',
          })
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
      if (that.data.wordOld == "") {
        ServerData._wxTost('请输入工龄');
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



  getName(e){
    this.setData({ name: e.detail.value })
  },
  getOld(e) {
    this.setData({ old: e.detail.value })
  },
  radioChange(e){
    console.log(e)
    this.setData({gender: e.detail.value})
  },
  getMZ(e) {
    this.setData({ mz: e.detail.value })
  },
  getWordOld(e) {
    this.setData({ wordOld: e.detail.value })
  },
  getWordOld(e) {
    this.setData({ wordOld: e.detail.value })
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  jobChange: function (e) {
    // console.log(e)
    // console.log(this.data.jobArray[e.detail.value].cat_id)
    this.setData({
      jobIndex: e.detail.value
    })
  },
  paysChange: function (e) {
    this.setData({
      paysIndex: e.detail.value
    })
  }
})