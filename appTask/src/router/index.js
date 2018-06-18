import Vue from 'vue'
import Router from 'vue-router'
import taskList from '@/components/taskList/taskList.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: taskList
    }
  ]
})
