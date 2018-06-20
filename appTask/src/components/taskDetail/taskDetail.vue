<template>
    <div class="taskdetail">
        去做分享任务
        <div class="taskdetail-content">

        </div>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'taskdetail',
    created(){
        let type=this.$route.params;
        let baseUrl='http://192.168.0.133:8099/projectTask/projectTaskInfo'
        let id='?id='+type.id;
        let uuid="&uuid=59476db0-8a89-4212-ae65-29b80d53e8f9"
        console.log(type)
        console.log(baseUrl+id+uuid)
        axios({
            method:'get',
            url:baseUrl+id+uuid
        }).then((Response)=>{
            console.dir(Response)
        })
    }

}
</script>
<style lang="less">
    .taskdetail{
        .taskdetail-content{
            width:100%;
            height:200px;
        }
    }
</style>


