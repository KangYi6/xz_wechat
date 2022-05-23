// pages/theatre/theatre.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        theatreList:[],
        cityname:'未选择'
    },
    tapSearch(){ //点击搜索按钮显示当前位置的影院列表
        let qqmapsdk=getApp().globalData.qqmapsdk;
        qqmapsdk.search({
            keyword:'影院',
            region:this.data.cityname,
            page_size:20,
            success:(res)=>{
                console.log(res);
                res.data.forEach(item=>{
                    item._distance_=(item._distance/1000).toFixed(2)
                })
                this.setData({
                    theatreList:res.data
                })
            }
        })
    },
    tapItem(event){
        let index=event.currentTarget.dataset.index;
        let t=this.data.theatreList[index];
        wx.openLocation({
          latitude: t.location.lat,
          longitude: t.location.lng,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 加载当前位置的周边影院
        let qqmapsdk=getApp().globalData.qqmapsdk;
        qqmapsdk.search({
            keyword:'影院',
            page_size:20,
            success:(res)=>{
                console.log(res);
                res.data.forEach(item=>{//将m转换成km,不能在wxml中写js方法
                    item._distance_=(item._distance/1000).toFixed(2)
                })
                this.setData({
                    theatreList:res.data
                })
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
        // 定位当前位置名称
        let name=getApp().globalData.CITYNAME;
        this.setData({
            cityname:name
        })
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