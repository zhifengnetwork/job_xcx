const proxys = 'https://zhaopin.zhifengwangluo.cn/api';
// const apiProxys ='/api/'
const userAPI = {
  login: `${proxys}/user/login`,                //注册
  register: `${proxys}/user/register`,                //注册
  verifyCode: `${proxys}/user/register_code`,         //注册验证码
  fsCode: `${proxys}/user/send_code`,                 //发送验证码

  registerUserInfo: `${proxys}/user/next`,            //个人信息注册、公司信息注册

  forgetPawd: `${proxys}/user/zhaohuipwd`,            //修改密码

  reqIndex:`${proxys}/user/visit`,                    //首页

  recruitDetail: `${proxys}/company/recruit_detail`,  // 公司发布的职位详情
  personalDetail: `${proxys}/person/detail`,          // 个人简历详情
  editRecruit: `${proxys}/company/edit_recruit`,      // 编辑、发布职位
  editCompany: `${proxys}/company/edit`,              // 编辑公司信息

  uploadFile: `${proxys}/user/upload_file`,           //上传文件

  helpExp: `${proxys}/index/help`,                    //帮助与反馈
  privacySetting: `${proxys}/person/secret_list`,     //隐私设置
  changPSetting: `${proxys}/person/secret`,           //隐私设置操作
  editMobile: `${proxys}/user/change_mobile`,         //修改手机
  password: `${proxys}/user/reset_pwd`,               //修改密码

  userInfo: `${proxys}/user/index`,                   //用户中心
  uploadHeadpic: `${proxys}/user/upload_headpic`,     // 保存头像
  editUserInfo: `${proxys}/person/edit`,              // 编辑个人资料
  categoryList: `${proxys}/person/category_list`,     // 工种列表

  myPurse: `${proxys}/person/my_wallet`,              // 我的钱包
  registerVip: `${proxys}/user/register`,             // 开通会员
  goWithdrawal: `${proxys}/person/go_withdrawal`,     // 提现
  withdrawal: `${proxys}/person/withdrawal`,          // 提现保存


  collection: `${proxys}/collection/collection`,      // 收藏/取消收藏
  Ucollect: `${proxys}/collection/collection_list`,   // 我的收藏列表
  
  getCompayInfo: `${proxys}/company/info`,            // 编辑公司信息
  recruit: `${proxys}/company/recruit`,               // 招工信息
  recruitList: `${proxys}/company/recruit_list`,      // 公司及第三方职位列表
  recruitHot: `${proxys}/company/recruit_hot`,        // 热门推荐
  recruitBetter: `${proxys}/company/recruit_better`,  // 待遇更好
  userVisit: `${proxys}/user/user_visit`,             // 主页，公司/第三方/个人
  hiring: `${proxys}/person/person_list`,             // 公司招人信息列表
  booking: `${proxys}/company/reserve`,               // 公司点击预订
  bookingList: `${proxys}/company/reserve_list`,      // 公司预订列表
  
  getAddress: `${proxys}/person/get_address`,             // 获取省/市/区列表
}

module.exports = {
  proxys: proxys,
  userAPI: userAPI,
};