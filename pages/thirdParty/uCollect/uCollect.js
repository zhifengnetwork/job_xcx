// pages/company/uCollect.js
import ServerData from '../../../utils/serverData.js';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 3,
    regtype:'',
    isShowD:false
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    that.UcList();
  },
  
  UcList: function () {
    var _opt = {
			regtype: this.data.currentTab
		}
		ServerData.Ucollect(_opt).then((res) => {
			// console.log(res)
			if (res.data.status == 1) {
        if(res.data.data.length<1){
            this.setData({
              isShowD: true
            })
        }
				this.setData({
					UcData: res.data.data
				})
			} else {
				ServerData._wxTost(res.data.msg)
			}
		})
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.UcList();
  },

  onShareAppMessage: function () {
    return
  }

})