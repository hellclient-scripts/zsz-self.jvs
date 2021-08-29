var data_notify={
    last:"",
    last_time:0,
}
function NotifyDM(flag){
    var t=(new Date()).getTime()
    if (flag==data_notify.last && (t-data_notify.last_time)<1800000){
        return
    }
    data_notify.last=flag
    data_notify.last_time=t
    Notify("Task["+get_var("id")+"]出现意外状况:"+flag,flag)
}