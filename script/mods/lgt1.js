//-----
//"lgt" : {"time": 0, "flag" : false,"ready" : false, "cmd" : "","floor":0,"door":0,"npc":"","charm":99},
//			上次完成时间  在塔标记  		
function initlgt()
{
	if (query("lgt/ready"))
		return;
    inittriggers("lgt");
	world.Note("==============重新载入lgt模块================");	
	addtri("lgt_start","^你想.*收杨小邪为弟子","glgt","on_lgt");

	addtri("lgt_later","^(本日闯关你已经试过了，明天中午|你再等等吧，现在)","glgt","on_lgt");

	addtri("lgt_floor","^灵感.*塔\\.第(.*)层$","glgt","on_lgt");
	addtri("lgt_charm","^\\(你还有(.*)张灵符\\)","glgt","on_lgt");
	addtri("lgt_charm1","^你怔怔地望着剩余的(.*)张灵符，大口喘息着，不知道该不该继续","glgt","on_lgt");

	addtri("lgt_heal1","^你(现在气血充盈，不需要疗伤。|运功完毕，吐出一口瘀血，脸色看起来好多了。)","glgt","on_lgt");
	addtri("lgt_up","^(你听到无数天魔在耳边吟唱嘶吼，莫大的压力使你开始神智迷糊了|你现在气血充盈，不需要疗伤|一个空洞的声音在你耳边响起：你在磨蹭什么)","glgt","on_lgt");

	addtri("lgt_end","^(你在灵感(.*)塔上成功敲钟之后，你获得了|然后“噗通”一声栽落在地上。原来是你)","glgt","on_lgt");
	addtri("lgt_wuchi",			"^(看起来武痴想杀死你！|武痴左手两指|武痴双手虚虚实实|武痴轻轻地往上方一飘|武痴凝神闭息|武痴扬手|武痴身形忽然变得诡秘异常|武痴身子忽进忽退|武痴深深吸进一口气|武痴随手抓出)","glgt","on_lgt");	
	addtri("lgt_npc","^杨小邪\\(yang xiaoxie\\)偷偷告诉你：据说上面关押的是：(.*)","glgt","on_lgt");

	addtri("lgt_onoff","^设定环境变数：no_teach = \"lgt (start|end)\"","glgt1","on_lgt");

	AddTimer("t_lgt",0,0,1,"",1024+1,"on_lgttime");
	set_lgt(0);	
	world.EnableTriggerGroup("glgt1",true);
	set("lgt/ready",true);
}


//关闭保护触发和计时器
function set_lgt(flag) {
	if (flag) {
		set("lgt/cmd","");
		set("lgt/floor",0);
		set("lgt/door",0);
		set("lgt/npc","");
		set("lgt/charm",99);		
	}
	world.EnableTriggerGroup("glgt",flag);
	
	world.EnableTimer("t_lgt", flag);
}

//结束灵感塔
function over_lgt(time) {

	add_log("灵感塔完成 finish: "+query("lgt/floor")+"层");
	set("lgt/flag",false);
	set_lgt(0);
	world.EnableTimer("t_kmg", true); 	
	//world.EnableTriggerGroup("ggl",1);	
	var t = (new Date()).getTime();
	if (time>0) t = t - 8*60*60*1000 + time*15*60*1000;
	//set("lgt/time",t);
	set_var("lgt_time", t);
	var cmd = "halt;hp;i;score;set no_teach prepare";
	add_room_cmd(get_var("cmd_pre"));
	set("room/id",2902);
	open_timer1(5,"busy",cmd);	
}

function on_lgt(name, line, wildcards)
{
	var wcs = wildcards;
	switch (name) {
		case "lgt_start": //^你想要收杨小邪为弟子。
		    set_lgt(1);
			world.EnableTimer("t_kmg", false); 
			world.EnableTriggerGroup("gwk",1);  //为什么要打开这个触发组，忘记了。
			var cmd = get_var("cmd_lgt_pre");			
			send(cmd);
            break;
		case "lgt_later":   //^(本日闯关你已经试过了，明天中午|你再等等吧，现在)
			var l_door = query("lgt/door");
			if (line.indexOf("你再等等吧") != -1) 
				l_door ++;
			else 
				l_door = 6;
			set("lgt/door",l_door);			
			switch (l_door) {
				case 0:
					set("lgt/cmd","wu");
					break;				
				case 1: 
					set("lgt/cmd","nu");
					break;
				case 2:
					set("lgt/cmd","eu");
					break;				
				case 3:
					set("lgt/cmd","su");
					break;
				case 4:
					set("lgt/cmd","u");
					//机器人不自动爬up塔。给手动爬的留个位置。fk偷偷爬up塔的。				
				default:			
					if (l_door>5) {
						world.note("爬塔cd错误，四小时后再来");
						over_lgt(4*4);
					}
					else {
						world.note("人满为患，半小时后再来");
						over_lgt(2);
					}				
					break;
			}			
			break;
	
		case "lgt_floor":  //^灵感*塔\.第(.*)层$
			set("lgt/cmd","");
			set("lgt/flag",true);
			set("lgt/floor",wcs[0]);
			world.EnableTimer("t_lgt", true);
			world.EnableTrigger("lgt_up",true);
            break;

        case "lgt_charm":  //^\(你还有(.*)张灵符\)
			var n_charm = wcs[0]-0;
			var cmd;
			set("lgt/charm",n_charm);
			if (n_charm>1)
			   set("lgt/cmd","u");
		    else 
			   set("lgt/cmd","knock zhong");
		    world.EnableTimer("t_lgt", true);
            break;	
/*		case "lgt_charm1":  //^你怔怔地望着剩余的(.*)张灵符，大口喘息着，不知道该不该继续......	
			var n_charm = number(wcs[0]);
			var cmd;
			set("lgt/charm",n_charm);
			if (n_charm>1)
				set("lgt/cmd","u");
			//else 
			//	   set("lgt/cmd","knock zhong");
				world.EnableTimer("t_lgt", true);
            break;	
*/
		case "lgt_npc":  //^杨小邪\(yang xiaoxie\)偷偷告诉你：据说上面关押的是：(.*)
			set("lgt/npc",wcs[0]);			
            break;
		case "lgt_wuchi":  //(看起来武痴想杀死你！|武痴左手两指|武痴双手虚虚实实|武痴轻轻地往上方一飘|武痴凝神闭息|武痴扬手|武痴身形忽然变得诡秘异常|武痴身子忽进忽退|武痴深深吸进一口气|武痴随手抓出
			var ttimer1 = (new Date()).getTime();
			ttimer1 = (ttimer1 - query("connect/time"))/1000;
			if (ttimer1 < 31)				
				return;
			world.note("碰到武痴，自动重连");
			var cmd = get_var("id") + ";" + get_var("passw") 
				+ ";y;#t+ lgt_onoff;set no_teach lgt start";
			reconnect(cmd);			
            break;				
		case "lgt_heal1" : //^你(现在气血充盈，不需要疗伤。|运功完毕，吐出一口瘀血，脸色看起来好多了。)
			if (query("lgt/charm")>1)
			   set("lgt/cmd","u");
		    else 
			   set("lgt/cmd","knock zhong");
			if (wcs[0].indexOf("运功完毕") != -1)
				send("mtc");
			send(get_var("cmd_lgt_pre"));
			break;

		case "lgt_up" ://"^(你听到无数天魔在耳边吟唱嘶吼，莫大的压力使你开始神智迷糊了|你现在气血充盈，不需要疗伤|一个空洞的声音在你耳边响起：你在磨蹭什么)"
			send("halt;" + get_var("cmd_lgt_pre")+";summon "+get_var("id_weapon"));
			world.EnableTrigger("lgt_up",false);			
            break;			
		case "lgt_end":  //^你在灵感西塔上成功敲钟之后，你获得了
			over_lgt(8*4);	
			break;
		case "lgt_onoff":  //"^设定环境变数：no_teach = \"lgt (start|end)\""
			world.EnableTimer("t_kmg", false); 
			if (wcs[0] == "start") {
				send("kill qiu tu");
				if (query("lgt/cmd")=="")
					set("lgt/cmd","u");
				world.EnableTriggerGroup("glgt",true);
				world.EnableTimer("t_lgt", true);	
			} else if (wcs[0] == "end"){
				world.EnableTriggerGroup("glgt",false);
				world.EnableTimer("t_lgt", false);	
				world.note("灵感塔----结束");
			}
			break;			
	}
}

function on_lgttime(name)
{
	switch(name) {
		case "t_lgt":			
			world.EnableTimer("t_pfm", false); 
			world.EnableTimer("t_kmg", false); 
			world.EnableTriggerGroup("gwk",false);
			set("other/getw", 1);
			var cmd = lgt_perform();
			//cmd += ";"+
			cmd += ";yun regenerate;yun inspire;yun heal;hp";
			cmd += ";"+query("lgt/cmd");		
			send(cmd);	
			break;
	}
			
}

function lgt_perform()
{
	var pfm = "";
	if (get_var("lgt_cmd_pfm")!=null && get_var("lgt_cmd_pfm")!="")
		pfm = get_var("lgt_cmd_pfm");	
	else
		pfm = perform();
	return pfm;			
}

