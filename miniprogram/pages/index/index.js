// index.js
// 获取应用实例
const app = getApp()
// 1. 请求数据
// 2. 保存数据
// 3. 页面显示数据


Page({
  data:{
    movielist:[],
    pageno:1,
    cid:1,
    cityname:'未选择'
  },
  tapToCitylist(){
    wx.navigateTo({
      url: '/pages/citylist/citylist',
    })
  },
  // 在点击分类时,执行tapnav
  tapnav(event){
    let id=event.target.dataset.id;
    // console.log(id);
    // 判断如果是当前页cid==id,不请求数据了
    if(id==this.data.cid){
      return;
    }
    this.setData({
      cid:id,
      // 页面类别cid在切换时将pageno重置
      pageno:1
    })
    wx.getStorage({
      key:id+"", //要求key只能是字符串
      // 如果缓存中有数据,就加载数据
      success:(result)=>{
        // console.log(result);
        this.setData({
          movielist:result.data
        })
      },
      fail:(err)=>{  //如果缓存中没有数据,发请求
        // 发送请求
        this.loadData(id,0).then(movies=>{
          this.setData({
            movielist:movies
          })
          // 缓存: 把当前第一页数据缓存
          wx.setStorage({
            key:id+"",
            data:movies
          })
        })
      }
    })
    
  },
  loadData(cid,offset){
    wx.showLoading({
      title: '加载中...',
    })
    console.log(cid,offset);
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'https://api.tedu.cn/index.php',
        method:'GET',
        data:{
          cid:cid,
          offset:0
        },
        success:(result)=>{
          console.log(result);
          // 保存数据
          resolve(result.data)
          // 结束加载
          wx.hideLoading()
        }
      })
    })
  },
  loadLocation(){
    let qqmapsdk=getApp().globalData.qqmapsdk;
    // 逆地址解析
    qqmapsdk.reverseGeocoder({
      success:(res)=>{
        console.log(res)
        let city=res.result.address_component.city;
        this.setData({
          // 将获取到的城市名赋给cityname
          cityname:city
        })
        // 把cityname更新到globalData
        getApp().globalData.CITYNAME=city;
      }
    })
  },
  // 在页加载时,请求数据
  onLoad(){
    // 使用位置服务,获取当前位置
    // wx.getLocation({
    //   altitude: 'altitude',
    //   isHighAccuracy:true,
    //   type:'gcj02',
    //   success:(res)=>{
    //     console.log(res);
    //   }
    // })
    this.loadLocation();

    this.loadData(1,0).then(movies=>{
      this.setData({
        // 将获取到的movies列表数据赋到movielist
        movielist:movies
      })
    })
  },
  onShow(){
    this.setData({
      // 获取城市名
      cityname:getApp().globalData.CITYNAME
    })
  },
  // 触底时触发
  onReachBottom(){
    // console.log('触底触发');
    // 每次触发页数加1
    this.data.pageno++;
    // 获取下一页数据
    let offset=(this.data.pageno-1)*20;
    // console.log(offset);
    // 请求数据
    let cid=this.data.cid;
    this.loadData(cid,offset).then(movies=>{
      this.setData({
        movielist:[...this.data.movielist,...movies]
      })
    })
  },
  // 下拉刷新
  onPullDownRefresh(){
    console.log('触发下拉刷新')
    // 请求数据
    this.loadData(this.data.cid,0).then(movies=>{
      this.setData({
        movielist:movies
      })
      // 再次存入缓存
      wx.setStorage({
        key:this.data.cid+"",
        data:movies
      })
      // 数据加载完毕,停止下拉刷新
      wx.stopPullDownRefresh()
    })
    
  }
})