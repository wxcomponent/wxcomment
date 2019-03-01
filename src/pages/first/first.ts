// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    imageUrls: [
      {
        img:"http://file.xdf.cn/uploads/180730/1217_20180730141719.jpg",        
        id: 'offer'
      },
      {
        img: "http://pic1.win4000.com/wallpaper/2018-01-19/5a61d0d3ce270.jpg",
        id: 'every'
      }      
    ],
    reInfos: [],
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo'),
  }

  

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    // wxp.showTabBar({})
    
    console.log('当前 Store: %o', this.store)
    console.log('options',options)
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
    } else {
      console.log("no scene");
    }


    // this.getRecommendList()
    //仅提供一个模版 后面要删掉的
    let store:any = this.store;
    store.recomInfos = [];
    if(store.recomInfos.length==0){
      store.recomInfos.unshift({
        id: 0,
        nickName: '用户A',
        avatarUrl: "http://pic35.photophoto.cn/20150517/0020033044813873_b.JPG",
        time: "15分钟前",
        title: "文章系统的标题",
        sub: "20字的简要内容...",
        agree: 42,
        content: "500字的主要内容",
        readTime: 350,
        user_agree: true,
        user_collect: true,
        commentList: [{
          id: '0',
          avatarUrl: "http://pic35.photophoto.cn/20150517/0020033044813873_b.JPG",
          nickName: '用户AA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        },{
          id: '1',
          avatarUrl: "http://img.zcool.cn/community/012eb85779d3c90000012e7ec96d6f.jpg@1280w_1l_2o_100sh.jpg",
          nickName: '用户AB',
          time: '10分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      },{
        id: 1,
        nickName: '用户B',
        avatarUrl: "http://img.zcool.cn/community/012eb85779d3c90000012e7ec96d6f.jpg@1280w_1l_2o_100sh.jpg",
        time: "1小时前",
        title: "文章系统的题目",
        sub: "20字的简要内容",
        content: "500字的主要内容",
        agree: 101,
        readTime: 652,
        user_agree: true,
        user_collect: false,
        commentList: [{
          id: '0',
          avatarUrl: "http://pic35.photophoto.cn/20150517/0020033044813873_b.JPG",
          nickName: '用户BA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      })
    }
  }



  toReplays(){
    wxp.switchTab({
      url:"/pages/replays/replays"
    })
  }

  clickDetail(e:any){
    let commentList = e.currentTarget.dataset.info.commentList
    let commentListCode = []
    for (let i =0;i<commentList.length;i++){
      let item = commentList[i]
      let codeItem = {
        articleId: item.articleId,
        avatarUrl: encodeURIComponent(item.avatarUrl),
        content: encodeURIComponent(item.content),
        time: item.time,
        userId: item.userId,
        _id: item._id
      }
      commentListCode.push(codeItem)
    }
    let info = {
      ...e.currentTarget.dataset.info,
      content: encodeURIComponent(e.currentTarget.dataset.info.content),
      sub: encodeURIComponent(e.currentTarget.dataset.info.sub),
      avatarUrl: encodeURIComponent(e.currentTarget.dataset.info.avatarUrl),
      commentList: commentListCode
    }
    console.log(info)
    wx.navigateTo({
      url: '../repdetail/repdetail?info=' + JSON.stringify(info),
      success: function(res){
      },
      fail: function(res){
        wx.showModal({
          title: '显示详情',
          content: '页面跳转失败，请刷新页面后重试'
        })
      }
    })
  }
  


  onShow(){
    // this.getRecommendList()
  }

  
  onShareAppMessage(res:any) {
    return {
      title: '微信小程序评论',
      imageUrl: 'http://file.xdf.cn/uploads/180730/1217_20180730141719.jpg',   
    }
  }
  async getRecommendList(){
    //页面加载的时候http.get推荐阅读内容
    let store:any = this.store
    let that:any = this
    if (store.openid && store.openid.length > 0){
      wx.request({
      url:"http://127.0.0.1:7979/article/recom",
      data: {
        openid: store.openid
      },
      method: 'POST',
      success: function(res){
        console.log(res.statusCode)
        console.log(res.data)
        console.log(store.openid,'openid')
        if ( res.statusCode === 200 && res.data.recomInfos ){
          let newArticleInfos = that.changeArticleSub(res.data.recomInfos)
          store.recomInfos = newArticleInfos      
        } else {
          wx.showToast({
            title: '获取推荐列表失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取推荐列表失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
    }
  }

  changeArticleSub(articles:any){
    let newArticles = []
    for (let i=0;i<articles.length;i++){
      let article = articles[i]
      article = {
        ...article,
        sub: article.sub.replace(/↵/g,'  ')
      }
      newArticles.push(article)
    }
    return newArticles
  }


}
