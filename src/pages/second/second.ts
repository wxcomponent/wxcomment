// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    nowKey: 'second',
    viewlist:[
      {
        title: '文章题目1',
        url: 'http://img1.imgtn.bdimg.com/it/u=3464074689,1817871506&fm=26&gp=0.jpg',
        sub: '文章简要内容1',
        key: 'first'
      },
      {
        title: '文章题目2',
        url: 'http://img3.imgtn.bdimg.com/it/u=3707849983,1383826950&fm=26&gp=0.jpg',
        sub: '文章简要内容2',
        key: 'second'
      },
      // {
      //   title: '文章题目3',
      //   url: 'http://img3.imgtn.bdimg.com/it/u=1295792219,516308704&fm=26&gp=0.jpg',
      //   sub: ' 文章简要内容3',
      //   key: 'third'
      // },
      {
        title: '文章题目4',
        url: 'http://img5.imgtn.bdimg.com/it/u=599300736,3107881691&fm=26&gp=0.jpg',
        sub: '文章简要内容4',
        key: 'fourth'
      }
    ]
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
  }

  clickItem(e:any){
    console.log(e.currentTarget.dataset.key)
    this.setDataSmart({
      show: false,
      nowKey: e.currentTarget.dataset.key
    })
    wx.navigateTo({
      url: '../viewitem/viewitem?key=' + e.currentTarget.dataset.key,
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


}
