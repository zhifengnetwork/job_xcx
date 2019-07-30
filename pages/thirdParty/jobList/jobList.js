// pages/company/jobList.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    // iconSize: [20],
    // iconType: ['success'],
    isDel: false,
    isCheck: true,
    recruitData: [],
    dStatus: 0,
    id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recruit()
  },
  showDelectBox(e) {

    var status = e.currentTarget.dataset.aa,
      newS = ""
    if (status == 0) {
      newS = 1
    } else {
      newS = 0
    }
    this.setData({ dStatus: newS })
  },

  recruit() {
    var _opt = {
      'page': 1
    }
    ServerData.recruit(_opt).then((res) => {
      if (res.data.status == 1) {
        var data = res.data.data
        for (var i in data) {
          data[i].selected = false
        }
        this.setData({
          recruitData: data
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

  // 删除招工信息
  deleteRecruit() {
    var list = this.data.recruitData,
      that=this,
      arry = ''
    for (var i in list) {
      if (list[i].selected) {
        arry = arry + ',' + list[i].id
      }
    }
    arry = arry.substr(1);
    if (arry == "") {
      return ServerData._wxTost('请选择要删除的信息')
    }
    var _opt = {
      'ids': arry,
    }
    ServerData.deleteRecruit(_opt).then((res) => {
      if (res.data.status == 1) {
        // 轻提示调用
        ServerData._wxTost(res.data.msg)
        setTimeout(()=>{
          that.onLoad()
        },2000)
        this.setData({ dStatus: 0})
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },

  changItemStatus(e) {

    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = this.data.recruitData
    // var selected = list[index].selected; // 获取当前商品的选中状态
    list[index].selected = !list[index].selected; // 改变状态

    this.setData({
      recruitData: list
    });
  }
})