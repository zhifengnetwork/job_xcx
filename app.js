//app.js
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 展示本地存储能力
    /*
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    /*wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  //第一种底部  
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  editTabBar2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#25bbb3",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "../../static/images/bar_icon/home_green.png",
          "selectedIconPath": "../../static/images/bar_icon/company_green.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          active: true
        },
        {
          "pagePath": "pages/recommend/recommend",
          "text": "推荐",
          "iconPath": "../../static/images/bar_icon/recomend_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/recomend_green.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/test/test",
          "text": "信息",
          "iconPath": "../../static/images/bar_icon/info_gray.png",
          "selectedColor": "../../static/images/bar_icon/info_green.png",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "pages/userInfo/infomation",
          "text": "我的",
          "iconPath": "../../static/images/bar_icon/user_gray.png",
          "selectedColor": "../../static/images/bar_icon/user_green.png",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/img/home.png",
          "selectedIconPath": "/img/home.png",
          "clas": "menu-item2",
          "selectedColor": "#4EDF80",
          active: true
        },
        {
          "pagePath": "/pages/logs/logs",
          "text": "日志",
          "iconPath": "/img/note.png",
          "selectedIconPath": "/img/note.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/cont/index",
          "text": "指南",
          "iconPath": "/img/note.png",
          "selectedIconPath": "/img/home.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/detail/index",
          "text": "内容",
          "iconPath": "/img/safari.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    }
  }
})