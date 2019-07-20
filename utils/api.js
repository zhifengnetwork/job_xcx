const proxys = 'https://zhaopin.zhifengwangluo.cn/api';
// const apiProxys ='/api/'
const userAPI = {
  // login: `${proxys}/user/register_code`, //登录
  register: `${proxys}/user/register`, //登录
  verifyCode: `${proxys}/user/register_code`, //登录
  uCollect: `${proxys}/collection/collection_list`, // 收藏列表
}


module.exports = {
  proxys: proxys,
  userAPI: userAPI
};