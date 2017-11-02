// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  catList: function (e) {
    app.catList(e);
  },
  goHome: function () {
    app.goHome();
  },
  menu: function () {
    var that = this;
    that.setData({
      menu: (!that.data.menu)
    })
  },
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var catid = options.catid;
    var id = options.id;
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
    //评论列表
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=comment',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      data: { 'catid': catid, 'id': id },
      success: function (res) {
        console.log(res.data)
        that.setData({
          total:res.data.comment.toal,
          commentList: res.data.data
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