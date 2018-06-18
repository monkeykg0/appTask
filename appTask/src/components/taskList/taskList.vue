<template>
    <div class="taskList">
        <div class="top-nav">
            <van-nav-bar title="悬赏榜" left-arrow></van-nav-bar>
        </div>
        <div class="banner"></div>
        <div class="list">
            <div v-for="(item,index) in  tasklist.rows" class="task-item">
                <div class="task-item-lf">
                    <div class="img"></div>
                    <div class="task-item-text">
                        <span>11111</span> <br>
                        <span>2222222222222222222222</span>
                    </div>
                </div>
                <div class="task-item-rt"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'taskList',
    data(){
        return{
            tasklist:{},
            basepic:'xs_banner.png'
        }
    },
    created(){
        let basUrl='http://192.168.0.133:8099/taskUser/list';
        let uuid='?uuid=59476db0-8a89-4212-ae65-29b80d53e8f9';
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
  .taskList{
      margin-top:0.66rem;
      .top-nav{
          font-size: 0.66rem;
      }
      .banner{
          height:198px;
          background: url('xs_banner.png') no-repeat center center;
          background-size:100% 100%;
      }
      .list{
          padding: 30px 16px 30px 14px;
          .task-item{
              margin-bottom:15px;
              height:90px;
              box-shadow:0px 0px 6px rgba(78,153,255,0.2);
              border-radius:11px;
              padding:12px 10px 15px 13px;
              .task-item-lf{
                 float: left;
                 height:100%;
                 width: calc(100% - 82px);
                 .img{
                     float:left;
                     width: 45px;
                     height:60px;
                 }
                 .task-item-text{
                     span{
                         display: inline-block;
                         
                     }
                 }
            }
             .task-item-rt{
                float:right;
                 width:82px;
                 height:100%;
            }
          }
      }
  }
</style>
