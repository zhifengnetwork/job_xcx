const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

//获取用户状态
function getStorageItem(key,app) {
  var postion = wx.getStorageSync(key);
  if (postion == 0) {
    return app.editTabBar()
  } else if (postion == 1) {
    return app.editTabBar1()
  } else if (postion == 2) {
    return app.editTabBar2()
  } else {
    return app.editTabBar3()
  }
}


module.exports = {
  getStorageItem: getStorageItem,
}