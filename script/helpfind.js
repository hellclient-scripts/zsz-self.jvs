var data_helpfind={}
var data_lasthelpid=""
var data_lasthelptime=0
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
    }
}

function HelpFind(name){
    if (get_var("bool_nohelp")){
        return
    }
    var t=(new Date()).getTime()
    if (name==data_helpfind&& t-data_lasthelptime<2000){
        return
    }
    data_helpfind=name
    data_lasthelptime=t
    Broadcast("help "+GetWorldInfo()+" "+name,true)
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
            data_helpfind=""
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
function on_npc(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
    OnNPC(wcs[0],wcs[1],query("room/id"))
}
function on_npcheal(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
    OnNPC(wcs[0],"",query("room/id"))
}
function on_gc(name){
    var t=(new Date()).getTime()
    for (var key in data_helpfind) {
        if (t-data_helpfind[key]>60000){
            delete data_helpfind[key]
        }
    }
}