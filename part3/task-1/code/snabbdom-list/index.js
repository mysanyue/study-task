import { init } from './build/package/init.js'
import { classModule } from './build/package/modules/class.js'
import { propsModule } from './build/package/modules/props.js'
import { styleModule } from './build/package/modules/style.js'
import { eventListenersModule } from './build/package/modules/eventlisteners.js'
import { h } from './build/package/h.js'
import dataApi from './data.js'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

let data = dataApi;
let vnode = null;

class IndexList {
  // 数据管理
  data = {
    nextKey: 11,
    margin: 8,
    sortBy: 'rank',
    totalHeight: 0
  }

  // 排序
  changeSort(prop) {
    this.data.sortBy = prop
    data.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return 1
      }
      if (a[prop] < b[prop]) {
        return -1
      }
      return 0
    })
    this.render()
  }

  // 添加
  add() {
    const n = data[Math.floor(Math.random() * 10)]
    data = [{ rank: this.data.nextKey++, title: n.title, desc: n.desc, elmHeight: n.elmHeight }].concat(data)
    this.render()
  }

  // 删除
  remove(movie) {
    data = data.filter(m => m !== movie)
    this.render()
  }

  // 移除后更新视图
  movieView(that, item) {
    return h('li.list-group-item', {
      key: item.rank,
      style: {
        opacity: '0',
        transform: 'translate(-200px)',
        delayed: { transform: `translateY(${item.offset}px)`, opacity: '1' },
        remove: { opacity: '0', transform: `translateY(${item.offset}px) translateX(200px)` }
      },
      hook: { insert: (vnode) => { item.elmHeight = vnode.elm.offsetHeight } },
    }, [
      h('div', { style: { fontWeight: 'bold' } }, item.rank),
      h('div', item.title),
      h('div', item.desc),
      h('div.btn.rm-btn', { on: { click: () => that.remove(item) } }, 'x'),
    ])
  }

  // 渲染函数
  render() {
    const that = this
    data = data.reduce((acc, m) => {
      var last = acc[acc.length - 1]
      m.offset = last ? last.offset + last.elmHeight + that.data.margin : that.data.margin
      return acc.concat(m)
    }, [])
    that.data.totalHeight = data.length === 0 ? 0 : data[data.length - 1].offset + data[data.length - 1].elmHeight
    vnode = patch(vnode, that.view(data))
  }

  // 视图
  view(data) {
    const that = this;
    return h('main.container', [
      h('section.header-wrap', [
        h('h1', 'Top 10 movies'),
        h('div.clearfix', [
          h('label', '排序方式：'),
          h('div.btn-group', [
            h('button.btn.btn-light', {
              class: { active: that.data.sortBy === 'rank' },
              on: { click: () => that.changeSort('rank') }
            }, '等级'),
            h('button.btn.btn-light', {
              class: { active: that.data.sortBy === 'title' },
              on: { click: () => that.changeSort('title') }
            }, '名称'),
            h('button.btn.btn-light', {
              class: { active: that.data.sortBy === 'desc' },
              on: { click: () => that.changeSort('desc') }
            }, '描述')
          ]),
          h('button.btn.btn-secondary.float-right.btn-success', { on: { click: () => that.add() } }, '添加'),
        ])
      ]),
      h('section.list-wrap', [
        h('ul.list-group', { style: { height: that.data.totalHeight + 'px' } },
          data.map(item => that.movieView(that, item)))
      ])
    ])
  }
}

const list = new IndexList();

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container')
  vnode = patch(container, list.view(data))
  list.render()
})