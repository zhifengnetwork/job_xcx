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


function getStorageItem(key,app) {
  var postion = wx.getStorageSync(key);
  if (postion == 0) {
    app.editTabBar();
  } else if (postion == 1) {
    app.editTabBar1();
  } else if (postion == 2) {
    app.editTabBar2();
  } else {
    app.editTabBar3();
  }
  console.log(postion)
}


module.exports = {
  getStorageItem: getStorageItem,
}