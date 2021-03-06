const proxys = 'https://zhaopin.zhifengwangluo.cn/api';
// const apiProxys ='/api/'
const userAPI = {
  login: `${proxys}/user/login`,                      //登陆
  wxLogin: `${proxys}/login/index`,                   //微信登陆
  bindWeixin: `${proxys}/login/bind_weixin`,          //微信绑定

  register: `${proxys}/user/register`,                //注册
  verifyCode: `${proxys}/user/register_code`,         //注册验证码
  fsCode: `${proxys}/user/send_code`,                 //发送验证码

  registerUserInfo: `${proxys}/user/next`,            //个人信息注册、公司信息注册

  forgetPawd: `${proxys}/user/zhaohuipwd`,            //修改密码

  reqIndex:`${proxys}/user/visit`,                    //首页

  recruitDetail: `${proxys}/company/recruit_detail`,  // 公司发布的职位详情
  lookCompany: `${proxys}/company/look_company`,      // 查看公司详情
  
  personalDetail: `${proxys}/person/detail`,          // 个人简历详情
  editRecruit: `${proxys}/company/edit_recruit`,      // 编辑、发布职位
  goEditRecruit: `${proxys}/company/go_edit_recruit`, // 初始化职位
  editCompany: `${proxys}/company/edit`,              // 编辑公司信息
  setCompanyInfo: `${proxys}/company/info`,           // 初始化公司信息

  searchInfp: `${proxys}/user/search`,                //搜索
  uploadFile: `${proxys}/user/upload_file`,           //上传文件

  helpExp: `${proxys}/index/help`,                    //帮助与反馈
  privacySetting: `${proxys}/person/secret_list`,     //隐私设置
  changPSetting: `${proxys}/person/secret`,           //隐私设置操作
  editMobile: `${proxys}/user/change_mobile`,         //修改手机
  password: `${proxys}/user/reset_pwd`,               //修改密码

  userInfo: `${proxys}/user/index`,                   //用户中心
  uploadHeadpic: `${proxys}/user/upload_headpic`,     // 保存头像
  initUserInfo: `${proxys}/person/info`,              // 初始化个人资料
  editUserInfo: `${proxys}/person/edit`,              // 编辑个人资料
  getUserImages: `${proxys}/user/get_images`,         // 我的证书
  editImages: `${proxys}/user/edit_images`,           // 编辑证书
  
  categoryList: `${proxys}/person/category_list`,     // 工种列表

  myPurse: `${proxys}/person/my_wallet`,              // 我的钱包
  registerVip: `${proxys}/person/buy_vip`,             // 开通会员
  rechargePay: `${proxys}/pay/recharge_pay`,           // 调起支付
  deposits: `${proxys}/person/recharge`,               // 充值
  
  goWithdrawal: `${proxys}/person/go_withdrawal`,     // 提现
  withdrawal: `${proxys}/person/withdrawal`,          // 提现保存
  withdrawalRecord: `${proxys}/person/withdrawal_list`,    // 提现明细

  messageList: `${proxys}/message/message_list`,      // 消息列表
  messageDetail: `${proxys}/message/message_detail`,  // 消息详情

  collection: `${proxys}/collection/collection`,      // 收藏/取消收藏
  Ucollect: `${proxys}/collection/collection_list`,   // 我的收藏列表
  
  getCompayInfo: `${proxys}/company/info`,            // 编辑公司信息
  recruit: `${proxys}/company/recruit`,               // 招工信息
  deleteRecruit: `${proxys}/company/del_recruit`,     // 删除招工信息
  
  recruitList: `${proxys}/company/recruit_list`,      // 公司及第三方职位列表
  companyList: `${proxys}/company/company_list`,      // 公司及第三方信息列表
  getRecruitList: `${proxys}/company/get_recruit_list`,      // 公司及第三方职位列表

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