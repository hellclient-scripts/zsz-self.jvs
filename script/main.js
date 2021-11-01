//--------------------------------------------------------------------------------
var Dir_sh = {"east" : "e", "south" : "s", "west" : "w", "north" : "n", "southeast" : "se", "southwest" : "sw", 
		"northeast" : "ne", "northwest" : "nw", "eastup" : "eu", "eastdown" : "ed", "southup" : "su", 
		"southdown" : "sd", "westup" : "wu", "westdown" : "wd", "northup" : "nu", "northdown" : "nd", 
		"up" : "u", "down" : "d", "enter" : "enter", "out" : "out", "cross" : "cross"};

var Dir_re = {"e" : "w", "s" : "n", "w" : "e", "n" : "s", "se" : "nw", "sw" : "ne", "ne" : "sw", "nw" : "se", 
		"eu" : "wd", "ed" : "wu", "su" : "nd", "sd" : "nu", "wu" : "ed", "wd" : "eu", "nu" : "sd", 
		"nd" : "su", "u" : "d", "d" : "u", "enter" : "out", "out" : "enter", "cross" : "cross"};

//--------------------------------------------------------------------------------
// 全局变量。
var dbase_data = {
	"walk"       : "null",
	"xiang":{},
	"search"     : {"flag" : ""},
	"maze"       : {"count" : 0, "dir" : "null"},
	"room"       : {"name" : "null", "id" : -1, "dir" : "", "cmd" : "", "miss" : 2763, "chat" : 2046},
	"nextstep"   : {"flag" : "", "cmds" : "", "loc" : 0},
	"quest"      : {"flag" : "null", "far" : 0, "info" : 0, "count" : 0, "master" : true, "letter" : false},
	"stat"       : {"stime" : 0, "minute" : 0, "count" : 0, "eff" : 0,"helped":0,"busy":0,"busycount":0,"busyeff":0},
	"info"       : {"id" : "", "list" : ""},
	"npc"        : {"name" : "null", "id" : "", "loc" : "", "find" : 0, "coor" : -1, "status" : "null", "wd" : 0,
			"corpse" : 0, "head" : 0,"onkill" : "","busystart":0},
	"dispel"     : {"flag" : "", "next" : "", "count" : 0, "count1" : 0},
	"connect"    : {"cmds" : "", "auto" : false},
	"stab"       : {"flag" : true, "miss" : true, "index" : 0},
	"weapon":	{"id":"","dur":0},
	"weapons":{},
	"deposit":0,
	"allitem":{},
	"item"       : {"food" : 0, "shuidai" : 0, "silver" : 0, "zhen" : 0, 
			"gold" : 0, "9hua" : 0, "qlkey" : 0, "money" : 0, "buy" : "null", "arrow" : 0, "gong" : 0, "lsword" : 0,"iblade":0, "gangbiao" : 0, "cash" : 0,
			"sell" : "null", "gift" : "null", "wuqi" : 1, "qu" : "null", "flag" : false, "load" : false},
	"hp"         : {"exp" : 1, "pot" : 1, "neili" : 1, "qi" : 1, "eff_qi" : 90, "eff_jing" : 90, "max_jing" : 100, 
			"max_qi" : 100, "max_neili" : 1, "max_jingli" : 1, "food" : 1, "water" : 1, "jing" : 1, 
			"jingli" : 1, "th" : 1, "dispel" : false, "faint" : "null", "pot_full" : false, "level" : 0},
	"timer"      : {"count" : 0, "time" : 0, "flag" : "null", "cmd" : "null", "pfm" : 0, "idle" : false},
	"other"      : {"nextstep" : "", "loc" : "", "focus" : true, "heal" : "", "sleep" : 0, "jiqu" : 0, "study" : 0, "n_yj" : 0, "n_lx" : 0,
			"qiankun" : false, "brief" : false, "trace" : false, "walk" : false, "backup" : false, "touch" : true, "mtc":false,
			"getw" : 0, "tell" : 0, "loc1" : ""},
	"askyou"     : {"flag" : false, "loc" : null, "index" : 0, "idpt" : 0, "count" : 0, "none" : false},
	"boss"       : {"start" : false, "name":"","kill" : "", "step" : 0, "seadragon" : 0, "dongfang" : 0, "jiangshi" : 0, "juxianzhuang" : 1, "digong" : 0, "xuemo" : 0, "target1" : 0, "target2" : 0, "target3" : 0, "target4" : 0, "target5" : 0, "target6" : 0},
	"xuemo"		: {"npc" : "", "step" : 1,"target" : false,"target1" : false, "target2" : false, "target3" : false, "target4" : false, "target5" : false, "target6" : false },
	"digong"	: {"npc" : "", "step" : 1, "g_getk" : false,"n_gman" : 0,"passwd" : "a"},
	"trceatlu":false,
	"miss":{"fail":false,"until":0},
	};    

var npc_id       = new Array();
var cmd_count    = new Array();             
var step_walk    = new MyArray();        
var auto_search  = new MySearch(3);
//var mapper       = new ActiveXObject("mapper.path");
eval(Include("mapper.js"),"mapper.js")
mapper.open("rooms.h")
mapper.setmissloc(get_var("list_mloc"))
mapper.addhouse(get_var("house"))
var m_FAIL       = "-333";
var dg_maze      = new MyMaze(10);
//--------------------------------------------------------------------------------
eval( Include( "Static_Data.h" ) ,"Static_Data.h");	
eval( Include( "queue.js" ),"queue.js");
eval( Include( "data.js" ),"data.js");
eval( Include( "assistant.js" ),"assistant.js");
eval( Include( "weak.js" ),"weak.js");
eval( Include( "helpfind.js" ),"helpfind.js");
eval( Include( "notify.js" ),"helpfind.js");
eval( Include( "mods.js" ),"mods.js");
//--------------------------------------------------------------------------------
function Include( FileName ) {
	var FileScriptingObject = new ActiveXObject("Scripting.FileSystemObject");
	var path = world.GetInfo(35);
	path = path.substring(0, path.lastIndexOf("\\"));
	var File = FileScriptingObject.OpenTextFile( path + "\\" + FileName, 1);
	var Code = File.ReadAll(); 
	world.Note("Include Script File: " + FileName); 
	File.Close();
	return( Code );
} 

function MySearch(dp)
{
	this.data = new Array(dp);
	this.exit = new Array(dp+1);
	this.index = 0;
	this.depth = dp;
	this.dir = "";

	this.back = function() {
		var ix = this.index;
		var dr = dir_reverse(this.dir);
		if (dr != m_FAIL)
			this.data[ix] = dr;

		return dr;
	};

	this.next = function(ex) {
		var et = "";
		var fg = false;
		var ix = this.index;
		if (this.exit[ix] == null) 
			this.exit[ix] = "";

		//判断当前房间的出口是否已经走过。			
		for (var i=0; i<ex.length; i++)
			if (this.exit[ix].indexOf(("-" + ex[i] + "-")) == -1) {
				et = ex[i];	
				fg = true;
				break;								
			}
		
		//如果当前房间的出口都走过并且为起点房间则结束。
		if (!fg && ix == 0)
			return m_FAIL;

		if (fg && ix < this.depth) {
			this.data[ix] = et;
			this.exit[ix] += "-" + et + "-";
			this.exit[(ix + 1)] = "-" + dir_reverse(et) + "-";
			this.dir = et;
			this.index++;
			return et;
		} 

		et = dir_reverse(this.data[ix - 1]);
		this.dir = et;
		this.index--;
		return et;
	};
}

function MyArray(pra)
{
	this.data = pra;
	this.index = 0;
	this.dir = "";
	this.stepnum = 0;
	this.blockend = 0;

	this.back = function() {
		if (this.index <= 0) 
			return m_FAIL;

		this.index--;
		this.dir = dir_reverse(this.dir);
		return this.dir;
	};

	this.eof = function() {
		if (this.index >= this.data.length)
			return true;
		else
			return false;
	};

	this.eob = function() {
		if (this.index >= this.blockend)
			return true;
		else
			return false;
	};

	this.next = function() {
		if (this.index >= this.data.length)
			return m_FAIL;
		
		this.dir = this.data[this.index++];
		return this.dir;
	};

	this.block = function(ns) {
		var bk;
		var num = 0;
		var st = this.index;
		var ed = ns - 0 + st;
		if (ed >= this.data.length)
			ed = this.data.length;

		if (st >= ed) 
			return m_FAIL;

		for (var i=st; i<ed; i++) {
			num++;
			if (this.data[i].indexOf("goto") != -1
			|| this.data[i].indexOf("cross") != -1
			|| this.data[i].indexOf("。") != -1) {
				bk = this.data.slice(st, (i + 1));
				this.stepnum = num;
				this.blockend = i + 1;
				return (bk.join(";"));
			}
		}
		this.stepnum = num;
		this.blockend = ed;
		bk = this.data.slice(st, ed);
		return (bk.join(";"));
	};
}

//--------------------------------------------------------------------------------
function init_cmd_count()
{
	var num = get_var("num_cmds") - 0;
	cmd_count = new Array(num);
	for (var i=0; i<num; i++) 
		cmd_count[i] = 0;		
}

function get_cmd_delay()
{
	var date = new Date();
	var time = date.getTime();
	var num = get_var("num_cmds") - 0;
	if (cmd_count.length != num) init_cmd_count();

	var delay = time - cmd_count[0];
	if (delay < 0) delay = 0;

	delay = 2100 - delay;
	if (delay < 0) delay = 0;

	cmd_count[0] = time - 0;
	cmd_count.sort();
	return delay;
}

function query(str,no_mfail)
{
	if (str == null) {
		var qr = "";
		world.note("=-----------查询结果-----------=");
		for (ky in dbase_data) {
			if (dbase_data[ky].constructor == Object) {
				qr += ky + " = {"; 
				for (ky2 in dbase_data[ky])
					qr += ky2 + " : " + dbase_data[ky][ky2] + ", ";

				qr += "}\n";
			} else 
				qr += ky + " = " + dbase_data[ky] + "\n";
		}

		world.note(qr + "=------------------------------=");
		return m_FAIL;
	}

	var re = new RegExp("[^\/]+", "g");
	var ar = str.match(re);
	if (ar.length < 1) {
		world.note("query():变量[" + str + "]不存在！");
		return no_mfail?null:m_FAIL;
	}

	var qr = dbase_data;
	for (var i=0; i<ar.length; i++) {
		qr = qr[ar[i]];
		if (qr == null) {
			world.note("query():变量[" + str + "]不存在！");
			return no_mfail?null:m_FAIL;
		}
	}

	return qr;
}

function set(flag, value)
{
	if (flag == null || flag == "")
		return;

	var re = new RegExp("[^\/]+", "g");
	var ar = flag.match(re);
	switch (ar.length) {
		case 1: 
			dbase_data[ar[0]] = value;
			break;
		case 2:
			if (dbase_data[ar[0]] == null)
				dbase_data[ar[0]] = new Object;

			dbase_data[ar[0]][ar[1]] = value;
			break;
		case 3:
			dbase_data[ar[0]][ar[1]][ar[2]] = value;
			break;
		default:
			world.note("err(set()):长度不能大于3!");
			break;
	}

	if (ar[0] == "quest" || ar[0] == "npc" || ar[0] == "nextstep")
		set_status();
}

var newlinere=/\n/g

function GetCmd(name){
	var list=world.GetVariable("list_cmd").replace(newlinere,"|").split("|")
    for (var index in list) {
		var data=world.SplitN(list[index],":",2)
		if (data.length>1){
			if (data[0]==name){
				return data[1]
			}
		}
	}
	return ""
}
//--------------------------------------------------------------------------------
function get_room(str)
{
	mapper.exec("mush " + str);
	var res = mapper.result;
	if (res == null) {
		world.note("get_room():无效输入[" + str + "]");
		return m_FAIL;
	}

	if (res.indexOf("加载地图") != -1) {
		world.note("get_room():请加载地图文件");
		return m_FAIL;
	}

	if (res == "null") return m_FAIL;

	return res;
}

function get_exit_id(id, dir)
{
	mapper.exec("mush exitid " + id + ":" + dir);
	var res = mapper.result;

	if (res == null || res == "null") return -1;
	return res - 0;
}

function get_room_id(nm)
{
	mapper.exec("mush " + nm);
	var res = mapper.result;
	if (res == null || res == "null") return m_FAIL;
	return res.split(",");
}

function get_path(fl, tl)
{
	if (fl == -1 || tl == -1) return m_FAIL;

	if (("," + tl + ",").indexOf("," + fl + ",") != -1) return "";

	var str, pas;

	pas = get_var("id_pass");
	if (get_var("bool_miss") && query("stab/miss")){
		var date = new Date();
		var time = date.getTime();
		if (time>query("miss/until")){
	 		pas += "," + get_var("id");
		}
	}
	mapper.exec("mush " + fl + " " + tl + " " + pas);
	str = mapper.result;
	if (str == "null") {
		world.note("get_path:" + fl + "->" + tl + "没有路径！");
		add_log("get_path:" + fl + "->" + tl + "没有路径！");
		return m_FAIL;
	} else {
		var re = /·/g;
		str = str.replace(re, "");
		re = /！/g;
		str = str.replace(re, "。");
		re = /#nu;/g;
		str = str.replace(re, "");
		return str;
	}
}

function get_area_path(lcs, dep)
{
	mapper.exec("mush areapath " + lcs + " " + dep);
	var str = mapper.result;
	if (str == "null") {
		world.note("getareapath:没有路径！");
		add_log("getareapath:" + query("room/id") + " 没有路径！");
		return m_FAIL; 
	} else {
		var re = /·/g;
		str = str.replace(re, "");
		re = /！/g;
		str = str.replace(re, "。");
		return str;
	}
}

function dir_short(dir)
{
	if (dir == null || dir == "") return m_FAIL; 

	var res;
	dir = dir.replace(/。/g, "");
	if ((res = Dir_sh[dir]) != null) return res;
	else if (Dir_re[dir] != null) return dir;
	return m_FAIL;
}

function dir_reverse(dir)
{
	if (dir == null || dir == "") return m_FAIL; 

	var res;
	dir = dir.replace(/。/g, "");
	if ((res = Dir_sh[dir]) != null) dir = res;
	if ((res = Dir_re[dir]) != null) return res;
	return m_FAIL; 
}

function exit_filt(str, type)
{
	var rid, num, tmp, tmp1;

	rid = query("room/id");
	if (rid != "-1" && type == null) return get_room("filt " + rid);

	tmp = "";
	var re = new RegExp("[a-z]*[^、 和]", "g");
	var rm = str.match(re);
	for (var i=0; i<rm.length; i++) {
		var dir = dir_short(rm[i]);
		if (dir != m_FAIL) {
			var num = Math.floor(Math.random() * 2);
			if (tmp == "") tmp = dir;
			else if (num == 0) tmp = tmp + "," + dir;
			else tmp = dir + "," + tmp;
		}
	}

	tmp1 = query("room/name") + "=" + tmp;
	if (type == null) return get_room("filt " + tmp1);
	if (type == "find") return tmp;
	return get_room(tmp1);
}


function get_step()
{
	switch (query("walk")) {
		case "auto":
			return auto_search.dir;
		case "find":
			return auto_search.dir;
		case "multi":
			return step_walk.block(1);
		default :
			world.note("get_step:walk flag无效。");
			break;
	}
}

function get_info_key(index)
{
	var loc = query("npc/loc");
	if (loc == "很远") {
		loc = incity(query("npc/coor"));
		if (loc == "") {
			var fx = query("quest/far");
			loc = far_list[fx];
		}
	}

	if (loc_list[loc] == null) {
		world.note(loc + "是无效城市！");
		return m_FAIL;
	}

	var il = loc_list[loc]["info"];
	if (query("hp/exp") > 200000 && loc == "苏州" && il.indexOf("46") == -1)
		il += ";46";

	var io = il.split(";");
	if (index >= io.length || index < 0) 
		return m_FAIL;
 
	return io[index]; 
}

var _linesre = new RegExp("[^;\n]+", "g");
var _cmdsre = new RegExp("[^、。]+", "g");
var _groupre=new RegExp("[;\n]", "g");
function groupcmds(str){
	if (str == "" || str == null || str == m_FAIL){
		return str;
	}
	return str.replace(_groupre, "、")
}
function send(str, grouped) {
	if (str == "" || str == null || str == m_FAIL)
		return;
	if (grouped) {
		str = groupcmds(str)
	}
	var cmds = str.match(_linesre);
	var fg = get_var("bool_echo");
	if (fg)
		EchoInput = 1;
	else
		EchoInput = 0;
	Metronome.setbeats(world.GetVariable("num_cmds")/2)
	for (var i = 0; i < cmds.length; i++) {
		var commands = cmds[i].match(_cmdsre)
		var buf=[]
		commands.forEach(function (cmd) {
			if (cmd != "" && cmd != null) {
				if (cmd.indexOf("#") == 0) {
					if (buf.length){
						Metronome.push(buf, true, fg)
						buf=[]
					}
					cmd = cmd.split(" ");
					switch (cmd[0]) {
						case "#t+":
							world.EnableTrigger(cmd[1], true);
							break;
						case "#t-":
							world.EnableTrigger(cmd[1], false);
							break;
						case "#tg+":
							world.EnableTriggerGroup(cmd[1], true);
							break;
						case "#tg-":
							world.EnableTriggerGroup(cmd[1], false);
							break;
						case "#ts+":
							world.EnableTimer(cmd[1], true);
							world.ResetTimer(cmd[1]);
							break;
						case "#ts-":
							world.EnableTimer(cmd[1], false);
							break;
						case "#addtr":
							if (cmd[1] == null || cmd[1] == "") break;

							world.DeleteTrigger(cmd[1]);
							if (cmd[2] == null || cmd[2] == "") break;

							world.AddTriggerEx(cmd[1], cmd[2], cmd[3], 1 | 4 | 8 | 32, 14, 0, "", "", 0, 149);
							break;
						case "#clr":
							world.DeleteOutput();
							break;
						case "#q":
							world.speedwalkdelay = 0;
							world.LockQueue();
							break;
						case "#yanjiu":
							send(get_study());
							break;
						case "#yj2":
							var rd = query("room/id");
							if (query("hp/pot") > get_var("min_pot") && rd != 1946 && rd != 2452) {
								send(get_study());
							}
							break;
						case "#lian":
							var num = 0;
							if (cmd[1] != null && cmd[1] != "") num = cmd[1];
							do_lian(num);
							break;
						case "#cmd":
							send(GetCmd(cmd[1]))
							break;
						case "#rcmd":
							if (cmd.length>1){
								send(GetCmd(cmd[(Math.floor(Math.random() * cmd.length))]))
							}
						case "#setvar":
							if (cmd.length>2 && cmd[1]){
								world.SetVariable(cmd[1],cmd.slice(2).join(" "))
							}
							break
						case "#unsetvar":
							if (cmd.length>1 && cmd[1]){
								world.SetVariable(cmd[1],"")
							}
							break	
						case "#weapon":
								if (cmd.length<3 || (cmd[1]!="wield" && cmd[1]!="wear")){
									world.Note("装备格式错误，应为 #weapon wield myblade 或 #weapon wear mystrike")
									break;
								}
								let weapon=cmd.slice(2).join(" ")
								let wieldcmd=cmd[1] +" " +weapon
								let unwieldcmd
								if (cmd[1]=="wield"){
									unwieldcmd="unwield "+weapon
								}else{
									unwieldcmd="remove "+weapon
								}
								send("wp1off;alias wp1on "+wieldcmd+";alias wp1off "+unwieldcmd+";wp1on;#q")
								world.SetVariable("id_weapon",weapon)
						break							
						case "#roomid":
							if (cmd[1] != null && cmd[1] != "") set("room/id", cmd[1] - 0)
							break
					}
				} else {
					buf.push(cmd)
				}
			}
		})
		if (buf.length){
			Metronome.push(buf, true, fg)
			buf=[]
		}
	}
}

function number(str)
{
	var num = {"一" : 1, "二" : 2, "三" : 3, "四" : 4, "五" : 5, "六" : 6,
		 "七" : 7, "八" : 8, "九" : 9};	
	var unit = 1;
	var wan = 1;
	var result = 0;
	var char;

	for (var i=(str.length-1); i>=0; i--) {
		char = str.charAt(i);
		switch (char) {
			case "十":
				unit = 10 * wan;
				if (i == 0) 
					result += unit;
				else if (num[str.charAt(i-1)] == null)
					result += unit;
				break;
			case "百":
				unit = 100 * wan;
				break;
			case "千":
				unit = 1000 * wan;
				break;
			case "万":
				unit = 10000 * wan;
				wan = 10000;
				break;
			default:
				if (num[char] != null)
					result += num[char] * unit;			
	
				break;
		}
	}

	return result;
}

function step_trace(dir)
{
	if (dir == "" || dir == null) 
		return;

	var id = query("room/id");
	if (id != -1) {
		var rmid = get_exit_id(id, dir);
		set("room/id", rmid - 0);
	}
}

function goto(tl)
{
	set("other/touch", true);
	set("miss/fail",false)
	var tmp = tl + "";
	tmp = tmp.split(",");
	for (var i=0; i<tmp.length; i++) {
		if (isNaN(tmp[i])){	
			stop_all();
			world.note("err(goto()): tl为无效地点！");
			add_log("err(goto()): " + tl + "为无效地点！");
			return;
		}
	}

	set("nextstep/loc", tl);
	var fl = query("room/id");
	if (fl == -1) {
		world.note("err(goto()): fl为无效地点！");
		do_autosearch(8, "find");
	} else {
		var pa = get_path(fl, tl);
		if(pa != m_FAIL) do_walk(pa.split(";"));
	}
}

function get_var(str)
{
	var res = world.GetVariable(str);
	if (res == null) {
		world.note("get_var():变量[" + str + "]不存在");
		return m_FAIL;
	}

	if (str.indexOf("bool") != -1) {
		res = res.toLowerCase();
		if (res == "true" || res == "yes" || res == "y" || res == "t") res = true;
		else if (res == "false" || res == "no" || res == "n"  || res == "f") res = false;
	}

	return res;
}

function set_status()
{
	if (!query("other/focus"))
		return;
	var str = "【ID:" + get_var("id") + "】 ";
		var date = new Date();
		var time2 = date.getTime();
		var time1 = 0;
		var time = 0;
	str += " |npc:" + query("npc/name") + ", loc:" + query("npc/loc");
	if (query("npc/loc") == "很远") {
		var fx = query("quest/far");
		str += ", 当前" + fx + ":" + far_list[fx];
	}

	str += ", 完成:" +  query("quest/count") + ", quest:" + query("quest/flag"); 
	str += ", 效率:" +  query("stat/eff") + "/小时, 用时:" + query("stat/minute") + "分钟"; 
	var busyeff=query("stat/busyeff")
	if (busyeff && get_var("bool_showbusy")){
		str +=", 平均 busy:"+busyeff.toFixed(2)
	}
	if (!get_var("bool_nohelp") && query("stat/count")){
		var rate=query("stat/helped")*100/query("stat/count")
		str += "，线报率:"+rate.toFixed(2)+"%"; 
	}
	world.SetStatus(str);
}

function add_log(str)
{
	if (str == null || str == "") 
		return;

	var path = world.GetInfo(35);
	path = path.substring(0, path.lastIndexOf("\\"));
	var fname = path + "\\log(" + get_var("id") + ").txt";
  	var dt = new Date();
	str = dt.toLocaleString() + "> " + str; 
	world.openlog(fname, true);
	world.writelog(str);	
	world.closelog();
}

function tongji(flag)
{
	if (flag == 0) {
		set("stat/stime", 0);
		set("stat/minute", 0);
		set("stat/count", 0);
		set("stat/eff", 0);
		set("stat/helped",0)
		set("stat/busy",0)
		set("stat/busycount",0)
		set("stat/busyeff", 0);
		return;
	}

	var date = new Date();
	var time2 = date.getTime();
	var time1 = query("stat/stime");
	if (time1 == 0) {
		set("stat/stime", time2);
		return;
	}

	var time = time2 - time1;
	if (time == 0) return;

	var cnt = query("stat/count") - 0 + 1;
	set("stat/count", cnt);
	set("stat/eff", Math.floor(cnt * 3600 * 1000 / time));
	set("stat/minute", Math.floor(time / 60000));
	set_status();
}

//--------------------------------------------------------------------------------
function stop_all(force)
{
	set("other/walk", false);
	world.EnableTriggerGroup("gwk", 0);
	world.EnableTriggerGroup("gsm", 0);
	world.EnableTriggerGroup("gpe", 0);
	world.EnableTriggerGroup("gyh", 0);
	world.EnableTriggerGroup("gyd", 0);
	world.EnableTimer("timer1", false);
	world.EnableTimer("t_pfm", false);
	world.EnableTrigger("io_nobody", false);
	world.DiscardQueue(force);
}

function open_timer1(time, flag, cmd)
{
	if (cmd != "" && cmd != null)
		set("timer/cmd", cmd);
	else
		set("timer/cmd", "");

	set("timer/count", 0);
	set("timer/time", time);
	set("timer/flag", flag);
	if (world.GetGlobalOption ("TimerInterval") == 0 && flag == "busy0") 
		world.SetTimerOption("timer1", "second", "0.1");
	else if (world.GetGlobalOption ("TimerInterval") == 0 && flag == "busy5") 
		world.SetTimerOption("timer1", "second", "0.5");
	else
		world.SetTimerOption("timer1", "second", "1");
	world.ResetTimer("timer1");
	world.EnableTimer("timer1", true);
}

function open_pfm()
{
	world.EnableTimer("t_pfm", true)
	world.ResetTimer("t_pfm");
}

function reconnect(cmd)
{
	world.EnableTimer("timer1", false);
	world.EnableTrigger("kl_help", false);
	world.EnableTrigger("kl_help1", false);
	world.EnableTrigger("faint", false);
	world.EnableTrigger("hurt", false);
	world.EnableTrigger("qt_accept", false);
	set("connect/auto", false);
	set("connect/cmds", cmd);
	world.Disconnect();
	if (query("hp/faint") == "faint")
		open_timer1(120, "con_delay", null);
	else
		open_timer1(2, "con_delay", null);
}

function autoconnect()
{
	if (!query("connect/auto")) {
		world.EnableTimer("t_con", false);
		return;
	}

	var cmd = get_var("id") + ";" + get_var("passw") + ";y";
	if (query("boss/start") && query("xuemo/step") > 4)
		cmd += ";halt;hp;i;fquest;set no_teach xuemo connect";
	else if (query("quest/flag") != "null")
		cmd += ";halt;hp;i;#t+ qt_none;quest;set no_teach auto connect";

	set("room/id", -1);
	set("connect/cmds", cmd);
	world.DiscardQueue();
	world.Connect();	
}

function at_connect()
{
	world.EnableTimer("t_con", false);
	set("npc/find", 0);
	set("npc/coor",-1);
	send(query("connect/cmds"));
	world.EnableTrigger("faint", true);
	world.EnableTrigger("hurt", true);
	world.EnableTrigger("qt_accept", true);
	world.EnableTrigger("connected", true);
	world.EnableTrigger("connected1", true);
	world.EnableTrigger("condelay", true);
}

function at_disconnect()
{
	world.EnableTimer("t_pfm", false);
	world.EnableTimer("timer3", false);
	world.EnableTimer("t_kmg", false);
	world.DiscardQueue();
	world.EnableTimer("t_con", true);
}

function get_focus()
{
	set("other/focus", true);
	set_status();
}

function lose_focus()
{
	set("other/focus", false);
}

function to_kill(init)
{
	if (init){
		set("npc/find", 0);
		set("npc/coor",-1);
		set("quest/far", 0);
		set("quest/info", 0);
	}
	if (query("npc/find")==-1){
		kill_npc()
		return
	}
	world.EnableTimer("t_kmg", true);

	if (query("npc/status") == "disp") {
		set("npc/status", "start");
		do_askinfo();
		return;
	}
	var loc = query("npc/loc");

	if ((query("askyou/count") == 0 && ("," + get_var("list_qask") + ",").indexOf("," + loc + ",") != -1)
	|| (!query("askyou/none") && query("askyou/count") > 0 && query("askyou/count") < 3)) {
		var num = query("askyou/count") + 1;
		world.note("-----第" + num + "次找游讯问 " + query("npc/name") + " 下落-----");
		do_askyou();
		return;
	}
	if (loc != "很远" && loc_list[loc] == null) {
		world.note(loc + "是无效城市！");
		return;
	}

	set("npc/status", "start");
	set("search/flag", "AREA1");
	do_search();
	world.note("-----去" + loc + "追杀" + query("npc/name") + "-----");
}

function kill_npc()
{
	stop_all();
	set("npc/find", 0);
	if (query("npc/coor") == query("room/id")) {
		world.Note("找到 "+query("npc/name")+" ，原地击毙")
		send(kill_cmd());
	} 
	else {
		world.Note("前往 "+query("npc/coor")+" 击杀 "+query("npc/name"))
		set("nextstep/flag", "COMMANDS");
		set("nextstep/cmds", kill_cmd());
		goto(query("npc/coor"));
	}
}

function InSmartMode(){
	return get_var("bool_smartmode") && !query("boss/start")
}

function IsXuemoBoss(){
	return query("boss/start")&&query("boss/kill")=="xuemo"&&query("boss/name")=="丁一";
}

function perform()
{
	set("other/touch", true);
	var pfm = get_var("cmd_pfm");
	if (pfm == "shot") 
		pfm = "shot " + query("npc/id") + " with arrow"; 
	else {
		if (IsXuemoBoss() || query("npc/wd") == 1 || InSmartMode()){
			pfm = CmdMpf();
		}

		if (query("other/getw") == 1) {
			set("other/getw", 0);
			pfm = "get " + get_var("id_weapon") + ";wield " + get_var("id_weapon") + ";" + pfm;
		}
	}
	if (query("boss/start")){
		pfm = pfm + "\nenchase 1";
	}
	return pfm;
}

function telldm(flag)
{
	var cnt = flag;
	switch (flag) {
		case "faint":
			cnt = "晕倒了:" + query("npc/loc") + "." + query("room/name")
				+ "." + query("room/id");
			add_log(cnt);
			break;
		case "dispel":
			cnt = "中毒了:" + query("npc/loc") + "." + query("room/name")
				+ "." + query("room/id");
			add_log(cnt);
			break;
		case "idle":
			cnt = "发呆了:" + query("room/id") + "." + query("other/nextstep") 
				+ "." + query("nextstep/flag") + "." + query("nextstep/cmds");
			add_log(cnt);
			cnt = "发呆了！";
			break;
		default :
			break;
	}
	var dm = get_var("list_control").split(",")[0];
	if (dm == "") return;
	var wdm = world.getworld(dm);
	if (wdm != null)
		wdm.note(get_var("id") + " " + cnt);
	else
		world.SendImmediate("tell " + dm + " " + cnt);
}

function ydispel(par)
{
	if (par) {
		var nt = "cancel";
		if (query("npc/status") == "flee")
			nt = "flee";
		else if (query("npc/status") == "head")
			nt = "give";

		stop_all();
		set("dispel/next", nt);
		set("dispel/flag", "yd");
		send("dazuo");
		world.EnableTriggerGroup("gyd", 1);
	} else {
		world.EnableTriggerGroup("gyd", 0);
		set("hp/dispel", false);
		set("dispel/flag", "");
		set("dispel/count", 0);
	}
}

function get_study()
{
	var lt = get_var("list_skill");
	if (lt == null || lt == "") return "";

	var pot = query("hp/pot");
	var mpot = 100 + query("other/n_yj")*50;
	if (pot > mpot) pot = mpot;

	var re = new RegExp("[^;|,:]+", "g"); 
	lt = lt.match(re);
	var ix = Math.floor(Math.random() * lt.length);

	return get_var("cmd_study") + " " + lt[ix] + " " + pot;
}

function do_lian(num)
{
	var lst, ix, tmp1, tmp2, str;

	lst = get_var("list_lian");
	if (lst == null || lst == "") return;

	num = num - 1;
	lst = lst.replace(newlinere,"|").split("|");
	if (num >= lst.length) return;

	var res = new Array;
	for (var i=0; i<lst.length; i++) {
		if (num != i && num >= 0) continue;

		tmp1 = lst[i].split(":");
		var mlx = 50 + query("other/n_lx")*50;
		str = "lian " + tmp1[0] + " " + mlx;
		if (tmp1.length < 2) {
			res[res.length] = str;
			continue;
		}

		if (tmp1.length == 3) str = tmp1[2] + ";" + str;
		else if (tmp1.length > 3) str = tmp1[2] + ";" + str  + ";" + tmp1[3];

		tmp2 = tmp1[1].split(",");
		for (var j=0; j<tmp2.length; j++) {
			if (tmp2[j] != "") res[res.length] = "jifa " + tmp1[0] + " " + tmp2[j] + ";" + str;
			else res[res.length] = str;
		}
	}

	if (res.length <= 0) return;

	ix = Math.floor(Math.random() * res.length);
	//send(res[ix]);
	send(res[ix],true);
	// Metronome.push(res[ix],true,get_var("bool_each")?1:0)
}

function kill_cmd()
{
	var id = "";
	var cmd = "";
	var pfm = perform();
	set("npc/busybusy",0)
	id = query("npc/id");
	if (id == "" || id == null) id = "no body";

	var tmp = get_var("cmd_pfm");
	if (id == "no body") {
		cmd = "#t+ kl_nobody;id here;halt;kill no body;#q";
	} else {
		cmd = "#t+ kl_nobody;halt;kill " + id;
		var tmp = get_var("cmd_kill");
		if (query("hp/eff_qi") > 70) {
			cmd += ";" + tmp;
		} else {
			tmp = tmp.split(";");
			for (var i=0; i<tmp.length; i++) {
				if (tmp[i].indexOf("jingang") == -1) cmd += ";" + tmp[i];
			}
		}
		if (pfm != "") cmd += ";" + pfm;
		cmd += ";#q";
	}
	var on_kill=query("npc/onkill")
	if (!on_kill || on_kill!=query("npc/name")){
		cmd=groupcmds(cmd)
	}
	return cmd;
}


function enter_maze(dir)
{
	var rn;
	rn = query("room/name");
	if (rn == "渡船" || rn == "小舟" || rn == "大海") return true;
	if (rn != "大沙漠" && rn != "南疆沙漠" && rn != "戈壁滩" && rn != "秦陵地宫" && rn != "诡异墓园") return false;

//秦陵内宫
	if (rn == "秦陵地宫") {
		set("digong/npc","");
		send(do_digong());
		return true;
	}
//end digong
//诡异墓园
	if (rn == "诡异墓园") {
		set("xuemo/npc","");
		send(do_xuemo());
		return true;
	}
//end xuemo	
	if (query("walk") == "multi") {
		if (dir != null) step_walk.block(1);
		else dir = step_walk.block(1);
	}
	else if (auto_search.dir == "") {
		if (rn == "戈壁滩") dir = "e";
		else if (rn == "大沙漠") dir = "w";
		else if (rn == "南疆沙漠") dir = "sw";
	}

	if (dir == m_FAIL || dir == null) {
		do_nextstep();
		return true;
	}

	var re = /[。·！]/g;
	dir = dir.replace(re, "");

	set("maze/dir", dir);
	set("maze/count", 0);
	send("hp;set no_teach maze");
	world.EnableTriggerGroup("on_npc",false);
	world.EnableTrigger("step", false);
	world.EnableTriggerGroup("gsm", 1);
	return true;
}
function incity(coor, cy)
{
	if (Trim(coor) == "")
		return false;

	if (cy == "很远"){
		for (var key in loc_list){
			if (incity(coor,key)){
			return true;
			}
		}
		return false
	}
								 

	if (cy == "长安" && ((coor >= 244 && coor <= 381) || coor == 20 || coor == 709 || coor == 909 
	|| coor == 1010 || coor == 1139))
		return true;

	if (cy == "成都" && ((coor >= 659 && coor <= 708) || coor == 1610 || coor == 1611))
		return true;

	if (cy == "大理" && ((coor >= 423 && coor <= 647) || coor == 1608))
		return true;

	if (cy == "佛山" && ((coor >= 388 && coor <= 422) || coor == 1467 || coor == 1468))
		return true;

	if (cy == "福州" && ((coor >= 198 && coor <= 243) || coor == 1464))
		return true;

	if (cy == "关外" && (coor >= 1211 && coor <= 1248))
																
		return true;

	if (cy == "杭州" && ((coor >= 190 && coor <= 194) || (coor >= 785 && coor <= 891) || coor == 911 
	|| coor == 986 || coor == 1573 || coor == 1672 || coor == 1673))
		return true;

	if (cy == "华山" && ((coor >= 248 && coor <= 251) || (coor >= 987 && coor <= 1005) 
	|| (coor >= 1025 && coor <= 1065) 	|| coor == 1712))
		return true;

	if (cy == "灵州" && ((coor >= 1175 && coor <= 1207) || coor == 1659 || coor == 1660))
		return true;

	if (cy == "南海" && ((coor >= 390 && coor <= 421) || coor == 1468))
		return true;

	if (cy == "泉州" && ((coor >= 207 && coor <= 216) || (coor >= 411 && coor <= 413)))
		return true;

	if (cy == "汝州" && ((coor >= 1068 && coor <= 1127) || (coor >= 2499 && coor <= 2503)))
		return true;

	if (cy == "嵩山" && (coor >= 1068 && coor <= 1138) || (coor >= 2499 && coor <= 2503))
		return true;

	if (cy == "苏州" && ((coor >= 190 && coor <= 194) || (coor >= 785 && coor <= 787) 
	|| (coor >= 911 && coor <= 986) || coor == 68 || coor == 69 || coor == 1564 
	|| coor == 1573 || coor == 1574 || coor == 1577 || coor == 1681))
		return true;

	if (cy == "天山" && ((coor >= 1157 && coor <= 1167) || coor == 1150))
		return true;

	if (cy == "武功" && ((coor >= 276 && coor <= 279) || (coor >= 709 && coor <= 728) 
	|| (coor >= 892 && coor <= 909)))
		return true;

	if (cy == "西域" && ((coor >= 700 && coor <= 707) || (coor >= 1139 && coor <= 1172) 
	|| (coor >= 1632 && coor <= 1654) || (coor >= 1753 && coor <= 1786) 
	|| (coor >= 1808 && coor <= 1811) || coor == 301 || coor == 666 || coor == 1797 || coor == 2764))
		return true;

	if (cy == "襄阳" && ((coor >= 77 && coor <= 189) || coor == 19 || coor == 20 || coor == 244 
	|| coor == 1566 || coor == 1567))
		return true;

	if (cy == "星宿" && (coor >= 1140 && coor <= 1172))
		return true;

	if (cy == "扬州" && ((coor >= 0 && coor <= 78) || (coor >= 190 && coor <= 193) 
	|| (coor >= 244 && coor <= 247) || (coor >= 1025 && coor <= 1039) 
	|| (coor >= 1454 && coor <= 1459) || (coor >= 1558 && coor <= 1565) 
	|| (coor >= 1681 && coor <= 1686) || (coor >= 1733 && coor <= 1739) 
	|| (coor >= 2490 && coor <= 2496) || coor == 147 || coor == 382 || coor == 785 
	|| coor == 786 || coor == 1143 || coor == 1713))
		return true;

	if (cy == "终南" && ((coor >= 276 && coor <= 279) || (coor >= 709 && coor <= 784) 
	|| (coor >= 892 && coor <= 909)))
		return true;

	return false;
}

function can_accept()
{
	if (query("quest/flag") != "kill") return false;

	if (query("hp/dispel"))	return false;

	if (query("item/load")) return false;

	if (query("hp/eff_qi") < 75) return false;

	if (query("weapon/dur") < 35) return false;

	if (query("item/food") < 5) return false;

	if (query("item/shuidai") < 2) return false;

	if (query("item/money") < get_var("min_gold") - 0)
		return false;

	if ((query("item/cash") < 5 || query("item/cash") > 300) && get_var("list_qask") != "")
		return false;

	if (query("item/arrow") < 9 && get_var("cmd_pfm") == "shot")
		return false;
	
	if (query("hp/neili") < get_var("min_neili"))
		return false;

	if (query("hp/jingli") < get_var("min_jingli"))
		return false;

	if (query("hp/pot") > get_var("max_pot")) 
		return false;
	
	if (query("hp/exp") > get_var("max_exp")) 
		return false;
	
	return true;
}


function can_sleep()
{
	if (query("other/mtc")){
		return false
	}
	var time = (new Date()).getTime();
	if (time < query("other/sleep") - 0 + 55*1000) return false;

	return true;
}

function can_study()
{
	var time = (new Date()).getTime();
	if (time < query("other/study") - 0 + 15*60*1000) return false;

	return true;
}

function can_jiqu()
{
	if (query("hp/exp") < 100000) return false;

	var time = (new Date()).getTime();
	if (time < query("other/jiqu") - 0 + 45*60*1000) return false;

	return true;
}

function can_fuben(bs)
{
	if (check_in_3boss()&& query("boss/kill")==bs){
		return true
	}
	var time = (new Date()).getTime();
	var time1;
	if (get_var("list_boss").indexOf(bs) == -1) return false;
	if (bs == "seadragon")
		time1 =  query("boss/seadragon") - 0 + 60*60*1000;
	else if (bs == "dongfang")
		time1 = query("boss/dongfang") - 0 + 60*60*1000;
	else if (bs == "jiangshi")
		time1 = query("boss/jiangshi") - 0 + 60*60*1000;
	else if (bs == "juxianzhuang")
		time1 = query("boss/juxianzhuang") - 0 + 60*60*1000;
	else if (bs == "digong")
		time1 = query("boss/digong") - 0 + 80*60*1000;
	else if (bs == "xuemo")
		time1 = query("boss/xuemo") - 0 + 120*60*1000;	
		//time1 = query("boss/xuemo") - 0 + 1*60*1000;	
	if (time < time1) 
		return false;
	else
		return true;
}

function add_room_cmd(cmd)
{
	var cmd1 = query("room/cmd");
	if (cmd1 == "") {
		set("room/cmd", cmd);
	} else
	if (cmd1.indexOf(cmd) == -1) {
		cmd = cmd1 + ";" + cmd;
		set("room/cmd", cmd);
	}
}

//--------------------------------------------------------------------------------
function do_nextstep()
{
	stop_all();

	var lc1 = query("room/id");
	var lc2 = query("nextstep/loc");
	if (lc1 != lc2 && ("," + lc2 + ",").indexOf("," + lc1 + ",") == -1) {
		goto(lc2);
		return;
	}

	var flag = query("nextstep/flag");
	set("nextstep/flag", "");
	set("other/nextstep", flag);
	switch (flag) {
		case "PREPARE":
			do_prepare();
			break;
		case "SEARCH":
			do_search(); 
			break;
		case "SEARCH_END":
			do_searchend();
			break;
		case "ASK_INFO":
			do_askinfo();
			break;
		case "AUTO_SEARCH":
			do_areasearch();
			break;
		case "GPS_SEARCH":
			do_gpssearch();
			break;
		case "COMMANDS":
			send(query("nextstep/cmds"));
			break;		
		default :
			world.note("warning: nextstep无效！");
			break;	 
	}
}

function do_walk(path)
{
	if (path == "" || path == null) {	
		do_nextstep();
		return;
	}

	stop_all();
	if (path.length <= 0) {
		world.note("err(do_walk): 路径无效！");
		return;
	}

	if (!query("other/brief")) {
		set("other/brief", true);
		world.SendImmediate("set brief 3");
	}
	
	step_walk = new MyArray(path);
	set("walk", "multi");
	set("other/walk", true);
	set("other/trace", true);
	add_room_cmd("#t- wk_miss");
	world.EnableTriggerGroup("on_npc",true);
	world.EnableTrigger("step", true);
	world.EnableTrigger("wk_busy", true);
	world.EnableTrigger("wk_shhu", true);
	world.EnableTrigger("wk_miss", true);
	world.EnableTrigger("wk_missf", true);
	world.EnableTrigger("wk_noexit", true);

	if (!enter_maze()) send(step_walk.block(1));
}

function do_autosearch(dp, flag)
{
	stop_all();
	auto_search = new MySearch(dp);
	switch (flag) {
		case "auto":
			set("walk", "auto");
			world.note("-----autosearch: 开始搜索！-----");
			break;
		case "find":
			set("walk", "find");
			send("unset brief");
			set("other/brief", false);
			world.note("-----autosearch: 开始定位！-----");
			break;
	}

	send("look");
	set("other/walk", true);
	set("other/trace", true);
	world.EnableTriggerGroup("on_npc",true);
	world.EnableTrigger("step", true);
	world.EnableTrigger("wk_busy", true);
	world.EnableTrigger("wk_shhu", true);
	world.EnableTrigger("wk_missf", true);
	world.EnableTrigger("wk_noexit", true);
}

function do_search()
{
	var sfg, str, loc, map, tol;
	HelpFind(query("npc/name"))
	world.SetVariable("name_npc", query("npc/name"));

	map = "";
	loc = query("npc/loc");
	if (loc == "很远") {
		loc = far_list[query("quest/far")];
	}

	set("nextstep/flag", "SEARCH");
	sfg = query("search/flag");
	if (sfg == "GPS") {
		str = "do_search():开始定点搜索[" + loc + "]";
	}
	else if (sfg == "AREA1") {
		map = map_list1[loc_list[loc]["map"]];
		str = "do_search():开始一步搜索[" + loc + "]";
	}
	else if (sfg == "AREA5") {
		map = map_list[loc_list[loc]["map"]];
		str = "do_search():开始五步搜索[" + loc + "]";
	}
	
	if (map == "") set("search/flag", "END");
	if (sfg == "END") {
		map = map_list[loc_list[loc]["map"]];
		str = "do_search():开始五步搜索[" + loc + "]";
	}

	tol = loc_list[loc]["id"];
	if (query("room/id") != tol) {
		goto(tol);
		return;
	}

	if (sfg == "AREA1") set("search/flag", "AREA5");
	else set("nextstep/flag", "SEARCH_END");

	world.note(str);
	do_walk(map.split(";"));
}

function do_searchend()
{
	var loc = query("npc/loc");
	if (loc == "很远") { 
		var le = far_list.length;
		var exp = query("hp/exp") - 0;
		if (exp < 150000) le = le - 4;
		else if (exp < 400000) le = le - 2;
		else if (exp < 700000) le = le - 1;

		var fx = query("quest/far") - 0 + 1;
		if (fx >= le || fx < 0) {
			set("npc/status", "end");
			send("hp;i;set no_teach prepare");
			add_log("很远搜索完毕！");
			return;
		}

		set("quest/far", fx);
		set("nextstep/flag", "SEARCH");

		send("hp;#q");
		goto(loc_list[far_list[fx]]["id"]);
		return;
	}

	add_log("城市[" + loc + "]搜索完毕！");
	do_askinfo();
}

function do_areasearch()
{
	set("nextstep/flag", "SEARCH");
	var rmid = query("room/id");
	var rn = query("room/name");
	if (rn != "大沙漠" && rn != "南疆沙漠" && rn != "戈壁滩" && rmid != -1) {
		var path = get_area_path(rmid, 2);
		if (path != m_FAIL) {
			do_walk(path.split(";"));
			return;
		}
	}
	do_autosearch(2, "auto");
}

function do_gpssearch()
{
	var ix = query("askyou/index") - 0;
	var lc = query("askyou/loc");
	if (ix >= lc.length || lc == null) {
		var ct = query("askyou/count") - 0 + 1;
		add_log("do_gpssearch:" + query("npc/id") + "." + query("npc/status") + "." +query("npc/loc") + "." + query("other/loc1") + "(" + lc + ")" + "没有找到。");
		set("askyou/loc", null);
		set("askyou/index", 0);
		set("askyou/flag", false);
		set("askyou/count", ct);
		to_kill(false);
		return;
	}

	if (lc[ix] == -1 || lc[ix] == null){
		set("askyou/index", (ix + 1));
		do_gpssearch();
		return;
	}

	set("nextstep/flag", "GPS_SEARCH");
	var fl = query("room/id");
	var tl = lc[ix];
	if (fl == tl) {
	//	world.note("GPS开始搜索." + query("other/loc1") + ":" + tl);
		set("askyou/index", (ix + 1));
		set("nextstep/flag", "GPS_SEARCH");
		var rn = query("room/name");
		if (rn != "大沙漠" && rn != "南疆沙漠" && rn != "戈壁滩") {
			var path = get_area_path(tl, 2);
			if (path != m_FAIL) {
				do_walk(path.split(";"));
				return;
			}
		}

		do_autosearch(2, "auto");
		return;
	}

	var path = get_path(fl, tl);
	if (path == m_FAIL || path == "null" || path == "") {
		set("askyou/index", (ix + 1));
		do_gpssearch();
		return;
	}

	goto(tl);
}

function NpcAlive(){
	return query("npc/status")=="start" ||query("npc/status")=="flee" ||query("npc/status")=="disp"
}

function do_prepare()
{
	var tl;

	var ll = query("hp/level") - 3;
	set("nextstep/flag", "COMMANDS");
	if (get_var("max_exp") < ll*ll*ll/10) {
		world.note("-----变量max_exp设置有问题！-----");
		return;
	} else
	if (query("hp/dispel")) {
		set("nextstep/cmds", "hp;set no_teach heal");
		tl = get_var("loc_dazuo");
	} else
	if (query("hp/eff_qi") < 21) {
		if (get_var("id_pass") == "xy") {
			set("nextstep/cmds", "#t+ pe_cures;#t+ pe_nobody;ask xue muhua about 疗伤");
			tl = 1722;
		} else {
			set("nextstep/cmds", "mdan2;hp;set no_teach heal");
			tl = 65;
		}
	} else
	if (query("hp/eff_qi") < 85) {
		set("nextstep/cmds", "#t+ pe_heal;#t+ pe_healf;yun heal");
		tl = get_var("loc_dazuo");
	} else
	if (query("item/gold") < get_var("min_gold")) {
		var num = get_var("min_gold") - query("item/gold") + 10;
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu " + num + " gold");
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu " + num + " gold");
		tl = 23;
	} else
	if (query("item/cash") < 15 && get_var("list_qask") != "") {	
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 100 cash");	
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 100 cash");
		tl = 23;
	} else
	

	if (query("item/gong") < 1 && get_var("cmd_pfm") == "shot") {
		set("item/buy", "long bow from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy long bow from tie jiang");
		tl = 66;
	} else
	if (query("item/lsword") < 1 && get_var("id_weapon") == "long sword") {
		set("item/buy", "long sword from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy long sword from tie jiang");
		tl = 66;
	} else
	if (query("item/iblade") < 1 && get_var("id_weapon") == "iron blade") {
		set("item/buy", "iron blade from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy iron blade from tie jiang");
		tl = 66;
	} else
	if (query("item/arrow") < 9 && get_var("cmd_pfm") == "shot") {
		set("item/buy", "50 狼牙箭 from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy 50 狼牙箭 from tie jiang");
		tl = 66;
	} else
	if ((query("item/gangbiao") - 0 + query("item/zhen")) < 400 && (get_var("cmd_pfm").indexOf("yuce") != -1 || get_var("bool_gangbiao")))	 {
		set("item/buy", "100 gangbiao from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy 100 gangbiao from tie jiang");
		tl = 66;
	} else
	if ((!check_in_3boss()) && query("item/shuidai") < 3) {
		set("item/buy", "shui dai from xiao er");
		set("nextstep/cmds", "#t+ pe_buy;buy shui dai from xiao er");
		tl = 27;
	} else
	if ((!check_in_3boss()) && query("item/food") < 5) {
		set("item/buy", "10 gan liang from xiao er");
		set("nextstep/cmds", "#t+ pe_buy;buy 10 gan liang from xiao er");
		tl = 27;
	} else
	if (query("weapons/"+get_var("id_weapon")) < 35 || (query("weapons/"+get_var("id_weapon"))<98) && (can_fuben("juxianzhuang") || can_fuben("digong") || can_fuben("xuemo"))&&!check_in_3boss()) {
		var wp = get_var("id_weapon");
		set("weapon/id",wp),
		set("nextstep/cmds", "#t+ pe_repair;repair " + wp + ";repair " + wp + ";l " + wp + " of me;i;set no_teach prepare");
		tl = 66;
	} else
	if ((!check_in_3boss()) && query("weapon/dur") < 30 && query("weapon/id") ){
		var wp=query("weapon/id")
		set("nextstep/cmds", "#t+ pe_repair;repair " + wp + ";repair " + wp + ";l " + wp + " of me;i;set no_teach prepare");
		tl = 66;
	} else
	if ((!check_in_3boss()) && query("item/9hua") < 10 && get_var("loc_jiuhua") != "") {
		set("nextstep/cmds", "gdan0;i;set no_teach prepare");
		tl = get_var("loc_jiuhua");
	} else		
	if (query("item/load") && query("item/sell") != "null") {
		set("nextstep/cmds", "sell " + query("item/sell") + ";i;set no_teach prepare");
		tl = 48;
	} else
	if (query("item/cash") > 2000) {
		set("nextstep/cmds", "i;set no_teach cun money");
		tl = 23;
	} else
	if (query("item/load") && (query("item/silver") > 300 || query("item/gold") > get_var("min_gold") - 0 + 200 || query("item/cash") > 300)) {
		set("nextstep/cmds", "i;set no_teach cun money");
		tl = 23;
	} else
	if (query("deposit")>30000) {	
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 2001 cash;score;i");	
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 2001 cash;score;i");
		tl = 23;
	} else
	if (query("trceatlu")){
		set("nextstep/cmds", "set no_teach eatlu.check");
		tl = 306;
	}else
	if ((get_var("bool_cungift") || query("item/load")) && query("item/gift") != "null") {
		tl = get_var("loc_gift");
		if (tl == 2682) set("nextstep/cmds", "#t+ pe_drop;cun " + query("item/gift"));
		else set("nextstep/cmds", "#t+ pe_drop;give " + query("item/gift") + " to " + get_var("list_control").split(",")[0] +";drop " + query("item/gift"));

	} else
	if (query("hp/jingli") < get_var("min_jingli")) {
		set("nextstep/cmds", "#t+ pe_tuna;#t+ pe_tunab;mdan1;hp;tuna "+get_var("num_tuna"));
		tl = get_var("loc_dazuo");
	} else

	if (!query("stab/miss") && query("stab/flag")) {
		do_stab();
		return;
	} else 
	if (query("hp/neili") < get_var("min_neili") && get_var("loc_sleep") != "") {
		if (query("other/mtc")){
			send("hp;set no_teach prepare")
			return
		}
		if (can_sleep() && !check_in_3boss()) {
			set("nextstep/cmds", "#t+ pe_sleep;sleep");
			tl = get_var("loc_sleep");
		} else {
			set("nextstep/cmds", "#t+ pe_dazuo;#t+ pe_dazuof;dazuo " + get_var("num_dazuo"));
			tl = get_var("loc_dazuo");
		}
	} else	if (query("other/backup") || ((!check_in_3boss())&&can_study() && query("hp/pot") > get_var("max_pot"))) {
		set("nextstep/cmds", "#t+ pe_study;hp;set no_teach study");
		tl = get_var("loc_study");
	} else
	if (query("hp/th") > get_var("max_th") && can_jiqu()) {
		set("nextstep/cmds", "#t+ pe_jiqu1;#t+ pe_jiqu3;yun recover;yun regenerate;mjq");
		tl = get_var("loc_dazuo");
	} else
	if (query("hp/exp") > get_var("max_exp")) {
		set("nextstep/cmds", "#t+ pe_fangqi;fangqi exp");
		tl = get_var("loc_dazuo");
	} else
	if (Mods.Check()){
		return;
	} else {
		world.EnableTriggerGroup("gpe", 0);
		set("item/load", false);
		if (query("quest/flag") == "kill") {
			if(NpcAlive()){
				do_continue()
				return
			}	else 
			if (can_fuben("seadragon") && get_var("list_boss").indexOf("seadragon") != -1 ) {
				set("boss/kill", "seadragon");
				set("nextstep/cmds", get_var("cmd_3boss")+";kill sea dragon king;" + get_var("cmd_kill")+";"+get_var("cmd_pfm"));
				tl = 2767;
			} else
			if (can_fuben("dongfang") && get_var("list_boss").indexOf("dongfang") != -1) {
				set("boss/kill", "dongfang");
				set("nextstep/cmds", get_var("cmd_3boss")+";kill dongfang bubai;" + get_var("cmd_kill")+";"+get_var("cmd_pfm"));
				tl = 2769;
			} else
			if (can_fuben("jiangshi") && get_var("list_boss").indexOf("jiangshi") != -1 ) {
				set("boss/kill", "jiangshi");
				set("nextstep/cmds", get_var("cmd_3boss")+";kill jiangshi daozhang;" + get_var("cmd_kill")+";"+get_var("cmd_pfm"));
				tl = 2771;
			} else 
			if (can_fuben("juxianzhuang") == 1 && get_var("list_boss").indexOf("juxianzhuang") != -1) {
				set("boss/kill", "juxianzhuang");
				set("boss/step", 1);
				set("nextstep/cmds", "ask nan xian about 英雄帖");
				tl = 1551;
			} else
			if (can_fuben("digong") && get_var("list_boss").indexOf("digong") != -1) {
				set("boss/kill", "digong");
				set("digong/step", 1);
				set("nextstep/cmds", get_var("cmd_digong")+";#tg+ dg1;look wall");
				tl = 2819;
			} else
			if (can_fuben("xuemo") && get_var("list_boss").indexOf("xuemo") != -1) {
				set("boss/kill", "xuemo");
				set("xuemo/step", 1);
				set("nextstep/cmds", "#tg+ gxm;#t+ dg_map0;#t+ dg_mape;look wall;push coffin;mjq");
				tl = 2831;
			} else{
				set("nextstep/cmds", "quest " + get_var("id_master"));
				tl = get_var("loc_master");
			}
		} else {
			set("nextstep/flag", "");
			world.note("=====任务结束！=====");
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("ga", false);
			return;
		}
	}
	if (check_in_3boss()&& (tl==get_var("loc_dazuo"))){
		var cmd=query("nextstep/cmds");
		set("nextstep/cmds", "");
		send(cmd)
		return
	}
	goto(tl);
}

function do_quest()
{
	if (query("npc/status") == "head")
		var cmd = "#t+ qt_nobody;give head to "+ get_var("id_master");
	else
		var cmd = "quest " + get_var("id_master");

	set("npc/status", "end");
	set("nextstep/cmds", cmd);
	set("nextstep/flag", "COMMANDS");	
	goto(get_var("loc_master"));
}

function do_askinfo()
{
	if (query("npc/find")==-1){
		kill_npc()
		return
	}
	world.SetVariable("name_npc", query("npc/name"));
	HelpFind(query("npc/name"))
	var ix = query("quest/info") - 0;
	var ke = get_info_key(ix);
	if (ke == m_FAIL) {
		world.note("askinfo: 没有消息源！");
		add_log("城市[" + query("npc/loc") + "]没有消息源！");
		set("npc/loc", "很远");
		to_kill(false);
		return;
	}

	var io = info_list[ke];
	var fl = query("room/id");
	var tl = io["loc"];
	if (fl == tl) {
		world.SetVariable("name_info", io["name"]);
		set("info/id", io["id"]);
		var cmd = "#t+ io_nobody;ask " + io["id"] + " about " + query("npc/name");
		send(cmd);
	} else {
		set("nextstep/flag", "ASK_INFO");
		goto(tl);
	}
}

function do_askyou()
{
	if (query("npc/find")==-1){
		kill_npc()
		return
	}
	HelpFind(query("npc/name"))
	world.SetVariable("name_npc", query("npc/name"));
	if (query("npc/id") == "null" || query("npc/id") == "" || query("npc/id") == "no body") {
		var sn = "";
		var pt = 2;
		var name = query("npc/name");
		if ((sn = cn_sname[name.substr(0,2)]) == null) {
			pt--;
			if ((sn = cn_sname[name.substr(0,1)]) == null) {
				add_log("do_askbei:找不到" + name + "的id。");
				return;
			}
		}

		var tmp = new Array();
		for (var i=pt; i<name.length; i++) {
			tmp[i - pt] = new Array();
			for (ky in cn_pname) {
				if (cn_pname[ky].indexOf(name.substr(i, 1)) != -1)
					tmp[i - pt][tmp[i - pt].length] = ky;
			}
		}

		var tmp1, ct;
		for (var i=0; i<tmp.length; i++) {
			npc_id = new Array();
			for (var j=0; j<tmp[i].length; j++) {
				if (i == 0)
					npc_id[npc_id.length] = tmp[i][j];
				else {
					ct = tmp1.length;
					for (var k=0; k<ct; k++)
						npc_id[npc_id.length] = tmp1[k] + tmp[i][j];
				}
			}
	
			tmp1 = new Array();
			for (var l=0; l<npc_id.length; l++)
				tmp1[tmp1.length] = npc_id[l];
		}

		for (var i=0; i<npc_id.length; i++)
			npc_id[i] = sn + " " + npc_id[i];

		set("askyou/idpt", 0);
		set("npc/id", npc_id[0]);
			
	}

	set("askyou/none", false);
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", "#t+ io_you0;ask you xun about " + query("npc/id"));
	goto(26);
}

function do_wait()
{
	if (query("hp/eff_qi") < 90)
		send("yun heal");
	else
		send(get_var("cmd_wait"));
	open_timer1(15, "quest_end", null);
}

function do_stab()
{
	var lt = get_var("list_mloc");
	if (lt == m_FAIL || lt == "") {
		set("stab/flag", false);
		send("set no_teach prepare");
		world.note("变量list_mloc不存在或者为空！");
		return;
	}

	var ix = query("stab/index") - 0;
	lt = lt.split(",");
	if (ix >= lt.length) {
		wp = get_var("id_weapon");
		set("stab/miss", true);
		send(get_var("cmd_pre")+";wield " + wp + ";wear " + wp + ";set no_teach prepare");
	} else {
		lt = lt[ix].split(":");
		set("nextstep/flag", "COMMANDS");
		set("nextstep/cmds", "#t+ pe_stab;summon " + lt[0] + ";stab " + lt[0]);
		goto(lt[1]);
	}
}

//--------------------------------------------------------------------------------
// 触发函数。
// ^    这里(.*)的出口是(.*)。
function on_step(name, output, wildcards)
{
	var wcs, mdir;
	wcs = VBArray(wildcards).toArray();
	world.speedwalkdelay = 0;
	if (query("other/trace")) {
		switch (query("walk")) { 
			case "auto":
				mdir = auto_search.dir;
				step_trace(mdir);
				break;
			case "multi":
				mdir = step_walk.next();
				step_trace(mdir);
				break;
		}
	}

	if (!query("other/walk")) return;

	switch (query("walk")) { 
		case "auto":
			world.EnableTimer("timer1", false);
			if (enter_maze(mdir)) return;
			var exs = exit_filt(wcs[1]);
			var dir = auto_search.next(exs.split(","));
			if (dir == m_FAIL) {
				world.note("-----autosearch end!-----"); 
				do_nextstep();
				return;
			}
			open_timer1(1,"step_fail",null)
			send(dir);
			break;
		case "multi":
			if (enter_maze(mdir)) return;

			var cmd = query("room/cmd");
			if (cmd != "") {
				send(cmd);
				set("room/cmd", "");
			}

			if ((step_walk.eof() || step_walk.eob()) && (query("npc/find") == -1)&&NpcAlive()) {
				kill_npc();
				return;
			}

			if (step_walk.eof()) do_nextstep();
			else if (step_walk.eob()) send(step_walk.block(get_var("num_step")));
			break;
		case "find":
			world.EnableTimer("timer1", false);
			var res = exit_filt(wcs[1], "GPS");
			if (res != -1 && res != m_FAIL) {
				world.note("---当前位置[" + res + "]---");
				set("room/id", res - 0);
				goto(query("nextstep/loc"));
				return;
			}
			var exs = exit_filt(wcs[1], "find");
			var dir = auto_search.next(exs.split(","));
			if (dir == m_FAIL) {
				world.note("---无法定位---");
				return;
			}
			open_timer1(1,"step_fail",null)
			send(dir);
			break;
	}
}

function on_maze(name, output, wildcards)
{
	switch (name) {
		case "sm_exit":	// ^    这里(.*)的出口是(.*)。
			var rn = query("room/name");
			if (rn == "戈壁滩")
				send("set no_teach maze");
			else if (rn == "大沙漠" || rn == "南疆沙漠")
				send("hp;set no_teach maze");
			else if (rn == "诡异墓园") {
				if (dg_maze.trace()) {
					set("xuemo/npc", "");
					send(do_xuemo());
				} else {
					stop_all();
					world.EnableTrigger("dg_map0", true);
					world.EnableTrigger("dg_mape", true);
					open_timer1(1, "busy0", "fmap;set no_teach xuemo");
				}
			}
			else if (rn == "秦陵地宫") {
				if (dg_maze.trace()) {
					set("digong/npc", "");
					send(do_digong());
				} else {
					stop_all();
					world.EnableTrigger("dg_map0", true);
					world.EnableTrigger("dg_mape", true);
					open_timer1(1, "busy0", "fmap;set no_teach digong");
				}
			}
			else
				world.EnableTriggerGroup("gsm", 0);
			break;
		case "sm_step":	// ^(> )*设定环境变数：no_teach = "maze"
			if (query("hp/qi") < (query("hp/max_qi") * 0.7)) send("yun recover");
			if (query("hp/jing") < (query("hp/max_jing") * 0.7)) send("yun regenerate");

			var rn = query("room/name");
			var ct = query("maze/count") - 0;
			var dir = query("maze/dir");
			if (rn == "大沙漠") {
				if (query("hp/neili") < (get_var("min_neili") -0 + 1000)) send("mtc");
				if (query("hp/neili") < get_var("min_neili")) send("dazuo " + get_var("num_dazuo"));
				if (dir == "w") {
					if (Math.floor(Math.random() * 5) == 1) dir = "s";
				}

				send(dir);
				if (query("walk") == "auto") auto_search.dir = dir;
			} else 
			if (rn == "南疆沙漠") {
				if (dir == "sw") {
					if (ct < 9) dir = "sw";
					else dir = "ne";

					set("maze/count", (ct + 1));
				}

				send(dir);
				if (query("walk") == "auto") auto_search.dir = dir;
			} else 
			if (rn == "戈壁滩") {
				if (dir == "e") {
					if (ct < 2) dir = "s";
					else if ((ct % 2)) dir = "e";
					else dir = "s";
				} 
				else if (dir == "w") {
					if (ct < 2) dir = "w";
					else if ((ct % 2)) dir = "n";
					else dir = "w";
				}

				send(dir);
				set("maze/count", (ct + 1));
				if (query("walk") == "auto") auto_search.dir = dir;
			}
			break;
		case "sm_out":	// ^(> )*(深山|昆仑山下|戈壁|丝绸之路|天山脚下|东门)$
			world.EnableTriggerGroup("gsm", 0);		
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", true);
			break;
	}
}

function on_walk(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "wk_busy":	// ^(> )*你(的动作还没有完成，不能移动|逃跑失败)。$
			world.DiscardQueue();
			world.EnableTrigger("wk_busy", false);
			if (output.indexOf("感觉相当飘忽") != -1)
				if (query("miss/fail")){
					stop_all()
					var date = new Date();
					var time = date.getTime();
					set("miss/until",time+5*60*1000)
					send("hp;i;set no_teach prepare")
					return
				}else{
					set("miss/fail",true)
					send("mdan1")
				}

			if (output.indexOf("虾兵虾将") != -1) {
				send("#t- step;#t+ bs_sea;look");
				return;
			}
			var rn = query("room/name");
			if (rn == "秦陵地宫") {
				set("digong/npc","end");
				 open_timer1(1, "busy0", do_digong() + ";#t+ wk_busy");	
			} else 	if (rn == "诡异墓园") {
				set("xuemo/npc","end");
				 open_timer1(1, "busy0", do_xuemo() + ";#t+ wk_busy");	
			} else
			open_timer1(1, "busy0", get_step() + ";#t+ wk_busy");
			break;
		case "wk_noexit":	// ^(> )*这个方向没有出路。
			var rd = query("room/id");
			if (rd == 2820) {
					stop_all();
					world.EnableTrigger("dg_map0", true);
					world.EnableTrigger("dg_mape", true);
					open_timer1(1, "busy0", "fmap;set no_teach digong");
			} else {
					set("room/id", -1);
					if (query("quest/flag") == "null") return;
					stop_all();
					open_timer1(1, "busy0", "set no_teach no exit");
			}
		//	if (rd != -1) add_log("没有出路：" + rd + " " + step_walk.dir);
			break;
		case "wk_miss":	// ^(> )*你口中念念有词，转瞬天际一道长虹划过，你驾彩虹而走。
			world.EnableTriggerGroup("gsm", 0);
			world.EnableTrigger("step", true);
			set("room/id", query("room/miss") - 0);
			break;
		case "wk_missf":	// ^(> )*你摸着(.*)，发了半天的呆。|^(> )*你无法追寻
			stop_all();
			set("stab/index", 0);
			set("stab/miss", false);
			send("set no_teach prepare");
			break;
		case "wk_shhu":	// ^(> )*你(突然发现眼前的景象有些迷乱|纵身而起，离瀑布顶只差一点点了，再加把劲)。
			send(get_step());
			break;
		case "wk_bar":		// ^(> )*(摘星子|虚通|虚明)(喝道：这位|伸手拦住你白眼一翻说道|拦住你说道|迈步挡在你身前)
			var elt = {"亲兵" : 5, "衙役" : 5, "官兵" : 5, "宋兵" : 5, "虚通" : 5, "虚明" : 5, "道一" : 5,
				"大汉" : 10, "拓跋" : 30, "摘星子" : 40, "劳德诺" : 70, "空见" : 500};

			var npc = wcs[1];
			var num = elt[npc];
			if (num == null) num = 100;
			var exp = query("hp/exp");
			if (exp < (num * 10000)) {
				telldm("Help kill " + npc);
				return;
			} 

			var list = {"安健刚" : "an jiangang", "孟健雄" : "meng jianxiong", "心砚" : "xin yan", "大汉" : "da han",
				"周绮" : "zhou yi", "蒋四根" : "jiang sigen", "石双英" : "shi shuangying", "拓跋" : "tuoba", 
				"卫春华" : "wei chunhua", "杨成协" : "yang chengxie", "徐天宏" : "xu tianhong", 
				"常伯志" : "chang bozhi", "常赫志" : "chang hezhi", "赵半山" : "zhao banshan", 
				"周仲英" : "zhou zhongying", "陆菲青" : "lu feiqing", "无尘" : "wuchen daozhang", 
				"摘星子" : "zhaixing zi", "虚通" : "xu tong", "虚明" : "xu ming", "劳德诺" : "lao denuo",
				"李力世" : "li lishi", "江百胜" : "jiang baisheng", "官兵" : "guan bing", "衙役" : "ya yi",
				"宋兵" : "song bing", "侍女" : "shi nu", "亲兵" : "qin bing", "褚万里" : "chu wanli", "空见" : "kong jian", "道一" : "daoyi chanshi"};

			var cmd = "kill " + list[npc];
			if (get_var("cmd_pfm") == "shot") cmd += ";shot " + list[npc] + " with arrow";

			send(cmd);
			world.EnableTrigger("wk_die", true);
			break;
		case "wk_die":	// ^(> )*(虚通|虚明|摘星子)扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！$
			world.EnableTrigger("wk_die", false);
			send(get_step());
			break;
		case "wk_wd":	// ^请不要装备武器。
			var wp = get_var("id_weapon");
			send("unwield " + wp + ";" + get_step() + ";wield " + wp);
			break;
		case "wk_cross":	// ^(> )*(船厂里走出一个船夫，瞪着眼看着你|船夫在旁边拿眼瞪......
			if (query("walk") == "multi") {
				step_trace(step_walk.next());
				step_walk.blockend ++;
				send("cross");
			}
			break;
		case "wk_crossf":	// ^(> )*你的内力不够，还是休息一下再说吧。
			open_timer1(2, "busy", "cross;piao");
			break;
		case "wk_yell":	// ^(> )*你(.*)一声：“船家！”		
			world.EnableTrigger("wk_dcbusy", true);
			world.EnableTrigger("wk_dcready", true);
			break;
		case "wk_dcbusy":	// ^(> )*只听得湖面上隐隐传来：“别急嘛，这儿正忙着呐……”
			world.EnableTrigger("wk_dcbusy", false);
			open_timer1(1, "busy", "yell boat");
			break;
		case "wk_dcout":	// ^(> )*艄公说“到啦，上岸吧”，随即把一块踏脚板搭上堤岸。
			world.EnableTrigger("wk_dcbusy", false);
			send("halt;out");
			break;
		case "wk_dcready":	// ^一叶扁舟缓缓地驶了过来，艄公将一块踏脚板搭上堤岸
			world.EnableTrigger("wk_dcbusy", false);
			world.EnableTrigger("wk_dcready", false);
			set("room/name", "渡船");
			send("enter;" + get_var("cmd_mache"));
			break;
		case "wk_mache":		// ^(> )*马夫一声招呼，开过来一辆大车，你上了车就出发了。
			set("room/name", "马车");
			send("drop head 2;"+get_var("cmd_mache"));
			break;
		case "wk_mcout":	// ^(> )*你到了(.*)，下了车。
			world.SendImmediate("halt");
			break;
		case "wk_ride":		// ^(> )*这里没有这样东西可骑。
			if(output.indexOf("可骑")) {
				set("room/id", -1);
				goto(query("nextstep/loc"));
			} else
				open_timer1(1, "busy", "ride diao");
			break;
		case "wk_ssl":		// ^象一蓬蓬巨伞般伸向天空，把阳光遮得丝毫也无。尺把厚的松针
			if (query("walk") != "find")
				return;

			stop_all();
			set("room/id", 2400);
			goto(query("nextstep/loc"));
			break;
	}
}

function on_quest(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "qt_sl":	// ^最近(.*)在(.*)作恶多端，你去把他除了，提头来见。”	
			world.SetVariable("name_npc", wcs[0]);
			set("npc/name", wcs[0]);
			HelpFind(query("npc/name"))
			send("quest");
			world.EnableTrigger("qt_disp", true);
			world.EnableTrigger("qt_start", true);
			break;
		case "qt_kl2":	// ^(> )*(@master_name)对你道：“(.*)(这个败类打家劫舍，无恶不......
		case "qt_kl1":	// ^(> )*(@master_name)对你道：“我早就看(.*)不顺眼，听说他最......		
			world.SetVariable("name_npc", wcs[2]);
			set("npc/name", wcs[2]);
			HelpFind(query("npc/name"))
			send("quest");
			world.EnableTrigger("qt_disp", true);
			world.EnableTrigger("qt_start", true);
			break;
		case "qt_num":	// ^(> )*师长交给你的任务，你已经连续完成了(.*)个。
			var ct = wcs[1] - 0;
			set("quest/count", ct);
			if (ct == 1)
				add_log("count(1):----------------------------------");
			break;
		case "qt_accept":	// ^(> )*(你一回头|你转身一看|突然一位|只见你刚想|只听扑倏扑倏......
			set("quest/letter", true);
			if (query("timer/flag") == "quest_end") world.EnableTimer("timer1", false);
			if (can_accept()) {
				stop_all();
				send("l letter of me");
			}
			break;
		case "qt_letter":	// ^“字谕弟子(.*)：(得闻恶贼|武林人士)(.*)(打家劫舍|所为甚是讨厌，)		
			set("other/loc", wcs[4]);
			world.SetVariable("name_npc", wcs[2]);
			set("npc/name", wcs[2]);
			HelpFind(query("npc/name"))
			world.SendImmediate("halt");
			world.EnableTrigger("qt_letter1", true);
			break;
		case "qt_letter1":	// ^正是大好机会将他除去，你若愿意
			var loc = query("other/loc") + wcs[0];
			world.EnableTrigger("qt_letter1", false);
			if (query("npc/status") == "head" && query("quest/master") 
			&& (loc.indexOf("西域") != -1 || loc.indexOf("大理") != -1)) {
				do_quest();
			} else {
				send("accept quest;quest");
				world.EnableTrigger("qt_disp", true);
				world.EnableTrigger("qt_start", true);
			}
			break;
		case "qt_letter2":	// ^如果你愿意接受此任务，请在三十秒之内输入(accept quest)以确认，
			break;
		case "qt_npc":	// ^(@master_name)吩咐你在(.*)之前割下(.*)的人头，回(.*)交差。
			set("npc/name", wcs[2]);
			HelpFind(query("npc/name"))
			world.SetVariable("name_npc", wcs[2]);
			break;
		case "qt_start":	// ^据说此人前不久曾经在(.*)出没。
			world.EnableTrigger("qt_disp", false);
			world.EnableTrigger("qt_nobody", false);	
			world.EnableTrigger("qt_start", false);
			set("quest/letter", false);
			set("quest/master", true);
			set("askyou/count", 0);
			set("npc/wd", -1);
			set("npc/id", "no body");
			set("npc/loc", wcs[0].substr(0, 2));
			add_room_cmd(get_var("cmd_bquest") + ";hp");
			to_kill(true);
			break;
		case "qt_disp":	// (@npc_name)在(.*)失踪了！现在不知道去了哪里！”
			set("npc/status", "disp");
			break;
		case "qt_give":	// ^(> )*(@master_name)(.*)，(对|看了看)你道：“(又除了一害，很好！|好极了！......
			set("npc/status", "end");
			world.SetVariable("name_npc", "aa");
			world.EnableTrigger("qt_nobody", false);
			if (output.indexOf("算了") != -1) {
				set("quest/count", 0);
				add_log("count(" + query("quest/count") + "):" + output);
			}

			if (can_jiqu() && query("hp/th") > 1000) send("time");
			send("hp;i;set no_teach prepare");
			break;
		case "qt_busy1":	// ^(> )*(@master_name)正忙着呢，没功夫理你。
		case "qt_busy":	// ^你还是有空了再和(@master_name)谈这些问题吧！
				open_timer1(1, "busy0", "quest " + get_var("id_master"));
			break;
		case "qt_nomaster":	//这里没有这个人，你怎么领任务？
			if (query("quest/flag") != "kill") return;

			set("quest/master", false);
			if (query("quest/letter")) {	
				send("l letter of me");
				return;
			}

 			telldm("掌门被砍死啦！");
			goto(query("room/chat"));
			break;
		case "qt_nobody":	// ^(这里没有这个人。|给你下任务的那个人现在不在这里吧？)
			world.EnableTrigger("qt_nobody", false);
			if (query("quest/flag") != "kill") break;

			set("quest/master", false);
			do_prepare();
			break;
		case "qt_none":	// ^你现在没有领任何任务！
			set("npc/status", "end");
			break;
	}
}

function on_kill(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "kl_npc":		// ^  (@npc_name)\((.*)\)$
			var rm = query("room/id");
			if ((rm >= 1937 && rm <= 1949) || (rm >= 2443 && rm <= 2455)) return;

			if (name == "kl_npc") {
				if (wcs[1].indexOf(" ") == -1) return;
				set("npc/id", wcs[1]);
			}
		case "kl_npc1":		// ^  (@npc_name)正坐在地下
			set("askyou/count", 0);
			set("npc/coor", query("room/id"));
			if (query("npc/find") == -1) return;

			if (name == "kl_npc1" || name == "kl_npc") {
				world.EnableTriggerGroup("gkl", 1);
			}
			world.Note("发现 "+query("npc/name"))
			set("npc/find", -1);
			var rn = query("room/name");
			if (rn == "大沙漠" || rn == "南疆沙漠" || rn == "戈壁滩" || query("walk") == "auto") {
				stop_all();
				send(kill_cmd());
			}
			break;
		case "kl_npc2":		// ^(@npc_name)( )*= (.*)
			var id = wcs[2].split("、");
			set("npc/id", id[0]);
			break;
		case "kl_fight1":	// ^(> )*你对著(@npc_name)喝道：(.*)
			//var rm = query("room/id");
			//if (rm != -1) mapper.exec("mush mark " + rm + " 0");
		case "kl_fight2":	// ^(> )*你正在和人家生死相扑呢。
			world.EnableTrigger("kl_nobody", false);
			set("npc/find", 1);
			open_pfm();
			break;
		case "kl_fight4":	// ^(> )*你现在没有力气战斗了。
			world.EnableTrigger("kl_nobody", false);
			set("npc/find", 0);
			set("npc/coor",-1);
			world.EnableTimer("t_pfm", false);
			send("hp;set no_teach heal");
			break;
		case "kl_fight5":	// ^(> )*看起来(@name_npc)想杀死你！
			set("npc/onkill",get_var("name_npc"))
			var tmp = get_var("cmd_pfm");
			if (tmp == "shot" || tmp.indexOf("mpf") != -1) return;
			if (query("npc/wd") == 1){
					send(CmdMpf())
			}else{
				set("npc/wd", 0);
			}
			send(get_var("cmd_pfm") + ";#q");
			break;
		case "kl_wd":	// ^(> )*(@name_npc)微一凝神，运起太极神功，全身灌满真气，衣裳无风自舞，气势迫人。
			var fam = get_var("id_pass");
			if (output.indexOf("双目已经") != -1 && (fam == "xd" || fam == "em" || fam == "sl" || fam == "xs")) return;
			set("npc/wd", 1);
			break;
		case "kl_nobody":	// ^(这里没有这个人。|这里不准战斗。|看清楚一点，那并不是活物。)
			world.EnableTrigger("kl_nobody", false);
			world.EnableTrigger("kl_help", false);
			world.EnableTrigger("kl_help1", false);
			set("npc/find", 0);
			set("npc/coor",-1);
			do_areasearch();	
			break;
		case "kl_fight3":	// ^(> )*(@npc_name)(一见到你|和你一碰面|对著你大喝|喝道：「你|一眼瞥见你|和你仇人相见分外眼红)
			stop_all();
			world.EnableTriggerGroup("gkl", 1);
			set("npc/onkill",get_var("name_npc"))
			send(kill_cmd());
			break;
		case "kl_flee":	// (@npc_name)(摇摇欲坠|身负重伤|狂叫一声|晃了两下|再退一步|已是避|深吸一口气|只有招架之功)(.*)
			if (output.indexOf("兵法战策")>-0){
				return
			}
			world.EnableTimer("t_pfm", false);
			world.EnableTriggerGroup("gkl", 0);
			world.EnableTriggerGroup("gkl1", 0);
			set("quest/info", 0);
			set("npc/find", 0);
			set("npc/coor",-1);
			set("npc/status", "flee");
			if (query("hp/dispel")) {
				ydispel(true);
				return;
			}
			send("hp;set no_teach heal");
			break;
		case "kl_weft":	// ^(> )*(@npc_name)(大声喝道：“好一个|忽然撮舌吹哨，你听了不禁微微一愣。|一声长啸......
			world.EnableTrigger("kl_help", true);
			break;
		case "kl_help":	// ^(> )*说时迟，那时快！突然转出(.*)个人，一起冲上前来，看来是早有防备！$
			world.EnableTrigger("kl_help1", true);
			break;
		case "kl_help1":	// ^(> )*说时迟，那时快！突然转出(.*)个人，一起冲上前来，看来是早有防备！$
			//if (wcs[1] == query("npc/name") || wcs[1].indexOf("蛇") != -1 || wcs[1] || wcs[1].indexOf("蝎") != -1 || wcs[1].indexOf("虎") != -1 || wcs[1].indexOf("狼狗") != -1) return;
			var cmd = get_var("id") + ";" + get_var("passw") 
				+ ";y;cut head from corpse;get head;" + kill_cmd();
			reconnect(cmd);
			break;
		case "kl_faint":	// ^(> )*(@npc_name)脚下一个不稳，跌在地上一动也不动了。
			world.EnableTimer("t_pfm", false);
			set("npc/status", "faint");
			//var cmd = "gzhen " + query("npc/id") + ";" + get_var("cmd_npcfaint") + ";hp;i";
			var cmd = "";
			if (query("item/zhen") < 399) cmd = "gzhen " + query("npc/id") + ";" 
			set("npc/busystart",(new Date()).getTime())
			cmd +=get_var("cmd_npcfaint") + ";i;hp";
			var weapons=(get_var("id_weapon")+";"+get_var("id_weapon")+";"+get_var("id_weapon")+";"+get_var("id_weapon2")+";"+get_var("id_weapon3")).split(";")
			var list=[]
			weapons.forEach(function(data){
				if (data){
					list.push(data)
				}
			})
			if (list.length){
				var num = Math.floor(Math.random() * list.length);
				var wp=list[num]
				set("weapon/id",wp)
				cmd += ";l " + wp + " of me";
			}
			send(cmd);
			tongji(1);
			break;
		case "kl_die":	// ^(> )*(@npc_name)扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！$
			if (wcs[0] != query("npc/name")) {
				var tmp = query("npc/corpse") - 0;
				set("npc/corpse", tmp + 1);
				return;
			}

			world.EnableTrigger("kl_nohead", true);
			world.EnableTrigger("kl_help", false);
			world.EnableTrigger("kl_help1", false);
			world.EnableTimer("t_pfm", false);
			set("npc/find", 0);
			set("npc/coor",-1);
			set("npc/head", 0);
			set("npc/corpse", 1);
			set("npc/wd", 0);
			set("npc/status", "dead");
			set("npc/onkill","")
			add_room_cmd(get_var("cmd_aquest"));
			var busystart=query("npc/busystart")
			if (busystart){
				var busy=((new Date()).getTime()-busystart)/1000
				var allbusy=query("stat/busy")-0+busy
				var busycount=query("stat/busycount")-0+1
				set("stat/busy",allbusy)
				set("stat/busycount",busycount)
				set("stat/busyeff", allbusy/busycount);
			}
			var cmd = "cut head from corpse;get head";
				
			var tmp = get_var("cmd_npcdie");
			if (tmp != null && tmp != "") {
				tmp = tmp.split("|");
				if (tmp.length < 2) cmd = tmp[0] + ";" + cmd;
				else cmd = tmp[0] + ";" + cmd + ";" + tmp[1];
			}

			send(cmd);
			break;
		case "kl_head":	// ^(> )*你捡起一颗(.*)的人头。
			var npc = query("npc/name");
			if (query("npc/status") != "dead" && npc != wcs[1]) return;

			if (npc != wcs[1] && query("npc/head") == 0) {
				set("npc/head", 1);
				send("drop head;cut head from corpse " + query("npc/corpse") + ";get head;#q");
				return;
			}

			world.EnableTriggerGroup("gkl", 0);
			world.EnableTriggerGroup("gkl1", 0);
			if (npc == wcs[1]) set("npc/status", "head");

			if (query("hp/dispel")) {
				ydispel(true);
				return;
			}

			if (npc == wcs[1] && (!can_accept() || ((get_var("bool_accept") == "both") && (query("hp/pot") < get_var("min_pot"))) ||!get_var("bool_accept"))) {
				do_quest();
				return;
			} else
			if (npc != wcs[1] && !can_accept()) {
				send("drop head;hp;i;set no_teach prepare");
				return;
			}

			if (get_var("bool_miss") && query("stab/miss")) {
				set("nextstep/flag", "COMMANDS");
				set("nextstep/cmds", "set no_teach wait letter");
				goto(get_var("loc_dazuo"));
			} else
				do_wait();
			break;
		case "kl_nohead":	// ^(> )*(头已经被割走了|你没有地方下手|你附近没有这样东西|你身上的东西......
			if (query("npc/head") == 0) {
				set("npc/head", 1);
				if (query("npc/corpse") == 1) send("get head");
				else send("cut head from corpse " + query("npc/corpse") + ";get head;#q");
				return;
			}

			world.EnableTriggerGroup("gkl", 0);
			world.EnableTriggerGroup("gkl1", 0);
			if (query("hp/dispel")) {
				ydispel(true);
				return;
			}

			if (!can_accept()) {
				send("hp;i;set no_teach prepare");
				return;
			}

			if (get_var("bool_miss") && query("stab/miss")) {
				set("nextstep/flag", "COMMANDS");
				set("nextstep/cmds", "set no_teach wait letter");
				goto(get_var("loc_dazuo"));
			} else
				do_wait();
			break;
	}
}

function on_info(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	world.EnableTriggerGroup("gio", 0);
	switch (name) {
		case "io_nobody":	// ^这里没有这个人。
		case "io_next":	// ^(> )*(@info_name)(摇摇头，说道：没听说过。|疑惑地看着你，摇了摇头。|睁大眼睛望......
			set("quest/info", (query("quest/info") - 0 + 1));
			do_askinfo();
			break;
		case "info":		// ^(> )*(@info_name)说道：(.*)(好像听人说过是在|他不是在|据说是躲到|好像去了|已......
			set("npc/loc", wcs[4].substr(0, 2));
			to_kill(false);
			break;
		case "io_again":	// ^(> )*(@info_name)(说道：阿嚏！有点感冒，不好意思。|说道：等...等等，你说什么？没......
			send("ask " + query("info/id") + " about " + query("npc/name"));
			break;
		case "io_ask":	// ^(> )*你向(.*)打听有关『(@npc_name)』的消息。$
			world.EnableTriggerGroup("gio", 1);
			break;
		case "io_you":	// 游讯在你的耳边悄声说道：据可靠消息，这个人刚才在(.*)。
			world.EnableTrigger("io_you2", false);
			world.EnableTrigger("io_you3", false);
			set("other/loc1", wcs[0]);
			var loc = get_room_id(wcs[0]);
			if (loc == m_FAIL) {
				world.note("trigger(askyou):没有 " + wcs[0] + " 这个地方！");
				set("askyou/loc", null);
				set("askyou/index", 0);
				set("askyou/flag", false);
				set("askyou/none", true);
				set("npc/loc", "很远");
				to_kill(false);
				return;			
			}

			if (loc.length > 1) {
				var tmp = new Array();
				for (var i=0; i<loc.length; i++) {
					if (incity(loc[i], query("npc/loc"))) tmp[tmp.length] = loc[i];
				}

				if (tmp.length < 1) {
					add_log("io_you:" + query("npc/loc") + "." + query("other/loc1") + "无法确定");
					for (var i=0; i<loc.length; i++) {
						if (incity(loc[i], "很远")) tmp[tmp.length] = loc[i];
					}
				}

				loc = tmp;
				world.note(query("npc/loc") + "." + query("other/loc1") + ":" + loc);
			}

			set("askyou/loc", loc);
			set("askyou/index", 0);
			set("askyou/flag", true);
			do_gpssearch();
			break;
		case "io_you0":	// ^[> ]*你向游讯打听有关『(.*)』的消息。 
			world.EnableTrigger("io_you", true);
			world.EnableTrigger("io_you1", true);
			world.EnableTrigger("io_you2", true);
			world.EnableTrigger("io_you3", true);
			break;
		case "io_you1":	// ^(> )*游讯嘿嘿奸笑两声，对你小声道：“没有问题，不过
			world.EnableTrigger("io_you3", false);
			send("give 5 cash to you xun");
			break;
		case "io_you2":	// ^(> )*你(没有那么多的黄金|身上没有这样东西)。
			world.EnableTrigger("io_you2", false); 
			world.EnableTrigger("io_you3", false); 
			send("give 5 cash to you xun");
			break;
		case "io_you3":	// 游讯(摇摇头，说道：没听说过。|疑惑地看着你，摇了摇头。|睁大眼睛望
			world.EnableTrigger("io_you2", false);
			world.EnableTrigger("io_you3", false);
			var ix = query("askyou/idpt") + 1;
			if (ix >= npc_id.length) {
				set("npc/status", "end");
				set("npc/onkill","")
				send("hp;i;set no_teach prepare");
				add_log("io_you3:找不到" + query("npc/name") + "。");
				return;
			}

			set("askyou/idpt", ix);
			set("npc/id", npc_id[ix]);
			send("ask you xun about " + npc_id[ix]);
			break;
	}
}

function on_prepare(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "pe_stab":	// ^(> )*你随手将*往地上一插，发出“嚓愣”一声响。
			world.EnableTrigger("pe_stab", false);
			var ix = query("stab/index") - 0 + 1;
			set("stab/index", ix);
			do_stab();
			break;
		case "pe_drop":	// ^(> )*你丢下(.*)(仙丹|洗髓丹|火红仙.....
			world.EnableTrigger("pe_drop", false);
			send("i;set no_teach prepare");
			break;
		case "pe_repair": // ^(> )*铁匠道：“好了！”随手把(.*)还给了你，你看了看，满意的掏出了一些钱付了帐。$
			world.EnableTrigger("pe_repair", false);
				set("weapon/dur", 100);
				set("weapons/"+query("weapon/id"), 100);
				send(get_var("cmd_pre"));
			break;	
		case "pe_buy":		// ^(> )*你从店小二那里买下了
			world.EnableTrigger("pe_buy", false);
			world.EnableTrigger("pe_nobuy", false);
			if (query("item/buy") == "yao from yaopu huoji") {
				send("dazuo");
				return;
			} else
			if (query("item/buy") == "long bow from tie jiang") {
				send("hand gong");
			} else 
			if (query("item/buy") == "long sword from tie jiang") {
				send("wield long sword");
			} else 
			if (query("item/buy") == "100 gangbiao from tie jiang") {
				send("hand gangbiao");
			}

			set("item/buy", "null");
			send("i;set no_teach prepare");
			break;
		case "pe_nobuy":	// ^(> )*什么？
			world.EnableTrigger("pe_buy", false);
			world.EnableTrigger("pe_nobuy", false);
			goto(26);
			break;
		case "pe_jiqu1":	// ^(> )*你默默的想了想先前一段时间和对手交手时的情形
			world.EnableTrigger("pe_jiqu2", true);
			break;
		case "pe_jiqu3":	// ^(> )*你感觉自己的实战经验还有欠缺，还无法领会更高境界
			set("other/jiqu", (new Date()).getTime());
		case "pe_jiqu2":	// ^(> )*你将实战中获得的体会心得充分的消化吸收了。
			world.EnableTrigger("pe_jiqu1", false);
			world.EnableTrigger("pe_jiqu2", false);
			world.EnableTrigger("pe_jiqu3", false);
			send("hp;set no_teach prepare");
			break;
		case "pe_cunb":	// ^(> )*你还是等有空了再说吧！
			world.EnableTrigger("pe_silver", false);
			world.EnableTrigger("pe_cunb", false);
			open_timer1(2, "busy", "set no_teach cun money");
			break;
		case "pe_silver":	// ^(> )*你从银号里取出(.*)。
			world.EnableTrigger("pe_silver", false);
			world.EnableTrigger("pe_cunb", false);
			world.EnableTrigger("pe_qub", false);
			send("i;set no_teach prepare");
			break;
		case "pe_qub":	// ^(> )*你还是等有空了再说吧！
			world.EnableTrigger("pe_silver", false);
			world.EnableTrigger("pe_qub", false);
			open_timer1(2, "busy", query("item/qu"));
			break;
		case "pe_quf":	// ^(> )*你存的钱不够取。
			world.EnableTrigger("pe_silver", false);
			world.EnableTrigger("pe_cunb", false);
			world.EnableTrigger("pe_qub", false);
			send("duihuan 10 cash to gold;refund 1");
			telldm("钱不够取！");
			NotifyDM("余额不够");
			open_timer1(2, "busy", "i;set no_teach prepare");
			break;
		case "pe_fangqi":	// ^(> )*(你抬头仰望天空，发现它明亮透析，说不出的娇媚，令你身心俱化。|你又想起了很......
			var num = get_var("max_exp") - 1000;
			if (query("hp/exp") < num) {
				world.EnableTrigger("pe_fangqi", false);
				do_prepare();
				return;
			}

			open_timer1(1, "busy", "fangqi exp;hp");
			break;
		case "pe_study":		// ^(> )*你要向谁求教？
			if (get_var("cmd_study").indexOf("xue ") != -1) {
				world.EnableTrigger("pe_study", false);
				set("other/study", (new Date()).getTime());
				send("hp;set no_teach prepare");
			}
			break;
		case "pe_cures":	// ^(> )*你向薛慕华打听有关『疗伤』的消息。
			world.EnableTrigger("pe_nobody", false);
			world.EnableTrigger("pe_cure", true);
			world.EnableTrigger("pe_curef", true);
			world.EnableTrigger("pe_cure1", true);
			break;
		case "pe_nobody":	// ^这里没有这个人。
			world.EnableTrigger("pe_cures", false);
			world.EnableTrigger("pe_nobody", false);
			set("nextstep/flag", "COMMANDS");
			set("nextstep/cmds", "#t+ pe_heal;#t+ pe_healf;yun heal");
			goto(get_var("loc_dazuo"));
			break;
		case "pe_cure1":	// ^薛慕华说道：你没有受任何伤啊？
		case "pe_cure":	// ^薛慕华喂你服下一颗药丸，然后盘膝坐下，双掌贴着你的背心。
			world.EnableTrigger("pe_cures", false);
			world.EnableTrigger("pe_cure", false);
			world.EnableTrigger("pe_curef", false);
			world.EnableTrigger("pe_cure1", false);
			world.SetVariable("name_npc", query("npc/name"));
			set("hp/eff_qi", 100);
			add_room_cmd("hp");
			do_continue();
			break;
		case "pe_curef":	// ^(> )*薛慕华说道：没看我正忙着么？
			world.EnableTrigger("pe_curef", false);
			world.EnableTrigger("pe_cure1", false);
			open_timer1(1, "busy", "ask xue muhua about 疗伤");
			break;
		case "pe_heal":		// ^你运功完毕，吐出一口瘀血，脸色看起来好多了。
			world.EnableTrigger("pe_heal", false);
			world.EnableTrigger("pe_healf", false);
			send("hp;set no_teach prepare");
			break;
		case "pe_healf":	// ^(> )*(等你忙完了手头的事情再说！|你的真气不够。)
			open_timer1(3, "busy", "yun heal");
			break;
		case "pe_sleep":	// ^(> )*你(一觉醒来，只觉精力充沛。该活动一下了|迷迷糊糊的睁开双眼，爬了起来)。
			world.EnableTrigger("pe_sleep", false);
			set("quest/letter", false);
			if (output.indexOf("迷迷糊糊") != -1) {
				set("nextstep/flag", "COMMANDS");
				set("nextstep/cmds", "#t+ pe_dazuo;#t+ pe_dazuof;dazuo " + get_var("num_dazuo"));
				goto(get_var("loc_dazuo"));
				return;
			} else {
				var date = new Date();
				var time = date.getTime();
				set("other/sleep", time);
			}

			send("hp;set no_teach prepare");
			break;
		case "pe_dazuo":	// ^(> )*你运功完毕，深深吸了口气，站了起来。
			world.EnableTrigger("pe_dazuo", false);
			world.EnableTrigger("pe_dazuof", false);
			send("hp;set no_teach prepare");
			break;
		case "pe_dazuof":	// ^(> )*你(现在精不够，无法控制内息的流动|现在的气太少了，无法产生内息运行全身经脉)
			open_timer1(2, "busy", "yun regenerate;yun recover;dazuo " + get_var("num_dazuo"));
			break;
		case "pe_tuna":		// ^(> )*你吐纳完毕，睁开双眼，站了起来。
			world.EnableTrigger("pe_tuna", false);
			world.EnableTrigger("pe_tunab", false);
			send("hp;set no_teach prepare");
			break;
		case "pe_tunab":	// 你现在正忙着呢！
			send("yun recover;")
			open_timer1(1, "busy", "tuna "+get_var("num_tuna"));
			break;
	}
}

function on_hp(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "hp_1":	// ^【 精 气 】(.*)/(.*)\((.*)%\)(.*)【 精 力 】(.*)/(.*)$
			set("hp/jing", (wcs[0] - 0));
			set("hp/max_jing", (wcs[1] - 0));
			set("hp/eff_jing", (wcs[2] - 0));
			set("hp/jingli", (wcs[4] - 0));
			set("hp/max_jingli", (wcs[5] - 0));
			break;
		case "hp_2":	// ^【 气 血 】(.*)/(.*)\((.*)%\)(.*)【 内 力 】(.*)/(.*)$
			set("hp/qi", (wcs[0] - 0));
			set("hp/max_qi", (wcs[1] - 0));
			set("hp/eff_qi", (wcs[2] - 0));
			set("hp/neili", (wcs[4] - 0));
			set("hp/max_neili", (wcs[5] - 0));
			if (query("other/touch") && (query("hp/jingli")>get_var("min_jingli"))&&(query("hp/neili") < get_var("min_neili"))) send("mtc;#q");
			break;
		case "hp_3":	// ^【 食 物 】(.*)/(.*)【 潜 能 】(.*)$
			set("hp/food", (wcs[0] - 0));
			set("hp/pot", (wcs[2] - 0));

			var le = world.GetLinesInBufferCount ();
			var st = world.GetLineInfo(le, 11);
			if (world.GetStyleInfo (le, st, 14) == world.boldcolour(6)) 
				set("hp/pot_full", true);
			else
				set("hp/pot_full", false);
			break;
		case "hp_4":	// ^【 饮 水 】(.*)/(.*)【 经 验 】(.*)$
			set("hp/water", (wcs[0] - 0));
			set("hp/exp", (wcs[2] - 0));
			break;
		case "hp_5":	// ^(【 平 和 】|【 愤 怒 】)(.*)【 体 会 】(.*)$
			set("hp/th", (wcs[2] - 0));

			if (query("hp/food") < 150 || query("hp/water") < 150) {
				send("halt;eat gan liang;drink shui dai;#q");
			} else {
				if (query("hp/food") < 210)
					add_room_cmd("eat gan liang");

				if (query("hp/water") < 210)
					add_room_cmd("drink shui dai");
			}

			if (query("hp/qi") < query("hp/max_qi") - 30)
				add_room_cmd("yun recover");

			if (query("hp/jing") < query("hp/max_jing") - 30)
				add_room_cmd("yun regenerate");

			if (query("hp/eff_jing") < 70)
				send("eat jiuhua wan;#q");
			break;
	}
}
function on_allitem(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
	var num = number(wcs[2]);
	if (num == 0) num = 1;
	set("allitem/"+wcs[4].toLowerCase(),num)
}
function on_item(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "im_start":	// ^(> )*你身上带著下列这些东西
			set("item/gold", 0);
			set("item/gong", 0);
			set("item/food", 0);
			set("item/wuqi", 0);
			set("item/zhen", 0);
			set("item/money", 0);
			set("item/arrow", 0);
			set("item/silver", 0);
			set("item/lsword", 0);
			set("item/iblade", 0);
			set("item/shuidai", 0);
			set("item/gift", "null");
			set("item/cash", 0);
			set("item/9hua", 0);
			set("item/gangbiao", 0);
			set("item/sell", "null");
			set("item/qlkey", 0);
			set("allitem",{})
			if ((wcs[0] - 0) > 75) set("item/load", true);
			if (output.indexOf("带著") != -1) {
				set("item/flag", true);
				world.EnableTriggerGroup("gim", 1);
			}
			break;
		case "item":		// ^  (.*)(白银\(Silver\)|黄金\(Gold\)|干粮\(Gan liang\)|牛皮水袋\(shui dai\))
			var num = number(wcs[1]);
			if (num == 0) num = 1;

			if (output.indexOf("白银") != -1) {
				var my = query("item/money") - 0;
				my += num;
				set("item/money", my);
				set("item/silver", num);
			} else 
			if (output.indexOf("黄金") != -1) {
				var my = query("item/money") - 0;
				my += num * 100;
				set("item/money", my);
				set("item/gold", num);
			} else
			if (output.indexOf("一千两银票") != -1)
				set("item/cash", num);
			else if (output.indexOf("牛皮水袋") != -1)
				set("item/shuidai", num);
			else if (output.indexOf("干粮") != -1)
				set("item/food", num);
			else if (output.indexOf("长剑") != -1)
				set("item/lsword", num);
			else if (output.indexOf("钢刀") != -1)
				set("item/iblade", num);				
			else if (output.indexOf("长弓") != -1)
				set("item/gong", num);
			else if (output.indexOf("狼牙箭") != -1)
				set("item/arrow", num);
			else if (output.indexOf("九花玉露丸") != -1)
				set("item/9hua", num);				
			else if (output.indexOf("点金盘龙弓") != -1)
				set("item/gong", num);
			else if (output.indexOf("钢镖") != -1)
				set("item/gangbiao", num);
			else if (output.indexOf("青龙臂铠") != -1)
				set("item/qlkey", num);			
			else if (output.indexOf("玉蜂针") != -1) {
				set("item/zhen", num);
				if (num > 699) send("keep 100 yufeng zhen;hand yufeng zhen");
			}

			break;
		case "im_wp":	// ^(  |□)(.*)\(@id_weapon\)
			var tmp = query("item/wuqi") - 0;
			set("item/wuqi", tmp + 1);
			break;
		case "im_end":	// ^目前携带了(.*)件物品。
			world.EnableTriggerGroup("gim", 0);
			set("item/flag", false);
			if (number(wcs[0]) > 40) set("item/load", true);

			var tmp = get_var("id_weapon");
			if (query("item/wuqi") < 1) add_room_cmd("summon " + tmp);
			else if (query("item/wuqi") > 1 && tmp.indexOf(" ") != -1) {
				send("unwield " + tmp + ";drop " + tmp + ";drop " + tmp + ";#q");
				add_room_cmd("summon " + tmp);
			}
			break;
		case "im_gift":	// (仙丹|洗髓丹|火红仙丹|神力丸|菩提子|九转金丹|天香玉露|金块|玄冰寒铁|乌金丝|补天石|冰蚕丝)
		if (output.indexOf("记忆水晶") != -1){
			return 
		} 				
			var gt = wcs[1].toLowerCase();
			set("item/gift", gt);
			break;
		case "im_sell":	// (仙丹|洗髓丹|火红仙丹|神力丸|菩提子|九转金丹|天香玉露|金块|玄冰寒铁|乌金丝|补天石|冰蚕丝)
			var gt = wcs[1].toLowerCase();
			set("item/sell", gt);
			break;
	}
}

function on_global(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "dead":		// ^[> ]*你请先用 enable 指令选择你要使用的内功。
			stop_all(true);
			telldm("死掉了啦！");
			NotifyDM("Enable错误");
			set("connect/auto", false);
			world.Disconnect();
			break;
		case "kmg":		// ^[> ]*你(.*)
			set("timer/idle", false);
			break;
		case "setting":	// ^[> ]*设定环境变数：no_teach = "(.*)"
			if (wcs[0] == "prepare") {
				world.EnableTrigger("level", false);
				do_prepare();
			}
			else if (wcs[0] == "no exit") {
				do_autosearch(5, "find");
			}
			else if (wcs[0] == "wait letter") {
				do_wait();
			}
			else if (wcs[0] == "study") {
				set("other/touch", true);
				if (query("quest/flag") == "null") return;

				var pot = query("hp/pot") - 0;
				if ((pot < get_var("min_pot") && query("hp/neili") < get_var("min_neili")) || pot < 100 || !can_study()) {
					world.EnableTrigger("pe_study", false);
					send("halt;yun regenerate;hp;set no_teach prepare");
					return;
				}

				if (query("hp/jing") < 45 && query("hp/neili") < 30 && can_sleep()) {
					world.EnableTrigger("pe_study", false);
					send("halt;yun regenerate;hp;set no_teach prepare");
					return;
				}
				//if (get_var("cmd_study") != "jingxiu")
				if (get_var("cmd_study") == "yanjiu" || get_var("cmd_study").indexOf("xue") != -1)				
					send("halt;" + get_study() + ";yun regenerate;" + get_var("cmd_studying"));
				else 
					send(get_study());
				open_timer1(2, "busy", "hp;set no_teach study");
			}
			else if (wcs[0] == "cun money") {
				world.EnableTrigger("pe_silver", true);
				world.EnableTrigger("pe_cunb", true);
				if (query("item/silver") > 300) {
					var num = query("item/silver") - 50;
					send("cun " + num + " silver;score");
				}
				else if (query("item/gold") - get_var("min_gold") > 200) {
					var num = query("item/gold") - get_var("min_gold") - 15;
					send("cun " + num + " gold;score");
				} else if (query("item/cash") > 2000) {
					send("bond 2000 cash;i;score;set no_teach prepare");
				}
				 else if (query("item/cash") > 300) {
					var num =  query("item/cash") - 50;
					send("cun " + num +" cash;score");
				}
				else {
					world.EnableTrigger("pe_silver", false);
					world.EnableTrigger("pe_cunb", false);
					send("set no_teach prepare");
				}
			}
			else if (wcs[0] == "auto connect") {
				world.EnableTrigger("qt_none", false);
				var ns = query("npc/status");
				if (query("item/shuidai") < 1 || query("item/food") < 5 || ns == "end" || ns == "dead") {
					set("npc/status", "end");
					do_prepare();
				} 
				else if (ns == "head") {
					do_quest();
				} 
				else {
					set("room/id", -1);
					goto(query("nextstep/loc"));
			}
			}else if(wcs[0]=="eatlu.check"){
				send("i;set no_teach eatlu.checked")
			}else if(wcs[0]=="eatlu.checked"){
				if (query("allitem/magic water",true)){
					world.EnableTrigger("on_trc_eatlu",true)
					send("join;hp;set no_teach eatlu.eat")
				}else{
					world.EnableTrigger("on_trc_eatlu",false)
					set("trceatlu",false)
					do_prepare()
				}
			}else if(wcs[0]=="eatlu.eat"){
				BusyTest(306,"set no_teach eatlu.check")
			}else if (wcs[0] == "heal") {
				stop_all();
				var eq = query("hp/eff_qi");
				if (eq < 21) send("eat jiuhua wan;hp");

				if (query("hp/dispel")) {
					ydispel(true);
					return;
				}

				var rn = query("room/name");
				if (rn == "大沙漠" || rn == "南疆沙漠") {
					set("other/heal", "heal2");
				} 
				else if (get_var("id_pass") == "xy" && eq < 70) {
					set("nextstep/flag", "COMMANDS");
					cmd = "#t+ pe_cures;#t+ pe_nobody;ask xue muhua about 疗伤";
					set("nextstep/cmds", cmd);
					world.SetVariable("name_npc", "aa");
					goto(1722);
					return;
				} 
				else if (eq < 21) {
					if (query("room/id") != 65) {
						world.SetVariable("name_npc", "aa");
						set("nextstep/flag", "COMMANDS");
						set("nextstep/cmds", "hp;set no_teach heal");
						goto(65);
						return;
					}

					set("other/heal", "heal1");
				} 
				else if (eq < 90)
					set("other/heal", "heal1");
				else
					set("other/heal", "heale");

				send("dazuo");
				world.EnableTriggerGroup("gyh", 1);
			}
			break;
		case "backup":		// ^[> ]*【系统提示】(现在是.*分，系统将在.*分自动备份所有玩家的数据
			if (output.indexOf("自动备份") != -1) {
				set("other/backup", true);
				world.DoAfterSpecial(180, 'set("other/backup", false)', 12);
			} else {
				set("other/backup", false);
				set("other/study", (new Date()).getTime());
			}
			break;
		case "level":		// ^  基本(轻功|招架|内功|剑法|刀法|拳脚|指法)(.*)-(.*)/
			if (wcs[0] == "内功") set("hp/level", 0);
			var num = world.Trim(wcs[2]) - 0;
			if (num > query("hp/level")) set("hp/level", num);
			break;
		case "skfull":		// ^[> ]*也许是缺乏实战经验，你对(.*)的回答总是无法领会。
			if ((get_var("cmd_study").indexOf("xue ") != -1)&&(Math.floor(Math.random() * 5) == 0)) set("other/study", (new Date()).getTime());
			break;
		case "weapon":		// ^耐久度：(.*)%
			set("weapon/dur",wcs[0] - 0)
			set("weapons/"+query("weapon/id"), wcs[0] - 0);
			break;
		case "touch":		// ^(> )*你觉得一股热气从丹田冉冉升起。
			set("other/mtc",true)
			set("hp/neili", query("hp/max_neili") * 0.66);
			set("other/touch", true);
			break;
		case "nlempty":		// ^(> )*你觉得一股热气从丹田冉冉升起。
			if (query("other/touch")) send("mtc");
			set("other/touch", false);
			break;
		case "yjlxn":		// ^(> )*(研究|学习|练习)次数.*一次，.*不能超过
			if (query("other/touch")) {
				if (wcs[1] == "练习") {
					if (query("other/n_lx") -1 > 0)
						set("other/n_lx",query("other/n_lx") -1);
					else
						set("other/n_lx",0);
				} else {
					if ( query("other/n_yj") -1 > 0)
						set("other/n_yj",query("other/n_yj") -1);
					else
						set("other/n_yj",0);				
				}
				set("other/touch", false);
				send("mtc");
			}
			break;
		case "yjlxs":		// ^^(> )*(当前|本日)活动：多倍(LIANXI|YANJIU)上限
			if (wcs[2] == "LIANXI") 
					set("other/n_lx",2);
			else 
					set("other/n_yj",3);				
			break;			
		case "askf":		// 你现在的精神不太好，没法和别人套瓷。
			open_timer1(15, "ask_f", null);
			break;
		case "qiankun":		// ^[> ]*你觉得内息一阵紊乱，丹田时冷时热，不由得大吃一惊。
			set("other/qiankun", true);
			break;
		case "noletter":	// ^(> )*你(皱了皱眉，道：“我还是不去了，你让师傅|摇了摇头，将信函随手一撕。)
			set("quest/letter", false);
			break;
		case "hurt":		// ^(> )*\( 你(动作似乎开始有点不太灵光
			open_pfm();
			set("other/getw", 1);
			if (query("timer/pfm") == 0) {
				set("timer/pfm", 1);
				open_timer1(1, "busy0", perform());
			}
			break;
		case "pfmf":		// ( 你上一个动作还没有完成，不能施用外功。)
			set("timer/pfm", 0);
			break;
		case "pfmf1":		// ^(> )*对方都已经这样了，用不着这么费力吧？
			if (!query("boss/start")) world.EnableTimer("t_pfm", false);
			break;
		case "flee":		// 看来该找机会逃跑了...
			if (query("boss/start")) return;
			set("room/id", -1);
			send("yun recover;yun regenerate;hp;set no_teach heal");
			break;
		case "faint1":		// ^(> )*你的眼前一黑，接著什么也不知道了....
			stop_all(true);
			world.EnableTrigger("hurt", false);
			world.EnableTrigger("faint", false);
			world.EnableTrigger("kl_help", false);
			world.EnableTrigger("kl_help1", false);
			set("hp/faint", "faint");
			set("connect/auto", false);
			set("connect/cmds", get_var("id") + ";" + get_var("passw") + ";y;yun recover;yun regenerate;hp;set no_teach heal");
			world.Disconnect();
			open_timer1(120, "con_delay", null);
			add_log(output);
			break;
		case "connected":	// (你连线进入|重新连线完毕。)
			world.EnableTrigger("connected", false);
			world.EnableTrigger("condelay", false);
			world.EnableTimer("timer1", false);
			world.EnableTimer("t_kmg", true);
			set("quest/letter", false);
			set("connect/cmds", "");
			set("hp/faint", "null");
			
			if (output.indexOf("连线进入") != -1 && !check_in_3boss()) {
				set("boss/start",false);
				send(get_var("cmd_pre"));
				close_fb();
			}
			if (query("connect/auto"))
				add_log("autoconnect to world!");
			else
				set("connect/auto", true);				
			break;
		case "connected1":	// 请输入密码：
			world.EnableTrigger("connected1", false);
			var hf = query("hp/faint");
			if (hf == "hurt" || hf == "faint")
				open_timer1(1, "faint", null);
			break;
		case "quit":		// ^(> )*(你暂时离线，人物不退出|欢迎下次再来！)
			set("connect/auto", false);
			if (output.indexOf("别处") != -1) add_log(output);
			break;
		case "condelay":	// 你不能在 30 秒钟......
			open_timer1(32, "con_delay", null);
			set("connect/auto", false);
			world.Disconnect();
			break;
		case "tell":		// ^(> )*(.*)\((.*)\)告诉你：exe:(.*)
			var pne = wcs[1];
			if (pne.length > 6 || pne.length < 1) return;
			
			var re = new RegExp("[a-zA-Z0-9、 ()【】.。,，:：;；?？!！]", "g");
			if (pne.search(re) != -1) return;

			var id = wcs[2].toLowerCase();
			if (id == null || id == "") return;

			var flag = false;
			var idlt = get_var("list_control").split(",");
			for (key in idlt) {
				if (idlt[key] == id) flag = true;
			}

			if (!flag) return;

			var cot = wcs[3].split(" ");
			switch (cot[0]) {
				case "#start":
					set("room/id", -1);
					set("hp/faint", "null");
					set("quest/flag", "kill");
					send("#t+ level;cha;hp;i;unset keep_idle;unset map_prompt");
					close_fb();
					world.doafter(1, "set no_teach prepare");
					break;
				case "#spqt":
					set("quest/flag", "null");
					break;
				case "#spwk":
					stop_all();
					set("nextstep/flag", "");
					set("quest/flag", "null");
					set("boss/start", false);
					set("npc/status", "end");
					set("npc/onkill","")
					break;
				case "#to":
					goto(cot[1]);
					break;
				case "#var":
					if (get_var(cot[1]) != null) {
						if (cot[2] != "?") {
							var cot2 = wcs[3].split(" " + cot[1] + " ");
							world.SetVariable(cot[1], cot2[1]);
						}

						world.queue("变量: " + cot[1] + "=" + get_var(cot[1]), false);
					} else
						world.queue("不存在这个变量!", false);
					break;
				case "#world":
					if (cot[1] == null || cot[1] == "") {
						send("命令格式无效！");
						return;
					}

					if (cot[1] == "?") {
						var nl = "worldlist: ";
						var wl = new VBArray(world.GetworldList()).toArray();
						for (i = 0; i < wl.length; i++)
							nl += wl[i] + ", ";
						
						send(nl);
					} else 
					if (cot[2] == null || cot[2] == "") {
						send("命令格式无效！");
					} else
					if (cot[2] == "#con") {
						var wd = world.getworld(cot[1]);
						wd.connect();
					} else {
						var wd = world.getworld(cot[1]);
						wd.send(cot[2]);
					}
					break;
				default :
					send(wcs[3]);
					break;
			}

			add_log(output);
			break;
		case "room":		// ^(> )*(.*)
			var rne = wcs[0];
			if (rne.search(new RegExp("[a-zA-Z0-9、 ()【】「」.。,，:：;；?？!！]", "g")) != -1) return;

			if (rne == "鬼门关") {
				stop_all(true);
				set("connect/auto", false);
				telldm("死掉了啦！");
				NotifyDM("预期外的位置");
				world.Disconnect();
				return;
			}
			
			if (get_room_id(rne) != m_FAIL) {
				set("room/name", rne);
			} 
			else if (query("walk") == "find") {
				set("room/name", rne); 
				//add_log("room name:[" + rne + "]无效！");	
			}
			break;
		case "ttg":		// ^(> )*听涛阁 
			send(get_var("cmd_ttg"));
			break;
		case "deposit":
			var deposit=number(wcs[0])
			set("deposit",deposit)
			break
	}
}

function on_dispel(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "yd_dispel":	// ^(> )*(忽然浑身一阵剧痛，你中的化骨绵掌毒发了！|忽然你觉得四肢百赅是似乎有无......
			if (query("hp/exp") < 101000)
				return;

			set("hp/dispel", true);
			break;	
		case "yd_ok":		// ^结果你没发现自己有任何异常。$
			ydispel(false);
			send("yun recover;yun regenerate;hp");
			break;
		case "yd_goon":	// ^(> )*你运用内功，驱散了一些...
			if (query("dispel/flag") != "end")
				return;

			set("dispel/flag", "dan");
			send("dazuo");
			break;
		case "yd_fail":	// ^(> )*你的内力不足，无法运满一个周天...
			var fg = query("dispel/flag");
			if (fg == "end" || fg == "") {
				set("nextstep/cmds", "#tg+ gyd;#set dispel/flag dan;dazuo");
				set("nextstep/flag", "COMMANDS");	
				goto(query("room/chat"));
			} else
			if (fg == "yd") {
				set("dispel/flag", "dan");
			}
			break;
		case "yd_ok1":	// ^结果你没发现自己有任何异常。$
			if (query("dispel/next") == "flee")
				do_askinfo();
			else 
				do_quest();
			break;
		case "yd_busy":	// 你现在正忙着呢。
			world.EnableTrigger("yd_busy", false);
			open_timer1(1, "busy", "dazuo;#t+ yd_busy");
			break;
		case "yd_nobusy":	// 你要花多少气练功？
			switch (query("dispel/flag")) {
				case "yd":
					set("dispel/flag", "yd");
					send("yun dispel;dazuo");
					break;
				case "dan":
					set("dispel/flag", "ydr");
					send("eat jiuhua wan;dazuo");
					break;
				case "ydr":
					set("dispel/flag", "dazuo1");
					send("yun recover;yun regenerate;hp;yun dispel;dazuo");
					break;
				case "dazuo1":
					if (query("room/id") == query("room/chat")) {
						set("dispel/flag", "inchat");
						send("special yuan;yun recover;yun regenerate;hp;yun dispel;dazuo");
						return;
					}

					set("dispel/flag", "dazuo2");
					send("yun recover;yun regenerate;hp;dazuo " + get_var("num_dazuo") + ";dazuo");
					break;
				case "dazuo2":
					var ct = query("dispel/count") - 0 + 1;					
					if (ct < 7)
						set("dispel/flag", "dazuo1");
					else
						set("dispel/flag", "end");

					set("dispel/count", ct);
					var eq = query("hp/eff_qi");
					var ej = query("hp/eff_jing");
					if (eq < 20 || ej < 70) {
						var ct1 = query("dispel/count1") - 0;
						if (ct1 < 3) {
							if (eq < 20)
								send("yun recover;yun regenerate;eat jiuhua wan;dazuo");
							else
								send("yun recover;yun regenerate;yun inspire;eat jiuhua wan;dazuo");

							set("dispel/count1", ct1 + 1);
						} else
						if (eq > 30 && ej > 30) {
							send("yun recover;yun regenerate;eat jiuhua wan;dazuo");
						} else {
							set("connect/auto", false);
							ydispel(false);
							telldm("dispel");
							NotifyDM("dispel fail")
							world.Disconnect();
							return;
						}							
					} else 
					if (eq < 65)
						send("yun recover;yun regenerate;yun heal;dazuo");
					else
						send("yun recover;yun regenerate;yun dispel;dazuo");
					break;
				case "inchat":
					ydispel(false);
					break;
			}
			break;
	}
}

function on_heal(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "yh_busy":	// 你现在正忙着呢。
			world.EnableTrigger("yh_busy", false);
			open_timer1(1, "busy", "dazuo;#t+ yh_busy");
			break;
		case "yh_nobusy":	// 你要花多少气练功？
			switch (query("other/heal")) {
				case "kill":
					world.EnableTriggerGroup("gyh", 0);
					set("other/heal", "");
					var cmd = kill_cmd();
					send(cmd);
					break;
				case "yao":
					set("other/heal", "heal1");
					send("eat yao;yun recover;hp;dazuo");
					break;
				case "heal1":
					if (query("hp/eff_qi") < 21) {
						set("other/heal", "yao");
						set("item/buy", "yao from yaopu huoji");
						send("#t+ pe_buy;#t+ pe_nobuy;buy yao from yaopu huoji");
						return;
					}

					if (query("hp/eff_qi") < 90)
						set("other/heal", "heal1");
					else
						set("other/heal", "heale");

					send("yun recover;yun heal;hp;dazuo");
					break;
				case "heal2":
					if (query("hp/eff_qi") < 21) {
						world.EnableTriggerGroup("gyh", 0);
						set("connect/auto", false);
						telldm("faint");
						world.Disconnect();
						return;
					}

					if (query("hp/eff_qi") < 90)
						set("other/heal", "heal2");
					else
						set("other/heal", "heale");

					send("yun recover;yun heal;hp;dazuo");
					break;
				case "heale":
					world.EnableTriggerGroup("gyh", 0);
					world.SetVariable("name_npc", query("npc/name"));
					set("other/heal", "");
					send("yun recover;yun regenerate");
					do_continue();
					break;
			}
			break;
	}
}

function on_timer(name)
{
	switch(name) {
		case "timer1":
			var num = query("timer/count") - 0 + 1;
			if (num >= query("timer/time")) {
				world.EnableTimer("timer1", false);
				set("timer/count", 0);
				switch (query("timer/flag")) {
					case "busy0":
					case "busy":
					case "busy5":
						send(query("timer/cmd"));
						break;
					case "con_delay":
						world.DiscardQueue();
						world.Disconnect();
						world.Connect();		
						open_timer1(3, "con_delay", null);
						break;
					case "quest_end":
						world.SendImmediate("halt");
						do_quest();
						add_log("quest_end:no letter!");
						break;
					case "ask_f":
						send("yun regenerate");
						if (query("nextstep/flag") == "")
							set("nextstep/flag", query("other/nextstep"));

						goto(query("nextstep/loc"));
						break;
					case "faint":
						world.DiscardQueue();
						var cmd = get_var("id") + ";" + get_var("passw")
							+ ";y;yun recover;yun regenerate;hp;set no_teach heal";
						set("connect/cmds", cmd);
						set("connect/auto", false);
						world.Disconnect();
						open_timer1(120, "con_delay", null);
						break;
					case "step_fail":
						auto_search.back();
						send("l")
						break;
				}				
			} else
				set("timer/count", num);
			if ((num % 2) && (query("timer/flag") == "quest_end") && (get_var("cmd_wait").indexOf("halt;") != -1) && (query("hp/eff_qi") > 89) && (query("hp/pot") > 300))
				send(get_var("cmd_wait"));
			break;
		case "t_pfm":
			send(perform());
			break;
	
		case "t_kmg":
			set("other/touch", true);
			if (query("quest/flag") == "null") return;

			if (query("timer/idle")) {
				if (query("hp/dispel")) {
					ydispel(true);
					return;
				}

				telldm("idle");
				if (query("boss/start")) {
					if (query("boss/kill") == "digong") {
						stop_all();
						world.EnableTrigger("dg_map0", true);
						world.EnableTrigger("dg_mape", true);
						open_timer1(1, "busy0", "fmap;set no_teach digong");
					} else if (query("boss/kill") == "xuemo") {
						stop_all();
						world.EnableTrigger("dg_map0", true);
						world.EnableTrigger("dg_mape", true);
						open_timer1(1, "busy0", "fmap;set no_teach xuemo");
					} else if (query("boss/kill") == "juxianzhuang")
						goto(2752);
				} 
				
				else {
				set("room/id", -1);
				set("npc/find", 0);
				set("npc/coor",-1);
				set("quest/letter", false);
				world.SetVariable("name_npc", "aa");
				send("hp;i;set no_teach prepare");
				}
				return;
			}

			set("timer/idle", true);
			break;
		case "t_con":
			autoconnect();
			break;
	}
}

function on_alias(name, line, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "start":
			world.setalphaoption("name", get_var("id"));
			if (world.Version() > 4.9) world.SetTitle(get_var("id"));

			var lm = "," + get_var("loc_master") + ",";
			var ld = "," + get_var("loc_dazuo") + ",";
			if (ld.indexOf(lm) != -1) {
				world.note("-----loc_dazuo与loc_master有重复!-----");
				return;
			}
			var cmd = get_var("id") + ";" + get_var("passw") + ";y";
			send(cmd);
			tongji(0);
			StopMods();
			set("room/id", -1);
			set("stab/flag", true);
			set("stab/miss", true);
			set("hp/faint", "null");
			set("quest/flag", "kill");
			set("other/n_yj",3);
			set("other/n_lx",2);
			world.EnableTrigger("ga", true);
			send(get_var("cmd_pre"))
			send("#t+ level;cha;hp;i;unset keep_idle");
			open_timer1(1, "busy", "set no_teach prepare");
			world.EnableTrigger("setting", true);
			break;
		case "stop":
			set("item/load", true);
			set("quest/flag", "null");
			StopMods();
			world.EnableTrigger("ga", false);
			break;
		case "spwk":
			stop_all();
			StopMods();
			set("nextstep/flag", "");
			set("quest/flag", "null");
			set("npc/status", "end");
			set("boss/start",false);
			world.EnableTimer("t_kmg", false); 
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("ga", false);
			//world.EnableTrigger("setting", false);
			break;
		case "goto":
			goto(wcs[0]);
			break;
		case "kill":
			var npc = wcs[0];
			var loc = wcs[1];
			set("askyou/count", 0);
			set("npc/wd", -1);
			set("npc/find", 0);
			set("npc/coor",-1);
			set("npc/status", "start");
			set("npc/onkill","")
			set("quest/accept", "false");
			set("quest/info", 0);
			if (npc != "this") {
				world.SetVariable("name_npc", npc);
				set("npc/name", npc);
			}

			if (loc != "this") set("npc/loc", loc);

			world.note("别名格式: #kl npc中文 loc中文");
			to_kill(true);
			break;
		case "setvar":
			var varname=wcs[0]
			var varvalue=wcs[1]
			if (varname){
				world.SetVariable(varname, varvalue?varvalue:"");
			}
			break
		case "unsetvar":
			var varname=wcs[0]
			if (varname){
				world.SetVariable(varname, "");
			}
			break
		case "cmd":
			var cmdname=wcs[0]
			if (cmdname){
				send(GetCmd(cmdname))
			}
			break
		case "rcmd":
				var cmds=wcs[0]
				if (cmds){
					send(line)
				}
		break			
		case "weapon":
				send(line)
		break			
		case "login":
			world.Connect();	
			world.send(get_var("id"))
			world.send(get_var("passw"))
			world.send("y")
			break;
		case "repeat":
			var times=wcs[0]
			var cmds=wcs[1]
			if (isNaN(times)){
				world.Note("次数"+times+"无效")
				return
			}
			var num=times-0
			if (num<=0 || num>99){
				world.Note("次数应该在0-99之间")
				return
			}
			for(var i=0;i<num;i++){
				send(cmds)
			}
			break
		case "stab":
			stop_all();
			set("stab/index", 0);
			set("stab/miss", false);
			send("hp;i;set no_teach prepare");
			break
	}
}


function on_boss(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "bs_door":	// ^  副本传送门\(fuben door\)
			set("room/id", 2765);
			break;
		case "bs_start":	// ^[> ]*副本执行时间为(.*)，副本将在(.*)后可重新进入。
			world.EnableTriggerGroup("gbs", 1);
			//set("other/study", (new Date()).getTime());
			var time1 = (new Date()).getTime();
			set("boss/start", true);
			set("boss/name","")
			if (query("boss/kill") == "seadragon") {
				set("boss/seadragon", time1);
			} else 
			if (query("boss/kill") == "dongfang") {
				set("boss/dongfang", time1);
			} else 
			if (query("boss/kill") == "jiangshi") {
				set("boss/jiangshi", time1);
			} else
			if (query("boss/kill") == "juxianzhuang") {
				set("boss/juxianzhuang", time1);
			} else
			if (query("boss/kill") == "digong") {
				world.EnableTriggerGroup("dg", 1);
				world.EnableTrigger("bs_end0", true);	
				world.EnableTrigger("bs_kill", true);
				set("digong/step", 1);				
				set("boss/digong", time1);
			}	else		
			if (query("boss/kill") == "xuemo") {
				world.EnableTriggerGroup("xm", 1);
				world.EnableTrigger("bs_end0", true);	
				world.EnableTrigger("bs_kill", true);
				set("xuemo/step", 1);				
				set("boss/xuemo", time1);
			}			

			break;
		case "bs_false":	// ^[> ]*你离上次进入副本时间太短，请休息会再来。
			var time1 = (new Date()).getTime();
			time1 = time1 + 0 - 45*60*1000;
			if ((query("boss/kill") == "seadragon") && can_fuben("seadragon")) set("boss/seadragon", time1);
			else if ((query("boss/kill") == "dongfang") && can_fuben("dongfang") ) set("boss/dongfang", time1);
			else if ((query("boss/kill") == "jiangshi") && can_fuben("jiangshi")) set("boss/jiangshi", time1);
			else if ((query("boss/kill") == "juxianzhuang") && can_fuben("juxianzhuang")) set("boss/juxianzhuang", time1);
			else if ((query("boss/kill") == "digong") && can_fuben("digong")) set("boss/digong", time1 - 20*60*1000);
			else if ((query("boss/kill") == "xuemo") && can_fuben("xuemo")) set("boss/xuemo", time1 - 60*60*1000);
			do_prepare();
			break;
		case "bs_kill":	// ^[> ]*看起来(镇海神龙|东方不败|僵尸道长)想杀死你！
			var list = {"少林僧人" : "shaolin sengren", "丐帮弟子" : "gaibang dizi", "江湖豪杰" : "jianghu haojie", "镇海神龙" : "sea dragon king",
					"东方不败" : "dongfang bubai", "僵尸道长" : "jiangshi daozhang", "西域刀客" : "xiyu daoke", "逍遥护法" : "xiaoyao hufa",
					"市井帮众" : "shijing bangzhong", "武当剑客" : "wudang jianke", "单正" : "shan zheng", 
					"游骥" : "you ji", "游驹" : "you ju", "玄难大师" : "xuannan dashi", "玄寂大师" : "xuanji dashi", "徐长老" : "xu zhanglao", "秦始皇僵尸" : "qin shihuang", "丁一" : "ding yi"};
			var npcname = wcs[0];
			var id = list[npcname];
			send("kill " + id);
			set("boss/name",npcname)
			if (query("boss/start")) world.EnableTrigger("bs_nobusy", true);
			world.EnableTrigger("bs_sea1", true);
			open_pfm();
			break;
			
		case "bs_end0":	// ^[> ]*一阵时空的扭曲将你传送到另一个地方
			if (output.indexOf("虚空") != -1) 				
				telldm("副本失败"+ query("boss/kill"));
			close_fb();
			set("room/id",-1);
			set("weapon/id",get_var("id_weapon"))
			set("weapon/dur", 0);
			send("halt;"+get_var("cmd_pre")+";l " + get_var("id_weapon") + " of me;mtc;i;hp;set no_teach prepare");
			break;
		case "bs_end":	// ^[> ]*(镇海神龙|僵尸道长|东方不败)(.*)副本将在30秒后消失。
			world.EnableTimer("t_pfm", false); 
			send("fleave");
			if (query("boss/kill") == "digong" || query("boss/kill") == "xuemo") {
				send("mjq");
				dg_maze.init(1);
			}
			break;
		case "bs_drop":	// ^[> ]*当(.*)一声，一(只|个|块|粒|根|颗|枚)(.*)从天而降，掉落在你面前。
			var list = {"「金刚不坏体」残本" : "jingang book","「七杀心经」残本" : "qisha book","冰蚕丝碎片" : "chipped white silk","补天石碎片" : "chipped magic stone",
			"水晶残片" : "chipped crystal","翡翠残片" : "chipped jade","钻石碎粒" : "chipped diamond","玛瑙残片" : "chipped agate","玉髓碎片" : "chipped chalcedony",
			"骷髅头碎片" : "chipped skull", "精金残片" : "chipped metal", "木灵残片" : "chipped wood", "炎晶碎粒" : "chipped fire", "玄冰碎块" : "chipped ice", 
			"水晶" : "crystal","翡翠" : "jade","钻石" : "diamond","玛瑙" : "agate","玉髓" : "chalcedony",
			"骷髅头" : "skull", "精金" : "perfect metal", "木灵" : "perfect wood", "炎晶" : "earth fire", "玄冰" : "cold ice", 
			"金块" : "jin kuai", "金锭" : "jin ding", "金条" : "jin tiao", "小金元宝" : "xiao yuanbao","大金元宝" : "da yuanbao", 
			"乾坤塔符石" : "rune03", "混元道果符石" : "rune04", "傲世诀符石" : "rune02","灵通术符石" : "rune01","灵性符石" : "rune05","九龙诀符石" : "rune08","金刚伏魔符石" : "rune09",
			"密宝奇珍" : "mibao qizhen","青龙臂铠" : "qinglong key","「守城录」":"strategy book"};
					
			var item = wcs[2];
			var id = list[item];
			if (id == null) {
				telldm(item+"未定义");
				send("id here");
				}
//			else if ((id != "qinglong key") ||(query("item/qlkey") < 16))
			else if (id != "qinglong key")
				send("get " + id);
			else 
				set("digong/g_getk",true);
			break;
		case "bs_sea":	// ^  (.*)(海怪|水怪|水灵怪|海灵怪)\((.*)\)
			world.DiscardQueue();
			world.EnableTrigger("wk_busy", false);
			world.EnableTrigger("bs_sea", false);
			world.EnableTrigger("bs_sea1", true);
			send(get_var("cmd_3boss"))
			send("kill " + wcs[2] + ";" + get_var("cmd_kill")+";"+get_var("cmd_pfm"));
			open_pfm();
			break;

		case "bs_nobusy":	//^(> )*你要往这上面镶嵌什么物品？
			world.EnableTrigger("bs_nobusy", false);
			if (query("boss/step") != 9) return;
		case "bs_sea1":	// ^[> ]*(水怪|海怪|水灵怪|海灵怪)扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！
			world.EnableTrigger("wk_busy", true);
			world.EnableTimer("t_pfm", false);
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", true);
			world.EnableTrigger("bs_sea1", false);
			send(get_step());
			break;
		case "bs_ju1":	// ^[> ]*^[> ]*(你现在去聚贤庄门前找丐帮的徐长老|我知道你和他很是熟悉|段正淳说道：第二件事|我知道，玄慈方丈心里有一些难解的结|你详细地向徐长老汇报)
			//set("boss/step", query("boss/step")+1);
			var i = query("boss/step")+1;
			set("boss/step", i);

//			if (output.indexOf("感觉相当飘忽") != -1)
//				set("boss/step", i);
			var tl = 0;
			var cmd = "";
							
			if (i == 2) {
				cmd = "ask xu zhanglao about 武林大会";	
				tl = 2750;
			} else
			if (i == 3) {
				cmd = "ask duan zhengchun about 武林大会";	
				tl = 2384;
			} else	
			if (i == 4) {
				cmd = "give letter to xu zhanglao";	
				tl = 2750;
			} else
			if (i == 5) {
				world.note("----------------记得alias takeling 取英雄令------------");
				add_room_cmd("takeling");
				cmd = "ask xuanci dashi about 聚贤庄";	
				tl = 1887;
			} else
			if (i == 6) {
				add_room_cmd("keep yingxiong ling");
				cmd = "w;report;e";
				tl = 2749;
			} else
			if (i == 7) {
				set("boss/target1",5);
				set("boss/target2",5);
				set("boss/target3",5);
				//world.EnableTrigger("step", false);	
				//send("e;w");
				cmd = get_var("cmd_jxz")+";#t+ bs_target;hp;18mo a zhu";	
				tl = 2752;
			} else	
			if (i == 8) {
				set("boss/target1",5);
				set("boss/target2",5);
				set("boss/target3",5);
				set("boss/target4",5);
				cmd = "#t+ bs_target;18mo xiyu daoke";	
				tl = 2754;
			} 					
			set("nextstep/cmds", cmd);	
			set("nextstep/flag", "COMMANDS");
			goto(tl);	
			break;
		case "bs_target":	// ^杀死\s+(.*):\s+(\d+)\/(\d+)。
			
			if (wcs[0] == "少林僧人" || wcs[0] == "西域刀客")
				set("boss/target1",wcs[2]-wcs[1]);
			if (wcs[0] == "丐帮弟子" || wcs[0] == "逍遥护法")
				set("boss/target2",wcs[2]-wcs[1]);
			if (wcs[0] == "江湖豪杰" || wcs[0] == "市井帮众")
				set("boss/target3",wcs[2]-wcs[1]);
			if (wcs[0] == "武当剑客")
				set("boss/target4",wcs[2]-wcs[1]);			
			if (query("boss/step") == 7 && query("boss/target1") == 0 && query("boss/target2") == 0 && query("boss/target3") == 0 && query("boss/target4") == 0)
			{
					set("nextstep/cmds", get_var("cmd_bquest")+";yun recover;yun regenerate;ask xue muhua about 疗伤");
					set("nextstep/flag", "COMMANDS");	
					set("room/id", 2752);
					goto(2753);
			}
			if (query("boss/step") == 8 && query("boss/target1") == 0 && query("boss/target2") == 0 && query("boss/target3") == 0 && query("boss/target4") == 0)
			{
					
					set("boss/step", 9);
					set("nextstep/cmds", get_var("cmd_bquest")+";yun recover;yun regenerate;ask xue muhua about 疗伤");
					set("nextstep/flag", "COMMANDS");	
					goto(2753);
			}			
			break;
		case "bs_weigong":	// ^你被群雄围攻，尚未完成任务，无法离开！
			if (query("boss/step") < 9) 
				return;
			world.DiscardQueue();
			world.EnableTrigger("wk_busy", false);
			world.EnableTrigger("bs_sea", false);
			break;				
	}
}

function on_pk(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "pk_xkd":		// ^(> )*(看起来张三想杀死你！|张三轻吐一口气，掌力袭来，震得你|李四轻吐一口气，掌力袭来，震得你|看起来李四想杀死你！)
			var cmd = get_var("id") + ";" + get_var("passw") 
				+ ";y;quit";
			reconnect(cmd);
			break;
		case "pk_hit":		// ^(> )*(.*)对著你大喝一声：看招！
		case "pk_guard":		// ^(> )*(.*)(一声怒吼，冲上前去，看来是要和你拼命。|一言不发，对你发动了攻击
		case "pk_kill":		// ^(> )*如果你要和(.*)性命相搏，请你也对这个人\((.*)\)下一次 kill 指令。
			var cmd = get_var("id") + ";" + get_var("passw") 
				+ ";y;id here;quit";
			add_log(output);
			reconnect(cmd);
			break;
	}
}
function do_continue()
{
	var nt = query("npc/status");
	var qf = query("quest/flag");
	if (nt == "head")
		do_quest();
	else if (nt == "flee" || nt == "disp")
		do_askinfo();
	else if (nt == "start" || nt == "faint")
		to_kill(false);
	else if (qf != "null")
		send("hp;i;set no_teach prepare");
}
// 用于根据正方形迷宫地图获取路径。
function MyMaze(dp)  
{
	this.data = new Array(dp*dp);
	this.flag = new Array(dp*dp);
	this.enter = -1;  //入口
	this.lockrm1 = -1;  //特殊位置
	this.lockrm2 = -1;  //特殊位置
	this.lockrm3 = -1;  //特殊位置
	this.lockrm4 = -1;  //特殊位置
	this.leave = -1;   //出口
	this.cloc = -1;  //当前位置
	this.tloc = -1;  //要去的位置
	this.path = "";  //迷宫路径
	this.pnum = 0; //路径序号
	this.clock = 0;  //不明
	this.size = dp;  
	this.length = dp*dp;
	this.line = dp-1;
	this.init = function(fg) {
		this.clock = -1;
		this.line = dp -1;
		this.lockrm1 = -1;
		this.lockrm2 = -1;
		this.lockrm3 = -1;
		this.lockrm4 = -1;
		this.enter = -1;
		this.leave = -1;
		this.cloc = -1;
		this.path = "";
		this.pnum = 0;
		this.tloc = -1;
		if (fg == 1) {
			this.data = null;
			this.flag = null;			
		} else  {			
			if (this.data == null)
				this.data = new Array(dp*dp);
			if (this.flag == null)
				this.flag = new Array(dp*dp);
			for (var i=0; i<this.length; i++) {
				this.data[i] = "";
				this.flag[i] = -1;
			}
		}
		return;
	};
	this.block = function(ns) {
		var bk;
		var st = this.pnum;
		var ed = ns - 0 + st;
		if (ed >= this.path.length)
			ed = this.path.length;
		if (st >= ed) 
			return m_FAIL;
		bk = this.path.slice(st, ed);
		return (bk);
	};
	
	this.exitid = function(dex, dir) {
		var nex = -1;
		if (dir == "e") nex = dex + this.size;
		else if (dir == "s") nex = dex - 1;
		else if (dir == "w") nex = dex - this.size;
		else if (dir == "n") nex = dex + 1;
		if (nex >= this.length) nex = -1;
		return nex;
	};
	this.trace = function() {
		var block=this.block(1);
		var l = this.exitid(this.cloc,block);
		if   (l >= 0 && l < dp*dp) {
			this.cloc = l;
			this.pnum++;
			return true;
		}
		else 
			this.cloc = -1;
		return false;
	};
	this.goto = function(loc) {
		var pot, dex, nex, dir, open, path, pat;
		this.path = "";
		this.pnum = 0;
		if (this.cloc == loc) return "";
		this.tloc = loc;
		pot = 0;
		this.clock ++;
		open = new Array;
		path = new Array;
		this.flag[this.cloc] = this.clock;
		open[open.length] = this.cloc;
		path[path.length] = "";
		world.note(this.cloc+"当前坐标要去坐标"+this.tloc);
		while (1) {
			if (pot >= open.length) return m_FAIL;
			
			dex = open[pot];
			for (var i=0; i<this.data[dex].length; i++) {
				dir = this.data[dex].charAt(i);
				nex = this.exitid(dex, dir);
				if (nex == -1) continue;
				if (this.flag[nex] == this.clock) continue;

				if (path[pot] == "") pat = dir;
				//else pat = path[pot] + ";" + dir;
				else pat = path[pot] + dir;
				if (nex == loc) return pat;
				this.flag[nex] = this.clock;
				open[open.length] = nex;
				path[path.length] = pat;
			}
			pot ++;	
		}
	};
}
function on_digong(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "dg_map0":	// ^  ^┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐ 迷宫地图开始
			dg_maze.init(0);
			world.EnableTrigger("dg_map1", true);
			break;
		case "dg_map1":	// ^  ^│(.*)│(.*)│(.*)│(.*)│(.*)│(.*)│(.*)│(.*)│(.*)│(.*)│
			var le = world.GetLinesInBufferCount ();
			var st = world.GetLineInfo(le, 11);
			// i横向++ j纵向--
			for (var i=1; i <= st; i++) {
					var js = world.GetStyleInfo (le, i, 3);
					var line=world.GetLineInfo(le, 1)
					var j=line.substr(0,js).split("│").length-1
					j = (dg_maze.line+j*10)-10;
					if (world.GetStyleInfo (le, i, 1) =="★") //当前位置
					{
						dg_maze.cloc = j;
					}
					if (world.GetStyleInfo (le, i, 15) == world.NormalColour(2)) //str = str + "红色出口第" + i +"项;"+(world.GetStyleInfo (le, 2*i, 3)+1)/4;	
					{
						dg_maze.leave = j;					
					}
					if (world.GetStyleInfo (le, i, 15) == world.NormalColour(8)) //str = str + "白色入口第" + i +"项;"+(world.GetStyleInfo (le, 2*i, 3)+1)/4;	
					{
						dg_maze.enter =  j;	
					}
					if (world.GetStyleInfo (le, i, 15) == world.NormalColour(6)) //str = str + "紫色特殊房间第" + i +"项;"+(world.GetStyleInfo (le, 2*i, 3)+1)/4;	
					{
						if (dg_maze.leave == -1){
							dg_maze.leave = j;
						}
						if (dg_maze.lockrm1 == -1) dg_maze.lockrm1 = j;
						dg_maze.lockrm2 = j;
					}
				}
			dg_maze.line --;	
			break;
		case "dg_mape":	//^└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
			world.EnableTrigger("dg_map0", false);
			world.EnableTrigger("dg_map1", false);	
			world.EnableTrigger("dg_mape", false);				
			var mid = "p"+ dg_maze.enter+dg_maze.leave+dg_maze.lockrm1;
				
			if (mid == "p909978")  mid += dg_maze.lockrm2; 
			dg_maze.lockrm1 = -1;
			dg_maze.lockrm2 = -1;
			world.note(mid + "是迷宫地图标记！");
			
			var path = "";
			if (query("boss/kill") == "digong") {
				eval( Include( "map_digong.h" ) );	
				if (dgmap_path[mid] == null) {
					world.note(mid + "是无效地宫地图标记！");
					return ;
				}

				dg_maze.lockrm1 = dgmap_path[mid]["lockroom1"];
				dg_maze.lockrm2 = dgmap_path[mid]["lockroom2"];
				dg_maze.lockrm3 = dgmap_path[mid]["lockroom3"];
				dg_maze.lockrm4 = dgmap_path[mid]["lockroom4"];
				var path = dgmap_path[mid]["path"];
	//			world.note(path);
				dgmap_path == null;
			} else	{
				eval( Include( "map_xuemo.h" ) );	
				if (xmmap_path[mid] == null) {
					world.note(mid + "是无效地宫地图标记！");
					return ;
				}

				dg_maze.lockrm1 = xmmap_path[mid]["rest_room"];
			//	dg_maze.lockrm2 = xmmap_path[mid]["lockroom2"];
				//dg_maze.lockrm3 = xmmap_path[mid]["lockroom3"];
			//	dg_maze.lockrm4 = xmmap_path[mid]["lockroom4"];
				var path = xmmap_path[mid]["path"];
				world.note(path);
				xmmap_path == null;
			}
			path =  path.split("|");
			if (path.length != dg_maze.length) 
				world.note("地图文件长度格式不正确！!"+mid);		
			 
			for (var i=0; i<path.length; i++) {
				dg_maze.data[i] = path[i];
				dg_maze.flag[i] = -1;
			}
			
			break;
		case "dg_start":	//^石壁上面布满了蜘蛛网，显然很久没有人来过这里。
			if (query("boss/kill") != "digong") return;
			//地宫副本开始标记
			set("boss/kill","digong");
			set("boss/start",true);
			//入口标记
			set("room/id",2819);
			dg_maze.cloc = dg_maze.enter;	
			dg_maze.tloc = get_lockroom();
			//开始运行
			set("nextstep/cmds", "set no_teach move desk");
			set("nextstep/flag", "COMMANDS");
			goto(2821);			
			break;
		case "dg_step":	// ^(> )*设定环境变数：no_teach = "digong"
			world.EnableTimer("timer1", false);
			world.EnableTimer("t_pfm", false);
			var nn = query("digong/npc");
			set("digong/npc","end");
			set("digong/g_getk",false);
			if (( nn!= "") && (nn != "end") && ((query("item/qlkey") < 16))) {
				world.EnableTrigger("dg_npc", false);
				world.EnableTrigger("dg_nobody", true);	
				world.EnableTrigger("dg_kill", true);	
				send("kill "+ nn +";#ts+ t_pfm;"+get_var("cmd_pfm"));	
			} else
				send(do_digong());		
			break;
		case "dg_npc":	//^[> ]*  [机关兽|皇陵][.*]/((.*)/)
			set("digong/npc", wcs[1]);
			if (query("digong/npc") == "jiang ling")
				world.EnableTrigger("dg_npc", false);	
			break;
		case "dg_kill":	// ^(> )*你对著(.*)喝道：(.*)
			world.SetVariable("fb_npc", wcs[1]);
		//	world.EnableTrigger("dg_kill", false);
			world.EnableTrigger("dg_npcdie", true);			
			break;
		case "dg_npcdie":	// ^[> ]*(@fb_npc)扑在地上挣扎了几下，腿一伸，口中喷出几口鲜血，死了！
			world.EnableTrigger("dg_npcdie", false);
			world.EnableTimer("t_pfm", false);
			
			//看一下
			world.EnableTrigger("sm_exit", false);
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("dg_npc", true);
			if ((query("item/qlkey") < 16) && query("digong/g_getk"))
				send("get qinglong key;i");
			send("hp;look;set no_teach digong");
			break;
		case "dg_desk":	// ^(> )*当前房间分配的机关序号：(.*)
			var n = query("digong/step");
			var n_m = {1: "A",2: "B",3: "C",4: "D",5: "E"};
			
			if (n_m[n] == wcs[1])
				send("move desk");
			else 
				send("set no_teach no move");
			break;
		case "dg_goldman":	// ^(> )*杀死 金人: (/d){1}/9。
				world.EnableTrigger("dg_npcdie", false);			
				if (wcs[1] == 1)
					set("digong/passwd", "a");
				set("digong/n_gman", wcs[1]);
			break;	
		case "dg_pwd":	// ^(> )*密码 (/d){1}
				set("digong/passwd", wcs[1]+query("digong/passwd"));
				var n = query("digong/n_gman");
				var str1 = query("digong/passwd");
				send("alias dgpswd "+str1);
				if (n == 3 || n == 5 || n == 7 || n == 8)
				//world.doafter(1, "kill gold man;#ts+ t_pfm;"+get_var("cmd_pfm"));	
					send("kill gold man;#ts+ t_pfm;"+get_var("cmd_pfm"));	
				else if (n == 9)
					send("#t- dg_kill;turn "+str1.slice(0,9));
				else {
					set("nextstep/flag", "COMMANDS");	
					set("nextstep/cmds", "kill gold man" + ";#tg+ dg2;#ts+ t_pfm;"+get_var("cmd_pfm"));
					var loc = 2828;
					if (n == 1) {
						loc = 2825;
						set("room/id",2824);
					}
					if (n == 2)  {
						loc = 2826;
						set("room/id",2825);
					}
					if (n == 4)  {
						loc = 2827;
						set("room/id",2826);
					}
					if (n == 6)  {
						loc = 2828;
						set("room/id",2827);
					}
					goto(loc);
				}	
			break;			
		case "dg_mdesk":	// ^(> )*你将石桌用力的旋转，只听得不远处传来
			var n = query("digong/step");
			if (output.indexOf("用力的旋转") != -1) {				
				set ("digong/step",n+1);
			}
			dg_maze.tloc = get_lockroom();
			set("nextstep/flag", "COMMANDS");
			set("room/id",2830);
			//if (n < 5) {
			if (dg_maze.tloc == dg_maze.leave && query("digong/step") > 4) {
				set("nextstep/cmds", "kill gold man" + ";#tg+ dg2;#ts+ t_pfm;"+get_var("cmd_pfm"));
				goto(2824);					
			} else {
				set("nextstep/cmds", "set no_teach move desk");
				goto(2821);	
			}
			break;
	}
}

function do_digong()
{
//		world.note(dg_maze.pnum+"ee" + dg_maze.cloc+ "ff"+ dg_maze.tloc+"dg_path"+dg_maze.path);
		var nn = "";
		if ((query("digong/npc") == "") && (query("item/qlkey") < 16)) {
			world.EnableTrigger("dg_npc", true);
			world.EnableTrigger("dg_step", true);
			set("digong/npc","end");
			nn = "hp;set no_teach digong";
		} else 
		if (dg_maze.cloc == dg_maze.tloc) {
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTriggerGroup("gsm", 1);
			world.EnableTriggerGroup("gwk", 1);
			dg_maze.path = "";
			nn = get_step();
			world.note("迷宫路径结束到达指定地点"+nn);
			if (nn == m_FAIL)
				world.note("aaaaa");			
		} else { 
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTriggerGroup("gsm", 1);
			world.EnableTriggerGroup("gwk", 1);
			if (dg_maze.path == null || dg_maze.path == "" || dg_maze.path == m_FAIL) {
				var tt = dg_maze.goto(get_lockroom());
				dg_maze.path = tt;
			}
			//set("digong/npc","");	
			world.EnableTrigger("dg_npc", true);			
			//send(dg_maze.block(1));
			nn = dg_maze.block(1);
		}
		return nn;
}
function get_lockroom()
{
	var stp = query("digong/step");
	var tt = -1;
	if (stp > 4 && (query("item/qlkey") >= 16))
		tt = dg_maze.leave;
	else if (dg_maze.cloc == dg_maze.lockrm3)
		tt = dg_maze.lockrm4;
	else if (dg_maze.cloc == dg_maze.lockrm2)
		tt = dg_maze.lockrm3;
	else if (dg_maze.cloc == dg_maze.lockrm1)
		tt = dg_maze.lockrm2;
	else
		tt = dg_maze.lockrm1;
	
	return tt;
}
function close_fb()
{
	world.EnableTriggerGroup("gbs", 0);
	//地宫
	world.EnableTriggerGroup("dg", 0);
	world.EnableTriggerGroup("dg1", 0);
	world.EnableTriggerGroup("dg2", 0);	
	world.EnableTimer("t_pfm", false);
	world.EnableTriggerGroup("gxm", 0);	
	world.EnableTriggerGroup("xm1", 0);	
	set("digong/step", 1);
	set("npc/wd", 0);
	
	set("boss/start", false);
	set("boss/kill", "");
	set("boss/step", 0);
	
}
function CmdMpf(){
	var str=get_var("cmd_backstab")
	return str?str:"mpf"
}

var holderre=/\$\*/g
function CmdPfmlich(name){
	var str=get_var("cmd_cheapshot")

	if (!str){
		str=""
	}
	if (!name){
		name=""
	}
	return str.replace(holderre,name)
}
//--------------------------------------------------------------------------------
function on_xuemo(name, output, wildcards)
{
	var wcs = VBArray(wildcards).toArray();
	switch (name) {
		case "xm_start1":	// ^丁一说道：
			world.doafter(1, "accept yes");
			break;
		case "xm_juling":	// ^聚灵法阵
			//set("room/id", 2834);
			dg_maze.cloc = dg_maze.leave;
			world.EnableTrigger("xm_npc", true);
			set("xuemo/npc","");
			//world.EnableTrigger("step", false);
			//world.EnableTrigger("wk_noexit", false);
			//world.EnableTrigger("xm_npc", true);
			//world.EnableTrigger("xm_nobusy", true);
			//if (query("xuemo/step") == 5) set("xuemo/step", 6);
			break;	
		case "xm_nobusy":	// ^[> ]*你要往这上面镶嵌什么物品？
		/*	world.EnableTimer("t_pfm", false);
			world.EnableTrigger("sm_exit", false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("wk_noexit", false);
			world.EnableTrigger("xm_npc", true);
			send("hp;look;set no_teach xuemo");			
			break;
*/
			world.EnableTimer("timer1", false);
			world.EnableTimer("t_pfm", false);
			var nn = query("xuemo/npc");
			//set("xuemo/npc","end");
			world.note("npc:"+nn);
			world.EnableTrigger("xm_nobusy", false);
			if ((( nn!= "") && (nn != "end")) || (query("xuemo/step") >= 8)) {
			//if (nn != "end") {
				world.EnableTriggerGroup("on_npc",false);			
				world.EnableTrigger("step", false);
				world.EnableTrigger("wk_noexit", false);
				world.EnableTrigger("wk_nobusy", false);	
				
				world.EnableTrigger("xm_npc", false);
				world.EnableTrigger("xm_nobody", true);	
				world.EnableTrigger("xm_target", true);	
				var pp = get_var("cmd_pfm");
				if (nn == "skeleton lich") pp = CmdPfmlich("skeleton lich");
				send("hp;n;look;kill "+ nn +";#ts+ t_pfm;"+pp+";#t+ xm_nobusy;jiqu 300");	
				if (query("xuemo/step") == 8) send("freport");
			} else {
				world.EnableTimer("t_pfm", false);
				send("get bone staff;get zombie blood;get ghost fire;#q");										
				set("room/id",2834);
				set("xuemo/step",7);
				set("xuemo/target",true);
				set("nextstep/cmds", "give all to ding yi;freport;jiqu");
				set("nextstep/flag", "COMMANDS");
				dg_maze.cloc = dg_maze.leave;
				dg_maze.tloc = -1;
				goto(2835);	
				return;				
			}

			break;
			
		case "xm_lich":	// ^看起来巫妖想杀死你！
			if (query("xuemo/step") == 5)  {
				set("xuemo/target",false);
				set("xuemo/step", 6);
			}
			
			var stp = query("xuemo/step");
			if (stp == 6)	{set("xuemo/npc", "skeleton lich");			
			}
			world.DoAfterSpecial(0.1, 'reconnect(get_var("id") + ";" + get_var("passw") + ";y;halt;hp;i;fquest;set no_teach xuemo connect;l skeleton lich;'+CmdMpf()+';#t+ xm_nobody;#t+ xm_juling;l;#ts+ t_pfm")', 12);
			break;	
		case "xm_npc":	//^[> ]*(.{0,4})\(鬼气\) (.*)\((.*)\)
			if (query("xuemo/target")) return;
			var stp = query("xuemo/step");
			var npcname = wcs[1];
			var npcid = wcs[2];
			var b_k = false;
			switch (wcs[1]) { 
				case "骷髅":
					if (stp == 1 && !query("xuemo/target1")) b_k = true;
					break;
				case "僵尸":
					if (stp == 1 && !query("xuemo/target2")) b_k = true;
					break;
				case "幽灵":
					if (stp == 1 && !query("xuemo/target3")) b_k = true;
					break;
				case "骷髅武士":
					if (stp == 2 && !query("xuemo/target1")) b_k = true;
					break;	
				case "尸煞":
					if (stp == 2 && !query("xuemo/target2")) b_k = true;
					break;	
				case "幽冥之眼":
					if (stp == 2 && !query("xuemo/target3")) b_k = true;
					break;	
				case "骷髅法师":
					if (stp == 2 && !query("xuemo/target4")) b_k = true;
					break;
				case "血僵尸":
					if (stp == 2 && !query("xuemo/target5")) b_k = true;
					break;	
				case "幽冥之火":
					if (stp == 2 && !query("xuemo/target6")) b_k = true;
					break;	
				case "巫妖":
					if (stp == 6) b_k = true;
					break;	
				case "僵尸王":
					if (stp == 6) b_k = true;
					break;	
				case "幽冥魔":
					if (stp == 6) b_k = true;
					break;
			}
			if (stp >= 6 && wcs[1] != "巫妖") b_k = true;
			if (b_k) 
			 {
				set("xuemo/npc", wcs[2]);
				//world.note("新npc:"+wcs[2]);
				if (wcs[1] == "巫妖") {
					world.EnableTrigger("xm_npc", false);
					world.EnableTrigger("xm_nobusy", true);
					//send("kill skeleton lich;pfm_lich;" + get_var("cmd_pfm"));
					open_pfm();
				}
			
			 }
			break;
		case "xm_start":	// (你可愿意帮我们对付血魔|就请你证明尚未被血魔诱惑|去尝试着杀掉三个骷髅武士|去找到那些堕落的少林和尚|巫妖的骨杖|法阵那里可能还有些血魔的手下|在我施法期间)
			//血魔副本开始标记
			//1、2 杀怪，3去杀心武，4、杀心武回，5、去杀三小boss，6清光聚灵法阵。7杀三小boss回。8带路。9，清光聚灵法阵。 10，杀丁一
			set("boss/kill","xuemo");
			set("boss/start",true);
			world.EnableTrigger("xm_nobusy", false);
			set("room/id",2831);
			//入口标记			
			var stp = 0;
			if (output.indexOf("你可愿意帮我们对付血魔") != -1) {
				world.doafter(1, "accept yes");
				return;
				}				
			else if (output.indexOf("就请你证明尚未被血魔诱惑") != -1)
				stp = 1;
			else if (output.indexOf("去尝试着杀掉三个骷髅武士") != -1)
				stp = 2;
			else if (output.indexOf("去找到那些堕落的少林和尚") != -1)
				stp = 3;	
			else if (output.indexOf("巫妖的骨杖") != -1)
				stp = 5;	
			else if (output.indexOf("法阵那里可能还有些血魔的手下") != -1)
				stp = 8;	
			else if (output.indexOf("在我施法期间") != -1)
				stp = 9;
			set("xuemo/step",stp);
			
			set("xuemo/target",false);
			set("xuemo/target1",true);
			set("xuemo/target2",true);
			set("xuemo/target3",true);
			set("xuemo/target4",true);
			set("xuemo/target5",true);
			set("xuemo/target6",true);
			//world.note("dg_maze.cloc = dg_maze.enter"+dg_maze.cloc+"dd"+dg_maze.enter);
			send("halt;"+get_var("cmd_xm"));
			
			var tl = 2834;
			switch (stp) {
				case 2: 
					set("xuemo/target4",false);
					set("xuemo/target5",false);
					set("xuemo/target6",false);
				case 1:
					set("xuemo/target1",false);
					set("xuemo/target2",false);
					set("xuemo/target3",false);
					set("nextstep/cmds", "freport;jiqu");
					set("nextstep/flag", "COMMANDS");
					tl = 2835;
					break;
				case 3:
					set("xuemo/target",true);
					set("nextstep/cmds", "push coffin;kill xin wu;#t+ xm_target;#ts+ t_pfm;"+get_var("cmd_pfm"));
					set("nextstep/flag", "COMMANDS");
					tl = 2833;					
					break;
				case 5:
					set("xuemo/target",true);
					set("nextstep/cmds", "kill skeleton lich;"+CmdPfmlich("skeleton lich")+";#q;#t+ xm_nobusy;#ts+ t_pfm;"+get_var("cmd_pfm"));
					set("nextstep/flag", "COMMANDS");
					tl = 2834;	
					break;
				case 8:
					send("tuna 200;dazuo 200;"+CmdMpf()+";#q");
					set("xuemo/target",true);
					set("nextstep/cmds", "do 3 freport;#t+ xm_nobusy;#ts+ t_pfm");
					set("nextstep/flag", "COMMANDS");									
					break;					
				default:
					world.EnableTrigger("xm_start", false);
					world.EnableTrigger("xm_target", true);
					world.EnableTrigger("xm_nobusy", true);
					world.EnableTimer("t_pfm", true);
					//send(get_var("cmd_bquest"));
					
					world.note("跑路结束，准备杀怪！");
					return;
				}
				dg_maze.cloc = dg_maze.enter;
				dg_maze.tloc = get_xmroom();
				goto(tl);
			break;
			
		case "xm_step":	// ^(> )*设定环境变数：no_teach = "xuemo"
			world.EnableTimer("timer1", false);
			world.EnableTimer("t_pfm", false);
			var nn = query("xuemo/npc");
			set("xuemo/npc","end");
			//world.note("npc:"+nn);
			if (( nn!= "") && (nn != "end")) {
				world.EnableTrigger("xm_npc", false);
				world.EnableTrigger("xm_nobody", true);	
				world.EnableTrigger("xm_target", true);	
				send("kill "+ nn +";#ts+ t_pfm;"+get_var("cmd_pfm"));	
			} else
				send(do_xuemo());		
			break;
		case "xm_target":	// ^(> )*杀死 骷髅: 2/8   ^[杀死|超度]\s+(.*) :\s+(\d+)\/(\d+)。   
			//if (query("xuemo/target") == true) return;
			if (wcs[1] == "亡灵") {
				if (wcs[2] == wcs[3]) {
					send("freport");
					world.EnableTrigger("bs_kill", true);
				}
				return;
			}
			var stp = query("xuemo/step");
			if (stp > 2 && wcs[1] != "心武") return; 
			
			set("xuemo/npc","");
			if (wcs[2] == wcs[3]) {
				switch (wcs[1]) { 
					case "骷髅":
						if (stp == 2) return;
					case "骷髅武士":
				//	case "巫妖":
						set("xuemo/target1",true);
						break;	
					case "僵尸":
						if (stp == 2) return;
					case "尸煞":
				//	case "僵尸王":
						set("xuemo/target2",true);
						break;
					case "幽灵":
						if (stp == 2) return;
					case "幽冥之眼":
				//	case "幽冥魔":
						set("xuemo/target3",true);
						break;
					case "骷髅法师":
						set("xuemo/target4",true);
						break;	
					case "血僵尸":
						set("xuemo/target5",true);
						break;	
					case "幽冥之火":
						set("xuemo/target6",true);
						break;
					case "心武": 
						world.Note("spirit tower")
						send("get spirit tower;#q");
						set("room/id",2833);
						set("xuemo/step",4);
						set("nextstep/cmds", "give spirit tower to ding yi;freport;jiqu");
						set("nextstep/flag", "COMMANDS");
						dg_maze.cloc = dg_maze.lockrm1;
						dg_maze.tloc = -1;
						goto(2835);	
						return;						
			}
				if (query("xuemo/target1") && query("xuemo/target2") && query("xuemo/target3") && query("xuemo/target4") && query("xuemo/target5") && query("xuemo/target6"))
					set("xuemo/target",true);
			}
			world.EnableTrigger("xm_target", false);
			world.EnableTimer("t_pfm", false);
			
			//看一下
			world.EnableTrigger("sm_exit", false);
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("xm_npc", true);
			send("hp;look;set no_teach xuemo");
			
			//send(do_xuemo());
			break;
}
}
//--------------------------------------------------------------------------------
function do_xuemo()
{
		//world.note("坐标" + dg_maze.cloc);
		//world.note(dg_maze.pnum+"索引号" + dg_maze.cloc+ "是当前坐标，要去"+ dg_maze.tloc+"，路径"+dg_maze.path);
		var nn = "";
		//任务目标完成，回去交任务
		if (query("xuemo/target") && (query("xuemo/step")<3) && dg_maze.tloc != dg_maze.enter) {
			dg_maze.tloc = dg_maze.enter;
			dg_maze.path = "";			
		}
		
		if ((query("xuemo/npc") == "") && (query("xuemo/step")<3) && !(query("xuemo/target")) )  
		{
			world.EnableTrigger("xm_npc", true);
			world.EnableTrigger("xm_step", true);
			set("xuemo/npc","end");
			nn = "hp;set no_teach xuemo";
		} else 
		if (dg_maze.cloc == dg_maze.tloc && (query("xuemo/target"))) {
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTriggerGroup("gsm", 1);
			world.EnableTriggerGroup("gwk", 1);
			dg_maze.path = "";
			nn = get_step();
			world.note("迷宫路径结束到达指定地点"+nn);
			if (nn == m_FAIL)
				world.note("迷宫路径结束到达指定地点发生错误");			
		} else { 
			world.EnableTriggerGroup("on_npc",false);
			world.EnableTrigger("step", false);
			world.EnableTriggerGroup("gsm", 1);
			world.EnableTriggerGroup("gwk", 1);
			if (dg_maze.tloc == -1 || dg_maze.cloc == dg_maze.tloc) {
				dg_maze.tloc = get_xmroom();
				dg_maze.path = ""; 
			}
			if (dg_maze.path == null || dg_maze.path == "" || dg_maze.path == m_FAIL) {
				dg_maze.path = dg_maze.goto(dg_maze.tloc);			
			}
			//set("digong/npc","");	
			world.EnableTrigger("xm_npc", true);			
			//send(dg_maze.block(1));
			nn = dg_maze.block(1);
		}
		return nn;
}
function get_xmroom()
{
	//world.note(dg_maze.cloc+"是当前坐标get_xmroom要去坐标"+dg_maze.tloc);
	var stp = query("xuemo/step");
	var tt = -1;
		switch (stp) { 
			case 1:
			case 2:
				if (query("xuemo/target")) 
					tt = dg_maze.enter;	
				else if (dg_maze.cloc == dg_maze.enter) 
					tt = dg_maze.lockrm1;
				else if  (dg_maze.cloc == dg_maze.lockrm1) 
					tt = dg_maze.leave;
				else {
					tt = dg_maze.leave;
					while (tt == dg_maze.leave) {				
						i = Math.floor(Math.random() * 99);
						if (dg_maze.data[i] != "" && dg_maze.cloc != i)
							tt = i;	
					}	
				}
				break;
			case 3:
					tt = dg_maze.lockrm1;
				break;			
			case 4:
			case 7:
					tt = dg_maze.enter;	
				break;
			case 5:
			case 8:
					tt = dg_maze.leave;
				break;			
		}
	world.note("当前坐标get_xmroom坐标结束，要去"+tt);
	return tt;
}	
//--------------------------------------------------------------------------------
function on_trc_eatlu(name, output, wildcards){
	send("eat magic water;i")
	world.EnableTrigger("on_trc_eatlu",false)
}

function BusyTest(loc,cmds){
	world.EnableTriggerGroup("busytest",true)
	set("nextstep/loc",loc)
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", cmds);
	send("enchase bao")
}
function on_busy_test_busy(name, output, wildcards){
	world.Note("busy")
	world.DoAfterSpecial(0.5, 'send("enchase bao")', 12);	
}
function on_busy_test_nobusy(name, output, wildcards){
	world.EnableTriggerGroup("busytest",false)
	goto(query("nextstep/loc"))	
}
world.EnableTriggerGroup("busytest",false)

function EatLu(){
	set("trceatlu",true)
	do_prepare()
}

//-------------------------

function on_jubaoxiang(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
	set("xiang",{
		"_used":wcs[0]-0,
		"_max":wcs[1]-0,
	})
	if (wcs[0]>0){
		world.EnableTrigger("jubaoxiang_start", true);
	}
}


function on_jubaoxiang_item(name, output, wildcards){
	var wcs = VBArray(wildcards).toArray();
	set("xiang/"+wcs[1],wcs[2]-0)
}

function on_jubaoxiang_start(name, output, wildcards){
	world.EnableTrigger("jubaoxiang_start", false);
	world.EnableTrigger("jubaoxiang_end", true);
	world.EnableTrigger("jubaoxiang_item", true);

}
function on_jubaoxiang_end(name, output, wildcards){
	world.EnableTrigger("jubaoxiang_end", false);
	world.EnableTrigger("jubaoxiang_item", false);


}
