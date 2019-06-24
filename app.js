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
    var tabBar = this.globalData.tabBar;
    this.getTabBarInfo(tabBar)
    wx.setStorageSync('savePostion', 0)
  },
  editTabBar1: function () {
    var tabBar = this.globalData.tabBar1;
    this.getTabBarInfo(tabBar)
    wx.setStorageSync('savePostion', 1)
  },
  editTabBar2: function () {
    var tabBar = this.globalData.tabBar2;
    this.getTabBarInfo(tabBar)
    wx.setStorageSync('savePostion', 2)
  },
  getTabBarInfo:function(obj){
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar =obj;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    savePostion:0,
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#25bbb3",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "../../static/images/bar_icon/home_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/home_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/information/information",
          "text": "信息",
          "iconPath": "../../static/images/bar_icon/info_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/info_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/userInfo/userCenter",
          "text": "我的",
          "iconPath": "../../static/images/bar_icon/user_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/user_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        }
      ],
      "position": "bottom"
    },
    tabBar1: {
      "color": "#9E9E9E",
      "selectedColor": "#25bbb3",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "../../static/images/bar_icon/home_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/home_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/company/jobApplicant",
          "text": "招人",
          "iconPath": "../../static/images/bar_icon/user2_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/user2_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/thirdParty/thirdParty ",
          "text": "第三方",
          "iconPath": "../../static/images/bar_icon/circle_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/circle_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/information/information",
          "text": "消息",
          "iconPath": "../../static/images/bar_icon/info_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/info_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/company/cUserInfo",
          "text": "我的",
          "iconPath": "../../static/images/bar_icon/user_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/user_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#9E9E9E",
      "selectedColor": "#25bbb3",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "../../static/images/bar_icon/home_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/home_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/company/company",
          "text": "公司",
          "iconPath": "../../static/images/bar_icon/company_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/company_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/thirdParty/thirdParty",
          "text": "第三方",
          "iconPath": "../../static/images/bar_icon/circle_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/circle_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },

        {
          "pagePath": "/pages/information/information",
          "text": "消息",
          "iconPath": "../../static/images/bar_icon/info_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/info_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        },
        {
          "pagePath": "/pages/company/cUserInfo",
          "text": "我的",
          "iconPath": "../../static/images/bar_icon/user_gray.png",
          "selectedIconPath": "../../static/images/bar_icon/user_green.png",
          "clas": "menu-item",
          "selectedColor": "#25bbb3",
          active: true
        }
      ],
      "position": "bottom"
    }
  }
})