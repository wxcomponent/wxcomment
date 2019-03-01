// 此文件是由模板文件 ".dtpl/component/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {MyComponent, comify} from 'base'

@comify()
export default class extends MyComponent {
  /**
   * 组件的属性列表
   */
  properties = {
    reInfos: {
      type: JSON,
      value: {
        id: {
          type: String,
          value: '0'
        },
        nickName: {
          type: String,
          value: ''
        },
        src: {
          type: String,
          value: ''
        },
        time: {
          type: String,
          value: ''
        },
        title: {
          type: String,
          value: ''
        },
        sub: {
          type: String,
          value: ''
        },
        agree: {
          type: Number,
          value: 0
        },
        commentList: {
          type: Array,
          value: []
        }
      }
    }
  }

  /**
   * 组件的初始数据
   */
  data : any = {

  }
  
  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop: string, newValue: any, oldValue: any) {
    
  }

}

