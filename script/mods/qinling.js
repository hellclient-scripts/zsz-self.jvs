var ql_maze = new MyMaze(8);
//	"qinling" :{"ready" : false,"flag" : false,"line":0,"step":0,"count" : 0,"ccount" : 0,"stime" : 0,"ctime": 0,"all_time": 0,"c_eff": 0",t_eff": 0},
//				触发器是否载入， 是否在秦陵副本中，地图行数，阶段，进入次数，完成次数 ，本次开始时间，上次结束时间，副本内共用时。
function initqinling() {
	if (query("qinling/ready"))
		return;
	inittriggers("qinling");
	addtri("ql_enter", "^[> ]*秦始皇陵墓入口$", "gfb_enter", "on_qinling");
	addtri("ql_maze1", "^(> )*地图说明：●表示入口和出口，◎表示迷宫的房间。", "gql_map", "on_qinling");
	addtri("ql_maze2", "^([◎─|◎  |●─|●  ]+)", "gql_map", "on_qinling");
	addtri("ql_maze3", "^([  |│]+)", "gql_map", "on_qinling");
	addtri("ql_dostep", "^[> ]*设定环境变数：no_teach = \"qinling (start|kill)\"", "gql", "on_qinling");
	addtri("ql_npc", "^    皇帝 秦始皇僵尸\\(Qin shihuang\\)", "gql", "on_qinling");
	addtri("ql_kingdie0", "^秦始皇僵尸扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！", "gql", "on_qinling");
	addtri("ql_kingdie", "^    秦始皇僵尸的尸体\\(Corpse\\)", "gql", "on_qinling");
	addtri("ql_nobusy", "^[> ]*你要往这上面镶嵌什么物品？", "gql222", "on_qinling");
	addtri("ql_wkbusy", "^[> ]*你的动作还没有完成，不能移动。", "gql222", "on_qinling");
	addtri("ql_outdoor", "^[> ]*秦始皇陵墓出口$", "gql", "on_qinling");
	AddTimer("t_qinling", 0, 0, 1, "", 1024 + 1, "on_qinlingtime");
	world.EnableTriggerGroup("gfb_enter", 0);
	world.EnableTriggerGroup("gql_map", 0);
	world.EnableTriggerGroup("gql", 0);
	world.EnableTriggerGroup("gql222", 0);
	world.EnableTimer("t_qinling", false);
	world.EnableTimer("timer1", false);
	fk_fox();
	set("qinling/ready", true);
}

//进出副本
function set_qinling(flag) {
	var time_now = new Date().getTime();
	set("qinling/step", 0);
	set("qinling/flag", flag);
	if (flag) {
		add_log("进入秦陵副本");
		set("qinling/count", query("qinling/count") + 1);
		set("qinling/stime", time_now);
	}
	else {
		set("qinling/ctime", time_now);
		var time1 = query("stat/stime");
		if (time1 == 0) {
			set("stat/stime", time_now);
			return;
		}
		var time2 = time_now - time1;
		var cnt = query("qinling/count") - 0;
		if (time2 > 0) {
			set("qinling/c_eff", Math.floor(cnt * 3600 * 1000 / time2));
		}
		time2 = time_now - query("qinling/stime")
		add_log("出副本秦陵副本" + time2 / 1000);
		time2 += query("qinling/all_time");
		set("qinling/all_time", time2);
		if (cnt > 0) {
			set("qinling/t_eff", Math.floor(time2 / 1000 / cnt));
		}
		world.note(ql_report());
		add_log(ql_report());
	}
	world.EnableTriggerGroup("gfb_enter", 0);
	world.EnableTriggerGroup("gql_map", flag);
	world.EnableTriggerGroup("gql", flag);
	world.EnableTriggerGroup("gql222", 0);
	world.EnableTimer("t_qinling", false);
}
function ql_steptrace(dir) {
	var dlar = 0;
	if (dlar == 0) {
		if (dir == "e") ql_maze.cloc = ql_maze.cloc - 0 + 1;
		else if (dir == "n") ql_maze.cloc = ql_maze.cloc - 8;
		else if (dir == "s") ql_maze.cloc = ql_maze.cloc - 0 + 8;
		else if (dir == "w") ql_maze.cloc = ql_maze.cloc - 1;
		world.note("当前位置：" + ql_maze.cloc);
	}
	if (ql_maze.cloc < 0 || ql_maze.cloc > 63) {
		world.note(ql_maze.cloc);
		ql_maze.cloc = 5;
	}
	return;
}

function go_qinling() {
	var tl;
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", "#tg+ gfb_enter;halt;yun recover;yun regenerate;unride;enter door");
	tl = 2819;
	goto(tl);
}

function on_qinling(name, output, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "ql_enter":   //秦始皇陵墓入口
			set_qinling(true);
			set("fuben/type", "qinling");
			send(get_var("ql_cmd_pre") + ";hp;i;s;mazemap;set no_teach qinling start");
			break;
		//开始判断地图
		case "ql_maze1":	// ^地图说明：●表示入口和出口，◎表示迷宫的房间

			//初始化相关设置
			ql_maze.init();
			set("qinling/line", 0);
			world.note("触发成功，开始判断地图");
			break;
		case "ql_dostep":	// ^设定环境变数：no_teach = \"qinling start\"
			if (wcs[0] == "start") {
				set("nextstep/flag", "COMMANDS");
				set("nextstep/cmds", "set no_teach qinling kill");
				var path = ql_maze.goto(ql_maze.end);
				world.EnableTrigger("ql_npc", true);
				world.EnableTriggerGroup("gql_map", false);
				path = "s;" + path + ";s;s";
				//if (get_var("bool_dami")) {
				//    set_var("bool_multistep","true");
				//   set_var("num_step",path.length);
				//}			
				do_walk(path.split(";"));
			} else if (wcs[0] == "kill") {
				world.note("秦陵地宫----开打" + query("qinling/step"));
				world.EnableTimer("t_qinling", true);
			}


			break;
		case "ql_maze3":	// ^([  |│]+) 
			//通过十字交叉判断 是左右都通着，临时数组tmp
			//world.note("竖排通道触发："+wcs[0]);
			//因为│占两个字符，把所有的│替换为数字11，然后再把中间的空格替换为其他可以识别的符号
			//world.note("长度"+wcs[0].length);
			var str = wcs[0].replace(/│/g, "yy");
			//str=str.substring(0,str.length-2);
			//var str1 = wcs[0].substring(7,24).replace(/  /g, ",");
			//world.note(str+"  长度:"+str.length);
			var cot = query("qinling/line");
			if (str.length == 32) {
				var i = 0;
				for (var j = 0; j < str.length; j = j + 4) {
					//world.note(str.substring(j,j+2));
					if (str.substring(j, j + 2) == "yy") {
						ql_maze.addexit(cot * 8 + i, "s");
						//world.note((cot*8+i)+":"+ql_maze.data[cot*8+i]);		
						ql_maze.addexit(cot * 8 + i + 8, "n");
						// world.note(0+":"+ql_maze.data[0]);					
					}
					i = i + 1;
					//world.note(j+"   "+(cot*8+i)+":"+ql_maze.data[cot*8+i]);	
				}

				set("qinling/line", cot + 1);
			}
			break;
		case "ql_maze2":	// ^([◎─|◎  |●─|●  ]+)
			//变量 len长度  bcor颜色 str？   loc位置  lin行  sty？
			var len, bcor, cot, str, loc, lin, sty;
			//获取长度
			cot = query("qinling/line");
			//第一行触发可能有问题，在这块判断mazemap的第一行
			//world.note(wcs[0]);
			//替换所有的空格
			str = wcs[0].replace(/  /g, "┼");
			str = str.substring(0, str.length - 1);
			//world.note("横排通道触发0:"+wcs[0]);
			//world.note("横排通道触发以后str:"+str);
			for (var i = 0; i < 9; i++) {
				//world.note("for循环开始时候的i："+i);
				var tmp1 = i - 1;
				if (str.charAt(2 * i + 1) == "─") {
					//world.note("if循环开始时候的i："+i);
					//world.note(str.substring([2*i+1],1));
					ql_maze.addexit(cot * 8 + i, "e");
					ql_maze.addexit(cot * 8 + i + 1, "w");

				}
				//world.note((cot*8+i)+":"+ql_maze.data[cot*8+i]);

				if (str.charAt(2 * i) == "●" && cot == 0) {
					//ql_maze.cloc = cot*8+i;
					ql_maze.start = cot * 8 + i;
					//	world.note(0+":"+ql_maze.data[0]);		
					//     world.note("入口："+ql_maze.start);
				}
				if (str.charAt(2 * i) == "●" && cot == 7) {
					ql_maze.end = cot * 8 + i;
					//world.note("出口："+ql_maze.end);
				}

			}
			ql_maze.cloc = 4;
			loc = -1;
			break;
		case "ql_npc":  //^    皇帝 秦始皇僵尸\(Qin shihuang\)		    
			set("qinling/step", 1);
			if (output.indexOf("昏迷不醒") != -1)
				set("qinling/step", 2);
			break;
		case "ql_kingdie0":  //^秦始皇僵尸扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！
			world.EnableTimer("timer1", false);
			send("#t+ ql_wkbusy;s");
		case "ql_kingdie":  //^    秦始皇僵尸的尸体
			set("qinling/step", 3);
			break;
		case "ql_nobusy":  //^你要往这上面镶嵌什么物品
			world.EnableTrigger("ql_nobusy", false);
			world.EnableTimer("t_qinling", false);
			ql_step();
			//send("n;kill qin shihuang;"+ql_perform()+";#t+ ql_wkbusy;s");
			break;
		case "ql_wkbusy":  //^你的动作还没有完成，不能移动。
			world.EnableTrigger("ql_wkbusy", false);
			open_timer1(1, "busy0", "#t+ ql_wkbusy;s");
			break;
		case "ql_outdoor":  //^秦始皇陵墓出口			
			let line = JSON.parse(DumpOutput(1))[0]
			var cor = line.Words[0].Color
			if (cor == "Cyan") {
				world.EnableTrigger("ql_wkbusy", false);
				world.EnableTimer("timer1", false);
				send("set no_teach qinling kill;hp");
			}
			world.note("前景颜色：" + cor);
			break;
	}
}
function on_qinlingtime(name) {
	switch (name) {
		case "t_qinling":
			world.EnableTimer("timer1", false);
			world.EnableTimer("t_pfm", false);
			world.EnableTimer("t_kmg", false);
			world.EnableTrigger("ql_nobusy", true);
			world.EnableTriggerGroup("gwk", false);
			var cmd = get_var("ql_cmd_killing");
			cmd += ";yun recover;yun regenerate;yun inspire;yun heal;enchase 1";
			send(cmd);
			break;
	}
}
function ql_perform() {
	var pfm = "";
	if (get_var("ql_cmd_pfm") != null && get_var("ql_cmd_pfm") != "")
		pfm = get_var("ql_cmd_pfm");
	else
		pfm = perform();
	return pfm;
}

function ql_step() {
	var step = query("qinling/step");
	switch (step) {
		case 1:  //发现目标
			send("n;kill qin shihuang;" + ql_perform() + ";#t+ ql_wkbusy;s");
			break;
		case 2: //目标已晕倒
			send("n;kill qin shihuang;" + ql_perform() + ";#t+ ql_wkbusy");
			open_timer1(2, "busy", "#t+ ql_wkbusy;s");
			break;
		case 3: //目标已清除
			set("qinling/ccount", query("qinling/ccount") - 0 + 1);
			send("n;get all;drop long sword;#t+ ql_wkbusy;s;out");
			break;
	}
}

function ql_report() {
	var str = "";
	str += "【秦陵:进" + query("qinling/count") + "次[";
	str += query("qinling/c_eff") + "次/时]";
	str += "成功" + query("qinling/ccount") + "次";
	str += "每次耗时：" + query("qinling/t_eff") + "秒";
	return str;
}

function fk_fox() {
	var foxs = "jayde|show|yuka|fury|fox|dust|foxer";
	var fk = "love1|love2|love3|love4|kiss1|kiss2|kiss3|kiss4|shit|xbc|ri|slap|kickfly|jyin|corpse|555|hammer|trigger|watermelon2|xu2|getall|fuck|banana|mapi1|sing1|sing2|sing3|sing4|sing5|sing6|washf|noshoes|10000y"

	var re = new RegExp("[^;|,:]+", "g");
	foxs = foxs.match(re);
	var ifox = Math.floor(Math.random() * foxs.length);
	fk = fk.match(re);
	var ifk = Math.floor(Math.random() * fk.length);
	var fkfox = "chat* ";
	if (Math.floor(Math.random() * 5) == 0)
		fkfox = "chat ";
	send(fkfox + fk[ifk] + " " + foxs[ifox]);
}