import Vue from 'vue'
import Router from 'vue-router'
import taskList from '@/components/taskList/taskList.vue'
import tasksharedetail from '@/components/tasksharedetail/tasksharedetail.vue'
import taskquestiondetail from '@/components/taskquestiondetail/taskquestiondetail.vue'
import taskinfo from '@/components/taskinfo/taskinfo.vue'
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: taskList
    },
    {
      path:'/tasksharedetail',
      name:'tasksharedetail',
      component:tasksharedetail
    },{
      path:'/taskquestiondetail',
      name:'taskquestiondetail',
      component:taskquestiondetail,
      // children:[{
      //   path:'/q1',
      //   component:'q1'
      // }]
    },
    {
      path:'/taskinfo',
      name:'taskinfo',
      component:taskinfo
    }
  ]
})
