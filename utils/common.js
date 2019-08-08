import api from "api.js";
// import Promise from "promise.js";
class commonData {
  // 处理省市县联动逻辑
  cityChange(){
    var value = e.detail.value
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
  }
  provinces (code, index) {
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          provinces: res.data.data,
          province: res.data.data[that.data.value[0]]
        })
        that.citys(res.data.data[code].code, index);
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  }
  citys (code, index) {
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
  }

  areas(code) {
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

  selectDistrict(e) {
  var that = this
  if (that.data.addressMenuIsShow) {
    return
  }
  that.startAddressAnimation(true)
}

// 执行动画
startAddressAnimation(isShow) {
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
}


}

export default new commonData();