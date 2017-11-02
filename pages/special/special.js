// pages/special/special.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //search
  qInput: function (e) {
    this.setData({
      q: e.detail.value
    })
  },
  qtbn: function () {
    wx.redirectTo({
      url: '../search/search?q=' + this.data.q,
    })
  },
  data: {
  
  },
  menu: function () {
    var that = this;
    that.setData({
      menu: (!that.data.menu)
    })
  },
  catList: function (e) {
    app.catList(e);
  },
  goHome: function () {
    app.goHome();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var catid = options.catid;
    var id = options.id;
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=info',
      header: { 'content-type': 'application/json' },
      data: { 'catid': catid, 'id': id },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          pic: res.data.data.pictureurls,
        })
      }
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=category',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          navArry: res.data.data
        });
      }
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=banner',
      header: { 'content-type': 'application/json' },
      data: { 'id': 12 },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          showad: res.data.data.setting.imageurl
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})