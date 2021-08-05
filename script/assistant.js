var data_familys = {
    "桃花岛"   : {"masterid" : "huang yaoshi",		"mastername" : "黄药师",	"masterloc" : 1990, "sleeploc" : 1995, "id_family" : "th",	"dazuoloc" : 1994},
    "关外胡家" : {"masterid" : "hu fei",			"mastername" : "胡斐",		"masterloc" : 2355, "sleeploc" : 2364, "id_family" : "hu",	"dazuoloc" : 1243},
    "雪山寺"   : {"masterid" : "jiumo zhi",		"mastername" : "鸠摩智",	"masterloc" : 2139, "sleeploc" : 2364, "id_family" : "xs",	"dazuoloc" : 2140},
    "神龙教"   : {"masterid" : "pang toutuo",		"mastername" : "胖头陀",	"masterloc" :   41, "sleeploc" : 2477, "id_family" : "sld",	"dazuoloc" : 40},
    "欧阳世家" : {"masterid" : "ouyang feng",		"mastername" : "欧阳锋",	"masterloc" : 2275, "sleeploc" : 2278, "id_family" : "bt",	"dazuoloc" : 2273},
    "血刀门"   : {"masterid" : "xuedao laozu",		"mastername" : "血刀老祖",	"masterloc" : 2130, "sleeploc" : 2129, "id_family" : "xd",	"dazuoloc" : 2125},
    "丐帮"     : {"masterid" : "hong qigong",		"mastername" : "洪七公",	"masterloc" : 1929, "sleeploc" : 1928, "id_family" : "gb",	"dazuoloc" : 1930},
    "段氏皇族" : {"masterid" : "duan zhengchun",	"mastername" : "段正淳",	"masterloc" : 2384, "sleeploc" : 2393, "id_family" : "duan","dazuoloc" : 2383},
    "星宿派"   : {"masterid" : "ding chunqiu",		"mastername" : "丁春秋",	"masterloc" : 1168, "sleeploc" : 1657, "id_family" : "xx",	"dazuoloc" : 1167},
    "慕容世家" : {"masterid" : "murong bo",		"mastername" : "慕容博",	"masterloc" : 2197, "sleeploc" : 2221, "id_family" : "mr",	"dazuoloc" : 2196},
    "华山派"   : {"masterid" : "yue buqun",		"mastername" : "岳不群",	"masterloc" : 2185, "sleeploc" : 2177, "id_family" : "hs",	"dazuoloc" : 2178,"nopowerup":true},
    "华山剑宗" : {"masterid" : "feng buping",		"mastername" : "封不平",	"masterloc" : 2226, "sleeploc" : 2227, "id_family" : "jz",	"dazuoloc" : 2225,"nopowerup":true},
    "灵鹫宫"   : {"masterid" : "xu zhu",			"mastername" : "虚竹",		"masterloc" : 2013, "sleeploc" : 2030, "id_family" : "lj",	"dazuoloc" : 2012},
    "峨嵋派"   : {"masterid" : "miejue shitai",	"mastername" : "灭绝师太",	"masterloc" : 2070, "sleeploc" : 2076, "id_family" : "em",	"dazuoloc" : 2062},
    "古墓派"   : {"masterid" : "long nv",			"mastername" : "小龙女",	"masterloc" : 1956, "sleeploc" : 1960, "id_family" : "gm",	"dazuoloc" : 1955},
    "逍遥派"   : {"masterid" : "su xinghe",		"mastername" : "苏星河",	"masterloc" : 1720, "sleeploc" : 1732, "id_family" : "xy",	"dazuoloc" : 1721},
    "武当派"   : {"masterid" : "zhang sanfeng",	"mastername" : "张三丰",	"masterloc" : 2161, "sleeploc" : 2152 , "id_family" : "wd",	"dazuoloc" : 2160},
    "全真教"   : {"masterid" : "ma yu",			"mastername" : "马钰",		"masterloc" : 2232, "sleeploc" : 2250, "id_family" : "qz",	"dazuoloc" : 2231},
    "魔教"  	: {"masterid" : "jin shi",			"mastername" : "金狮",		"masterloc" : 2741, "sleeploc" : 2735, "id_family" : "mj",	"dazuoloc" : 2729},
    "少林派"   : {"masterid" : "xuanci dashi",		"mastername" : "玄慈大师",	"masterloc" : 1887, "sleeploc" : 1924, "id_family" : "sl",	"dazuoloc" : 1886}
   };
var _assist_init_data={}
function prompt_id(){
    Userinput.prompt("callback_id","设置id","",GetVariable("id"))
  }

  function callback_id(name,id,code,data){
   if (code==0){
       SetVariable("id",data)
       Userinput.alert("check_assist_next","ID修改成功","id已经设置为: "+GetVariable("id"))
   }
}
function prompt_passw(){
    Userinput.prompt("callback_passw","设置密码","",GetVariable("passw"))
  }

  function callback_passw(name,id,code,data){
   if (code==0){
       SetVariable("passw",data)
       Userinput.alert("check_assist_next","密码修改成功","密码已经设置为: "+GetVariable("passw"))
   }
}

function prompt_list_fam(){
    var list=Userinput.newlist("选择门派","请选择你的门派",true)
    for (var key in data_familys) {
        var fam=data_familys[key]
        list.append(key,key+" "+ fam.id_family+" "+fam.mastername+fam.masterloc)
    }
    list.send("callback_list_fam")
  }
function callback_list_fam(name,id,code,data){
   if (code==0){
        _assist_init_data["fam"]=data
        check_assist_init()
   }
}
function prompt_weapon(){
    Userinput.prompt("callback_weapon","设置武器ID","如baihongjian",_assist_init_data["weapon"]||"")
  }

  function callback_weapon(name,id,code,data){
   if (code==0){
        _assist_init_data["weapon"]=data
        check_assist_init()
   }
}
function prompt_pfm(){
    Userinput.prompt("callback_pfm","设置绝招","如 yong sword.qixing",_assist_init_data["pfm"]||"")
}

  function callback_pfm(name,id,code,data){
   if (code==0){
        _assist_init_data["pfm"]=data
        check_assist_init()
   }
}
function prompt_confirm(){
    var intro=""
    intro+="你的信息如下:\n"
    intro+="门派: "+_assist_init_data["fam"]+"\n"
    intro+="武器: "+_assist_init_data["weapon"]+"\n"
    intro+="绝招: "+_assist_init_data["pfm"]+"\n"
    intro+="您想以这些信息初始化吗？"
    Userinput.confirm("callback_confirm","确认信息",intro)
}

  function callback_confirm(name,id,code,data){
   if (code==0){
        _assist_init_data["confirm"]=true
        check_assist_init()
   }
}

function check_assist_next(name,id,code,data){
    if (code==0){
        check_assist_init()
    }
}
function check_assist_init(){
    if (GetVariable("id")==""){
        prompt_id()
        return
    }
    if (GetVariable("passw")==""){
        prompt_passw()
        return
    }
    if (!_assist_init_data["fam"]){
        prompt_list_fam()
        return 
    }
    if (!_assist_init_data["weapon"]){
        prompt_weapon()
        return 
    }
    if (!_assist_init_data["pfm"]){
        prompt_pfm()
        return 
    }
    if (!_assist_init_data["confirm"]){
        prompt_confirm()
        return 
    }
    quick_start()
}
function assist_init(){
    _assist_init_data={}
    check_assist_init()
}
function quick_start_fam(fam){
    for (var key in data_familys) {
        var f=data_familys[key]
        if (key==fam){
            world.Note("门派:"+key)
            var initdata={
                "id_pass":f.id_family,
                "id_master":f.masterid,
                "loc_master":f.masterloc,
                "loc_sleep":f.sleeploc,
                "loc_dazuo":f.dazuoloc,
                cmd_npcdie:f.nopowerup?"":"yun powrup;yun shield",
            }
            for (var key in initdata) {
                world.Note("设置变量 "+key+" 为 " +initdata[key])
                world.SetVariable(key,initdata[key])
            }
            return true
        }
      }
      world.Note("门派 "+fam +" 没找到,支持的门派如下")
      for (var key in data_familys) {
        world.Note(data_familys[key].id_family,key)
      }
    return false
}
function quick_start(){
    var fam=_assist_init_data["fam"]
    var weapon=_assist_init_data["weapon"]
    var pfm=_assist_init_data["pfm"]
    quick_start_fam(fam)
    var initdata={
        "bool_accept":"t",
        "bool_echo":"t",
        "bool_miss":"f",
        "cmd_kill":"yun recover;wield "+weapon+";wear "+weapon,
        "cmd_mache":"drop head;dazuo 100",
        "cmd_pfm":pfm=="shot"?"shot":"yun recover;"+pfm,
        "cmd_studying":"yun regenerate;dazuo 100",
        "cmd_wait":"yun recover;dazuo 50",
        "id_weapon":weapon,
        "id_weapon2":weapon,
        "id_weapon3":weapon,
        "list_qask":"很远",
        "max_pot":"400",
        "max_th":"500",
        "min_gold":"50",
        "min_jingli":"0",
        "min_neili":"100",
        "min_pot":"0",
        "num_cmds":"46",
        "num_dazuo":"100",
        "num_fangqi":"1000",
        "num_step":"6",
        "num_tuna":"50",
    }
    for (var key in initdata) {
        world.Note("设置变量 "+key+" 为 " +initdata[key])
        world.SetVariable(key,initdata[key])
    }
    send(GetVariable("id"))
    send(GetVariable("passw"))
    send("y")
    send("alias menter0 enter bao;alias mdz0 dazuo 100;alias mdan1 eat jiuhua wan;alias mdan2 eat jiuhua wan;alias mdan3 touch xxx;alias mdan4 eat jiuhua wan;alias mdan5 dazuo 500;alias gdan0 qu xxx jiuhua wan;alias mtc0 touch xxx;alias mtc touch xxx;alias mjq jiqu")
    send("alias")
    world.Note("初始化完毕，请根据实际情况调整变量和别名")
   }

   function on_script_asssist(){
    var stopped=(query("quest/flag")!="kill")
    var status=stopped?"已停止":"正在进行"
    var list=Userinput.newlist("助理","当前任务"+status+",请选择你需要的帮助",false)
    if (world.GetVariable("num_cmds")==""){
        list.append("assist_init","初始化助理")    
    }else{
        if (stopped){
            list.append("start","开始任务")    
        }else{
            list.append("stop","结束任务")
        }
        list.append("list_loc","前往地点")
        list.append("expmax","设置最大EXP")
        list.append("cmdstudy","设置学习指令")
        list.append("listskill","设置学习内容")
    }
    list.send("do_script_assist")
   }

   function do_script_assist(name,id,code,data){
    switch (data) {
        case "list_loc":
            list_loc()
            break
        case "start":
            set("room/id", -1);
            set("hp/faint", "null");
            set("quest/flag", "kill");
            send("#t+ level;cha;hp;i;unset keep_idle;unset map_prompt");
            close_fb();
            world.doafter(1, "set no_teach prepare");
            break
        case "stop":
            set("quest/flag", "null");
            break
        case "expmax":
            prompt_exp_max()
            break
        case "cmdstudy":
            prompt_study_loc()
            break
        case "listskill":
            prompt_list_skill()
            break
        case "assist_init":
            assist_init()
            break
    }
   }

   function prompt_exp_max(){
    var list=Userinput.newlist("最大EXP","请选择你需要设置的最大EXP",false)
        list.append("99699","99699 npc lv 80 Shot")
        list.append("149699","149699 npc lv 100 Shot上限，命中下降")
        list.append("199699","199699 npc lv 100 使用Pfm")
        list.append("399699","399699 npc lv 125")
        list.append("699699","699699 npc lv 150,无西域，补技能到191和知识类")
        list.append("799699","799699 npc lv 150")
        list.append("1199699","1199699 npc lv 170")
        list.append("1599699","1599699 npc lv 150")
        list.append("1999699","1999699 npc lv 225")
        list.append("2499699","2499699 npc lv 255,closed过火浪")
        list.append("2699699","2699699 npc lv 275")
        list.append("2999699","2999699 npc lv 300")
        list.append("4999699","4999699 npc lv 350")
        list.append("7499699","7499699 npc lv 400")
        list.append("8999699","8999699 npc lv 450")
        list.append("14999699","14999699 npc lv 500")
        list.append("19999699","19999699 npc lv 550")
        list.append("24999699","24999699 npc lv 600")
        list.append("32999699","32999699 npc lv 650")
        list.append("37999699","37999699 npc lv 700")
        list.append("41999699","41999699 npc lv 725")
        list.append("44999699","44999699 npc lv 750")
        list.append("53999699","53999699 npc lv 800")
        list.append("59999699","59999699 npc lv 825")
        list.append("64999699","64999699 npc lv 855")
        list.append("69999699","69999699 npc lv 875")
        list.append("74999699","74999699 npc lv 900")
        list.append("89999699","89999699 npc lv 950")
        list.append("96999699","96999699 npc lv 970")
        list.append("109999699","109999699 npc lv 100")

        list.send("callback_exp_max")
   }
   function callback_exp_max(name,id,code,data){
    if (code==0){
        SetVariable("max_exp",data)
        Userinput.alert("","最大exp设置成功","最大exp已经设置为"+data)
    }
   }

   function prompt_study_loc(){
    var list=Userinput.newlist("选择师傅","请选择你学习的师傅",true)
    list.append("#yanjiu","听涛阁研究(yanjiu) @1949")
    for (var key in data_npcs) {
        var npc=data_npcs[key]
        list.append(npc.id,npc.name+"(xue "+npc.id+") @"+npc.loc)
    }
        list.send("callback_study_loc")
   }

   function callback_study_loc(name,id,code,data){
    if (code==0){
        if (data=="#yanjiu"){
            SetVariable("cmd_study","yanjiu")
            SetVariable("loc_study","1949")
        }else{
            SetVariable("cmd_study","xue "+data)
            SetVariable("loc_study",data_npcs[data].loc)
        }
        Userinput.alert("prompt_list_skill","学习命令修改成功","cmd_study已经设置为: "+GetVariable("cmd_study")+"\nloc_study已经设置为"+GetVariable("loc_study"))
    }
   }

   function prompt_list_skill(){
     var comment=GetVariableComment("list_skill")
     Userinput.prompt("callback_list_skill","设置学习内容",comment?comment:"无备注",GetVariable("list_skill"))
   }

   function callback_list_skill(name,id,code,data){
    if (code==0){
        SetVariable("list_skill",data)
        Userinput.alert("","学习内容修改成功","list_skill已经设置为: "+GetVariable("list_skill"))
    }
   }