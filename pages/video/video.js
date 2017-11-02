// pages/video/video.js
var url = "https://www.jker.cn/index.php?m=wx&c=index&a=lists";
var page = 1;
var page_size = 10;

// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      num: page_size,
      catid: that.data.catid
    },
    complete: function (res) {
      console.log(res.data)
      if (res.data.data.length > 0) {
        var listArry = that.data.listArry.concat(res.data.data);
        that.setData({
          listArry: listArry
        })
        page++;
      }
      else {
        page = 1;
        that.setData({
          hidden2: false,
          request: false
        });
      }
      that.setData({
        hidden: true
      });
    }

  });
}
var app=getApp();
Page({
  goHome: function () {
    app.goHome();
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
  detail: function (e) {
    console.log(this.data.catid)
    wx.redirectTo({
      url: '../show/show?catid=' + this.data.catid + '&id=' + e.currentTarget.dataset.id,
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
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    hidden2: true,
    listArry: [],
    scrollTop: 0,
    catid: '',
    request: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    var that = this;
    var catid = options.catid;
    that.setData({
      catid: catid
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=position',
      header: { 'content-type': 'application/json' },
      data: { 'posid': catid },
      success: function (res) {
        console.log(res.data)
        that.setData({
          banArry: res.data.data
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
    var that = this;
    GetList(that);
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
    var that = this;
    if (that.data.request) {
      GetList(that);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})