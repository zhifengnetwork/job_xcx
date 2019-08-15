
import ServerData from 'serverData.js';
class commonData {
  // 处理省市县联动逻辑

  provinces(code, index,value) {
   
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1) {
          that.citys(res.data.data[code].code, index,value);
          console.log(res.data.data)
          return {
            provinces: res.data.data,
            province: res.data.data[value[0]]
          }
      }
      return ServerData._wxTost(res.data.msg)
    })
  }

  citys (code, index,value){
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
          that.areas(res.data.data[index].code,value);
          return {
            citys: res.data.data,
            city: res.data.data[value[1]]
          }
      } 
      return ServerData._wxTost(res.data.msg)
    })
  }

  areas(code,value){
        let that = this
        ServerData.getAddress({ parent_id: code }).then((res) => {
          if (res.data.status == 1) {
            return {
              areas: res.data.data,
              area: res.data.data[value[2]]
            }
          } 
          return ServerData._wxTost(res.data.msg)
        })
    }

//   selectDistrict(e) {
//     var that = this
//     if (that.data.addressMenuIsShow) {
//       return
//     }
//     that.startAddressAnimation(true)
// }

// // 执行动画
// startAddressAnimation(isShow) {
//   var that = this
//   if (isShow) {
//     that.animation.translateY(0 + 'vh').step()
//   } else {
//     that.animation.translateY(40 + 'vh').step()
//   }
//   that.setData({
//     animationAddressMenu: that.animation.export(),
//     addressMenuIsShow: isShow,
//   })
// }


}

export default new commonData();