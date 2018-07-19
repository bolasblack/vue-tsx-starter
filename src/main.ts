import 'reflect-metadata'
import Vue from 'vue'
import waitDOMReady from './lib/wait_dom_ready'
import { Root } from './containers/Root'
import './style/index.less'

void waitDOMReady().then(() => {
  new (Vue.extend({
    render: h => h(Root),
  }))().$mount('#app')
})
