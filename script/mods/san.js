(function (mods){
    var san={}
    mods.Modules.san=san
    san.Current=0
    san.WeaponID=""
    san.NeiliMax=0
    san.NeiliMaxRepeat=0
    san.WeaponName=""
//    san.Helpers=["huang shang","nanhai shenni","kuihua taijian","dugu qiubai"]
    san.Helpers=["wen zhengming","wang xu","puzhi dashi","zhang junfang"]
    san.ImbueList=["jiuzhuan jindan","feicui lan","magic water","xisui dan","xian dan","puti zi"]
    san.ImbueOffset=6
    san.ModuleCheckStop=function(){
        san.Current=0
        san.WeaponID=""
        san.NeiliMax=0
        san.NeiliMaxRepeat=0    
    }
    san.ModuleCheck=function(){
        world.Note(query("hp/max_neili"))
        world.Note(query("hp/max_jingli"))
        san.NeiliMax = query("hp/limit_neilili");
		if (san.NeiliMax<8000){
            world.Note("最大内力设置无效"+san.NeiliMax)
            return
        }
        if ((san.NeiliMax-query("hp/max_neili"))>180){
            world.Note("内力不足")
            Mods.GoDoCommand(get_var("loc_gift"),"san.neiliitem")
        }else if(query("hp/max_jingli")<1000){
            world.Note("精力不足")
            Mods.GoDoCommand(get_var("loc_gift"),"san.jingliitem")
        }else if(query("hp/jingli")<query("hp/max_jingli")* 0.9){
            Mods.GoDoCommand(get_var("loc_dazuo"),"san.tuna")
        }else if(query("hp/neili")<query("hp/max_neili")* 0.9){
            Mods.GoDoCommand(get_var("loc_dazuo"),"san.dazuo")

        }else{
            san.Next()
        }
        return true
    }
    san.CmdTuna=function(){
        send("yun regenerate;tuna 200")
        BusyTest(get_var("loc_dazuo"),"hp;set no_teach prepare")
    }
    san.CmdDazuo=function(){
        send("yun regenerate;yun recover;dazuo 500")
        BusyTest(get_var("loc_dazuo"),"hp;set no_teach prepare")
    }
    san.CmdJingliItem=function(){
        send("take 3 renshen wan;i")
        BusyTest(get_var("loc_dazuo"),Mods.GetCommand("san.eatwan"))
    }
    san.CmdEatWan=function(){
        if (query("allitem/renshen wan",true)){
            send("eat renshen wan;eat renshen wan;eat renshen wan;hp;i;set no_teach prepare")
        }else{
            san.Report("资源不足","renshen wan 不足")
        }
    }

    san.CmdNeiliItem=function(){
        send("take 1 magic water;i")
        send(Mods.GetCommand("san.eatlu"))
    }
    san.Report=function(title,msg){
        world.Note(title)
        world.Note(msg)
        san.ModuleCheckStop()
    }
    san.CmdEatLu=function(){
        if (query("allitem/magic water",true)){
            EatLu()
        }else{
            san.Report("资源不足","magic water 不足")
        }
    }
    san.CmdSan=function(){
        send("show "+san.WeaponID)
        san.Current++
        send("set no_teach prepare")
    }
    san.CmdReady=function(){
        san.Current++
        send("hp;set no_teach prepare")
    }
    san.CmdSanSelf=function(){
        san.Current++
        var cmd="san "+san.WeaponID+";hp;set no_teach prepare"
        BusyTest(get_var("loc_dazuo"),cmd)
    }
    san.CurrentImbue=function(){
        return san.ImbueList[san.Current-san.ImbueOffset]
    }
    san.CmdImbue=function(){
        var id=san.CurrentImbue()
        send("take 1 "+id+";i")
        send(Mods.GetCommand("san.tryimbue"))
    }
    san.CmdTryImbue=function(){
        var id=san.CurrentImbue()
        if (!query("allitem/"+id,true)){
            san.Report("资源不足",id+" 不足")
            return
        }
        BusyTest(get_var("loc_gift"),"imbue "+id +" in "+san.WeaponID+";l "+san.WeaponID+";hp;"+Mods.GetCommand("san.imbued"))
        
    }
    san.CmdImbued=function(){
        var id=san.CurrentImbue()
        send("i")
        BusyTest(get_var("loc_gift"),Mods.GetCommand("san.checkimbue"))
    }
    san.CmdCheckImbue=function(){
        var id=san.CurrentImbue()
        if (!query("allitem/"+id,true)){
            world.Note("资源"+id+"镶嵌到"+san.WeaponID+"成功")
            add_log("资源"+id+"镶嵌到"+san.WeaponID+"成功");
            san.Current=0
            send("set no_teach prepare")
            return
        }
        send("cun "+id+";i")
        san.Current++
        send("set no_teach prepare")
    }
    san.Next=function(){
        world.Note("san兵器，当前步骤"+san.Current)
        switch (san.Current) {
            case 0:
            case 1:
            case 2:
            case 3:
                Mods.GoDoCommand(data_npcs[san.Helpers[san.Current]].loc,"san.san")
                return
            case 4:
                Mods.GoDoCommand(get_var("loc_dazuo"),"san.ready")
                return    
            case 5:
                Mods.GoDoCommand(get_var("loc_dazuo"),"san.sanself")
                return
            case 6:
            case 7:
            case 8:
            case 9:                
            case 10:                
            case 11:
                Mods.GoDoCommand(get_var("loc_gift"),"san.imbue")
                return
        }
        san.Report("san 失败","无法san兵器")
    }
    san.Start=function(weaponid){
        san.Current=0
        san.WeaponID=weaponid
        send("unwield "+weaponid)
        send("remove "+weaponid)
        send("hp;i")
        mods.StartModule("san")
    }
    san.ModuleInit=function(){
        mods.Commands["san.san"]=san.CmdSan
        mods.Commands["san.neiliitem"]=san.CmdNeiliItem
        mods.Commands["san.eatlu"]=san.CmdEatLu
        mods.Commands["san.jingliitem"]=san.CmdJingliItem
        mods.Commands["san.eatwan"]=san.CmdEatWan
        mods.Commands["san.imbued"]=san.CmdImbued
        mods.Commands["san.tuna"]=san.CmdTuna
        mods.Commands["san.dazuo"]=san.CmdDazuo
        mods.Commands["san.ready"]=san.CmdReady

        mods.Commands["san.sanself"]=san.CmdSanSelf
        mods.Commands["san.imbue"]=san.CmdImbue
        mods.Commands["san.tryimbue"]=san.CmdTryImbue
        mods.Commands["san.checkimbue"]=san.CmdCheckImbue
    }
}(Mods))

