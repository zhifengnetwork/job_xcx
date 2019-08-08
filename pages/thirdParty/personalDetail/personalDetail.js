// pages/company/postionDetail.js
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

  /**
	 * 页面的初始数据
	 */
	data: {
    id:'',
    isCollect: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 接收id
		this.setData({
			id: options.id
		});
    this.reqPersonal(); //请求数据
	},

	/**
	 * 个人简历详情数据
	 */
	reqPersonal: function () {
		// 要传给后台的参数
		var _opt = {
			id:this.data.id
		}
		ServerData.personalDetail(_opt).then((res) => {
			if (res.data.status == 1) {
				this.setData({
          personalData: res.data.data,
          isCollect: res.data.data.is_collection
				})
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else{
				  ServerData._wxTost(res.data.msg)
			}
		})
	},

	/**
	 * 收藏/取消收藏
	 */
	onCollection: function (e) {
    var statuss = e.currentTarget.dataset.stu
    if (e.currentTarget.dataset.stu == 0) {
      statuss = 1
    } else {
      statuss = 0
    }
    this.setData({
      isCollect: statuss
    })
		// 要传给后台的参数
		var _opt = {
			'type': 2,
			'to_id': this.data.id
		}
		ServerData.collection(_opt).then((res) => {
			if (res.data.status == 1) {
				ServerData._wxTost(res.data.msg)
			} else {
				ServerData._wxTost(res.data.msg)
			}
		});

	},	


  // 拨打电话
  callWithHim:function(){
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },

  // 预定
  toReservation:function(){
    var that =this
    var _opt = {
      id:this.data.id
    }
    ServerData.booking(_opt).then((res) => {
      console.log(res.data)
      if (res.data.status == 1) {
          wx.showToast({
            title: '预订成功',
            icon: 'success',
            duration: 2000
          })
      } else if(res.data.status == 5){
          // ServerData._wxTost(res.data.msg)
        wx.redirectTo({
          url: '../../public/pay/payWay?id=' + that.data.id
        })
      }else{
          ServerData._wxTost(res.data.msg)
      }
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

  }
})