//app.js

App({
  // golbalJs:'public',
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
  editTabBar3: function () {
    var tabBar = this.globalData.tabBar3;
    this.getTabBarInfo(tabBar)
    wx.setStorageSync('savePostion', 3)
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
    // baseUrl:'https://zhaopin.zhifengwangluo.cn/api',
    savePostion:0,
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    tabBar: {     //未登录显示导航
      "color": "#9E9E9E",
      "selectedColor": "#ff54b5",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/static/images/bar_icon/home_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/home_pick.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/login/login",
          "text": "信息",
          "iconPath": "/static/images/bar_icon/info_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/info_pink.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/login/login",
          "text": "我的",
          "iconPath": "/static/images/bar_icon/user_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/user_pink.png",
          "clas": "menu-item",
          active: true
        }
      ],
      "position": "bottom"
    },
    tabBar1: {     //以企业名义进去看到的底部导航
      "color": "#ff54b5",
      "selectedColor": "#be4cff",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/company/index/index",
          "text": "首页",
          "iconPath": "/static/images/bar_icon/home_gray.png",
          "selectedIconPath": "/static/images/bar_icon/company/h_pop.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/company/jobApplicant/jobApplicant",
          "text": "人才",
          "iconPath": "/static/images/bar_icon/user2_gray.png",
          "selectedIconPath": "/static/images/bar_icon/company/user2_pop.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/company/thirdParty/thirdParty",
          "text": "服务商",
          "iconPath": "/static/images/bar_icon/circle_gray.png",
          "selectedIconPath": "/static/images/bar_icon/company/circle_pink.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/information/information",
          "text": "消息",
          "iconPath": "/static/images/bar_icon/info_gray.png",
          "selectedIconPath": "/static/images/bar_icon/company/info_pop.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/company/cUserInfo/cUserInfo",
          "text": "我的",
          "iconPath": "/static/images/bar_icon/user_gray.png",
          "selectedIconPath": "/static/images/bar_icon/company/u_pop.png",
          "clas": "menu-item",
          active: true
        }
      ],
      "position": "bottom"
    },
    tabBar2: {   //以服务商名义登陆进去看到的底部导航
      "color": "#9E9E9E",
      "selectedColor": "#54b9ff",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/thirdParty/index/index",
          "text": "首页",
          "iconPath": "/static/images/bar_icon/home_gray.png",
          "selectedIconPath": "/static/images/bar_icon/third/h_blue.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/thirdParty/jobApplicant/jobApplicant",
          "text": "人才",
          "iconPath": "/static/images/bar_icon/user2_gray.png",
          "selectedIconPath": "/static/images/bar_icon/third/user2_blue.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/thirdParty/company/company",
          "text": "企业",
          "iconPath": "/static/images/bar_icon/company_gray.png",
          "selectedIconPath": "/static/images/bar_icon/third/company_blue.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/information/information",
          "text": "消息",
          "iconPath": "/static/images/bar_icon/info_gray.png",
          "selectedIconPath": "/static/images/bar_icon/third/info_blue.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/thirdParty/thirdInfo/thirdInfo",
          "text": "我的",
          "iconPath": "/static/images/bar_icon/user_gray.png",
          "selectedIconPath": "/static/images/bar_icon/third/user_blue.png",
          "clas": "menu-item",
          active: true
        }
      ],
      "position": "bottom"
    },
    tabBar3: {   //以个人名义登陆进去看到的底部导航
      "color": "#9E9E9E",
      "selectedColor": "#ff54b5",
      "backgroundColor": "#fff",
      "borderStyle": "#d6d6d6",
      "list": [
        {
          "pagePath": "/pages/userInfo/index/index",
          "text": "首页",
          "iconPath": "/static/images/bar_icon/home_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/home_pick.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/userInfo/company/company",
          "text": "企业",
          "iconPath": "/static/images/bar_icon/company_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/company_pink.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/userInfo/thirdParty/thirdParty",
          "text": "服务商",
          "iconPath": "/static/images/bar_icon/circle_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/circle_pink.png",
          "clas": "menu-item",
          active: true
        },

        {
          "pagePath": "/pages/information/information",
          "text": "消息",
          "iconPath": "/static/images/bar_icon/info_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/info_pink.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/userInfo/userCenter/userCenter",
          "text": "我的",
          "iconPath": "/static/images/bar_icon/user_gray.png",
          "selectedIconPath": "/static/images/bar_icon/user/user_pink.png",
          "clas": "menu-item",
          active: true
        }
      ],
      "position": "bottom"
    }
  }
})