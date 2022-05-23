// pages/movie/movie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie:{},
        isOpen:false,
        comments:[]
    },
    tapDesc(){
        this.setData({
            isOpen:!this.data.isOpen
        })
    },
    // 点击剧照列表预览大图
    tapPreviewImage(event){
        let imageUrls=this.data.movie.thumb;
        let newUrls=[];
        let index=event.currentTarget.dataset.index;
        imageUrls.forEach(item=>{
            newUrls.push(item.substr(0,item.lastIndexOf('@')))
        })
        wx.previewImage({
          urls: newUrls,
          current:newUrls[index]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        let id=options.id;
        // 请求电影详情数据
        wx.request({
          url: 'https://api.tedu.cn/detail.php',
          method:'GET',
          data:{
              id:id
          },
          success:(res)=>{
            console.log(res);
            this.setData({
                movie:res.data
            })
          }
        });
        // 访问数据库,加载评论信息
        let db=wx.cloud.database();
        db.collection('comments').where({
            'movieid':id
        })
        .skip(0).limit(5)//显示前五条评论
        .get().then(res=>{
            console.log(res);
            this.setData({
                comments:res.data
            })
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