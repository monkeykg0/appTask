const BASEURL='http://192.168.0.133:8099'
const uuid='8fbf904f-3ba4-4320-b744-4c9b1fa15221'
const URL={
    taskList:BASEURL+'/taskUser/list'+"?uuid="+uuid,
    taskinfo:BASEURL+'/projectTask/projectTaskInfo'+"?uuid="+uuid,
    tasksharedetail:BASEURL+'/taskSource/taskSourceInfo'+"?uuid="+uuid,
    taskquestiondetail:BASEURL+'/taskSource/taskSourceInfo'+"?uuid="+uuid,
}
module.exports=URL