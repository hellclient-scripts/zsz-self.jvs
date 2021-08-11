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


OnMods=function(name,id,code,data){
    if (code==0){
        switch (data){
            case "eatlu":
                EatLu()
                return
            case "san":
                Userinput.prompt("CallbackPromptSan","请选择要San的武器id","如baihongjian","")
                return
        }
    }
}
CallbackPromptSan=function(name,id,code,data){
    if (code!=0 && data){
        Mods.Modules.san.Start(data)
    }
}
ShowMods=function(){
    var list=Userinput.newlist("扩展模块","请选择你要运行的扩展模块",false)
    list.append("eatlu","自动去TRC吃身上的露")
    list.append("san","自动San兵器")
    list.send("OnMods")
}

Mods.Require("mods/san.js")