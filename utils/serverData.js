import api from "api.js";
import Promise from "promise.js";
class ServerData {

  // 私有函数
  _promise_get(_data, url, complete) {
    if (wx.getStorageSync('loginData').token) {
      _data.token = wx.getStorageSync('loginData').token
    }
    console.log('_promise_get url: ' + JSON.stringify(url));
    console.log('_promise_get _data: ' + JSON.stringify(_data));

    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: _data,
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
          wx.hideLoading()
        },
        //无论成功失败都会调用
        complete: function () {
          complete && complete();
        }
      })
    })
    return promise;
  }

  // 私有函数
  _promise_post(_data, url, complete) {
    if (wx.getStorageSync('loginData').token) {
      _data.token = wx.getStorageSync('loginData').token
    }
    console.log('_promise_post url: ' + JSON.stringify(url));
    console.log('_promise_post _data: ' + JSON.stringify(_data));
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: _data,
        // header: {
        //   'content-type': 'application/x-www-form-urlencoded' //
        // },
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
          wx.hideLoading()
        },
        //无论成功失败都会调用
        complete: function () {
          complete && complete();
        }
      })
    })
    return promise;
  }
  // 

  verifyCode(_data, complete) {
    console.log(api)
    return this._promise_get(_data, api.userAPI.verifyCode, complete);
  }
  _register(_data, complete) {
    console.log(api)
    return this._promise_post(_data, api.userAPI.register, complete);
  }

  _wxTost(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  }
}
export default new ServerData();