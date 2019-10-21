import ServerData from '../../../utils/serverData.js';
Component({
    data:{
        password:'',
        paswAarry:[],
        isShow: false
    },
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持  
    },  
    properties:{
      addressMenuIsShow: {
        type: Boolean,
        value: false
      }
    },
    methods:{
      showPopup(){
        this.setData({
          isShow: true,
          password:'',
          paswAarry:[]
        })
      },
      hidePassword(){
          this.setData({
            isShow: false
          })
      },
      getPawdVal(e){
        // console.log(e)
        var paswAarry=[]
        var arry =e.detail.value.split('')
        for(var i in arry){
            paswAarry.push('*')
        }
        this.setData({
          paswAarry:paswAarry,
          password:e.detail.value
        })

        var json={
          // paswAarry:paswAarry,
          password:e.detail.value
        }
        this.triggerEvent('getPasswordEvent', json)
      },
      // cityCancel: function (e) {
      //   this.startAddressAnimation(false)
      //   this.showPopup()
      //   var json={
      //     areaInfo:'',
      //     pCode: '',
      //     cCode: '',
      //     aCode: '',
      //     showTST: true,
      //     isShow:true
      //   }
        
      }
})