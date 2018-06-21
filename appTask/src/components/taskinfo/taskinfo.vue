<template>
    <!-- 任务详情 -->
    <div class="taskinfo">
        <div class="task-name">{{taskinfo.name}}</div>
        <div class="taskinfo-content">
            <div class="content-head">
                <div class="content-head-text">
                    <p class=" task-projectName">{{taskinfo.projectName}}</p>
                    <div class="task-commission">佣金:{{taskinfo.commission}}</div>
                    <p class="task-telphone">{{taskinfo.telphone}}</p>
                </div>
                <a  class="phone "></a>
            </div>
            <div class="task-describe"> <span class="circle"></span> <span v-if="taskinfo.describe" v-html="$options.filters.msg(taskinfo.describe)"></span> </div>
            <!-- <div class="task-describe"> <span class="circle"></span> <span  v-html="taskinfo.describe"></span> </div> -->
            <div class="task-endTime" v-if='taskinfo.status!="1"'>结束时间：{{taskinfo.endTime}}</div>
            <div class="task-endTime"  v-if='taskinfo.status=="1"'>开始时间：{{taskinfo.startTime}}</div>
        </div>
        <div class="chain"></div>
        <div class="task-subTaskInfo">
            <div class="receive" v-if="taskinfo.subTaskInfo">已领取{{taskinfo.subTaskInfo.receiveNum}}人  &nbsp {{taskinfo.subTaskInfo.receivePrice}}</div>
            <div class="receive-list">
                <div class="receive-list-item-no" v-if="taskinfo.subTaskInfo &&taskinfo.subTaskInfo.receiveUser.length==0">暂无完成</div>
                <div class="receive-list-wrapper" v-if="taskinfo.subTaskInfo && taskinfo.subTaskInfo.receiveUser.length>0">
                    <div class="receive-list-item"  v-for="(item,index) in taskinfo.subTaskInfo.receiveUser" >
                        <div class="avater"><img :src="item.portrait" alt="" width="50" height='50'></div>
                        <div class="receive-list-item-text">
                            <div>{{item. realname}}</div>
                            <div>{{item. settlementTime}}</div>
                        </div>
                        <div class="receive-list-item-price">{{item.price}}</div>   
                    </div>
                </div>
               
                <!-- <div class="receive-list-wrapper" v-if="taskinfo.subTaskInfo && taskinfo.subTaskInfo.receiveUser.length>0">
                    <div class="receive-list-item"  >
                        <div class="avater">1</div>
                        <div class="receive-list-item-text">
                            <div>2</div>
                            <div>3</div>
                        </div>
                        <div class="receive-list-item-price">4</div>   
                    </div>
                </div> -->
                 
            </div>
            <div class="task-info-btn">
                <button v-if="taskinfo.status=='1'" disabled>即将开始</button>
                <button v-if="taskinfo.status=='2'">瓜分红包</button>
                <button v-if="taskinfo.status=='3'">{{taskinfo.doneNum}}/{{taskinfo.num}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "taskinfo",
  filters: {
    msg: function(msg) {
      return msg.replace(/<.*?>/gi, "").replace(/[ ]|[&nbsp;]/g, "");
    }
  },
  data() {
    return {
      taskinfo: {}
    };
  },
  created() {
    let type = this.$route.query;
    let baseUrl = "https://www.jingfuapp.com/preapp/projectTask/projectTaskInfo";
    let id = "?id=" + type.id;
    let uuid = "&uuid=fa323418-23b4-4df7-9b1a-913377e39569";
    console.log(type);
    axios({
      method: "get",
      url: baseUrl + id + uuid
    }).then(Response => {
      //console.dir(Response)
      if (Response.status == 200) {
        this.taskinfo = Response.data.data;
        console.log(this.taskinfo);
      }
    });
  }
};
</script>
<style lang="less">
* {
  box-sizing: border-box;
}
.taskinfo {
  padding-top: 178px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
  min-height: 100%;
  background: url("taskinfo-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .task-name {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin-bottom: 30px;
  }
  .taskinfo-content {
    // height:260px;
    padding-top: 24px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: white;
    .content-head {
      width: 315px;
      height: 90px;
      margin: 0px auto 40px;
      background: url("./22.png") no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      .content-head-text {
        margin-left: 83px;
        .task-projectName {
          padding-top: 10px;
          color: #feff8b;
          font-size: 18px;
        }
        .task-commission {
          color: #d2003c;
          font-size: 20px;
        }
        .task-telphone {
          color: #ffffff;
          font-size: 14px;
        }
      }
      & > a {
        display: inline-block;
        height: 56px;
        width: 66px;
        right: 10px;
        top: 20px;
        background: url("./phone.png") no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
      }
    }
    .task-describe {
      width: 315px;
      margin: 0 auto 20px;
      color: #ba8030;
      font-size: 12px;
      .circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(186, 128, 48, 1);
      }
    }
    .task-endTime {
      color: #ba8030;
      font-size: 14px;
      width: 315px;
      margin: 0 auto;
      padding-bottom: 20px;
    }
  }
  .chain {
    height: 70px;
    background: url("chain.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .task-subTaskInfo {
    min-height: 50px;
    padding-bottom: 20px;
    background: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .receive {
      color: #ba8030;
      font-size: 12px;
      width: 315px;
      margin: 0 auto 20px;
    }
    .receive-list {
      border-top: 1px solid rgba(254, 213, 132, 1);
      border-bottom: 1px solid rgba(254, 213, 132, 1);
      padding: 0px 15px;
      .receive-list-item-no {
        color: #ba8030;
        font-size: 16px;
        font-weight: 700;
      }
      .receive-list-item {
        padding: 23px 0 18px 0;
        display: flex;
        border-bottom: 1px solid rgba(254, 213, 132, 1);
        .avater {
          flex: 0 0 50px;
          width: 50px;
          margin-right: 30px;
          & > img {
            border-radius: 5px;
          }
        }
        .receive-list-item-text {
          flex: 1;
          color: #ba8030;
          font-size: 14px;
        }
        .receive-list-item-price {
          flex: 0 0 70px;
          width: 70px;
        }
      }
    }
    .task-info-btn {
      width: 300px;
      height: 80px;
      margin: 25px auto 0px;
      background: url("btn.png") no-repeat center center;
      background-size: 100% 100%;
      & > button {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: #fa6413;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>

