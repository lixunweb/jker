// pages/show/show.js
var getComment=function(that) {
  //评论列表
  wx.request({
    url: 'https://www.jker.cn/index.php?m=wx&c=index&a=comment',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    data: { 'catid': that.data.catid, 'id': that.data.id, 'limit': 1 },
    success: function (res) {
      console.log(res.data)
      that.setData({
        commentList: res.data.data
      });
    }
  })
}
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:0
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
  catList: function (e) {
    app.catList(e);
  },
  // 相关详情
  detail: function (e) {
    wx.redirectTo({
      url: '../show/show?catid=' + e.currentTarget.dataset.catid + '&id=' + e.currentTarget.dataset.id,
    })
  },
  moreComment: function (e) {
    wx.redirectTo({
      url: '../comment/comment?catid=' + e.currentTarget.dataset.catid + '&id=' + e.currentTarget.dataset.id,
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
  
  //pinglun
  bindFormSubmit:function(e){
    console.log(e.detail.value.textarea)
    var that = this;
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=addcomment',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      data: { 'catid': that.data.catid, 'id': that.data.id, 'content': e.detail.value.textarea },
      success: function (res) {
        console.log(res.data.msg)
        if(res.data.code==200){
          e.detail.value.textarea='';
          console.log(res.data)
          wx.request({
            url: 'https://www.jker.cn/index.php?m=wx&c=index&a=comment',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            data: { 'catid': that.data.catid, 'id': that.data.id, 'limit': 1 },
            success: function (res) {
              console.log(res.data)
              that.setData({
                commentList: res.data.data
              });
            }
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
        else{
          wx.showModal({
            title: res.data.msg
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var WxParse = require('../../wxParse/wxParse.js');
    var that=this;
    var catid = options.catid;
    var id=options.id;
    that.setData({
      catid: catid,
      id:id
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=info',
      header: { 'content-type': 'application/json' },
      data: { 'catid': catid, 'id': id },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          con: res.data.data,
          video:res.data.data.video_url,
          danmuList:res.data.data.video_time,
          content: WxParse.wxParse('article', 'html', res.data.data.content, that, 5)
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
      data:{'id':12},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          showad: res.data.data.setting.imageurl
        });
      }
    })
    wx.request({
      url: 'https://www.jker.cn/index.php?m=wx&c=index&a=relation',
      header: {'content-type': 'application/json'},
      data: {'catid':catid,'id':id},
      success:function(res){
        console.log(res.data)
        that.setData({
          listArry:res.data.data
        })
      }
    })
    getComment(this);
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