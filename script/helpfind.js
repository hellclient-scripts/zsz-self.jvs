var data_helpfind={}
var data_lasthelp_id=""
var data_lasthelp_time=0
var data_radar={
    "tuobo seng":{
        name:"拖钵僧",
        loc:-1,
        last:0,
        intervar:5000,
    },
    "illidan stormrage":{
        name:"伊利丹",
        loc:-1,
        last:0,
        intervar:5000,
    },
}
function GetWorldInfo(){
    return world.WorldAddress()+":"+world.WorldPort()
}
function onBroadcast(msg,global){
	var data=SplitN(msg," ",3)
    if (data.length<2){
        return
    }
    if (data[1]!=GetWorldInfo()){
        return
    }
    switch (data[0]){
        case "help":
            if (data.length !=3){
                return
            }
            if (get_var("bool_nohelp")){
                return
            }
            data_helpfind[data[2]]=	(new Date()).getTime();
            break
        case "found":
            if (data.length !=3){
                return
            }
            var info=SplitN(data[2],"|",3)
            if (info.length !=3 || isNaN(info[2])){
                return
            }
            OnFound(info[0],info[1],info[2])
        case "radar":
            if (data.length!=3){
                return
            }
            if (get_var("bool_nohelp")){
                return
            }
            var info=SplitN(data[2],"|",2)   
            if (info.length !=2 || isNaN(info[2])){
                return
            }         
            OnRadarFound(info[0],info[1])
    }
}

function HelpFind(name){
    if (get_var("bool_nohelp")){
        return
    }
    var t=(new Date()).getTime()
    if (name==data_lasthelp_id&& t-data_lasthelp_time<2000){
        return
    }
    data_lasthelp_id=name
    data_lasthelp_time=t
    Broadcast("help "+GetWorldInfo()+" "+name,true)
}
function OnRadarFound(id,loc){
    if (loc==-1){
        return
    }
    t=(new Date()).getTime()
    data_radar[id].last=t
    data_radar[id].loc=loc
}
function OnFound(name,id,loc){
    if (loc==-1){
        return
    }
    delete data_helpfind[name]
    if (!incity(loc,"很远")){
        return
    }
    if (name==query("npc/name")){
        if ((!query("npc/id")) && id){
            set("npc/id",id)
        }
        if (query("npc/find")!=-1){
            if (!incity(loc,query("npc/loc"))){
                return
            }
            data_lasthelp_id=""
            if (query("npc/coor")==-1){
                world.Note("接到线报:"+name+"|"+id+"|"+loc)
                set("stat/helped",query("stat/helped")+1)
            }
            set("npc/find",-1)
            set("npc/coor",loc)
        }
    }
}
function OnNPC(name,id,loc){
    if (get_var("bool_nohelp")){
        return
    }
    if (loc!=-1){
        if (data_helpfind[name]){
            delete data_helpfind[name]
            Broadcast("found "+GetWorldInfo()+" "+name+"|"+id+"|"+loc,true)
        }
    }
}
function OnRadar(name,id,loc){
    if (get_var("bool_nohelp")){
        return
    }
    if (loc!=-1){
        let t=(new Date()).getTime()
        if (data_radar[id] && (t-data_radar[id].last>data_radar[id].intervar)){
            OnRadarFound(id,loc)
            Broadcast("radar "+GetWorldInfo()+" "+id+"|"+loc,true)
        }
    }
}
function on_radar(name, output, wildcards){
	var wcs = wildcards;
    OnRadar(wcs[0],wcs[1].toLocaleLowerCase(),query("room/id"))
}
function on_npc(name, output, wildcards){
	var wcs = wildcards;
    OnNPC(wcs[0],wcs[1],query("room/id"))
}
function on_npcheal(name, output, wildcards){
	var wcs = wildcards;
    OnNPC(wcs[0],"",query("room/id"))
}
function on_gc(name){
    //借宝地一用	
	var t=(new Date()).getTime()
    for (var key in data_helpfind) {
        if (t-data_helpfind[key]>60000){
            delete data_helpfind[key]
        }
    }
	t = query("other/todo") -0;
	if (t>0)
		set("other/todo",t-1);
}

function PrintRadar(){
    let t=(new Date()).getTime()
    for (var key in data_radar) {
        let data=data_radar[key]
        if (data.loc<0||(t-data.last)>60000){
            world.Note(data.name+"|位置未知")
        }else{
            world.Note(data.name+"|位置:"+data.loc)
        }
    }
}