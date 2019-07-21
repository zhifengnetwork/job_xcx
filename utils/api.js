const proxys = 'https://zhaopin.zhifengwangluo.cn/api';
// const apiProxys ='/api/'
const userAPI = {
  login: `${proxys}/user/login`,       //登录
  register: `${proxys}/user/register`,            //注册
  verifyCode: `${proxys}/user/register_code`,     //注册验证码
  fsCode: `${proxys}/user/send_code`,     //注册验证码
  registerUserInfo: `${proxys}/user/next`,     //个人信息注册
  forgetPawd: `${proxys}/user/zhaohuipwd`,     //个人信息注册
  uploadFile: `${proxys}/user/upload_file`,     //上传文件
  collection: `${proxys}/collection/collection`,     // 收藏/取消收藏
  theDetails: `${proxys}/company/recruit_detail`,     // 公司职位详情
  Ucollect: `${proxys}/collection/collection_list`,  // 我的收藏列表
}

const indexAPI = {
  reqIndex:`${proxys}/user/visit`,
}


module.exports = {
  proxys: proxys,
  userAPI: userAPI,
  indexAPI:indexAPI
};