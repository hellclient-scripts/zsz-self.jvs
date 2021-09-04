(function (mods){
    function newjiuhuaitem(id){
        warehouse.Items[id]={
            check:100,
            store:"cun 100 "+id,
            type:"buy",
            loc:65,
            cmd:"buy 100 "+id +" from ping yizhi",
        }
    }
    var warehouse={}
    mods.Modules.warehouse=warehouse
    warehouse.Items={}
    warehouse.Items["shui dai"]={
        check:10,
        store:"cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;cun shui dai;",
        type:"buy",
        loc:27,
        cmd:"buy shui dai from xiao er"
    }
    warehouse.Items["gan liang"]={
        check:100,
        store:"cun 100 gan liang",
        type:"buy",
        loc:27,
        cmd:"buy 100 gan liang from xiao er"
    }
    var jiuhualist=["honghua","juhua","lanhua","yang jinhua","zihua","xiongdan","shouwu","renshen","moyao","tianqi","danggui","chenpi"]
    for(var i in jiuhualist){
        newjiuhuaitem(jiuhualist[i])
    }
    warehouse.Preparing=""
    warehouse.Target=[]
    warehouse.Task=""
    warehouse.Need=0
    warehouse.OnTask=function(name,id,code,data){
        if (code==0 && data){
            if (isNaN(data)||data<=0){
                Userinput.alert("","无效的数量",data+"不是有效的数量")
                return
            }
            warehouse.Need=data-0
            warehouse.Start(warehouse.Task,warehouse.Need)
        }
    }

    warehouse.Prompt=function(name,id,code,data){
        if (code==0 && data){
            warehouse.Task=data
            Userinput.prompt("Mods.Modules.warehouse.OnTask","数量","请设置你需要准备的"+data+"的数量","")
        }

    }
    warehouse.List=function(){
        var list=Userinput.newlist("物资管理","请选择你要管理的物资",true)
        list.append("饮食","[饮食]为计划的ID准备水袋和干粮 shuidai ganliang")
        list.append("九花","[九花]制作九花玉露丸的材料 jiuhua wan")
        list.send("Mods.Modules.warehouse.Prompt")    
    }
    warehouse.ModuleCheck=function(){
        if (!query("xiang/_max",true)){
            BusyTest(get_var("loc_gift"),"l ju baoxiang of here;"+Mods.GetCommand("warehouse.ready"))
            return true
        }
        for (var i in warehouse.Target) {
            var item=warehouse.Target[i]
            if (query("xiang/"+item.ID,true)<item.Need){
                warehouse.Preparing=item.ID
                send(Mods.GetCommand("warehouse.prepare"))
                return true
            }
        }
        world.Note("任务完成")
        StopMods()
        return true
    }
    warehouse.CmdReady=function(){
        if (!query("xiang/_max",true)){
            Userinput.alert("","找不到聚宝箱","请检查loc_gift设置是否正确")
            return
        }
        send("hp;i;set no_teach prepare")
    }
    warehouse.CmdPrepare=function(){
        send("i;"+Mods.GetCommand("warehouse.checked"))
    }
    warehouse.CmdChecked=function(){
        world.Print("checked",warehouse.Preparing)
        if (query("allitem/"+warehouse.Preparing,true)>=warehouse.Items[warehouse.Preparing].check){
            BusyTest(get_var("loc_gift"),warehouse.Items[warehouse.Preparing].store+";l ju baoxiang;hp;i;set no_teach prepare")
            return
        }
        switch(warehouse.Items[warehouse.Preparing].type){
            case "buy":
                BusyTest(warehouse.Items[warehouse.Preparing].loc,warehouse.Items[warehouse.Preparing].cmd+";hp;i;set no_teach prepare")
            return
        }
        Userinput.alert("","无法补充物品","无法补充"+warehouse.Preparing)
    }
    warehouse.ModuleInit=function(){
        mods.Commands["warehouse.ready"]=warehouse.CmdReady
        mods.Commands["warehouse.prepare"]=warehouse.CmdPrepare
        mods.Commands["warehouse.checked"]=warehouse.CmdChecked

    }
    warehouse.Start=function(task,need){
        need=need-0
        switch (task){
            case "饮食":
                warehouse.Target=[
                    {ID:"shui dai",Need:need},
                    {ID:"gan liang",Need:need},
                ]
                break
            case "九花":
                var t=[]
                for(var i in jiuhualist){
                    t.push({ID:jiuhualist[i],Need:need})
                }
                warehouse.Target=t
                break
            default:
                Userinput.alert("","不支持的任务",warehouse.Task+"是不支持的任务")
                return
        }
        set("xiang",{})
        send("hp;i")
        mods.StartModule("warehouse")
    }
}(Mods))
