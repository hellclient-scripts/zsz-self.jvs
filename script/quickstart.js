var data_familys = {
    "桃花岛"   : {"masterid" : "huang yaoshi",		"mastername" : "黄药师",	"masterloc" : 1990, "sleeploc" : 1995, "id_family" : "th",	"dazuoloc" : 1994},
    "关外胡家" : {"masterid" : "hu fei",			"mastername" : "胡斐",		"masterloc" : 2356, "sleeploc" : 2359, "id_family" : "hu",	"dazuoloc" : 2361},
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

function quick_start_fam(fam,yanjiu){
    for (var key in data_familys) {
        var f=data_familys[key]
        if (f.id_family==fam){
            world.Note("门派:"+key)
            var initdata={
                "id_pass":fam,
                "id_master":f.masterid,
                "loc_master":f.masterloc,
                "loc_sleep":f.sleeploc,
                "loc_dazuo":f.dazuoloc,
                "cmd_study":yanjiu?"yanjiu":"xue "+f.masterid,
                "loc_study":yanjiu?"1949":f.masterloc,
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
function quick_start(line){
    var data=line.split("|")
    if (data.length!=4){
        world.Note("----------------")
        world.Note("快速设置格式错误")
        world.Note("正确格式为 #quickstart 门派简写|expmax|武器ID|pfm")
        world.Note("如:")
        world.Note("#quickstart jz|799599|sworda|yun recover;yong sword.kuang")
        return
    }
    if (get_var("num_cmds")!=""){
        world.Note("num_cmds不为空，不是全新的world文件,请检查")
        return
    }
    var fam=data[0]
    var expmax=data[1]
    var weapon=data[2]
    if (isNaN(expmax)){
        world.Note("expmax不是数字")
        return
    }
    if (expmax-0<50000){
        world.Note("expmax不能小于50000")
        return
    }
    var pfm=data[3]
    if (!quick_start_fam(fam,expmax>800000)){
        return
    }
    var initdata={
        "bool_accept":"t",
        "bool_echo":"t",
        "bool_miss":"f",
        "cmd_kill":"wield "+weapon+";wear "+weapon,
        "cmd_mache":"drop head;dazuo 100",
        "cmd_pfm":pfm,
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
        "max_exp":expmax,
        "num_tuna":"50",
    }
    for (var key in initdata) {
        world.Note("设置变量 "+key+" 为 " +initdata[key])
        world.SetVariable(key,initdata[key])
    }
    send("alias menter0 enter bao;alias mdz0 dazuo 100;alias mdan1 eat jiuhua wan;alias mdan2 eat jiuhua wan;alias mdan3 touch xxx;alias mdan4 eat jiuhua wan;alias mdan5 dazuo 500;alias gdan0 qu xxx jiuhua wan;alias mtc0 touch xxx;alias mtc touch xxx;alias mjq jiqu")
    send("alias")
    world.Note("初始化完毕，请根据实际情况调整变量和别名")
   }