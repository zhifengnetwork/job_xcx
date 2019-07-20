import api from "api.js";
// import Promise from "promise.js";
class ServerData {

  // 私有函数
  _promise_get(_data, url, complete) {
    if (wx.getStorageSync('token')) {
      _data.token = wx.getStorageSync('token')
    }
    // console.log('_promise_get url: ' + JSON.stringify(url));
    // console.log('_promise_get _data: ' + JSON.stringify(_data));

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
    if (wx.getStorageSync('token')) {
      _data.token = wx.getStorageSync('token')
    }
    // console.log(_data.token)
    // console.log('_promise_post url: ' + JSON.stringify(url));
    // console.log('_promise_post _data: ' + JSON.stringify(_data));
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: _data,
        // header: {
        //   'content-type': 'application/json; charset=utf-8' //
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
  _uploadFile_(_data, url, complete) {                          //文件上传
      let promise = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: url,
          method: 'POST',
          name: 'file',
          filePath: _data,
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
      return promise
  }


  verifyCode(_data, complete) {                   //注册验证码
    return this._promise_get(_data, api.userAPI.verifyCode, complete);
  } 
  _register(_data, complete) {                    //注册
    return this._promise_post(_data, api.userAPI.register, complete);
  }
  _registerUserInfo(_data, complete) {            //个人信息注册
    return this._promise_post(_data, api.userAPI.registerUserInfo, complete);
  }
  toLogin(_data, complete) {                      //登陆
    return this._promise_get(_data, api.userAPI.login, complete);
  } 
  fsCode(_data, complete) {                      //发送验证码
    return this._promise_get(_data, api.userAPI.fsCode, complete);
  } 
  reqIndex(_data, complete) {                      //首页
    return this._promise_get(_data, api.indexAPI.reqIndex, complete);
  } 

  forgetPawd(_data, complete) {                      //找回密码
    return this._promise_post(_data, api.userAPI.forgetPawd, complete);
  } 

  uploadFile(_data, complete) {                      //上传文件
    return this._uploadFile_(_data, api.userAPI.uploadFile, complete);
  } 

  collection(_data, complete) {                      // 收藏/取消收藏
    return this._promise_post(_data, api.userAPI.collection, complete);
  } 

  theDetails(_data, complete) {                      // 公司职位详情
    return this._promise_post(_data, api.userAPI.theDetails, complete);
  }

  // 轻提示
  _wxTost(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  }
}
export default new ServerData();