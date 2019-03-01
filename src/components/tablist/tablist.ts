// 此文件是由模板文件 ".dtpl/component/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {MyComponent, comify} from 'base'

@comify()
export default class extends MyComponent {
  /**
   * 组件的属性列表
   */
  properties = {

  }

  /**
   * 组件的初始数据
   */
  data = {
    current:  "document", 
    tabList: [
        {
          tag: "document",
          icon: "document",
          cuIcon:"document_fill",
          status: true,
          title: "阅读"
        },
        {
          tag:"interactive",
          icon:"interactive", 
          cuIcon:"interactive_fill",
          status: false,
          title: "讨论"
        },
        {
          tag:"search",
          icon:"search", 
          cuIcon:"searchfill",
          status: false,
          title: "搜索"
        },
        {
          tag: "mine",
          icon: "mine",
          cuIcon: "mine_fill",
          status: false,
          title: "我的"
        }
      ]
  }

  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop: string, newValue: any, oldValue: any) {

  }

  itemChange (e:any) {
    let key = e.currentTarget.dataset.key
    let tabList = this.data.tabList
    for (let i=0; i < tabList.length;i++){
      if (tabList[i].tag === key){
        tabList[i].status = true
      } else {
        tabList[i].status = false
      }
    }
    this.setDataSmart({
      tabList: tabList
    })
    if (key === "mine"){
      this.app.$url.fourth.go()
    } else if (key === "search"){
      this.app.$url.third.go()
    } else  {
      this.app.$url.first.go()
    }
  }
}

