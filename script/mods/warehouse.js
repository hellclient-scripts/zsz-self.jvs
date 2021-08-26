(function (mods){

    var warehouse={}
    mods.Modules.warehouse=warehouse
    lian.Item=""
    lian.ModuleCheck=function(){
        BusyTest(get_var("loc_dazuo"),Mods.GetCommand("lian.do"))
        return true
    }
    lian.CmdDo=function(){
        BusyTest(get_var("loc_dazuo"),"yun recover;yun regenerate;"+lian.Command+";"+Mods.GetCommand("lian.ok"))
    }
    lian.CmdOk=function(){
        BusyTest(get_var("loc_dazuo"),"hp;i;set no_teach prepare")
    }
    lian.ModuleInit=function(){
        mods.Commands["lian.do"]=lian.CmdDo
        mods.Commands["lian.ok"]=lian.CmdOk
    }
    lian.Start=function(cmd){
        lian.Command=(cmd)
        send("hp;i")
        mods.StartModule("lian")
    }
}(Mods))
