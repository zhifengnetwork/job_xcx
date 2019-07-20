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
}


module.exports = {
  proxys: proxys,
  userAPI: userAPI
};