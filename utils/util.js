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
  if(postion == 3) {
    return app.editTabBar3()
  } else if (postion == 1) {
    return app.editTabBar1()
  } else if (postion == 2) {
    return app.editTabBar2()
  } else {
    // console.log(11)
    return app.editTabBar()
  }
}

function loginIdentity(){
  var postion = wx.getStorageSync('savePostion');
  // console.log(postion)
  if (postion == 0 || postion == 3 || 'undefined'==typeof(postion) || postion == '' ) {
    var info = {
      pColor: 'user-color-',
      pBgC: 'user-bg-',
      pBC: 'user-bColor-',
      pBC1: 'user-bColor-1ss',
      gActive:'user-active-',
      styleBg:'#ff54b5',
      resType:'userInfo',
    }
    return info
  } 
  if (postion == 1){
    var info ={
      pColor:'company-color-',
      pBgC:'company-bg-',
      pBC:'company-bColor-',
      pBC1:'company-bColor-1ss',
      gActive: 'company-active-',
      styleBg: '#be4cff',
      resType: 'company'
    }
    return info
  } 
  if (postion == 2) {
    var info = {
      pColor: 'third-color-',
      pBgC: 'third-bg-',
      pBC: 'third-bColor-',
      pBC1:'third-bColor-1ss',
      gActive: 'third-active-',
      styleBg: '#54b9ff',
      resType: 'thirdParty'
    }
    return info
  } 
}

module.exports = {
  getStorageItem: getStorageItem,
  loginIdentity: loginIdentity
}