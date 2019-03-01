// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    value: '',
    articleInfos: [],
    orderInfo: "按时间顺序排序",
    visible: false,
    articleType: 'time',
    actions: [
      {
          name: '按时间顺序排序',
      },
      {
          name: '按阅读数量排序',
      },
      {
          name: '按评论数量排序'
      },
  ],
    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    //分享二维码------------


    windowHeight: 400,
    windowWidth: 300,
    modalHidden:true,
  }

  async onLoad(options: any) {
    console.log(this.store)
    let store:any = this.store
    let that:any = this
    store.articleType = this.data.articleType
      // 后台请求数据  
      // wx.request({
      //   url: "http://127.0.0.1:7979/article/all",
      //   data: {
      //     openid: store.openid,
      //     articleType: store.articleType
      //   },
      //   method: 'POST',
      //   success:function(ress:any){
      //     console.log(ress.statusCode)
      //     if (ress.statusCode === 200){
      //         console.log(ress.data.articleInfos)
      //         let newArticleInfos = that.changeArticleSub(ress.data.articleInfos)
      //         store.articleInfos = newArticleInfos
      //         that.setArticle(store.articleInfos)
      //     } else {
      //       wx.showToast({
      //         title: '获取文章失败，请检查网络',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     } 
      //   },
      //   fail:function(res){
      //     wx.showToast({
      //       title: '获取文章失败，请检查网络后重新启动小程序',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //   }
      // })
    store.articleInfos = [];
    if(store.articleInfos.length==0){
      store.articleInfos.unshift({
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
      that.setArticle(store.articleInfos)
    }
  }
  async getArticle(type:String){
    let store:any = this.store;
    
    store.articleType = type
    // 后端更换
    // let that = this;
    // wx.request({
    //   url: "http://127.0.0.1:7979/article/all",
      // data: {
      //   openid: store.openid,
      //   articleType: store.articleType
      // },
      // method: 'POST',
      // success:function(ress:any){
      //   console.log(ress.statusCode)
      //   if (ress.statusCode === 200){
      //       if (ress.data.articleInfos){
      //         console.log(ress.data.articleInfos)
      //         // store.articleInfos = ress.data.articleInfos
      //         // that.setArticle(store.articleInfos)
      //         let newArticleInfos = that.changeArticleSub(ress.data.articleInfos)
      //         store.articleInfos = newArticleInfos
      //         that.setArticle(store.articleInfos)
      //         wx.showToast({
      //           title: '更新列表成功',
      //           icon: 'none',
      //           duration: 1000
    //           })
    //         }         
    //     } else {
    //       wx.showToast({
    //         title: '更新列表失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     } 
    //     // console.log('微信 userInfo %o', res.userInfo)
    //   },
    //   fail:function(res){
    //     wx.showToast({
    //       title: '更新列表失败，请检查网络后重新启动小程序',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })  
  }
  async setArticle(articles: Array<JSON>){
    await this.setDataSmart({
      articleInfos: articles
    }) 
  }
  async onShow(){
    let store:any = this.store
    // let that:any = this
    if (store.articleType){
      // 后台数据返回
      // wx.request({
      //   url: "http://127.0.0.1:7979/article/all",
      //   data: {
      //     openid: store.openid,
      //     articleType: store.articleType
      //   },
      //   method: 'POST',
      //   success:function(ress:any){
      //     console.log(ress.statusCode)
      //     if (ress.statusCode === 200){
      //         if (ress.data.articleInfos){
      //           console.log(ress.data.articleInfos)
      //           let newArticleInfos = that.changeArticleSub(ress.data.articleInfos)
      //           store.articleInfos = newArticleInfos
      //           that.setArticle(store.articleInfos)
      //         }         
      //     } else {
      //       wx.showToast({
      //         title: '更新列表失败，请检查网络',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     } 
      //     // console.log('微信 userInfo %o', res.userInfo)
      //   },
      //   fail:function(res){
      //     wx.showToast({
      //       title: '更新列表失败，请检查网络后重新启动小程序',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //   }
      // })
    } else {
      // 后台数据请求
      // wx.request({
      //   url: "http://127.0.0.1:7979/article/all",
      //   data: {
      //     openid: store.openid,
      //     articleType: 'time'
      //   },
      //   method: 'POST',
      //   success:function(ress:any){
      //     console.log(ress.statusCode)
      //     if (ress.statusCode === 200){
      //         if (ress.data.articleInfos){
      //           console.log(ress.data.articleInfos)
      //           let newArticleInfos = that.changeArticleSub(ress.data.articleInfos)
      //           store.articleInfos = newArticleInfos
      //           that.setArticle(store.articleInfos)
      //         }         
      //     } else {
      //       wx.showToast({
      //         title: '更新列表失败，请检查网络',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     } 
      //     // console.log('微信 userInfo %o', res.userInfo)
      //   },
      //   fail:function(res){
      //     wx.showToast({
      //       title: '更新列表失败，请检查网络后重新启动小程序',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //   }
      // })
    }
    await this.setDataSmart({
      articleInfos: store.articleInfos
    })
  }

  toRepnew(){
    // this.app.$url.repnew.go();
    this.setDataSmart({
      modalHidden: false
    })
  }
  handleOpen() {
    this.setDataSmart({
        visible: true
    });
  }
  handleClickItem ({ detail }:any) {
    const index = detail.index + 1;
    if (index === 1){
      this.setDataSmart({
        visible: false,
      });
    }else if (index === 2){
      let type:String = 'agree'
      this.setDataSmart({
        visible: false,
        orderInfo: '按阅读数量排序',
        articleType: type
      });
      this.getArticle('agree')
    } else if (index === 3){
      let type:String = 'comment'
      this.setDataSmart({
        visible: false,
        orderInfo: '按评论数量排序',
        articleType: type
      });
      this.getArticle(type)
    }
  }
  handleCancel () {
    this.setDataSmart({
        visible: false
    });
  }
  clickDetail(e:any){
    console.log(e.target.dataset.info)
    // this.app.$url.repdetail.go({
    //   infos: JSON.parse(e.target.dataset.infos)
    // })
    let commentList = e.target.dataset.info.commentList
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
      ...e.target.dataset.info,
      content: encodeURIComponent(e.target.dataset.info.content),
      sub: encodeURIComponent(e.target.dataset.info.sub),
      avatarUrl: encodeURIComponent(e.target.dataset.info.avatarUrl),
      // commentList: encodeURIComponent(e.target.dataset.info.commentList)
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

  handleInputFocus(e:any){
    console.log(e)
    wx.navigateTo({
      url: '../query/query',
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


  onShareQrCodeArticle(res:any) {
    console.log('Share')
  }

  modalConfirm(){
    this.setDataSmart({
      modalHidden: true
    })
  }

  modalCandel(){
    this.setDataSmart({
      modalHidden: true
    })
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
