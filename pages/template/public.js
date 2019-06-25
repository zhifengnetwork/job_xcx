const global={
   getStorageItem:function(key){
     var postion = wx.getStorageSync(key);
     if (postion == 0) {
       app.editTabBar();
     } else if (postion == 1) {
       app.editTabBar1();
     } else if (postion == 2) {
       app.editTabBar2();
     } else {
       app.editTabBar3();
     }
     console.log(postion)
   }

}