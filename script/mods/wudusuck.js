//creat by self 2024-01-31
//在尽量少修改main.js文件的基础上实现五毒教suck
//main do_preare 函数需要加
//eval( Include( "mods/wudusuck.js" ),"mods/wudusuck.js");
/*	} else if (can_wud_suck()) {
		do_wud_suck();
		return;
	} else*/
	
addtri("wud_loc","^[百|千|万]毒窟$","wusuck","on_wud_suck",512);
addtri("wud_bug","^    (食尸蝎|灰背蝎|长螯蝎|铁骨蝎|九尾蝎|黑寡妇|长腿蛛|人面蛛|吸血蛛|大头蜈蚣|金线蜈蚣|百足蜈蚣|阴山天蜈)\\((.+ .+)\\)$","wusuck","on_wud_suck",512);
addtri("wud_sucked","^你(正在修炼中|小心翼翼的将手伸到)","wusuck","on_wud_suck",512);
world.EnableTrigger("wud_sucked",true);
var wudu_needsuck = false;  //	是否需要吸					    		
var wudu_sucked = false;	//是否已经吸
var wudu_locno = 0;			//吸位置序号
var wudu_times = 0;			//吸了几次
var wudu_cmd = "";			//吸取的命令
var wudu_exp = 0;			//判断exp变动，suck一次。

var wudu_suck_locall = "2967,2968,2969,2970,2963";

function init_wudusuck() {
	wudu_needsuck = false;
	wudu_sucked = false;
//	wudu_locno = 0;
	wudu_times = 0;
	wudu_cmd = "";	
	wudu_exp = query("hp/exp");
	world.EnableTrigger("wud_bug",false);
}

function do_wud_suck()
{

	if (query("quest/flag") == "null") return;
	world.EnableTrigger("wud_bug",false);
	var loc = wudu_suck_locall.split(",");
	if (wudu_locno >= loc.length || wudu_locno < 0)
		wudu_locno = 0;

	if (wudu_sucked || wudu_times>=5) {

		init_wudusuck();
		send("i;hp;set no_teach prepare");
		return;
	} else if (query("room/id") != loc[wudu_locno]) {					

		set("nextstep/flag", "COMMANDS");
		set("nextstep/cmds", "set no_teach prepare");
		world.EnableTrigger("wud_loc",true);		
		world.EnableTrigger("wud_bug",false);
		goto(loc[wudu_locno]);
		return;
	} else {
		send("unwield "+ get_var("id_weapon"));
		wudu_times++;
		world.note("五毒suck"+wudu_locno)
		wudu_locno++;
		send(wudu_cmd);
		send("set no_teach prepare");
	}
}	
function can_wud_suck()
{
	//world.note("wudu_exp"+wudu_exp+"ddd"+query("hp/exp"));
	if (query("quest/flag") == "null") 
		return false;
	if (get_var("id_pass").indexOf("wud")==-1)
		return false;
	if (!get_var("bool_wudusuck"))
		return false;
	if (wudu_exp == query("hp/exp"))
		return false;
	else
		wudu_needsuck = true;	
	return wudu_needsuck;		
}
	

function on_wud_suck(name, output, wildcards)
{
	var wcs = wildcards;
	switch (name) {
		case "wud_loc": //^[百|千|万]毒窟$
		    wudu_cmd = "";
			world.EnableTrigger("wud_bug",true);
            break;
		case "wud_sucked": //^你[正在修炼中|小心翼翼的将手伸到]		    
			if (output.indexOf("小心翼翼的将手伸到") != -1)
				wudu_locno--;
			wudu_sucked = true;			
            break;			
		case "wud_bug": //^(食尸蝎|灰背蝎|长螯蝎|铁骨蝎|九尾蝎|黑寡妇|长腿蛛|人面蛛|吸血蛛|大头蜈蚣|金线蜈蚣|百足蜈蚣|阴山天蜈)\((.+ .+)\)$
		    var nn = world.Trim(wcs[1]);
			if (wudu_cmd.indexOf(nn) != -1)
				nn += " 2";
			nn = nn.toLowerCase()
			wudu_cmd += ";yong hand.suck "+nn;
            break;			
	}
}

