import Vue from 'vue'
import Router from 'vue-router'
import taskList from '@/components/taskList/taskList.vue'
import taskDetail from '@/components/taskDetail/taskDetail.vue'
import taskquestiondetail from '@/components/taskquestiondetail/taskquestiondetail.vue'
import taskinfo from '@/components/taskinfo/taskinfo.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: taskList
    },
    {
      path:'/taskdetail',
      name:'taskdetail',
      component:taskDetail
    },{
      path:'/taskquestiondetail',
      name:'taskquestiondetail',
      component:taskquestiondetail
    },
    {
      path:'/taskinfo',
      name:'taskinfo',
      component:taskinfo
    }
  ]
})
