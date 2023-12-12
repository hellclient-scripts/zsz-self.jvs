var push={};
push.TPush={}
push.TPush.APIServer='api.tpns.sh.tencent.com/v3/push/app';
push.TPush.Auth=function(success){

    if (!world.CheckPermissions(["http"])){
        world.RequestPermissions(["http"],"申请HTTP权限用发送腾讯推送通知",'push.TPush.setup()')
        return
    }
    if (!world.CheckTrustedDomains(["api.tpns.sh.tencent.com"])){
        world.RequestTrustDomains(["api.tpns.sh.tencent.com"],"申请信任腾讯云api",'push.TPush.setup()')
        return
    }
    if (success!=null){
        success();
    }
}

push.TPush.SendAndroid=function(appid,appkey,token,title,content,server,game){
    var body={
        "audience_type":"token",
        "token_list":[token],
        "message_type":"notify",
        "message":{
            "title":title,
            "content":content,
            "android":{
                "vibrate":1,
                "lights":1,
                "action":{
                    "action_type":3,
                    "intent":"hcnotify://hellclient.jarlyyn.com/notify/"+server+"#"+game,
                }
            }
        }
    }
    api='https://'+appid+':'+appkey+"@"+push.TPush.APIServer;
    push.TPush.Req = HTTP.New("POST", api)
    push.TPush.Req.SetBody(JSON.stringify(body))
    Note(JSON.stringify(body));
    Note("正在发送推送")
    push.TPush.Req.AsyncExecute('push.TPush.Callback')
}
push.TPush.Callback=function(){
    let resp=push.TPush.Req.ResponseBody();
    let data=JSON.parse(resp);
    if (data.ret_code==0){
        Note('推送成功')
    }else{
        Note(resp)
    }
}
push.TPush.setup=function(){
    push.TPush.Auth(push.TPush.setupstart)
    
}
push.TPush.setupstart=function(){
    var list=Userinput.newlist("腾讯安卓推送","是否启用腾讯推送？需要在腾讯云申请一个上海区的应用",false)
    list.append('t','开启');
    list.append('f','禁用');
    list.publish("push.TPush.setupEnablde")
}
push.TPush.setupEnablde=function(name,id,code,data){
    if (code==0){
        world.SetVariable('__plugin_tpush_notify_enablde',data)
        if (data=='t'){
            Userinput.prompt("push.TPush.setupOnAccessID","请设置AccessID","请设置腾讯云应用的AccessID",GetVariable('__plugin_tpush_notify_accessid'))
        }
    }
}
push.TPush.setupOnAccessID=function(name,id,code,data){
    if (code==0){
        world.SetVariable('__plugin_tpush_notify_accessid',data)
        Userinput.prompt("push.TPush.setupOnSecretKey","请设置AccessKey","请设置腾讯云应用的SecretKey",GetVariable('__plugin_tpush_notify_secretkey'))
    }
}

push.TPush.setupOnSecretKey=function(name,id,code,data){
    if (code==0){
        world.SetVariable('__plugin_tpush_notify_secretkey',data)
        Userinput.prompt("push.TPush.setupOnToken","请设置Token","请设置安卓手机通知设置中获取的token",GetVariable('__plugin_tpush_notify_token'))
    }
}

push.TPush.setupOnToken=function(name,id,code,data){
    if (code==0){
        world.SetVariable('__plugin_tpush_notify_token',data)
        Userinput.prompt("push.TPush.setupOnServer","请设置服务器","请设置安卓手机服务器列表中的服务器地址",GetVariable('__plugin_tpush_notify_server'))
    }
}
push.TPush.setupOnServer=function(name,id,code,data){
    if (code==0){
        world.SetVariable('__plugin_tpush_notify_server',data)
        Userinput.alert('','设置成功','通知设置成功')   
    }
}

push.TPush.push=function(title,content){
    if (world.GetVariable('__plugin_tpush_notify_enablde')=='t'){
        push.TPush.SendAndroid(world.GetVariable('__plugin_tpush_notify_accessid'),world.GetVariable('__plugin_tpush_notify_secretkey'),world.GetVariable('__plugin_tpush_notify_token'),title,content,world.GetVariable('__plugin_tpush_notify_server'),GetWorldID());
    }
}

push.Notify=function(title,content){
    push.TPush.push(title,content)
    /Request('desktopnotification',JSON.stringify({Title:title,Body:content}))
}

Notify=push.Notify;