// pages/citylist/citylist.js
const map=require('../../libs/map');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        citymap:{},
        currentLetter:'A',
        cityname:'定位中',
        locOK:false
    },
    // 点击定位城市,返回上一页
    tapCurrentCity(){
        if(this.data.locOK){
            getApp().globalData.CITYNAME=this.data.cityname;
            wx.navigateBack()
        }else{
            // 定位失败,重新定位
            this.loadLocation();
        }
        
    },
    chooseCity(event){
        let city=event.currentTarget.dataset.city;
        // console.log(city);
        getApp().globalData.CITYNAME=city;
        wx.navigateBack()
    },
    tapLetter(event){
        console.log(event)
        let letter=event.currentTarget.dataset.letter;
        // console.log(letter)
        this.setData({
            currentLetter:letter
        })
    },
    // 通过腾讯位置服务,获取当前位置
    loadLocation(){
        this.setData({
            cityname:'定位中'
        })
        let qqmapsdk=getApp().globalData.qqmapsdk;
        // 逆地址解析
        qqmapsdk.reverseGeocoder({
          success:(res)=>{
            console.log(res)
            this.setData({
              // 将获取到的城市名赋给cityname
              cityname:res.result.address_component.city,
              locOK:true
            })
          },
        //   逆地址解析失败时
          fail:(err)=>{
            // console.warn(err);
            this.setData({
                cityname:'定位失败,点击重试',
                locOK:false
            })
            // 弹出窗口,重新赋予权限
            wx.showModal({
              title:'提示',
              content:'重新获取位置授权,是否跳转',
              success:(res)=>{
                console.log(res);
                if(res.confirm){
                    wx.openSetting({
                      success:(settingRes)=>{
                        // console.log(settingRes);
                        if(settingRes.authSetting['scope.address.userLocation']){
                            this.loadLocation();
                        }
                      }
                    })
                }
              }
            })
          }
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(map);
        this.setData({
            citymap:map
        })
        this.loadLocation();
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