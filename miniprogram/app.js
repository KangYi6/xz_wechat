// app.js
App({
  onLaunch() {
    // 腾讯位置服务SDK
    let QQMapWX=require('libs/qqmap-wx-jssdk');
    let qqmapsdk=new QQMapWX({
      key:'5CKBZ-WBYWF-DQVJE-N27RB-DZAWT-L5BOU'
    });
    this.globalData.qqmapsdk=qqmapsdk;
    // 云服务初始化
    wx.cloud.init({
      env:'cloud1-2gwdv2t4c0ed2ebd' //环境id
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    CITYNAME:"未选择",
    qqmapsdk:null
  }
})
