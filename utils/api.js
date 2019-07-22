const proxys = 'https://zhaopin.zhifengwangluo.cn/api';
// const apiProxys ='/api/'
const userAPI = {
  login: `${proxys}/user/login`,  //登录
  register: `${proxys}/user/register`,  //注册
  verifyCode: `${proxys}/user/register_code`,  //注册验证码
  fsCode: `${proxys}/user/send_code`,  //发送验证码
  forgetPawd: `${proxys}/user/zhaohuipwd`,  //忘记密码

  reqIndex:`${proxys}/user/visit`,  //首页

  recruitDetail: `${proxys}/company/recruit_detail`,  // 公司职位详情

  registerUserInfo: `${proxys}/user/next`,  //个人信息注册
  uploadFile: `${proxys}/user/upload_file`,  //上传文件
  helpExp: `${proxys}/index/help`,  //帮助与反馈
  
  privacySetting: `${proxys}/person/secret_list`,  //隐私设置
  changPSetting: `${proxys}/person/secret`,  //隐私设置操作

  editMobile: `${proxys}/user/change_mobile`,  //修改手机
  password: `${proxys}/user/reset_pwd`,  //修改密码

  collection: `${proxys}/collection/collection`,  // 收藏/取消收藏
  Ucollect: `${proxys}/collection/collection_list`,  // 我的收藏列表
}

module.exports = {
  proxys: proxys,
  userAPI: userAPI,
};