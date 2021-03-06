import api from "api.js";
// import Promise from "promise.js";
class ServerData {

	// 私有函数
	_promise_get(_data, url, complete) {
		if (wx.getStorageSync('token')) {
			_data.token = wx.getStorageSync('token')
		}

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
					// if(res.data.status==-1){
					// 	wx.redirectTo({
					// 		url: '../../login/login'
					// 	})
					// }
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
		return this._promise_post(_data, api.userAPI.login, complete);
	}
  //微信登陆
  wxLogin(_data, complete) {
    return this._promise_post(_data, api.userAPI.wxLogin, complete);
  }

  //微信绑定
  bindWeixin(_data, complete) {
    return this._promise_post(_data, api.userAPI.bindWeixin, complete);
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

	// 招工信息
	recruit(_data, complete) {
		return this._promise_post(_data, api.userAPI.recruit, complete);
	}
	// 删除招工信息
	deleteRecruit(_data, complete) {
		return this._promise_post(_data, api.userAPI.deleteRecruit, complete);
	}

	// 职位详情
	recruitDetail(_data, complete) {
		return this._promise_post(_data, api.userAPI.recruitDetail, complete);
	}

  // 查看公司详情
   lookCompany(_data, complete) {
    return this._promise_post(_data, api.userAPI. lookCompany, complete);
  }

	// 个人简历详情
	personalDetail(_data, complete) {
		return this._promise_post(_data, api.userAPI.personalDetail, complete);
	}


	//公司账号-我的
	userInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.userInfo, complete);
	}

	// 编辑、发布职位
	editRecruit(_data, complete) {
		return this._promise_post(_data, api.userAPI.editRecruit, complete);
	}

	// 初始化职位
	 goEditRecruit(_data, complete) {
		return this._promise_post(_data, api.userAPI. goEditRecruit, complete);
	}
	
	// 编辑公司信息
	editCompany(_data, complete) {
		return this._promise_post(_data, api.userAPI.editCompany, complete);
	}

	//个人信息注册
	_registerUserInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.registerUserInfo, complete);
	}

	//上传文件
	uploadFile(_data, complete) {
		return this._uploadFile_(_data, api.userAPI.uploadFile, complete);
	}

	//上传头像
	uploadHeadpic(_data, complete) {
		return this._promise_post(_data, api.userAPI.uploadHeadpic, complete);
	}

	//我的钱包
	myPurse(_data, complete) {
		return this._promise_post(_data, api.userAPI.myPurse, complete);
	}
	//开通会员
	registerVip(_data, complete) {
		return this._promise_post(_data, api.userAPI.registerVip, complete);
	}

	//调起支付
	rechargePay(_data, complete) {
		return this._promise_post(_data, api.userAPI.rechargePay, complete);
	}
	
	//充值
	deposits(_data, complete) {
		return this._promise_post(_data, api.userAPI.deposits, complete);
	}
	//提现
	goWithdrawal(_data, complete) {
		return this._promise_post(_data, api.userAPI.goWithdrawal, complete);
	}

	//提现保存
	withdrawal(_data, complete) {
		return this._promise_post(_data, api.userAPI.withdrawal, complete);
	}

	//提现记录
	withdrawalRecord(_data, complete) {
		return this._promise_post(_data, api.userAPI.withdrawalRecord, complete);
	}

	//消息列表
	messageList(_data, complete) {
		return this._promise_post(_data, api.userAPI.messageList, complete);
	}

	//消息详情
	messageDetail(_data, complete) {
		return this._promise_post(_data, api.userAPI.messageDetail, complete);
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
	// 招人
	hiring(_data, complete) {
		return this._promise_post(_data, api.userAPI.hiring, complete);
	}
	// 预订列表
	bookingList(_data, complete) {
		return this._promise_post(_data, api.userAPI.bookingList, complete);
	}
	// 预订
	booking(_data, complete) {
		return this._promise_post(_data, api.userAPI.booking, complete);
	}
	//工种列表
	categoryList(_data, complete) {
		return this._promise_post(_data, api.userAPI.categoryList, complete);
	}

	//编辑个人资料
	editUserInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.editUserInfo, complete);
	}

  //获取证书列表
  getUserImages(_data, complete) {
    return this._promise_post(_data, api.userAPI.getUserImages, complete);
  }

  //编辑证书列表
  editImages(_data, complete) {
    return this._promise_post(_data, api.userAPI.editImages, complete);
  }


  //初始化个人资料
  initUserInfo(_data, complete) {
    return this._promise_post(_data, api.userAPI.initUserInfo, complete);
  }

	//获取公司信息
	getCompayInfo(_data, complete) {
		return this._promise_post(_data, api.userAPI.getCompayInfo, complete);
	}
  
  //初始化公司信息
  setCompanyInfo(_data, complete) {
    return this._promise_post(_data, api.userAPI.setCompanyInfo, complete);
  }
  
	//公司及第三方职位列表
	recruitList(_data, complete) {
		return this._promise_post(_data, api.userAPI.recruitList, complete);
	}
  //公司及第三方信息列表
  companyList(_data, complete) {
    return this._promise_post(_data, api.userAPI.companyList, complete);
  }
  //公司及第三方职位列表
  getRecruitList(_data, complete) {
    return this._promise_post(_data, api.userAPI.getRecruitList, complete);
  }
  //更多热门推荐
  recruitHot(_data, complete) {
    return this._promise_post(_data, api.userAPI.recruitHot, complete);
  }
  //更多待遇
  recruitBetter(_data, complete) {
    return this._promise_post(_data, api.userAPI.recruitBetter, complete);
  }
  //主页
  userVisit(_data, complete) {
    return this._promise_post(_data, api.userAPI.userVisit, complete);
  }

  //搜索
  searchInfp(_data, complete) {
    return this._promise_post(_data, api.userAPI.searchInfp, complete);
  }

  //获取省市区列表
  getAddress(_data, complete) {
    return this._promise_post(_data, api.userAPI.getAddress, complete);
  }

  
	// 轻提示
	_wxTost(msg) {
		wx.showToast({
			title: msg,
			icon: 'none',
			duration: 1000
		})
	}

  _showLoading(msg){
    wx.showToast({
		title: msg,
		icon: 'loading',
		duration: 400
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

  _timeStampForwardAate(timestamp) {            //时间戳转日期
    var date;
    if (timestamp == "" || "undefined" == typeof (timestamp)) {
      date = new Date().toLocaleDateString();
    } else {
      date = new Date(parseInt(timestamp) * 1000).toJSON().slice(0, 10);
    }
    return date;
  }
  /**
   * 在数组中查找关键词并retrun 回下标/变量 flag:对比的关键词，arry：要对比的数组，isN ：数组是否为一维数组，布尔类型 
   * ispro:为ture 时 返回对象{key:val}
   */
  returnIndex(flag, arry, isN, ispro){       
    for (var i in arry) {
      if (isN) {
        if (ispro) {
          if (arry[i].code == flag) {
            return arry[i].area_name
          }
        } else {
          if (arry[i].cat_id == flag) {
            return i
          }
        }
      } else {
        if (arry[i] == flag) {
          return i
        }
      }
    }
  }
  //***/

}

export default new ServerData();