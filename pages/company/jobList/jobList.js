// pages/company/jobList.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    iconSize: [20],
    iconType: ['success'],
    isDel:false,
    isCheck:true,
    recruitData:[],
    id:''
  },

  recruit: function () {
    var _opt = {
			'page': 1
		}
		ServerData.recruit(_opt).then((res) => {
			console.log(res)
			if (res.data.status == 1) {
				this.setData({
					recruitData: res.data.data.data
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
		})
  },
  // 删除招工信息
  deleteRecruit() {
    // 要传给后台的参数
    var _opt = { 
      'ids':this.data.id,
    }
    ServerData.collection(_opt).then((res) => {
      if(res.data.status == 1){
        // 轻提示调用
        ServerData._wxTost(res.data.msg)
      }else{
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },

  changItemStatus(e){
    console.log(e.currentTarget.dataset.check)

    this.setData({
      isCheck: !e.currentTarget.dataset.check
    })

    console.log(this.data.isCheck)
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.recruit()
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