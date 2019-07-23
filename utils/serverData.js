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

	//文件上传
	_uploadFile_(_data, url, complete) {
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

	//登陆
	toLogin(_data, complete) {
		return this._promise_get(_data, api.userAPI.login, complete);
	}
	//注册
	_register(_data, complete) {
		return this._promise_post(_data, api.userAPI.register, complete);
	}
	//注册验证码
	verifyCode(_data, complete) {
		return this._promise_get(_data, api.userAPI.verifyCode, complete);
	}
	//发送验证码
	fsCode(_data, complete) {
		return this._promise_get(_data, api.userAPI.fsCode, complete);
	}
	//找回密码
	forgetPawd(_data, complete) {
		return this._promise_post(_data, api.userAPI.forgetPawd, complete);
	}

	//首页
	reqIndex(_data, complete) {
		return this._promise_get(_data, api.userAPI.reqIndex, complete);
	}

	// 职位详情
	recruitDetail(_data, complete) {
		return this._promise_post(_data, api.userAPI.recruitDetail, complete);
	}
	// 个人简历详情
	personalDetail(_data, complete) {
		return this._promise_post(_data, api.userAPI.personalDetail, complete);
	}


	//公司账号-我的
	userInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.userInfo, complete);
	}

	//个人信息注册
	_registerUserInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.registerUserInfo, complete);
	}
	
	//上传文件
	uploadFile(_data, complete) {
		return this._uploadFile_(_data, api.userAPI.uploadFile, complete);
	}
	//帮助与反馈
	helpExp(_data, complete) {
		return this._promise_post(_data, api.userAPI.helpExp, complete);
	}
	//隐私设置
	privacySetting(_data, complete) {
		return this._promise_post(_data, api.userAPI.privacySetting, complete);
	}
	//隐私设置操作
	changPSetting(_data, complete) {
		return this._promise_post(_data, api.userAPI.changPSetting, complete);
	}
	//修改手机号
	editMobile(_data, complete) {
		return this._promise_post(_data, api.userAPI.editMobile, complete);
	}
	//修改密码
	editPassword(_data, complete) {
		return this._promise_post(_data, api.userAPI.password, complete);
	}

	// 收藏列表
	Ucollect(_data, complete) {
		return this._promise_post(_data, api.userAPI.Ucollect, complete);
	}
	// 收藏/取消收藏
	collection(_data, complete) {
		return this._promise_post(_data, api.userAPI.collection, complete);
  }
  // 
	categoryList(_data, complete) {
		return this._promise_post(_data, api.userAPI.categoryList, complete);
  }



	// 轻提示
	_wxTost(msg) {
		wx.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
	}

	//校验手机号码
	_zzVerifyMobile(obj) {
		var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
		return reg.test(obj);
	}

	//校验固定电话
	_zzVerifyPhone(obj) {
		var reg = /^0\d{2,3}-?\d{7,8}$/;
		return reg.test(obj);
	}

}

export default new ServerData();