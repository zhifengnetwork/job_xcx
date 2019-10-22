// pages/myPurse/withdrawal/withdrawalRecord.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      withdrawalList:[],
      page:1,
      row:20,
      // isShow:false,
      isMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getWithdrawalliat()
  },
  lookMore(){
      this.data.page=this.data.page+1
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 100000000
      })
      this.getWithdrawalliat()
  },
  getWithdrawalliat(){
    var that =this,
        newArray=[],
        // nodata,
        more=false
    ServerData.withdrawalRecord({page:this.data.page}).then((res) => {
        
        if(res.data.status==1){
            
            if(res.data.data.length>0){
                if(res.data.page==1){
                    newArray=res.data.data
                }else{
                    newArray=[...that.data.withdrawalList,...res.data.data]
                }
                if(res.data.data.length>=that.data.row){
                    more=true
                }
            }
            that.setData({
                withdrawalList:newArray,
                isMore:more
            })
        }else{
            ServerData._wxTost(res.data.msg)
        }
        wx.hideToast()
    })
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

  }
})