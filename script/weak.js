var data_3boss_room_name={
    "海底洞穴":true,
    "小舍内室":true,
    "黑凤洞内":true,

}
function check_in_3boss(){
    return get_var("bool_3boss_recon") &&data_3boss_room_name[query("room/name")]
}

function on_3boss_recon(name, output, wildcards){
    if (check_in_3boss()){
        stop_all()
        var cmd=get_var("id") + ";" + get_var("passw") +";y;l;yun recover;"+"#roomid" +query("room/id")+";hp;i;set no_teach heal"
        reconnect(cmd)
    }
}
function on_jiangshi_room(name, output, wildcards){
    world.Note("发现僵尸道长")
    set("room/id", 2771);
}

function on_seadragon_room(name, output, wildcards){
    world.Note("发现镇海神龙")
    set("room/id", 2767);
}