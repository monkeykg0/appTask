<template>
    <div class="taskList">
        <div class="top-nav">
            <van-nav-bar title="悬赏榜" left-arrow></van-nav-bar>
        </div>
        <div class="banner"></div>
        <div class="list">
            <div v-for="(item,index) in  tasklist.rows" class="task-item">
                <div class="task-item-lf">
                    <img src="./xs_banner.png" alt="" width="45" height="45">
                </div>
                <div class="task-item-text" @click="taskinfo(item.id)">
                    <div class="task-item-name">{{item.name}}1111122222222222</div>
                    <!-- <div class="task-item-describe"  v-html="$options.filters.msg(item.describe) "></div> -->
                    <div class="task-item-describe"  v-html="item.describe"></div>
                </div>
                <div class="task-item-rt">
                    <!-- 分享任务 -->
                    <div class="task-newTask" v-if="item.status== '1'">新任务</div>
                    <div class="task-newTask" v-if="item.status== '2'">最高悬赏<b >{{item.receiveMax | floor}}</b>元</div>
                    <div class="task-newTask" v-if="item.status== '3' && item. newTask=='0'">最高悬赏<b >{{item.receiveMax | floor}}</b>元</div>
                    <div class="task-newTask" v-if="item.status== '3' && item. newTask=='1'">新任务</div>
                    <!-- <div class="task-receiveMax" v-if="item.status== '2'" >最高悬赏<b >{{item.receiveMax | floor}}</b>元</div> -->
                    <!-- 答题任务 -->
                    <!-- 上课人物 -->
                    <!-- 成交任务 -->
                    <!-- 招募任务 -->
                    <!-- 按钮状态 -->
                    <button class="task-btn" v-if="item.status== '1'" disabled>即将开始</button>
                    <button class="task-btn" v-if="item.status== '2'" @click="showRedPackage()">领赏金</button>
                    <button class="task-btn"  v-if="item.status== '3' && item.newTask=='0'"  @click="taskdetail(item.type,item.id)">{{item. doneNum}}/{{item. num}}</button>
                    <button class="task-btn"  v-if="item.status== '3' && item.newTask=='1'"  @click="taskdetail(item.type,item.id)" >{{item. doneNum}}/{{item. num}}</button>
                     
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'taskList',
    filters:{
        msg:function(msg){
        return msg.replace(/<.*?>/ig,"").replace(/[ ]|[&nbsp;]/g, '');
        },
         floor: function (value) {
        if (!value) return ''
        // value = value.toString()
        return Math.floor(value)
        },
    },
    methods:{
        taskdetail(Type,Id){
            if(Type=='1'){//分享
                 this.$router.push({
                path:'/taskdetail',
                name:'taskdetail',
                params:{
                    // type:Type,
                        id:Id
                    }
                })
            }else if(Type=='2'){//答题
                this.$router.push({
                    path:'/taskquestiondetail',
                    name:'taskquestiondetail',
                    params:{
                        id:Id
                    }
                })
            }
           
        },
        taskinfo(Id){
                this.$router.push({
                    path:'/taskinfo',
                    name:'taskinfo',
                    query:{
                        id:Id
                    }
                })           
        },
        showRedPackage(){
            
        }
    },
    data(){
        return{
            tasklist:{},
            basepic:'xs_banner.png'
        }
    },
    created(){
        let basUrl='http://192.168.0.133:8099/taskUser/list';
        let uuid='?uuid=8fbf904f-3ba4-4320-b744-4c9b1fa15221';
        let current='&current=1';
        let size='&size=10';
        axios({
            method:'get',
            url:basUrl+uuid+current+size
        }).then((Response)=>{
            if(Response.status==200){
                this.tasklist=Response.data.data;
                console.log( this.tasklist)
            }
        }).catch((error)=>{
            console.dir(error)
        })
    }
}
</script>
<style lang="less">
*{
    box-sizing: border-box;
}
  .taskList{
      .top-nav{
          font-size: 0.66rem;
      }
      .banner{
          height:198px;
          background: url('xs_banner.png') no-repeat center center;
          background-size:100% 100%;
      }
      .list{
          width: 100%;
          padding:30px 16px 30px 14px;
          .task-item{
              margin-bottom:15px;
              height:90px;
              width:100%;
              box-shadow:0px 0px 6px rgba(78,153,255,0.2);
              border-radius:11px;
              padding:12px 10px 15px 13px;
              display: flex;
              .task-item-lf{
                  flex:0 0 45px;
                 width:45px;
                 
            }
            .task-item-text{
                flex:1;
                padding-right:33px;
                margin-left:6px;
                overflow: hidden;
                // padding-top:9px;
                .task-item-name{
                    width:100%;
                    color: #4E99FF;
                    font-size: 16px;
                    font-weight:500;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .task-item-describe{
                    font-size: 12px;
                    color:rgba(102,102,102,1);
                    word-wrap:break-word;
                }
            }
             .task-item-rt{
                 flex:0 0 82px;
                width:82px;
                height:100%;
                // padding-top:9px;
                .task-receiveMax{
                    text-align: center;
                    font-size: 12px;
                    color:rgba(254,133,0,1);
                    font-weight: 500;
                    &>b{
                        font-size: 16px;
                    }
                }
                .task-newTask{
                    text-align: center;
                    font-size: 12px;
                    color:rgba(254,133,0,1);
                    font-weight: 500;
                }
                .task-btn{
                    width:82px;
                    height:35px;
                    background:rgba(78,153,255,1);
                    border-radius:2px;
                    outline: none;
                    border: none;
                    margin-top:7px;
                    color:#fff;
                }
            }
          }
      }
  }
</style>
