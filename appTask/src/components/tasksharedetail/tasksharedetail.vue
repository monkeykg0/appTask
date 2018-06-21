<template>
    <div class="tasksharedetail">
        <div class="top-nav">
            <van-nav-bar title="分享任务" left-arrow></van-nav-bar>
        </div>
        <div class="default-banner">
            <div class="default-pic" v-if="shareinfo.share &&  shareinfo.share.type=='1'">
                <img :src="shareinfo.share.url[0]" alt="" width="100%" height="100%" />>
            </div>
            <div class="default-video" v-if="shareinfo.share &&  shareinfo.share.type=='2'">
                <video :src="shareinfo.share.url[0]" controls  ></video>    
            </div> 
        </div>
        <div class="share-msg">
            <!-- <div class='share-msg-title' v-if="shareinfo.share && shareinfo.share.title">{{shareinfo.share.title}}</div> -->
            <div class='share-msg-title' >分享内容</div>
            <div class="share-msg-content ":class="{'more':showmore==true}" v-if="shareinfo.share && shareinfo.share.title">
                {{shareinfo.share.title}}
            </div>
            <div class="toggle-more" @click="gengduo" v-if="showmore">更多</div>
            <div class="share-btns">
                <button class="copy" @click="copy" >点击复制内容</button>
                <button class="goshare">复制后点击分享</button>
            </div>
            <div class='share-msg-list'>视频选择</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant';
export default {
    name:'tasksharedetail',
    data(){
        return{
            shareinfo:{},
            showmore:true,
        }
    },
    methods:{
        gengduo(){
            this.showmore=false;
        },
        copy(){
          Toast('复制内容成功');
        }
    },
    created(){
        let type = this.$route.query;
        let baseUrl = "https://www.jingfuapp.com/preapp/taskSource/taskSourceInfo";
        let id = "?id=" + type.id;
        let uuid = "&uuid=fa323418-23b4-4df7-9b1a-913377e39569";
        console.log(type)
        axios({
            method:'get',
            url:baseUrl+id+uuid+"&type=1"
        }).then((Response)=>{
            // console.log(Response)
            if(Response.status==200){
                this.shareinfo=Response.data.data;
                //console.log(this.shareinfo)
            }
        }).catch((error)=>{
            console.log(error)
        });
        axios({
            method:'get',
            url:'https://www.jingfuapp.com/preapp/sysUser/weixin/share?uuid=fa323418-23b4-4df7-9b1a-913377e39569'+'&url='+location.href.split('#')[0]
        }).then((Response)=>{
            console.log(Response)
            if(Response.status==200){
                let appId=Response.data.data.appId;
                let timestamp=Response.data.data.timestamp;
                let nonceStr=Response.data.data.nonceStr;
                let signature=Response.data.data.signature;
                wx.config({
                    debug:true,
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，
                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','error','hideAllNonBaseMenuItem','showMenuItems'] // 必填，需要使用的JS接口列表
                });
                    wx.ready(function () {
                        alert('进入')
                // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                wx.onMenuShareAppMessage({
                    title: "分享自定义标题", // 分享标题
                    desc: "分享自定义描述", // 分享描述
                    link: "https://jingfuapp.com",//分享点击之后的链接
                    imgUrl:'http://jingfuapp.oss-cn-hangzhou.aliyuncs.com/upload/2018/06/19/1529386767094.jpg', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function () {
                        //成功之后的回调
                    }
                });
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
                wx.onMenuShareTimeline({
                    title: "分享自定义标题", // 分享标题
                    desc: "分享自定义描述", // 分享描述
                    link: "https://jingfuapp.com",//分享点击之后的链接
                    imgUrl:'http://jingfuapp.oss-cn-hangzhou.aliyuncs.com/upload/2018/06/19/1529386767094.jpg', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function () {
                        //成功之后的回调
                        alert('success')
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                             alert('calc')
                    }
                });
            }); 
                wx.error(function(res){//通过error接口处理失败验证
                    // config信息验证失败会执行error函数
                    alert('失败')
                });
            }
        })
    }

}
</script>
<style lang="less">
    .tasksharedetail{
        .default-banner{
            width:100%;
            height:200px;
            .default-pic{
                width: 100%;
                height:100%;
            }
            .default-video{
                width: 100%;
                height:100%;
                &>video{
                    width: 100%;
                    height:100%;
                    object-fit: fill;
                }
            }
        }
        .share-msg{
            padding:22px 15px;
            .share-msg-title,.share-msg-list{
                // text-align: center;
                font-size:16px;
                font-weight: Bold;
                color:#333;
                padding-bottom:15px;
                border-bottom:1px solid rgba(220,220,220,1);
                margin-bottom:15px;
            }
            .share-msg-content{
                font-size:14px;
                color:rgba(102,102,102,1);
                line-height:20px;
                &.more{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                 overflow: hidden;
                }
            }
            .toggle-more{
                margin-top:10px;
                color:rgba(0,160,233,1);
                font-size:14px;
            }
            .share-btns{
                margin-top:20px;
                margin-bottom:33px;
                height:42px;
                padding:0 25px;
                .copy{
                    height:100%;
                    width:125px;
                    border:2px solid #00A0E9;
                    border-radius: 21px;
                    background: white;
                    color:#00A0E9;
                    font-size: 14px;
                }
                .goshare{
                    margin-left:30px;
                    height:100%;
                    //  width:125px;
                    border:2px solid #00A0E9;
                    border-radius: 21px;
                    background: white;
                    color:#00A0E9;
                    font-size: 14px;
                }
            }
        }
    }
</style>


