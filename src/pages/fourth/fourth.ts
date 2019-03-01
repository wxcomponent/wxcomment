// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    avatar: '',
    nickName: '',
    current: "history",

    hisInfos: [],
    //topic: [],
    //comment: [],
    collect: [],
    inviteMember: 0,
    campMember: 0,


    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    //分享二维码------------

    //关闭强制分享
    showShare: false,
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    let store:any = this.store
    if (this.data.avatar.length === 0 && this.store.userInfo){
      this.setDataSmart({
        avatar: this.store.userInfo.avatarUrl,
        nickName: this.store.userInfo.nickName,
        inviteMember: store.inviteMember,
        campMember: store.campMember
      })
    }
    let that:any = this
    that.getHistory()
  }

  handleChange (e:any) {
    let that:any = this
    this.setDataSmart({
        current: e.detail.key
    });
    console.log("switch to tag: ",this.data.current)
    let current = this.data.current
    if (current == "history"){
      that.getHistory()
    } else if (current == "topic"){
      that.getArticle()
    } else if (current == "collect"){
      that.getCollect()
    }
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


  async getHistory(){
    console.log(this.store.openid)
    let store:any = this.store;
    store.hisInfos = [];
    if(store.hisInfos.length==0){
      store.hisInfos.unshift({
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
    // 请求后端数据
    // let that:any = this
    // await wx.request({
    //   url:"https://wechatx.offerqueens.cn/user/read",
    //   // url:"http://127.0.0.1:7979/user/read",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       // store.hisInfos = res.data.readList
    //       let newArticleInfos = that.changeArticleSub(res.data.readList)
    //       store.hisInfos = newArticleInfos
    //     } else {
    //       wx.showToast({
    //         title: '获取阅读历史失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '获取阅读历史失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
  }

  async getArticle(){
    let store:any = this.store
    store.myArticles.unshift({
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
    // 后端获取发表文章
    // let that:any = this
    // await wx.request({
    //   url:"http://127.0.0.1:7979/user/article",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       // store.myArticles = res.data.articleList
    //       let newArticleInfos = that.changeArticleSub(res.data.articleList)
    //       store.myArticles = newArticleInfos
    //     } else {
    //       wx.showToast({
    //         title: '获取我的文章失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '获取我的文章失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
  }

  async getCollect(){
    let store:any = this.store
    store.collectInfos.unshift({
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
    // let that:any = this
    // await wx.request({
    //   url:"http://127.0.0.1:7979/user/collect",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       // store.collectInfos = res.data.collectList
    //       let newArticleInfos = that.changeArticleSub(res.data.collectList)
    //       store.collectInfos = newArticleInfos
    //     } else {
    //       wx.showToast({
    //         title: '获取我的收藏失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     console.log("status:",res.data.status)
    //     wx.showToast({
    //       title: '获取我的收藏失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
  }



 

}
