

function initprotect()
{
    if (query("protect/ready"))
       return;
    inittriggers("protect");
	
	addtri("pt_ask","^你向汪剑通打听有关『保护人质』的消息。","ptj","on_protect");
	addtri("pt_ask1","^你向汪剑通打听有关『保护完成』的消息。","ptj","on_protect");

	addtri("pt_start","^汪剑通点了点头，对你说道:蒙古人收买了一批武林败类,好象要暗杀(.*)，你去保护他一下。","ptj0","on_protect",512);  
	addtri("pt_wait","^汪剑通说道：(“.*你先休息一会儿，.*后我再给你派任务。|多吸取点失败的教训，等会再来吧。)","ptj0","on_protect",512);
	addtri("pt_gold","^汪剑通说道：襄阳的百姓岌岌可危，现在你能帮我筹备十两黄金吗？","ptj0","on_protect");
	addtri("pt_fail1","^汪剑通说道：@my_name，你上一次的任务还没完成!","ptj0","on_protect",512);

	
	addtri("pt_shou","^你想要(.*)为弟子","ptj1","on_protect",512);
	addtri("pt_none","^你想收谁作弟子？","ptj1","on_protect");    

	addtri("pt_kill","^你对@my_name的(黑衣人|邪派高手|绝世高手)喝道:大胆狂徒,竟敢在这撒野！！","ptj2","on_protect",512); 
	addtri("pt_complete","^@my_name的(黑衣人|邪派高手|绝世高手).*人质安全了。","ptj2","on_protect",512);  
	addtri("pt_jiqu","^你(感觉自己的实战经验还有欠缺，还无法领会更高境界的武学修养。|将实战中获得的体会心得充分的消化吸收了。|运功完毕，深深吸了口气，站了起来。|现在积累的实战体会还太少。)","ptj2","on_protect");  	

	addtri("pt_fail","^汪剑通说道：你任务还没完成,还不赶紧去做?","ptj_c","on_protect",512);	
	addtri("pt_noquest","^汪剑通说道：你没有领任务,跑这里瞎嚷嚷什麽?","ptj_c","on_protect");
	addtri("pt_finish","^汪剑通说道：什么？这么快就完成任务了？","ptj_c","on_protect");

	addtri("pt_reward","^你被奖励了：","ptj_c1","on_protect"); 
	addtri("pt_exp","^(.*)点实战经验","ptj_c1","on_protect"); 
	addtri("pt_pot","^(.*)点潜能","ptj_c1","on_protect");
	addtri("pt_count","^汪剑通对你说道:你已经连续完成了(.*)次任务。","ptj_c1","on_protect"); 

	AddTimer("timer_nokiller",0,0,550,"",1024+1,"on_pttime");	

	set_protect(true);
	world.Note("重新加载保护触发器完成，非gm id 记得id_pass 增加 gm1 or gm2.非桃花id 增加 th1,th2"); 
	set("protect/ready",true);
}

//关闭保护触发和计时器
function closed_protect() {
	world.EnableTriggerGroup("ptj",0);
	world.EnableTriggerGroup("ptj0",0);	
	world.EnableTriggerGroup("ptj1",0);
	world.EnableTriggerGroup("ptj2",0);
	world.EnableTriggerGroup("ptj_c",0);
	world.EnableTimer("timer_nokiller", false);	
	
}

//初始化保护变量

function set_protect(refresh) {
	closed_protect();
/*	"protect"   : {"step" : 0,"atime" : 0,"ctime" : 0, "name" : "null",  "id" : "","loc_no" : 0, "loc" : "","enemyid" : "","count" : 0, "exp" : 0, "pot" : 0},	*/	
	set("protect/step",0);	//保护任务阶段
	set("protect/name","");	//保护人质名字
	set_var("protect_name", "");
	set("protect/id","");	//保护人质的id
	set("protect/loc_no",0);//人质位置序号
	set("protect/loc",-1);	//出现刺客的位置
	set("protect/enemyid","");	//刺客的id
	if (refresh) {
		set("protect/count",0);	//完成次数
		set("protect/exp",0);	//经验
		set("protect/pot",0);	//潜能
		set("protect/atime",0); //接受任务时间
		set("protect/ctime",0);	//上轮完成时间	
	}
}
//保护接受任务一分钟cd
function can_accept_protect()
{
	if (get_var("list_boss").indexOf("protect") == -1) return false;
	if (query("quest/flag") != "kill") return false;
	var time = (new Date()).getTime();
	if (query("protect/step")>0) return false;
	if (time < query("protect/ctime") - 0 + 60*1000) return false;
	return true;
}

//是否开始去保护npc  杀手30，70，110，150出现
//2
function can_go_protect()
{
	
	if (get_var("list_boss").indexOf("protect") == -1) return false;
	var step = query("protect/step");
	if (step ==0 || step>6) return false;
	if (query("quest/flag") != "kill") return true;
	var time = (new Date()).getTime();
	time = time - query("protect/atime");
	time = time/1000;
	jishi("检查时间"+time+"dd");
	if ((time < 10) || (time >27 && time <50)) {
		return false;		
	} else 
//	if (time > 605 && step>3){
	if (time > 605){
		//超时，假装完成了。
		set("protect/step",6);
		set("protect/name", "保护完成");
		set_var("protect_name", "保护完成");		
		return true;		
	} else 
		return true;
}
/*protect/step
0:	未接任务
1：	接任务
2:	接任务后，保护前学习阶段
3： 开始保护
4： 战斗中
5： 战斗失败。补充阶段
6： 战斗结束，准备回去接任务
7:	保护失败 ？？
*/
function do_protect()
{
	var step = query("protect/step");
	var tl;
	world.EnableTimer("timer_nokiller", false);
	world.EnableTimer("t_kmg", true);
	switch(step) {
		case 1:
		case 2:
		case 3:
			go_protect();
			return;
		case 4:
		case 5:
			set("nextstep/flag", "COMMANDS");  
			var nid = query("protect/enemyid");
			set("nextstep/cmds", "#tg+ ptj2;kill "+nid+";#ts+ t_pfm;#ts+ timer_nokiller;"+perform());
			tl = query("protect/loc");
			break;
		case 6:
			set("nextstep/flag", "COMMANDS");
			set("nextstep/cmds", "#tg+ ptj;mjq;ask wang jiantong about 保护完成;halt");
			tl = 174;
			break;			
		default :			
			if (query("quest/flag") != "kill")
				return;
			tl = 174;
			set("nextstep/flag","COMMANDS");
			set("nextstep/cmds", "#tg+ ptj;ask wang jiantong about 保护人质");
			break;		
	}
	goto(tl);
}

function on_pttime(name)
{
	switch(name) {
		case "timer_nokiller":			
			jishi("killer没出现");
			closed_protect();
			set("protect/loc_no", 0);
			set("protect/step", 1);
			world.EnableTimer("timer_nokiller",false);
			open_timer1(1, "busy", "set no_teach prepare");		
			break;
	}
			
}

function on_protect(name, output, wildcards)
{
	var wcs = wildcards;
	switch (name) {
		case "pt_ask":	// ^你向汪剑通打听有关『保护人质』的消息。
			world.EnableTriggerGroup("ptj0", 1);
			break;
		case "pt_ask1":	// ^你向汪剑通打听有关『保护完成』的消息。
			world.EnableTriggerGroup("ptj_c", 1);
			break;
		case "pt_start":	// ^汪剑通点了点头，对你说道:蒙古人收买了一批武林败类,好象要暗杀(.*)，你去保护他一下。
			closed_protect();			
			set("protect/step", 1);			
			var nn = wcs[0];
			var loc, npcid;
			set("protect/name", nn);	
			jishi("接受任务保护"+query("protect/name"));
			set("protect/atime",(new Date()).getTime());
			
			send("hp;i;set no_teach prepare");
			//go_protect();
			break;
			
		case "pt_gold":   //汪剑通说道：襄阳的百姓岌岌可危，现在你能帮我筹备十两黄金吗？
			send("give 10 gold to wang jiantong");
			jishi("花钱！！！！！！！！！！！！");
		case "pt_noquest":   //汪剑通说道：你没有领任务,跑这里瞎嚷嚷什麽?
			world.EnableTriggerGroup("ptj0", 0);
			set("protect/step", 0);
		    send("#tg+ ptj0;ask wang jiantong about 保护人质");			
		    break;
		
		case "pt_wait": //^汪剑通说道：“.*你先休息一会儿，.*后我再给你派任务。
			set_protect(false);
			set("protect/ctime",(new Date()).getTime());
			send("halt;hp;i;set no_teach prepare");
			
	      break; 	

		case "pt_fail1": //^汪剑通说道：@my_name，你上一次的任务还没完成!
		case "pt_fail": //^汪剑通说道：你任务还没完成,还不赶紧去做?
			closed_protect();				
			add_log("任务还没完成!:人质[" + query("protect/id") + "]出错");
			if (query("protect/name") == "" || query("protect/name") == "保护完成") {
				send("ask wang jiantong about 放弃保护");
				send("halt;hp;i;set no_teach prepare");
			}
			else {
				set("protect/step", 1);
				set("protect/loc_no", 0);
				set("protect/loc", -1);
				jishi("错误任务保护"+query("protect/name"));
				do_protect();
			};
			//是不是还有打不过的情况
	      break; 			
		
		case "pt_shou":  //^你想要收@protect_name为弟子。
			jishi("开始保护"+query("protect/name"));
			world.EnableTimer("timer_nokiller", true);
			world.EnableTriggerGroup("ptj1", 0);
			world.EnableTriggerGroup("ptj2", 1);

			set("protect/step", 3);			
			send(get_var("cmd_protect"));
			world.doafter(1,"jiqu");			
			break;
		case "pt_none": //^你想收谁作弟子？
			jishi("这里没有"+query("protect/name"));
		    world.EnableTriggerGroup("ptj0", 0);
			world.EnableTriggerGroup("ptj1", 0);		
			world.EnableTriggerGroup("ptj2", 1);//没有npc也打开。说不定刷新了呢。
			set("protect/loc_no", query("protect/loc_no")+1);
			
			do_protect();

			break;
		case "pt_kill": //^你对@my_name的(黑衣人|邪派高手|绝世高手)喝道:大胆狂徒,竟敢在这撒野！！		
			
			world.EnableTriggerGroup("ptj2", 0);
			world.EnableTrigger("pt_jiqu",false);
			world.EnableTimer("timer_nokiller", false);			
			set("protect/step", 4);	
			var nid = get_var("id")+"'s ";
			if (output.indexOf("黑衣人") != -1)
				nid += "heiyi ren";
			else if  (output.indexOf("邪派高手") != -1)
				nid += "xiepai gaoshou";
			else if  (output.indexOf("绝世高手") != -1)
				nid += "jueshi gaoshou";		
			set("protect/enemyid",nid);
			set("protect/loc", query("room/id"));
			jishi("杀手出现:"+nid+":");
			var cmd="#tg+ ptj2;halt;kill "+nid;
			if (query("hp/eff_qi") > 70)
				  cmd += ";" + world.GetVariable("cmd_kill");
			cmd+=";"+perform();
			send(cmd);
			open_pfm();
			break;
		case "pt_complete": //^@my_name的(黑衣人|邪派高手|绝世高手).*人质安全了。
			jishi("人质安全了");
			world.EnableTriggerGroup("ptj2", 0);
			world.EnableTimer("t_pfm", false);			
			set("protect/step", 6);				
			set("protect/name", "保护完成");
			set_var("protect_name", "保护完成");
			do_protect();	    
			break; 		
		case "pt_finish": //^汪剑通说道：什么？这么快就完成任务了？
			set_protect(false);					
			set("protect/ctime",(new Date()).getTime());
			set("hp/dispel", true);
			set("weapon/id",get_var("id_weapon"));
			send("halt;look "+get_var("id_weapon")+";i;hp;set no_teach prepare");	
			world.EnableTriggerGroup("ptj_c1",1);
		case "pt_reward": //^你被奖励了：		
			//set("protect/ctime",(new Date()).getTime());
			//set("protect/step", 0);
			break;
		case "pt_exp": //
	        world.EnableTrigger("pt_exp", false);
		    var exp = number(wcs[0]);
			exp += query("protect/exp");
			set("protect/exp",exp);
			break;		
		case "pt_pot": //
	        world.EnableTrigger("pt_pot", false);
		    var pot = number(wcs[0]);			
			pot += query("protect/pot");
			set("protect/pot",pot);
            break;				 
		case "pt_count": //^汪剑通对你说道:你已经连续完成了(.*)次任务。
			
			var ct = number(wcs[0]);
			set("protect/count",ct);
		
			ct = query("protect/ccount") - 0 + 1;
			set("protect/ccount", ct);			
			jishi("任务完成:"+query("protect/count"));
			world.EnableTriggerGroup("ptj_c1",0);	
			break;	  
		case "pt_jiqu": //^你(感觉自己的实战经验还有欠缺，还无法领会更高境界的武学修养。|将实战中获得的体会心得充分的消化吸收
			var cmd="yun recover;hp;dazuo "+Math.round(query("hp/qi") / 2);
			send(cmd);
			break;  
		case "findnpc" :
			//查询npc位置的触发，基本可以删除了。
			var nn = world.Trim(wcs[0]);
			world.note("目标："+nn);
			if ((protect_needs[nn]!= null) && protect_npcs[nn]== null)
//				add_log("自动查询():人质[" + nn + "] id [" + wcs[1].toLowerCase()+"],loc:"+query("room/id"));
				add_log("\"" + nn + "\"		\:\{\"id\" \:" + wcs[1].toLowerCase()+"\"\,		\"loc\" \: "+query("room/id")+"\}\,");
			break;				
	}
}

function jishi(step)
{
	var date = new Date();
	var time2 = date.getTime();
	var lastk=query("protect/atime");
	var num_lk =(time2-lastk)/1000;	
	world.note(step+"：距离上次计时"+ num_lk+"秒");	
//	add_log(step+"：距离上次计时"+ num_lk+"秒");
}

function go_protect()
{
	var nn = query("protect/name");
	var l_no = query("protect/loc_no");
	if (protect_npcs[nn] == null) {
		add_log("query():人质[" + nn + "]不存在");
		world.note("protect name:"+nn+"不存在！");
		return;
	};	
	
	var npcid = protect_npcs[nn]["id"];
	if (npcid==null || npcid.length<2) {
		add_log("query():人质[" + nn + "]不存在");
		return;
	};
	set_var("protect_name", nn);
	set("protect/id",npcid);
	var loc_list  = protect_npcs[nn]["loc"];
	var loc = loc_list.split(";");
	if (l_no >= loc.length || l_no < 0) {
		add_log("query():人质[" + nn + "]没找到");
		return m_FAIL;   //没找到。需要深化
	};		
	set("protect/step",2);
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", "#tg+ ptj1;shou "+query("protect/id"));
	var tl = loc[l_no];
	jishi("准备去:"+tl);
	goto(tl);
}

var protect_npcs = {
	"李博渊"	: {"id" : "li boyuan",			"loc" : "350"},
	"慧通禅师"	: {"id" : "huitong chanshi",	"loc" : "364"},
	"海公公"	: {"id" : "hai gonggong", 		"loc" : "1420"},
	"小桂子"	: {"id" : "xiao guizi",			"loc" : "1420"},	
	"红娘"		: {"id" : "hong niang",			"loc" : "922"},
	"南海神尼"	: {"id" : "nanhai shenni",		"loc" : "1468"},
	"西厂官兵" 	: {"id" : "guan bing",			"loc" : "1380"},	
	"张兰香"	: {"id" : "zhang lanxiang", 	"loc" : "317"},	
	"马超兴" 	: {"id" : "ma chaoxing", 		"loc" : "34"},	
	"哈达尼" 	: {"id" : "ha dani", 			"loc" : "1219"},	
	"阿凡提" 	: {"id" : "afanti",				"loc" : "1655"},	
	"独孤求败" 	: {"id" : "dugu qiubai", 		"loc" : "1837"},
	"一灯大师" 	: {"id" : "yideng dashi",		"loc" : "534"},
	"扫地僧"	: {"id" : "saodi seng",			"loc":	"636"},	
	"万青山"	: {"id" : "wan",				"loc" : "336"},	
	"唐槐"		: {"id" : "tang huai", 			"loc" : "682"},
	"老夫子" 	: {"id" : "lao fuzi",			"loc" : "964"},
	"老张" 		: {"id" : "lao zhang",			"loc" : "286"},
	"红花会众" 	: {"id" : "hong hua", 			"loc" : "829"},	
	"李沅芷" 	: {"id" : "li yuanzhi", 		"loc" : "886"},
	"东厂官兵"	: {"id" : "guan bing", 			"loc" : "1311"},
	"樊纲"		: {"id" : "fan gang", 			"loc" : "1346"},
	"谢烟客" 	: {"id" : "xie yanke",			"loc" : "2711"},	
	"黄裳" 		: {"id" : "huang shang",		"loc" : "577"},		
	"欧阳克"	: {"id" : "ouyang ke",			"loc" : "22"},	
	"丁当" 		: {"id" : "ding dang", 			"loc" : "1741"},	
	"丁不三" 	: {"id" : "ding busan", 		"loc" : "1741"},	
	"张天师"	: {"id" : "zhang tianshi",		"loc" : "981"},	
	"阎基"		: {"id" : "yan ji",				"loc" : "1232"},
	"陆菲青"	: {"id" : "lu feiqing",			"loc" : "2466"}, 
	"江百胜"	: {"id" : "jiang baisheng",		"loc" : "1696"},
	"老鸨婆"	: {"id" : "laobao po",			"loc" : "1293"},
	"胡掌柜"	: {"id" : "hu zhanggui",		"loc" : "1278"},
	"花农"		: {"id" : "hua nong",			"loc" : "1555"},
	"祭司"		: {"id" : "ji si",				"loc" : "488"},	
	"多隆"		: {"id" : "duo long",			"loc" : "1330"},	
	"张翠山"	: {"id" : "zhang cuishan",		"loc" : "1477"},	
	"玄贞道长"	: {"id" : "xuan zhen",			"loc" : "1345"},	
	"梅剑"		: {"id" : "mei jian",			"loc" : "2012"},
	"兰剑" 		: {"id" : "lan jian",			"loc" : "2012"},	
	"高升泰"	: {"id" : "gao shengtai", 		"loc" : "462 "},
	"北京官兵"	: {"id" : "guan bing",			"loc" : "1356"},
	"城门督察"	: {"id" : "du cha",				"loc" : "1356"},	
	"封弓影"	: {"id" : "feng gongying",		"loc" : "13"},
	"归二娘"	: {"id" : "gui erniang",		"loc" : "1424"},
	"双儿" 		: {"id" : "shuang er",			"loc" : "2898"},
	"张衡"		: {"id" : "zhang heng",			"loc" : "372"},
	"阿庆嫂" 	: {"id" : "aqing sao",			"loc" : "50"},
	"采药人"	: {"id" : "caiyao ren",			"loc" : "1635"},
	"御前侍卫"	: {"id" : "shi wei",			"loc" : "1419"},
	"萧员外"	: {"id" : "xiao yuanwai",		"loc" : "260"},	
	"唐掌柜"	: {"id" : "tang hua",			"loc" : "696"},	
//	"游方道人"	: {"id" : "youfang daoren",		"loc" : "7,13,14,9"},	//四处晃动	
//	"茅十八" 	: {"id" : "mao shiba",			"loc" : "52;49;40;0;41;50;54;76;55;1454"},	 //四处晃动	
	"孙剥皮"	: {"id" : "sun baopi",			"loc" : "963"},
	"越女" 		: {"id" : "yue nv", 			"loc" : "868"},
	"左全" 		: {"id" : "zuo quan", 			"loc" : "1927"},
	"幽冥道人"	: {"id" : "youming daoren",		"loc" : "398"},	
	"杨过"		: {"id" : "yang guo",			"loc" : "1956"},	
	"傣族首领" 	: {"id" : "daizu shouling",		"loc" : "467"},
	"张朝唐"	: {"id" : "zhang chaotang",		"loc" : "408"},	
	"胡庆余"	: {"id" : "hu qingyu",			"loc" : "824"},
	"李可秀"		:{"id" :"li kexiu",			"loc" : "818"},	
	"葵花太监"	: {"id" : "kuihua taijian",		"loc" : "1289"},	
	"时九公"	: {"id" : "shi jiugong",		"loc" : "338"},	
	"滕一雷"	: {"id" : "teng yilei",			"loc" : "1218"},
	"程英"		: {"id" : "cheng ying",			"loc" : "1988"},	
	"酸秀才"		:{"id" :"xiu cai",			"loc" : "1336;1352"}
};

