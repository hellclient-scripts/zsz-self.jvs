var data_helpfind={}

function onBroadcast(msg,global){
	var data=SplitN(msg," ",2)
    switch (data[0]){
        case "help":
            if (data.length !=2){
                return
            }
            if (get_var("bool_nohelp")){
                return
            }
            data_helpfind[data[1]]=	(new Date()).getTime();
            break
        case "found":
            if (data.length !=2){
                return
            }
            var info=SplitN(data[1],"|",3)
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
    Broadcast("help "+name,true)
}
function OnFound(name,id,loc){
    if (loc==-1){
        return
    }
    delete data_helpfind[name]
    if (name==query("npc/name")){
        if ((!query("npc/id")) && id){
            set("npc/id",id)
        }
        if (query("npc/find")!=-1){
            world.Note("接到线报:"+name+"|"+id+"|"+loc)
            set("stat/helped",query("stat/helped")+1)
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
            Broadcast("found "+name+"|"+id+"|"+loc,true)
        }
    }
}
function on_npc(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
    OnNPC(wcs[0],wcs[1],query("room/id"))
}
function on_gc(name){
    var t=(new Date()).getTime()
    for (var key in data_helpfind) {
        if (t-data_helpfind[key]>60000){
            delete data_helpfind[key]
        }
    }
}