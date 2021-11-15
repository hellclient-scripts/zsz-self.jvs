var Mods={
    Commands:{},
    Modules:{},
    CurrentModule:"",
}
Mods.Require=function(path){
    eval(Include(path),path)
}
Mods.GoDoCommand=function(loc,cmd){
    set("nextstep/flag", "COMMANDS");
    set("nextstep/cmds", Mods.GetCommand(cmd));
    goto(loc);
}
Mods.GetCommand=function(cmd){
    return "set auto_regenerate "+cmd
}
Mods.Check=function(){
    if (Mods.CurrentModule==""){
        return false
    }
    var m=Mods.Modules[Mods.CurrentModule]
    if (!m || !m.ModuleCheck){
        return false
    }
    return m.ModuleCheck()
}
Mods.StartModule=function(modulename){
    var m=Mods.Modules[modulename]
    if (m){
        Mods.CurrentModule=modulename
        Mods.Commands={}
        if (m.ModuleInit){
            m.ModuleInit()
        }
        if (m.ModuleStart){
            m.ModuleStart()
        }else{
            send("hp;i;set no_teach prepare")
        }
    }else{
        world.Note("模块 "+modulename+" 未找到。")
    }
}
Mods.StopModule=function(modulename){
    var m=Mods.Modules[modulename]
    if (m){
        if (m.ModuleStop){
            m.ModuleStop()
        }
        Mods.CurrentModule=""
    }
}

function OnModCommand(name, output, wildcards){
    var wcs = VBArray(wildcards).toArray();
    var cmd=Mods.Commands[wcs[0]]
    if (cmd){
        cmd()
    }
}

function StopMods(){
    if (Mods.CurrentModule){
        Mods.StopModule(Mods.CurrentModule)
    }
}
OnMods=function(name,id,code,data){
    if (code==0){
        switch (data){
            case "eatlu":
                EatLu()
                return
            case "san":
                Userinput.alert("CallbackSanIntro","自动san武器介绍","需要有自己的房子，需要将资源存储在gift_loc的聚宝箱内。大约需要1.5w存款,200 magic water,200 renshen wan,20 feicui lan,30 puti zi,30 jiuzhuan jindan,30 xiandan,30 xisui dan。为了提高效率，请将min_jingli设为0")
                return
            case "lian":
                Userinput.prompt("CallbackPromptLian","请设置你的的练习指令","如 wp1off;lian unarmed 50;","")
                return
            case "warehouse":
                Mods.Modules.warehouse.List()
                return
        }
    }
}
CallbackPromptLian=function(name,id,code,data){
    if (code==0 && data){
        Mods.Modules.lian.Start(data)
    }
}

CallbackSanIntro=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("CallbackPromptSanNeiliMax","请设置你的最大内力","如8000。请hp -m查看 将准确的数据填入。错误轻则浪费magic water，重则掉基本内功。","")
    } 
}
CallbackPromptSanNeiliMax=function(name,id,code,data){
    if (code==0 && data){
        if (isNaN(data)||(data-0)<8000){
            Userinput.alert("","最大内力无效",data+"不是有效的最大内力，注意，设置错误会掉基本内功")
            return
        }
        Mods.Modules.san.NeiliMax=data-0
        Userinput.prompt("CallbackPromptSanNeiliMaxRepeat","请再次确认最大内力","如8000。请hp -m查看 将准确的数据填入。错误轻则浪费magic water，重则掉基本内功。","")
    }
}
CallbackPromptSanNeiliMaxRepeat=function(name,id,code,data){
    if (code==0 && data){
        if (isNaN(data)||(data-0)<8000){
            Userinput.alert("","最大内力无效",data+"不是有效的最大内力，注意，设置错误会掉基本内功")
            return
        }
        Mods.Modules.san.NeiliMaxRepeat=data-0
        if (Mods.Modules.san.NeiliMaxRepeat != Mods.Modules.san.NeiliMax){
            Userinput.alert("","最大内力不匹配","两次输入的最大内力不匹配，请检查")
            return

        }
        Userinput.prompt("CallbackPromptSan","请选择要San的武器id","如baihongjian","")
    }
}
CallbackPromptSan=function(name,id,code,data){
    if (code==0 && data){
        Mods.Modules.san.Start(data)
    }
}
ShowMods=function(){
    var list=Userinput.newlist("扩展模块","请选择你要运行的扩展模块",false)
    list.append("eatlu","自动去TRC吃身上的露")
    list.append("san","自动San兵器")
    list.append("lian","练习技能/读书")
    list.append("warehouse","聚宝箱管理")
    list.send("OnMods")
}

Mods.Require("mods/san.js")
Mods.Require("mods/lian.js")
Mods.Require("mods/warehouse.js")

