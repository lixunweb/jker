//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menu:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    q:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  zhuanti:function(){
    wx.navigateTo({
      url: '../zhunti/zhunti',
    })
  },
  //事件处理函数
  qInput: function (e) {
    this.setData({
      q: e.detail.value
    })
  },
  qtbn:function(){
    wx.redirectTo({
      url: '../search/search?q='+this.data.q,
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  catList:function(e){
    app.catList(e);   
  },
  detail: function (e) {
    app.detail(e);
  },
  detailZt: function (e) {
    app.detailZt(e);
  },
  goHome: function () {
    app.goHome();
  },
  menu:function(){
    var that=this;
      that.setData({
        menu: (!that.data.menu)
      })
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=category',
      header: {'content-type': 'application/json'},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        that.setData({
          navArry: res.data.data
        });
      }    
    })
    /*banner */
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=position',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      data: {'posid':1},
      success: function (res) {
        console.log(res.data)
        that.setData({
          banArry: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=index',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      data: { 'posid': 1 },
      success: function (res) {
        console.log(res.data)
        that.setData({
          index: res.data.data
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
