<template>
    <div class="taskquestiondetail">
         <div class="top-nav">
            <van-nav-bar title="答题瓜分大奖" left-arrow></van-nav-bar>
        </div>
        <div class="total-ques" v-if="questioninfo.question && questioninfo.question.length">共{{questioninfo.question.length}}题</div>
        <div class="question-detail">
            <div class=" countdown">{{limitTime}}</div>
            <div class="question-wrapper">
                <div class="question " :class="{'show':show}" v-for="(item,index) in questioninfo.question" :key="index" >
                    <div class="question-title">{{item.name}}</div>
                    <div class="answer" v-html="$options.filters.str(item.answer)[0]" v-if="$options.filters.str(item.answer)[0]" ></div>
                    <div class="answer" v-html="$options.filters.str(item.answer)[1]" v-if="$options.filters.str(item.answer)[1]"></div>
                    <div class="answer" v-html="$options.filters.str(item.answer)[2]" v-if="$options.filters.str(item.answer)[2]"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import URL from '@/serviceAPI.config.js'
import axios from 'axios'
export default {
    name:'taskquestiondetail',
    filters: {
    str:function(msg) {
        let answer=[];
        answer.push(msg.split("B")[0]);
        answer.push("B"+msg.split("B")[1].split("C")[0])
        answer.push("c"+msg.split("B")[1].split("C")[1])
      return answer;
    }
  },
    data(){
        return{
            questioninfo:{},
            show:false,
            limitTime: 15,
        }
    },
    created(){
        let type = this.$route.query;
        let id = "&id=" + type.id;
        axios({
            method:'get',
            url:URL.taskquestiondetail+id+"&type=2"
        }).then((Response)=>{
            if(Response.status==200){
                this.questioninfo=Response.data.data;
                console.dir( this.questioninfo)
            }
        })
    }
    
}
</script>
<style lang="less">
    .taskquestiondetail{
        padding-bottom:64px;
        background:url('ques-bg.png') no-repeat center center;
        background-size: 100% 100%;
        .top-nav{
            .van-nav-bar{
                background:transparent;
                color:white;
                font-size: 18px;
            }
        }
        .total-ques{
            text-align: center;
            color:#FFA810;
            font-size: 36px;
            margin-top:65px;
            margin-bottom:83px;
        }
        .question-detail{
            width:315px;
            min-height:385px;
            margin:0 30px ;
            background:rgba(255,255,255,0.9);
            border-radius:10px;
            position: relative;
            .countdown{
                width: 45px;
                height:45px;
                line-height: 45px;
                text-align: center;
                border-radius:50%;
                position: absolute;
                top:-23px;
                left:135px;
                background: white;
            }
            .question-wrapper{
                .question{
                    &.show{ 
                        display:none;
                    }
                }
            }
        }
    }
</style>

