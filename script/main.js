//--------------------------------------------------------------------------------
var Dir_sh = {
	"east": "e", "south": "s", "west": "w", "north": "n", "southeast": "se", "southwest": "sw",
	"northeast": "ne", "northwest": "nw", "eastup": "eu", "eastdown": "ed", "southup": "su",
	"southdown": "sd", "westup": "wu", "westdown": "wd", "northup": "nu", "northdown": "nd",
	"up": "u", "down": "d", "enter": "enter", "out": "out", "cross": "cross"
};

var Dir_re = {
	"e": "w", "s": "n", "w": "e", "n": "s", "se": "nw", "sw": "ne", "ne": "sw", "nw": "se",
	"eu": "wd", "ed": "wu", "su": "nd", "sd": "nu", "wu": "ed", "wd": "eu", "nu": "sd",
	"nd": "su", "u": "d", "d": "u", "enter": "out", "out": "enter", "cross": "cross"
};

//--------------------------------------------------------------------------------
// 全局变量。
var dbase_data = {
	"walk": "null",
	"xiang": {},
	"search": { "flag": "" },
	"maze": { "count": 0, "dir": "null" },
	"room": { "name": "null", "id": -1, "dir": "", "cmd": "", "miss": 2763, "chat": 2046 },
	"nextstep": { "flag": "", "cmds": "", "loc": 0 },
	"need_do": { "cmds": "", "loc": -1 },
	"quest": { "flag": "null", "far": 0, "info": 0, "count": 0, "master": true, "letter": false, "exp": 0, "pot": 0, "ccount": 0 },
	"stat": { "stime": 0, "minute": 0, "count": 0, "eff": 0, "helped": 0, "busy": 0, "busycount": 0, "busyeff": 0, "eff_exp": 0, "eff_pot": 0 },
	"info": { "id": "", "list": "" },
	"npc": {
		"name": "null", "id": "", "loc": "", "find": 0, "coor": -1, "status": "null", "wd": 0,
		"corpse": 0, "head": 0, "onkill": "", "busystart": 0
	},
	"dispel": { "flag": "", "next": "", "count": 0, "count1": 0 },
	"connect": { "cmds": "", "auto": false, "time": 0 },
	"stab": { "flag": true, "miss": true, "index": 0 },
	"weapon": { "id": "", "dur": 0 },
	"weapons": {},
	"deposit": 0,
	"allitem": {},
	"item": {
		"food": 0, "shuidai": 0, "silver": 0, "zhen": 0,
		"gold": 0, "9hua": 0, "qlkey": 0, "money": 0, "buy": "null", "arrow": 0, "gong": 0, "lsword": 0, "iblade": 0, "gangbiao": 0, "cash": 0,
		"sell": "null", "gift": "null", "wuqi": 1, "qu": "null", "flag": false, "load": false
	},
	"hp": {
		"exp": 1, "pot": 1, "neili": 1, "qi": 1, "eff_qi": 90, "eff_jing": 90, "max_jing": 100,
		"max_qi": 100, "max_neili": 1, "max_jingli": 1, "food": 1, "water": 1, "jing": 1, "limit_jingli": 1, "limit_neilili": 1, "limit_pot": 100, "limit_th": 100,
		"jingli": 1, "th": 1, "dispel": false, "faint": "null", "pot_full": false, "level": 0
	},
	"timer": { "count": 0, "time": 0, "flag": "null", "cmd": "null", "pfm": 0, "idle": false },
	"other": {
		"nextstep": "", "loc": "", "focus": true, "heal": "", "sleep": 0, "jiqu": 0, "study": 0, "n_yj": 0, "n_lx": 0,
		"qiankun": false, "brief": false, "trace": false, "walk": false, "backup": false, "touch": true, "mtc": false,
		"getw": 0, "tell": 0, "loc1": "", "todo": -1, "todo_cmd": "",
	},
	"askyou": { "flag": false, "loc": null, "index": 0, "idpt": 0, "count": 0, "none": false },
	"protect": { "ready": false, "step": 0, "atime": 0, "ctime": 0, "name": "null", "id": "", "loc_no": 0, "loc": -1, "enemyid": "", "count": 0, "ccount": 0, "exp": 0, "pot": 0, "eff": 0, "eff_exp": 0, "eff_pot": 0 },
	"lgt": { "time": 0, "flag": false, "ready": false, "cmd": "", "floor": 0, "door": 0, "npc": "", "charm": 99 },
	"qinling": { "ready": false, "flag": false, "line": 0, "step": 0, "count": 0, "ccount": 0, "cmds": "", "stime": 0, "ctime": 0, "all_time": 0, "c_eff": 0, "t_eff": 0 },
	"fuben": { "type": "", "infb": false },
	"trceatlu": false,
	"lastdrunk": 0,
	"miss": { "fail": false, "until": 0 },
};

var npc_id = new Array();
var cmd_count = new Array();
var step_walk = new MyArray();
var auto_search = new MySearch(3);
//var mapper       = new ActiveXObject("mapper.path");
eval(Include("mapper.js"), "mapper.js")
mapper.open("rooms.h")
mapper.setmissloc(get_var("list_mloc"))
mapper.addhouse(get_var("house"))
var m_FAIL = "-333";

//--------------------------------------------------------------------------------
eval(Include("Static_Data.h"), "Static_Data.h");
eval(Include("queue.js"), "queue.js");
eval(Include("data.js"), "data.js");
eval(Include("assistant.js"), "assistant.js");
eval(Include("weak.js"), "weak.js");
eval(Include("helpfind.js"), "helpfind.js");
eval(Include("notify.js"), "helpfind.js");
eval(Include("mods.js"), "mods.js");
eval(Include("mods/system.js"), "mods/system.js");
eval(Include("mods/maze.js"), "mods/maze.js");
eval(Include("mods/protect.js"), "mods/protect.js");
eval(Include("mods/lgt.js"), "mods/lgt.js");
eval(Include("mods/qinling.js"), "mods/qinling.js");
eval(Include("rideto.js"), "rideto.js");
eval(Include("hud.js"), "hud.js");
eval(Include("mods/wudusuck.js"), "mods/wudusuck.js");
//--------------------------------------------------------------------------------
function Include(FileName) {
	// var FileScriptingObject = new ActiveXObject("Scripting.FileSystemObject");
	// var path = world.GetInfo(35);
	// path = path.substring(0, path.lastIndexOf("\\"));
	// var File = FileScriptingObject.OpenTextFile(path + "\\" + FileName, 1);
	// var Code = File.ReadAll();
	// world.Note("Include Script File: " + FileName);
	// File.Close();
	// return (Code);
	var Code=world.ReadFile(FileName);
	world.Note("Include Script File: " + FileName);
	return Code;
}

function MySearch(dp) {
	this.data = new Array(dp);
	this.exit = new Array(dp + 1);
	this.index = 0;
	this.depth = dp;
	this.dir = "";

	this.back = function () {
		var ix = this.index;
		var dr = dir_reverse(this.dir);
		if (dr != m_FAIL)
			this.data[ix] = dr;

		return dr;
	};

	this.next = function (ex) {
		var et = "";
		var fg = false;
		var ix = this.index;
		if (this.exit[ix] == null)
			this.exit[ix] = "";

		//判断当前房间的出口是否已经走过。			
		for (var i = 0; i < ex.length; i++)
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

function MyArray(pra) {
	this.data = pra;
	this.index = 0;
	this.dir = "";
	this.stepnum = 0;
	this.blockend = 0;

	this.back = function () {
		if (this.index <= 0)
			return m_FAIL;

		this.index--;
		this.dir = dir_reverse(this.dir);
		return this.dir;
	};

	this.eof = function () {
		if (this.index >= this.data.length)
			return true;
		else
			return false;
	};

	this.eob = function () {
		if (this.index >= this.blockend)
			return true;
		else
			return false;
	};

	this.next = function () {
		if (this.index >= this.data.length)
			return m_FAIL;

		this.dir = this.data[this.index++];
		return this.dir;
	};

	this.block = function (ns) {
		var bk;
		var num = 0;
		var st = this.index;
		var ed = ns - 0 + st;
		if (ed >= this.data.length)
			ed = this.data.length;

		if (st >= ed)
			return m_FAIL;

		for (var i = st; i < ed; i++) {
			num++;
			if (this.data[i].indexOf("goto") != -1
				|| this.data[i].indexOf("cross") != -1
				|| this.data[i].indexOf("rideto") != -1
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
function init_cmd_count() {
	var num = get_var("num_cmds") - 0;
	cmd_count = new Array(num);
	for (var i = 0; i < num; i++)
		cmd_count[i] = 0;
}

function get_cmd_delay() {
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

function query(str, no_mfail) {
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
		if (!no_mfail) {
			world.note("query():变量[" + str + "]不存在！");
		}
		return no_mfail ? null : m_FAIL;
	}

	var qr = dbase_data;
	for (var i = 0; i < ar.length; i++) {
		qr = qr[ar[i]];
		if (qr == null) {
			if (!no_mfail) {
				world.note("query():变量[" + str + "]不存在！");
			}
			return no_mfail ? null : m_FAIL;
		}
	}

	return qr;
}

function set(flag, value) {
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

	if (ar[0] == "quest" || ar[0] == "npc" || ar[0] == "nextstep" || ((ar[0] == "hp") && (ar[1] == "th")))
		set_status();
}

var newlinere = /\n/g

function GetCmd(name) {
	var list = world.GetVariable("list_cmd").replace(newlinere, "|").split("|")
	for (var index in list) {
		var data = world.SplitN(list[index], ":", 2)
		if (data.length > 1) {
			if (data[0] == name) {
				return data[1]
			}
		}
	}
	return ""
}
//--------------------------------------------------------------------------------
function get_room(str) {
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

function get_exit_id(id, dir) {
	//因为为了节约内存，加入了ride-pet的虚拟房间，所以获取出口时需要从ride-pet获取实际出口
	if (dir.startsWith("rideto ")) {
		id = "ride-pet"
	}
	mapper.exec("mush exitid " + id + ":" + dir);
	var res = mapper.result;

	if (res == null || res == "null") return -1;
	return res - 0;
}

function get_room_id(nm) {
	mapper.exec("mush " + nm);
	var res = mapper.result;
	if (res == null || res == "null") return m_FAIL;
	return res.split(",");
}

function get_path(fl, tl) {
	if (fl == -1 || tl == -1) return m_FAIL;

	if (("," + tl + ",").indexOf("," + fl + ",") != -1) return "";

	var str, pas;

	pas = get_var("id_pass");
	if (!query("allitem/shen she", true) && pas.indexOf("bt") > -1) {
		pas = ""
	}
	if (get_var("bool_miss") && query("stab/miss")) {
		var date = new Date();
		var time = date.getTime();
		if (time > query("miss/until") || get_var("bool_missonly")) {
			pas += "," + get_var("id");
		}
	}
	var ridetag = rideto.getTag()
	if (ridetag) {
		pas = pas + "," + ridetag
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
		world.note("get_path:" + fl + "->" + tl + "：" + str);
		return str;
	}
}

function get_area_path(lcs, dep) {
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

function dir_short(dir) {
	if (dir == null || dir == "") return m_FAIL;

	var res;
	dir = dir.replace(/。/g, "");
	if ((res = Dir_sh[dir]) != null) return res;
	else if (Dir_re[dir] != null) return dir;
	return m_FAIL;
}

function dir_reverse(dir) {
	if (dir == null || dir == "") return m_FAIL;

	var res;
	dir = dir.replace(/。/g, "");
	if ((res = Dir_sh[dir]) != null) dir = res;
	if ((res = Dir_re[dir]) != null) return res;
	return m_FAIL;
}

function exit_filt(str, type) {
	var rid, num, tmp, tmp1;

	rid = query("room/id");
	if (rid != "-1" && type == null) return get_room("filt " + rid);

	tmp = "";
	var re = new RegExp("[a-z]*[^、 和]", "g");
	var rm = str.match(re);
	for (var i = 0; i < rm.length; i++) {
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


function get_step() {
	switch (query("walk")) {
		case "auto":
			return auto_search.dir;
		case "find":
			return auto_search.dir;
		case "multi":
			return step_walk.block(1);
		default:
			world.note("get_step:walk flag无效。");
			break;
	}
}

function get_info_key(index) {
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
var _groupre = new RegExp("[;\n]", "g");
function groupcmds(str) {
	if (str == "" || str == null || str == m_FAIL) {
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
	Metronome.setbeats(world.GetVariable("num_cmds") / 2)
	for (var i = 0; i < cmds.length; i++) {
		var commands = cmds[i].match(_cmdsre)
		var buf = []
		commands.forEach(function (cmd) {
			if (cmd != "" && cmd != null) {
				if (cmd.indexOf("#") == 0) {
					if (buf.length) {
						Metronome.push(buf, true, fg)
						buf = []
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
						case "#yj":
							var rd = query("room/id");
							if (query("hp/pot") > get_var("min_pot") && rd != 1946 && rd != 2452) {
								send(get_study2(cmd[1], cmd[2]));
							}
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
							if (cmd.length > 1) {
								cmd.shift()
								send(GetCmd(cmd[(Math.floor(Math.random() * cmd.length))]))
							}
							break
						case "#set":
							if (cmd.length > 2 && cmd[1]) {

								set(cmd[1], cmd.slice(2).join(" "));
								world.note("设置data变量:" + cmd[1] + "为" + cmd.slice(2).join(" "));
							}
							break
						case "#to":
							goto(cmd[1]);
							break;
						case "#setvar":
							if (cmd.length > 2 && cmd[1]) {
								world.SetVariable(cmd[1], cmd.slice(2).join(" "));
								world.note("设置游戏设置变1量:" + cmd[1] + "为" + cmd.slice(2).join(" "));
							}
							break
						case "#unsetvar":
							if (cmd.length > 1 && cmd[1]) {
								world.SetVariable(cmd[1], "")
							}
							break
						case "#jiqu": {
							send(CmdMjq())
							break
						}
						case "#weapon":
							if (cmd.length < 3 || (cmd[1] != "wield" && cmd[1] != "wear")) {
								world.Note("装备格式错误，应为 #weapon wield myblade 或 #weapon wear mystrike")
								break;
							}
							let weapon = cmd.slice(2).join(" ")
							let wieldcmd = cmd[1] + " " + weapon
							let unwieldcmd
							if (cmd[1] == "wield") {
								unwieldcmd = "unwield " + weapon
							} else {
								unwieldcmd = "remove " + weapon
							}
							send("wp2off;wp1off;alias wp1on " + wieldcmd + ";alias wp1off " + unwieldcmd + ";wp1on;#q")
							world.SetVariable("id_weapon", weapon)
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
		if (buf.length) {
			Metronome.push(buf, true, fg)
			buf = []
		}
	}
}

function number(str) {
	var num = {
		"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6,
		"七": 7, "八": 8, "九": 9
	};
	var unit = 1;
	var wan = 1;
	var result = 0;
	var char;

	for (var i = (str.length - 1); i >= 0; i--) {
		char = str.charAt(i);
		switch (char) {
			case "十":
				unit = 10 * wan;
				if (i == 0)
					result += unit;
				else if (num[str.charAt(i - 1)] == null)
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

function step_trace(dir) {
	if (dir == "" || dir == null) return;
	if (query("qinling/flag"))
		ql_steptrace(dir);
	else {
		var id = query("room/id");
		if (id != -1) {
			var rmid = get_exit_id(id, dir);
			set("room/id", rmid - 0);
		}
	}
}

function goto(tl) {
	set("other/touch", true);
	set("miss/fail", false)
	var tmp = tl + "";
	tmp = tmp.split(",");
	for (var i = 0; i < tmp.length; i++) {
		if (isNaN(tmp[i])) {
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
		do_autosearch(13, "find");
	} else {
		var pa = get_path(fl, tl);
		if (pa != m_FAIL) do_walk(pa.split(";"));
	}
}

function get_var(str) {
	var res = world.GetVariable(str);
	if (res == null) {
		world.note("get_var():变量[" + str + "]不存在");
		return m_FAIL;
	}

	if (str.indexOf("bool") != -1) {
		res = res.toLowerCase();
		if (res == "true" || res == "yes" || res == "y" || res == "t") res = true;
		else if (res == "false" || res == "no" || res == "n" || res == "f") res = false;
	}
	if (str == "max_exp" && res == "max") {
		res = 9999999999;
	}
	if (str == "max_pot") {
		if (res == "max")
			res = query("hp/limit_pot");
		else if (res == "false")
			res = 987654321;
	}
	if (str == "max_th") {
		if (res == "max")
			res = query("hp/limit_th");
		else if (res == "false")
			res = 987654321;
	}
	if (str == "loc_study" && !can_study() && world.GetVariable("loc_study2") != null && world.GetVariable("study_cmd2") != null && world.GetVariable("list_skill2") != null) {
		res = world.GetVariable("loc_study2");
	}
	if (str == "list_skill" && !can_study() && world.GetVariable("loc_study2") != null && world.GetVariable("study_cmd2") != null && world.GetVariable("list_skill2") != null) {
		res = world.GetVariable("list_skill2");
	}
	return res;
}
function set_var(str, val) {
	return world.SetVariable(str, val);
}

function set_status() {
	if (!query("other/focus"))
		return;
	var str = "【ID:" + get_var("id") + "】 ";
	var date = new Date();
	var time2 = date.getTime();
	var time1 = 0;
	var time = 0;
	str += ((rideto.mode == 0 || rideto.mode == 1) && (get_var("cmd_ride") || "").trim()) ? "【有马】" : "【无马】"
	var lastk = query("npc/busystart");
	var num_lk = (time2 - lastk) / 1000;
	str += "距离上次干npc:" + num_lk + "秒";

	if (query("other/todo") >= 0) {
		str += "【" + query("other/todo") + "分钟后需做:" + query("other/todo_cmd") + "】";
	}

	if (get_var("list_boss").indexOf("protect") != -1) {
		str += "保护【" + query("protect/name") + "】";
		str += "数量【" + query("protect/count") + "】";
		str += "效率【" + query("protect/eff") + "/小时】";
		str += "经验【" + query("protect/exp") + "】";
		str += "效率【" + query("protect/eff_exp") + "/小时】";
		str += "潜能【" + query("protect/pot") + "】";
		str += "效率【" + query("protect/eff_pot") + "/小时】";
	};
	if (!can_study()) { str += "-------学习1已完成，请及时调整学习策略--------" };
	str += " |npc:" + query("npc/name") + ", loc:" + query("npc/loc");
	if (query("npc/loc") == "很远") {
		var fx = query("quest/far");
		str += ", 当前" + fx + ":" + far_list[fx];
	}
	str += "quest【" + query("quest/flag") + "】";
	str += "完成【" + query("quest/count") + "】";
	str += "效率【" + query("stat/eff") + "/小时】";
	str += "经验【" + query("quest/exp") + "】";
	str += "效率【" + query("stat/eff_exp") + "/小时】";
	str += "潜能【" + query("quest/pot") + "】";
	str += "效率【" + query("stat/eff_pot") + "/小时】";
	str += "用时:" + query("stat/minute") + "分钟";
	//	str += ", 完成:" +  query("quest/count") + ", quest:" + query("quest/flag"); 
	//	str += ", 效率:" +  query("stat/eff") + "/小时, 用时:" + query("stat/minute") + "分钟"; 
	var busyeff = query("stat/busyeff")
	if (busyeff && get_var("bool_showbusy")) {
		str += ", 平均 busy:" + busyeff.toFixed(2)
	}
	if (!get_var("bool_nohelp") && query("stat/count")) {
		var rate = query("stat/helped") * 100 / query("stat/count")
		str += "，线报率:" + rate.toFixed(2) + "%";
	}
	world.SetStatus(str);
	updateHUD();
}

function add_log(str) {
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

function tongji(flag) {
	if (flag == 0) {
		set("stat/stime", 0);
		set("stat/minute", 0);

		set("stat/helped", 0)
		set("stat/busy", 0)
		set("stat/busycount", 0)
		set("stat/busyeff", 0);

		set("quest/exp", 0);
		set("quest/pot", 0);
		set("stat/count", 0);

		set("stat/eff", 0);
		set("stat/eff_exp", 0);
		set("stat/eff_pot", 0);

		set("protect/exp", 0);
		set("protect/pot", 0);
		set("protect/ccount", 0);

		set("protect/eff", 0);
		set("protect/eff_exp", 0);
		set("protect/eff_pot", 0);
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
	cnt = query("quest/exp") - 0;
	set("stat/eff_exp", Math.floor(cnt * 3600 * 1000 / time));
	cnt = query("quest/pot") - 0;
	set("stat/eff_pot", Math.floor(cnt * 3600 * 1000 / time));

	cnt = query("protect/ccount") - 0;
	set("protect/eff", Math.floor(cnt * 3600 * 1000 / time));
	cnt = query("protect/exp") - 0;
	set("protect/eff_exp", Math.floor(cnt * 3600 * 1000 / time));
	cnt = query("protect/pot") - 0;
	set("protect/eff_pot", Math.floor(cnt * 3600 * 1000 / time));

	set("stat/minute", Math.floor(time / 60000));
	set_status();

}

//--------------------------------------------------------------------------------
function stop_all(force) {
	set("other/walk", false);
	world.EnableTriggerGroup("gwk", 0);
	world.EnableTriggerGroup("gsm", 0);
	world.EnableTriggerGroup("gpe", 0);
	world.EnableTriggerGroup("gyh", 0);
	world.EnableTriggerGroup("gyd", 0);
	world.EnableTimer("timer1", false);
	world.EnableTimer("t_pfm", false);
	world.EnableTimer("t_lgt", false);
	world.EnableTimer("t_qinling", false);
	world.EnableTrigger("io_nobody", false);
	world.DiscardQueue(force);
}

function open_timer1(time, flag, cmd) {
	if (cmd != "" && cmd != null)
		set("timer/cmd", cmd);
	else
		set("timer/cmd", "");

	set("timer/count", 0);
	set("timer/time", time);
	set("timer/flag", flag);
	if (world.GetGlobalOption("TimerInterval") == 0 && flag == "busy0")
		world.SetTimerOption("timer1", "second", "0.1");
	else if (world.GetGlobalOption("TimerInterval") == 0 && flag == "busy5")
		world.SetTimerOption("timer1", "second", "0.5");
	else
		world.SetTimerOption("timer1", "second", "1");
	world.ResetTimer("timer1");
	world.EnableTimer("timer1", true);
}

function open_pfm() {
	world.EnableTimer("t_pfm", true)
	world.ResetTimer("t_pfm");
}

function reconnect(cmd) {
	world.EnableTimer("timer1", false);
	world.EnableTrigger("kl_help", false);
	world.EnableTrigger("kl_help1", false);
	world.EnableTrigger("faint", false);
	world.EnableTrigger("hurt", false);
	world.EnableTrigger("qt_accept", false);
	set("connect/auto", false);
	set("connect/cmds", cmd);
	world.Disconnect();
	/*
	var ttimer1 = (new Date()).getTime();
	ttimer1 = (ttimer1 - query("connect/time"))/1000;
	ttimer1 = 31 - ttimer1;
	if (ttimer1 < 2)
		ttimer1 = 2;
	world.note("等待"+ttimer1+"秒后重连");*/
	if (query("hp/faint") == "faint")
		open_timer1(120, "con_delay", null);
	else
		open_timer1(2, "con_delay", null);
}

function autoconnect() {
	if (!query("connect/auto")) {
		world.EnableTimer("t_con", false);
		return;
	}

	var cmd = get_var("id") + ";" + get_var("passw") + ";y";
	if (query("quest/flag") != "null")
		cmd += ";halt;hp;i;#t+ qt_none;quest;set no_teach auto connect";

	set("room/id", -1);
	set("connect/cmds", cmd);
	world.DiscardQueue();
	world.Connect();
}

function at_connect() {
	world.EnableTimer("t_con", false);
	set("npc/find", 0);
	set("npc/coor", -1);
	send(query("connect/cmds"));
	world.EnableTrigger("faint", true);
	world.EnableTrigger("hurt", true);
	world.EnableTrigger("qt_accept", true);
	world.EnableTrigger("connected", true);
	world.EnableTrigger("connected1", true);
	world.EnableTrigger("condelay", true);
}

function at_disconnect() {
	world.EnableTimer("t_pfm", false);
	world.EnableTimer("timer3", false);
	world.EnableTimer("t_kmg", false);
	world.DiscardQueue();
	world.EnableTimer("t_con", true);
}

function get_focus() {
	set("other/focus", true);
	set_status();
}

function lose_focus() {
	set("other/focus", false);
}

function to_kill(init) {
	if (init) {
		set("npc/find", 0);
		set("npc/coor", -1);
		set("quest/far", 0);
		set("quest/info", 0);
	}
	if (query("npc/find") == -1) {
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
	// 出发前判断内力
	if (query("hp/neili") < get_var("min_neili")) {
		if (query("room/id") == 65) {
			set("nextstep/flag", "COMMANDS");
			set("nextstep/cmds", "hp;set no_teach fill neili");
			tl = 1927;
			goto(tl);
			return;
		} else {
			send("yun recover;yun regenerate;hp;set no_teach fill neili");
			return;
		}

	}
	set("npc/status", "start");
	set("search/flag", "AREA1");
	do_search();
	world.note("-----去" + loc + "追杀" + query("npc/name") + "-----");
}

function kill_npc() {
	stop_all();
	set("npc/find", 0);
	if (query("npc/coor") == query("room/id")) {
		world.Note("找到 " + query("npc/name") + " ，原地击毙")
		send(kill_cmd());
	}
	else {
		world.Note("前往 " + query("npc/coor") + " 击杀 " + query("npc/name"))
		set("nextstep/flag", "COMMANDS");
		set("nextstep/cmds", kill_cmd());
		goto(query("npc/coor"));
	}
}


function perform() {
	set("other/touch", true);
	var pfm = get_var("cmd_pfm");
	if (pfm == "shot")
		pfm = "shot " + query("npc/id") + " with arrow";
	else {
		if (query("npc/wd") == 1) {
			pfm = CmdMpf();
		}

		if (query("other/getw") == 1) {
			set("other/getw", 0);
			pfm = "get " + get_var("id_weapon") + ";wield " + get_var("id_weapon") + ";" + pfm;
		}
	}
	return pfm;
}

function telldm(flag) {
	var cnt = flag;
	switch (flag) {
		case "faint":
			cnt = "晕倒了:" + query("npc/loc") + "." + query("room/name")
				+ "." + query("room/id");
			world.note("晕倒地点:" + cnt);
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
		default:
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

function ydispel(par) {
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

function get_study() {
	var lt = get_var("list_skill");
	if (lt == null || lt == "") return "";

	var pot = query("hp/pot");
	if (pot < 10) {
		return "";
	}
	var mpot = 100 + query("other/n_yj") * 50;
	if (pot > mpot) pot = mpot;
	var re = new RegExp("[^;|,:]+", "g");
	lt = lt.match(re);
	var ix = Math.floor(Math.random() * lt.length);

	if (!can_study() && world.GetVariable("loc_study2") != null && world.GetVariable("study_cmd2") != null && world.GetVariable("list_skill2") != null) {
		return get_var("cmd_study2") + " " + lt[ix] + " " + pot;
	} else {
		return get_var("cmd_study") + " " + lt[ix] + " " + pot;
	}
}
function get_study2(sk, num) {
	var lt;
	//if (sk == "list_skill" || sk == "" || sk == null) {
	if ((sk == "" || sk == null || sk == "list_skill") && get_var("cmd_study") == "yanjiu") {
		lt = get_var("list_skill");
	}
	else if ((sk == "" || sk == null || sk == "list_skill2") && get_var("cmd_study2") == "yanjiu") {
		lt = get_var("list_skill2");
	}
	else
		lt = sk;

	if (lt == null || lt == "") return "";

	var pot = query("hp/pot");
	if (pot < 10) {
		return "";
	}
	var mpot = 100 + query("other/n_yj") * 50;
	if (pot > mpot) pot = mpot;
	if (num > 0 && num < 300) pot = num;

	var re = new RegExp("[^;|,:]+", "g");
	lt = lt.match(re);
	var ix = Math.floor(Math.random() * lt.length);
	return "yanjiu " + lt[ix] + " " + pot;

}
function do_lian(num) {
	var lst, ix, tmp1, tmp2, str;

	lst = get_var("list_lian");
	if (lst == null || lst == "") return;

	num = num - 1;
	lst = lst.replace(newlinere, "|").split("|");
	if (num >= lst.length) return;

	var res = new Array;
	for (var i = 0; i < lst.length; i++) {
		if (num != i && num >= 0) continue;

		tmp1 = lst[i].split(":");
		var mlx = 50 + query("other/n_lx") * 50;
		str = "lian " + tmp1[0] + " " + mlx;
		if (tmp1.length < 2) {
			res[res.length] = str;
			continue;
		}

		if (tmp1.length == 3) str = tmp1[2] + ";" + str;
		else if (tmp1.length > 3) str = tmp1[2] + ";" + str + ";" + tmp1[3];

		tmp2 = tmp1[1].split(",");
		for (var j = 0; j < tmp2.length; j++) {
			if (tmp2[j] != "") res[res.length] = "jifa " + tmp1[0] + " " + tmp2[j] + ";" + str;
			else res[res.length] = str;
		}
	}

	if (res.length <= 0) return;

	ix = Math.floor(Math.random() * res.length);
	//send(res[ix]);
	send(res[ix], true);
	// Metronome.push(res[ix],true,get_var("bool_each")?1:0)
}

function kill_cmd() {
	var id = "";
	var cmd = "";
	var pfm = perform();
	set("npc/busybusy", 0)
	id = query("npc/id");
	if (id == "" || id == null) id = "no body";

	var tmp = get_var("cmd_pfm");
	if (id == "no body") {
		cmd = "#t+ kl_nobody;id here;halt;kill no body;#q";
	} else {
		cmd = "#t+ kl_nobody;#tg+ gkl;halt;kill " + id.toLowerCase();
		var tmp = get_var("cmd_kill");
		if (query("hp/eff_qi") > 70) {
			cmd += ";" + tmp;
		} else {
			tmp = tmp.split(";");
			for (var i = 0; i < tmp.length; i++) {
				if (tmp[i].indexOf("jingang") == -1) cmd += ";" + tmp[i];
			}
		}
		if (pfm != "") cmd += ";" + pfm;
		cmd += ";#q";
	}
	var on_kill = query("npc/onkill")
	if (!on_kill || on_kill != query("npc/name")) {
		cmd = groupcmds(cmd)
	}
	return cmd;
}


function enter_maze(dir) {
	var rn;
	rn = query("room/name");
	if (rn == "渡船" || rn == "小舟" || rn == "大海") return true;
	if (rn != "大沙漠" && rn != "南疆沙漠" && rn != "戈壁滩" && rn != "桃花迷阵") return false;

	if (query("walk") == "multi") {
		if (dir != null) step_walk.block(1);
		else dir = step_walk.block(1);
	}
	else if (auto_search.dir == "") {
		if (rn == "戈壁滩") dir = "e";
		else if (rn == "大沙漠") dir = "w";
		else if (rn == "南疆沙漠") dir = "sw";
		else if (rn == "桃花迷阵") dir = "n";
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
	world.EnableTriggerGroup("on_npc", false);
	world.EnableTrigger("step", false);
	world.EnableTriggerGroup("gsm", 1);
	return true;
}
function incity(coor, cy) {
	if (Trim(coor) == "")
		return false;

	if (cy == "很远") {
		for (var key in loc_list) {
			if (incity(coor, key)) {
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
		|| (coor >= 1025 && coor <= 1065) || coor == 1712))
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

function can_accept() {
	if (query("quest/flag") != "kill") return false;

	if (check_in_fb()) return false;

	if (query("hp/dispel")) return false;

	if (query("item/load")) return false;

	if (query("hp/eff_qi") < 75) return false;

	if (query("weapon/dur") < 35) return false;

	if (query("item/food") < 10) return false;

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


function can_sleep() {
	if (get_var("loc_sleep") == "") {
		return false
	}
	var time = (new Date()).getTime();
	if (time < query("other/sleep") - 0 + 55 * 1000) return false;

	return true;
}
//修改成study1 study2
function can_study() {
	var time = (new Date()).getTime();
	if (time < query("other/study") - 0 + 15 * 60 * 1000) return false;

	return true;
}

function can_jiqu() {
	if (query("hp/exp") < 100000) return false;

	var time = (new Date()).getTime();
	if (time < query("other/jiqu") - 0 + 45 * 60 * 1000) return false;

	return true;
}

function can_fuben(bs) {

	//接受了保护任务，暂时不下大副本
	if ((bs == "lgt") && query("protect/step") > 0) return false;
	if (bs == "lgt" && (query("hp/exp") < 100 * 10000)) return false;
	if (bs == "qinling" && (query("hp/exp") < 5000 * 10000)) return false;
	var time = (new Date()).getTime();
	var time1;
	if (get_var("list_boss").indexOf(bs) == -1) return false;
	else if (bs == "lgt")
		time1 = get_var("lgt_time") - 0 + 8 * 60 * 60 * 1000;
	//time1 = query("lgt/time") - 0 + 8*60*60*1000;
	else if (bs == "qinling")
		time1 = query("qinling/ctime") - 0 + 2 * 55 * 1000;
	//灵感塔8小时尝试一次

	if (time < time1)
		return false;
	else
		return true;
}

function add_room_cmd(cmd) {
	var cmd1 = query("room/cmd");
	if (cmd1 == "") {
		set("room/cmd", cmd);
	} else if (cmd1.indexOf(cmd) == -1) {
		cmd = cmd1 + ";" + cmd;
		set("room/cmd", cmd);
	}
}

//--------------------------------------------------------------------------------
function do_nextstep() {
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
		default:
			world.note("warning: nextstep无效！");
			break;
	}
}

function do_walk(path) {
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
	world.EnableTriggerGroup("on_npc", true);
	world.EnableTrigger("step", true);
	world.EnableTrigger("wk_busy", true);
	world.EnableTrigger("wk_shhu", true);
	world.EnableTrigger("wk_miss", true);
	world.EnableTrigger("wk_missf", true);
	world.EnableTrigger("wk_noexit", true);

	if (!enter_maze()) send(step_walk.block(1));
}

function do_autosearch(dp, flag) {
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
	world.EnableTriggerGroup("on_npc", true);
	world.EnableTrigger("step", true);
	world.EnableTrigger("wk_busy", true);
	world.EnableTrigger("wk_shhu", true);
	world.EnableTrigger("wk_missf", true);
	world.EnableTrigger("wk_noexit", true);
}

function do_search() {
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

function do_searchend() {
	var loc = query("npc/loc");
	if (loc == "很远") {
		far_list = [...raw_far_list]
		var le = far_list.length;
		var exp = query("hp/exp") - 0;
		if (exp < 150000) le = le - 4;
		else if (exp < 400000) le = le - 2;
		else if (exp < 700000) le = le - 1;
		else {
			//根据help found优化，优先找线报少的西域
			far_list.unshift(far_list.pop())
		}
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

function do_areasearch() {
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

function do_gpssearch() {
	var ix = query("askyou/index") - 0;
	var lc = query("askyou/loc");
	if (ix >= lc.length || lc == null) {
		var ct = query("askyou/count") - 0 + 1;
		add_log("do_gpssearch:" + query("npc/id") + "." + query("npc/status") + "." + query("npc/loc") + "." + query("other/loc1") + "(" + lc + ")" + "没有找到。");
		set("askyou/loc", null);
		set("askyou/index", 0);
		set("askyou/flag", false);
		set("askyou/count", ct);
		to_kill(false);
		return;
	}

	if (lc[ix] == -1 || lc[ix] == null) {
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

function NpcAlive() {
	return query("npc/status") == "start" || query("npc/status") == "flee" || query("npc/status") == "disp"
}

function do_prepare() {
	var tl;

	var ll = query("hp/level") - 3;
	set("nextstep/flag", "COMMANDS");
	if (get_var("max_exp") < ll * ll * ll / 10) {
		world.note("-----变量max_exp设置有问题！-----");
		return;
	} else if ((!check_in_fb()) && query("need_do/cmds") != "" && query("need_do/loc") != -1) {
		set("nextstep/cmds", query("need_do/cmds"));
		tl = query("need_do/loc");
		set("need_do/loc", -1);
		set("need_do/cmds", "");
	} else if (query("hp/dispel")) {
		set("nextstep/cmds", "hp;set no_teach heal");
		tl = get_var("loc_dazuo");
	} else if (query("hp/eff_qi") < 21) {
		if (get_var("id_pass") == "xy") {
			set("nextstep/cmds", "#t+ pe_cures;#t+ pe_nobody;ask xue muhua about 疗伤");
			tl = 1722;
		} else {
			set("nextstep/cmds", "mdan2;hp;set no_teach heal");
			tl = 65;
		}
	} else if (query("hp/eff_qi") < 85) {
		set("nextstep/cmds", "#t+ pe_heal;#t+ pe_healf;yun heal");
		tl = get_var("loc_dazuo");
	} else if (query("item/gold") < get_var("min_gold")) {
		var num = get_var("min_gold") - query("item/gold") + 10;
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu " + num + " gold");
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu " + num + " gold");
		tl = 23;
	} else if (query("item/cash") < 15 && get_var("list_qask") != "") {
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 100 cash");
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 100 cash");
		tl = 23;
	} else if (query("item/gong") < 1 && get_var("cmd_pfm") == "shot") {
		set("item/buy", "long bow from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy long bow from tie jiang");
		tl = 66;
	} else if (query("item/lsword") < 1 && get_var("id_weapon") == "long sword") {
		set("item/buy", "long sword from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy long sword from tie jiang");
		tl = 66;
	} else if (query("item/iblade") < 1 && get_var("id_weapon") == "iron blade") {
		set("item/buy", "iron blade from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy iron blade from tie jiang");
		tl = 66;
	} else if (query("item/arrow") < 9 && get_var("cmd_pfm") == "shot") {
		set("item/buy", "50 狼牙箭 from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy 50 狼牙箭 from tie jiang");
		tl = 66;
	} else if ((query("item/gangbiao") - 0 + query("item/zhen")) < 400 && (get_var("cmd_pfm").indexOf("yuce") != -1 || get_var("bool_gangbiao"))) {
		set("item/buy", "100 gangbiao from tie jiang");
		set("nextstep/cmds", "#t+ pe_buy;buy 100 gangbiao from tie jiang");
		tl = 66;
	} else if ((!check_in_fb()) && query("item/shuidai") < 7) {
		set("item/buy", "shui dai from xiao er");
		set("nextstep/cmds", "#t+ pe_buy;buy shui dai from xiao er");
		tl = 27;
	} else if ((!check_in_fb()) && get_var("bool_drunk") && query("item/jiuping") < 10) {
		set("item/buy", "zui xunfeng from yang laoban");
		set("nextstep/cmds", "#t+ pe_buy;buy zui xunfeng from yang laoban");
		tl = 313;
	} else if ((!check_in_fb()) && query("item/food") < 15) {
		set("item/buy", "20 gan liang from xiao er");
		set("nextstep/cmds", "#t+ pe_buy;buy 20 gan liang from xiao er");
		tl = 27;
	} else if (get_var("id_pass").indexOf("bt") > -1 && !query("allitem/shen she", true)) {
		set("nextstep/cmds", "ask ouyang ke about 引路神蛇;i;set no_teach prepare");
		tl = 22
	} else if (query("weapons/" + get_var("id_weapon")) < 35 || ((query("weapons/" + get_var("id_weapon")) < 98) && (can_fuben("lgt")||can_fuben("qinling")))) {
		var wp = get_var("id_weapon");
		set("weapon/id", wp),
			set("nextstep/cmds", "#t+ pe_repair;repair " + wp + ";repair " + wp + ";l " + wp + " of me;i;set no_teach prepare");
		tl = 66;
	} else if ((!check_in_fb()) && query("weapon/dur") < 30 && query("weapon/id")) {
		var wp = query("weapon/id")
		set("nextstep/cmds", "#t+ pe_repair;repair " + wp + ";repair " + wp + ";l " + wp + " of me;i;set no_teach prepare");
		tl = 66;
	} else if ((!check_in_fb()) && query("item/9hua") < 10 && get_var("loc_jiuhua") != "") {
		set("nextstep/cmds", "gdan0;i;set no_teach prepare");
		tl = get_var("loc_jiuhua");
	} else if ((get_var("bool_cungift") || query("item/load")) && query("item/sell") != "null") {
		set("nextstep/cmds", "sell " + query("item/sell") + ";i;set no_teach prepare");
		tl = 48;
	} else if (query("item/cash") > 2000) {
		set("nextstep/cmds", "i;set no_teach cun money");
		tl = 23;
	} else if (query("item/load") && (query("item/silver") > 300 || query("item/gold") > get_var("min_gold") - 0 + 200 || query("item/cash") > 300)) {
		set("nextstep/cmds", "i;set no_teach cun money");
		tl = 23;
	} else if (query("deposit") > 80000) {
		set("item/qu", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 2001 cash;score;i");
		set("nextstep/cmds", "#t+ pe_silver;#t+ pe_quf;#t+ pe_qub;qu 2001 cash;score;i");
		tl = 23;
	} else if (query("trceatlu")) {
		set("nextstep/cmds", "set no_teach eatlu.check");
		tl = 306;
	} else if ((get_var("bool_cungift") || query("item/load")) && query("item/gift") != "null") {
		tl = get_var("loc_gift");
		if (tl == 2682) set("nextstep/cmds", "#t+ pe_drop;cun " + query("item/gift"));
		else set("nextstep/cmds", "#t+ pe_drop;give " + query("item/gift") + " to " + get_var("list_control").split(",")[0]);

	} else if (query("hp/jingli") < get_var("min_jingli")) {
		set("nextstep/cmds", "#t+ pe_tuna;#t+ pe_tunab;mdan1;hp;tuna " + get_var("num_tuna"));
		tl = get_var("loc_dazuo");
	} else if (!query("stab/miss") && query("stab/flag")) {
		do_stab();
		return;
	} else if (query("hp/neili") < get_var("min_neili") && get_var("loc_sleep") != "") {
		if (can_sleep() && !check_in_fb()) {
			set("nextstep/cmds", "#t+ pe_sleep;sleep");
			tl = get_var("loc_sleep");
		} else {
			set("nextstep/cmds", "#t+ pe_dazuo;#t+ pe_dazuof;dazuo " + get_var("num_dazuo"));
			tl = get_var("loc_dazuo");
		}
		//	} else	if (query("other/backup") || ((!check_in_fb())&&can_study() && query("hp/pot") > get_var("max_pot"))) {
	} else if (query("other/backup") || ((!check_in_fb()) && query("hp/pot") > get_var("max_pot"))) {
		set("nextstep/cmds", "#t+ pe_study;#t+ skfull;hp;set no_teach study");
		tl = get_var("loc_study");
	} else if (query("hp/th") > get_var("max_th") && can_jiqu()) {
		if (query("hp/pot") > get_var("min_pot") + 2000) {
			set("nextstep/cmds", "#t+ pe_study;#t+ skfull;hp;set no_teach study");
			tl = get_var("loc_study");
		} else {
			set("nextstep/cmds", "#t+ pe_jiqu1;#t+ pe_jiqu3;yun recover;yun regenerate;" + CmdMjq());
			tl = get_var("loc_dazuo");
		}
	} else if (query("hp/exp") > get_var("max_exp")) {
		set("nextstep/cmds", "#t+ pe_fangqi;fangqi exp");
		tl = get_var("loc_dazuo");
	} else if (can_wud_suck()) {
		do_wud_suck();
		return;
	} else if (Mods.Check()) {
		return;
	} else {
		world.EnableTriggerGroup("gpe", 0);
		set("item/load", false);
		////保护人质 副本为开，如果开的话，记得大副本要在非保护状态下去。
		if (can_accept_protect() || can_go_protect()) {
			initprotect();
			do_protect();
			return;
		} else
			////保护人质
			if (query("quest/flag") == "kill") {
				if (NpcAlive()) {
					do_continue()
					return
				} else if (can_fuben("lgt") && get_var("list_boss").indexOf("lgt") != -1) {
					initlgt();
					//set("lgt/flag","start");
					set("nextstep/flag", "COMMANDS");
					cmd = "#t+ lgt_start;shou yang xiaoxie";
					set("nextstep/cmds", cmd);
					tl = 2902;
				} else if (can_fuben("qinling") && get_var("list_boss").indexOf("qinling") != -1) {
					initqinling();
					go_qinling();
					return;
				} else if (get_var("list_boss").indexOf("doctor") != -1) {
					set("nextstep/flag", "COMMANDS");
					cmd = "set no_teach doctor";
					set("nextstep/cmds", cmd);
					tl = get_var("loc_dazuo");
				} else if (get_var("list_boss").indexOf("lianxi") != -1) {
					set("nextstep/flag", "COMMANDS");
					cmd = "set no_teach lianxi";
					set("nextstep/cmds", cmd);
					tl = get_var("loc_dazuo");
				} else {
					set("nextstep/cmds", "quest " + get_var("id_master"));
					tl = get_var("loc_master");
				}
			} else {
				set("nextstep/flag", "");
				world.note("=====任务结束！=====");
				world.EnableTriggerGroup("on_npc", false);
				world.EnableTrigger("step", false);
				world.EnableTrigger("ga", false);
				return;
			}
	}
	if (check_in_fb() && (tl == get_var("loc_dazuo"))) {
		var cmd = query("nextstep/cmds");
		set("nextstep/cmds", "");
		send(cmd)
		return
	}
	goto(tl);
}

function do_quest() {
	if (query("npc/status") == "head")
		var cmd = "#t+ qt_nobody;give head to " + get_var("id_master");
	else
		var cmd = "quest " + get_var("id_master");

	set("npc/status", "end");
	set("nextstep/cmds", cmd);
	set("nextstep/flag", "COMMANDS");
	goto(get_var("loc_master"));
}

function do_askinfo() {
	if (query("npc/find") == -1) {
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

function do_askyou() {
	if (query("npc/find") == -1) {
		kill_npc()
		return
	}
	HelpFind(query("npc/name"))
	world.SetVariable("name_npc", query("npc/name"));
	if (query("npc/id") == "null" || query("npc/id") == "" || query("npc/id") == "no body") {
		var sn = "";
		var pt = 2;
		var name = query("npc/name");
		if ((sn = cn_sname[name.substr(0, 2)]) == null) {
			pt--;
			if ((sn = cn_sname[name.substr(0, 1)]) == null) {
				add_log("do_askbei:找不到" + name + "的id。");
				return;
			}
		}

		var tmp = new Array();
		for (var i = pt; i < name.length; i++) {
			tmp[i - pt] = new Array();
			for (ky in cn_pname) {
				if (cn_pname[ky].indexOf(name.substr(i, 1)) != -1)
					tmp[i - pt][tmp[i - pt].length] = ky;
			}
		}

		var tmp1, ct;
		for (var i = 0; i < tmp.length; i++) {
			npc_id = new Array();
			for (var j = 0; j < tmp[i].length; j++) {
				if (i == 0)
					npc_id[npc_id.length] = tmp[i][j];
				else {
					ct = tmp1.length;
					for (var k = 0; k < ct; k++)
						npc_id[npc_id.length] = tmp1[k] + tmp[i][j];
				}
			}

			tmp1 = new Array();
			for (var l = 0; l < npc_id.length; l++)
				tmp1[tmp1.length] = npc_id[l];
		}

		for (var i = 0; i < npc_id.length; i++)
			npc_id[i] = sn + " " + npc_id[i];

		set("askyou/idpt", 0);
		set("npc/id", npc_id[0].toLowerCase());

	}

	set("askyou/none", false);
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", "#t+ io_you0;ask you xun about " + query("npc/id"));
	goto(26);
}

function do_wait() {
	//	if (query("hp/eff_qi") < 90)
	//		send("yun heal");
	//	else
	send(get_var("cmd_wait"));
	open_timer1(15, "quest_end", null);
}

function do_stab() {
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
		send(get_var("cmd_pre") + ";wield " + wp + ";wear " + wp + ";set no_teach prepare");
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
function on_step(name, output, wildcards) {
	var wcs, mdir;
	wcs = wildcards;
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
			open_timer1(1, "step_fail", null)
			send(dir);
			break;
		case "multi":
			if (enter_maze(mdir)) return;

			var cmd = query("room/cmd");
			var no_cmd = ",1928,2309,2312,2315,2340,2343,26,2046,";

			//			if (cmd != "" && query("room/id")!= 1928) {
			if (cmd != "" && no_cmd.indexOf("," + query("room/id") + ",") == -1) {
				send(cmd);
				send("#q");
				set("room/cmd", "");
			}

			if ((step_walk.eof() || step_walk.eob()) && (query("npc/find") == -1) && NpcAlive()) {
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
			open_timer1(1, "step_fail", null)
			send(dir);
			break;
	}
}

function on_maze(name, output, wildcards) {
	switch (name) {
		case "sm_exit":	// ^    这里(.*)的出口是(.*)。
			var rn = query("room/name");
			if (rn == "戈壁滩")
				send("set no_teach maze");
			else if (rn == "大沙漠" || rn == "南疆沙漠" || rn == "桃花迷阵")
				send("hp;set no_teach maze");
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
				if (query("hp/neili") < (get_var("min_neili") - 0 + 1000)) send("mtc");
				if (query("hp/neili") < get_var("min_neili")) send("dazuo " + get_var("num_dazuo"));
				if (dir == "w") {
					if (Math.floor(Math.random() * 5) == 1) dir = "s";
				}

				send(dir);
				if (query("walk") == "auto") auto_search.dir = dir;
			} else if (rn == "南疆沙漠") {
				if (dir == "sw") {
					if (ct < 9) dir = "sw";
					else dir = "ne";

					set("maze/count", (ct + 1));
				}

				send(dir);
				if (query("walk") == "auto") auto_search.dir = dir;
			} else if (rn == "戈壁滩") {
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
			} else if (rn == "桃花迷阵") {
				if (query("hp/eff_qi") < 70) send("yun heal");
				if (query("hp/neili") < get_var("min_neili")) send("dazuo " + get_var("num_dazuo"));
				send(dir);
				set("maze/count", (ct + 1));
				if (query("walk") == "auto") auto_search.dir = dir;
			}
			break;
		case "sm_out":	// ^(> )*(深山|昆仑山下|戈壁|丝绸之路|天山脚下|东门)$
			world.EnableTriggerGroup("gsm", 0);
			world.EnableTriggerGroup("on_npc", false);
			world.EnableTrigger("step", true);
			break;
	}
}

function on_walk(name, output, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "wk_busy":	// ^(> )*你(的动作还没有完成，不能移动|逃跑失败)。$
			world.DiscardQueue();
			world.EnableTrigger("wk_busy", false);
			if (output.indexOf("感觉相当飘忽") != -1)
				if (query("miss/fail") && !get_var("bool_missonly")) {
					stop_all()
					var date = new Date();
					var time = date.getTime();
					set("miss/until", time + 5 * 60 * 1000)
					send("hp;i;set no_teach prepare")
					return
				} else {
					set("miss/fail", true)
					send("mdan1")
				}

			var rn = query("room/name");
			open_timer1(1, "busy0", get_step() + ";#t+ wk_busy");
			break;
		case "wk_noexit":	// ^(> )*这个方向没有出路。
			set("room/id", -1);
			if (query("quest/flag") == "null") return;
			stop_all();
			open_timer1(1, "busy0", "set no_teach no exit");
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
			var elt = {
				"亲兵": 5, "衙役": 5, "官兵": 5, "宋兵": 5, "虚通": 5, "虚明": 5, "道一": 5,
				"大汉": 10, "拓跋": 30, "摘星子": 80, "劳德诺": 250, "空见": 500
			};

			var npc = wcs[1];
			var num = elt[npc];
			if (num == null) num = 100;
			var exp = query("hp/exp");
			if (exp < (num * 10000)) {
				telldm("Help kill " + npc);
				world.doafter(1, "look");
				return;
			}

			var list = {
				"安健刚": "an jiangang", "孟健雄": "meng jianxiong", "心砚": "xin yan", "大汉": "da han",
				"周绮": "zhou yi", "蒋四根": "jiang sigen", "石双英": "shi shuangying", "拓跋": "tuoba",
				"卫春华": "wei chunhua", "杨成协": "yang chengxie", "徐天宏": "xu tianhong",
				"常伯志": "chang bozhi", "常赫志": "chang hezhi", "赵半山": "zhao banshan",
				"周仲英": "zhou zhongying", "陆菲青": "lu feiqing", "无尘": "wuchen daozhang",
				"摘星子": "zhaixing zi", "虚通": "xu tong", "虚明": "xu ming", "劳德诺": "lao denuo",
				"李力世": "li lishi", "江百1胜": "jiang baisheng", "官兵": "guan bing", "衙役": "ya yi", "御前侍卫": "shi wei",
				"宋兵": "song bing", "侍女": "shi nu", "巴依": "ba yi", "亲兵": "qin bing", "褚万里": "chu wanli", "空见": "kong jian", "道一": "daoyi chanshi"
			};

			var cmd = "kill " + list[npc];
			if (npc == "御前侍卫") cmd += ";kill guan bing";
			if ((npc == "摘星子") && (exp < 2500000)) cmd += ";" + perform();
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
			send("unwield " + get_var("id_weapon2"));
			send("unwield " + wp + ";" + get_step() + ";wield " + wp);
			break;
		case "wk_cross":	// ^(> )*(船厂里走出一个船夫，瞪着眼看着你|船夫在旁边拿眼瞪......
			if (query("walk") == "multi") {
				step_trace(step_walk.next());
				step_walk.blockend++;
				send("cross");
			}
			break;
		case "wk_crossf":	// ^(> )*你的内力不够，还是休息一下再说吧。
			open_timer1(2, "busy", "cross;piao");
			break;
		case "wk_xiwall":	// ^(> )*你太累了，还是休息一会儿吧。
			open_timer1(2, "busy", "yun recover;" + get_step());
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
			send("enter;" + get_var("cmd_wait"));
			break;
		case "wk_mache":		// ^(> )*马夫一声招呼，开过来一辆大车，你上了车就出发了。
			set("room/name", "马车");
			send("drop head 2;" + get_var("cmd_wait"));
			break;
		case "wk_mcout":	// ^(> )*你到了(.*)，下了车。
			world.SendImmediate("halt");
			break;
		case "wk_ride":		// ^(> )*这里没有这样东西可骑。
			if (output.indexOf("可骑")) {
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
		case "wk_dzm"://^    前面就是明教的“地字门”了，这里是明教中女弟子修炼
			if (query("walk") != "find")
				return;

			stop_all();
			set("room/id", 1799);
			goto(query("nextstep/loc"));
			break;
		case "wk_taishan":		// ^你一不小心脚下踏了个空，... 啊...！
			if (query("walk") == "find")
				return;
			stop_all();
			send("set no_teach go tl");
			break;
	}
}

function on_quest(name, output, wildcards) {
	var wcs = wildcards;
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
			// world.EnableTrigger("qt_letter1", true);
			var loc = query("other/loc");
			if (query("npc/status") == "head" && query("quest/master")
				&& (loc.indexOf("西域") != -1 || loc.indexOf("大理") != -1)) {
				do_quest();
			} else {
				send("accept quest;quest");
				world.EnableTrigger("qt_disp", true);
				world.EnableTrigger("qt_start", true);
			}
			break;
		case "qt_letter1":	// ^正是大好机会将他除去，你若愿意
			// var loc = query("other/loc") + wcs[0];
			world.EnableTrigger("qt_letter1", false);
			// if (query("npc/status") == "head" && query("quest/master")
			// 	&& (loc.indexOf("西域") != -1 || loc.indexOf("大理") != -1)) {
			// 	do_quest();
			// } else {
			// 	send("accept quest;quest");
			// 	world.EnableTrigger("qt_disp", true);
			// 	world.EnableTrigger("qt_start", true);
			// }
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
			add_room_cmd(get_var("cmd_quest_go") + ";hp");
			to_kill(true);
			break;
		case "qt_disp":	// (@npc_name)在(.*)失踪了！现在不知道去了哪里！”
			set("npc/status", "disp");
			break;
		case "qt_give":	// ^(> )*(@master_name)(.*)，(对|看了看)你道：“(又除了一害，很好！|好极了！......
			set("npc/status", "end");
			send(get_var("cmd_master"))
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

function on_kill(name, output, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "kl_npc":		// ^  (@npc_name)\((.*)\)$
			var rm = query("room/id");
			if ((rm >= 1937 && rm <= 1949) || (rm >= 2443 && rm <= 2455)) return;

			if (name == "kl_npc") {
				if (wcs[1].indexOf(" ") == -1) return;
				set("npc/id", wcs[1].toLowerCase());
			}
		case "kl_npc1":		// ^  (@npc_name)正坐在地下
			set("askyou/count", 0);
			set("npc/coor", query("room/id"));
			if (query("npc/find") == -1) return;

			if (name == "kl_npc1" || name == "kl_npc") {
				world.EnableTriggerGroup("gkl", 1);
			}
			world.Note("发现 " + query("npc/name"))
			set("npc/find", -1);
			var rn = query("room/name");
			if (rn == "大沙漠" || rn == "南疆沙漠" || rn == "戈壁滩" || query("walk") == "auto") {
				stop_all();
				send(kill_cmd());
			}
			break;
		case "kl_npc2":		// ^(@npc_name)( )*= (.*)
			var id = wcs[2].split("、");
			set("npc/id", id[0].toLowerCase());
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
			set("npc/coor", -1);
			world.EnableTimer("t_pfm", false);
			send("hp;set no_teach heal");
			break;
		case "kl_fight5":	// ^(> )*看起来(@name_npc)想杀死你！
			set("npc/onkill", get_var("name_npc"))
			var tmp = get_var("cmd_pfm");
			if (tmp == "shot" || tmp.indexOf("mpf") != -1) return;
			if (query("npc/wd") == 1) {
				send(CmdMpf())
			} else {
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
			set("npc/coor", -1);
			do_areasearch();
			break;
		case "kl_fight3":	// ^(> )*(@npc_name)(一见到你|和你一碰面|对著你大喝|喝道：「你|一眼瞥见你|和你仇人相见分外眼红)
			stop_all();
			world.EnableTriggerGroup("gkl", 1);
			set("npc/onkill", get_var("name_npc"))
			send(kill_cmd());
			break;
		case "kl_flee":	// (@npc_name)(摇摇欲坠|身负重伤|狂叫一声|晃了两下|再退一步|已是避|深吸一口气|只有招架之功)(.*)
			if (output.indexOf("兵法战策") > -0) {
				return
			}
			world.EnableTimer("t_pfm", false);
			world.EnableTriggerGroup("gkl", 0);
			world.EnableTriggerGroup("gkl1", 0);
			set("quest/info", 0);
			set("npc/find", 0);
			set("npc/coor", -1);
			set("npc/status", "flee");
			if (query("hp/dispel") && !get_var("bool_drunk")) {
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
			var cmd = "";
			if (get_var("cmd_pfm").indexOf("yuce") != -1 || get_var("bool_gangbiao")) {
				if (query("item/zhen") < 499) cmd = "get yufeng zhen from " + query("npc/id") + ";"
			}
			set("npc/busystart", (new Date()).getTime())
			cmd += get_var("cmd_npcfaint") + ";i;hp";
			var weapons = (get_var("id_weapon") + ";" + get_var("id_weapon") + ";" + get_var("id_weapon") + ";" + get_var("id_weapon2") + ";" + get_var("id_weapon3")).split(";")
			var list = []
			weapons.forEach(function (data) {
				if (data) {
					list.push(data)
				}
			})
			if (list.length) {
				var num = Math.floor(Math.random() * list.length);
				var wp = list[num]
				set("weapon/id", wp)
				cmd += ";l " + wp + " of me";
			}
			send(cmd);

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
			set("npc/coor", -1);
			set("npc/head", 0);
			set("npc/corpse", 1);
			set("npc/wd", 0);
			set("npc/status", "dead");
			set("npc/onkill", "")
			add_room_cmd(get_var("cmd_quest_back"));
			var busystart = query("npc/busystart")
			if (busystart) {
				var busy = ((new Date()).getTime() - busystart) / 1000
				var allbusy = query("stat/busy") - 0 + busy
				var busycount = query("stat/busycount") - 0 + 1
				set("stat/busy", allbusy)
				set("stat/busycount", busycount)
				set("stat/busyeff", allbusy / busycount);
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

			if (query("hp/dispel") && !get_var("bool_drunk")) {
				ydispel(true);
				return;
			}

			if (npc == wcs[1] && (!can_accept() || ((get_var("bool_accept") == "both") && (query("hp/th") < 2000)) || !get_var("bool_accept"))) {
				do_quest();
				return;
			} else if (npc != wcs[1] && !can_accept()) {
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
			if (query("hp/dispel") && !get_var("bool_drunk")) {
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

function on_info(name, output, wildcards) {
	var wcs = wildcards;
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
				for (var i = 0; i < loc.length; i++) {
					if (incity(loc[i], query("npc/loc"))) tmp[tmp.length] = loc[i];
				}

				if (tmp.length < 1) {
					add_log("io_you:" + query("npc/loc") + "." + query("other/loc1") + "无法确定");
					for (var i = 0; i < loc.length; i++) {
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
				set("npc/onkill", "")
				send("hp;i;set no_teach prepare");
				add_log("io_you3:找不到" + query("npc/name") + "。");
				return;
			}

			set("askyou/idpt", ix);
			set("npc/id", npc_id[ix].toLowerCase());
			send("ask you xun about " + npc_id[ix]);
			break;
	}
}

function on_prepare(name, output, wildcards) {
	var wcs = wildcards;
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
			set("weapons/" + query("weapon/id"), 100);
			send(get_var("cmd_pre"));
			break;
		case "pe_buy":		// ^(> )*你从店小二那里买下了
			world.EnableTrigger("pe_buy", false);
			world.EnableTrigger("pe_nobuy", false);
			if (query("item/buy") == "yao from yaopu huoji") {
				send("dazuo");
				return;
			} else if (query("item/buy") == "long bow from tie jiang") {
				send("hand gong");
			} else if (query("item/buy") == "long sword from tie jiang") {
				send("wield long sword");
			} else if (query("item/buy") == "100 gangbiao from tie jiang") {
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
			send("i;score;set no_teach prepare");
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
			open_timer1(1, "busy", "tuna " + get_var("num_tuna"));
			break;
	}
}
function on_drunk() {
	set("lastdrunk", (new Date()).getTime())
}
function CmdDrink() {
	let drunked = (new Date()).getTime() - query("lastdrunk")
	return (get_var("bool_drunk") && drunked > 60000) ? "drink zui xunfeng;drink zui xunfeng" : "drink shui dai"
}

function on_hp(name, output, wildcards) {
	var wcs = wildcards;
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
			if (query("other/touch") && (query("hp/jingli") > get_var("min_jingli")) && (query("hp/neili") < get_var("min_neili"))) send("mtc;#q");
			break;
		case "hp_3":	// ^【 食 物 】(.*)/(.*)【 潜 能 】(.*)$
			set("hp/food", (wcs[0] - 0));
			set("hp/pot", (wcs[2] - 0));

			var le = world.GetLinesInBufferCount();
			var st = world.GetLineInfo(le, 11);
			if (world.GetStyleInfo(le, st, 14) == world.boldcolour(6))
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
				send("halt;eat gan liang;" + CmdDrink() + ";#q");
			} else {
				if (query("hp/food") < 210)
					add_room_cmd("eat gan liang");

				if (query("hp/water") < 210)
					add_room_cmd(CmdDrink());
			}

			if (query("hp/qi") < query("hp/max_qi") - 30)
				add_room_cmd("yun recover");

			if (query("hp/jing") < query("hp/max_jing") - 30)
				add_room_cmd("yun regenerate");

			if (query("hp/eff_jing") < 70)
				send("mdan0;#q");
			break;
		case "hpm_1":	// ^【精力上限】(.*)【内力上限】(.*)
			set("hp/limit_jingli", (wcs[0] - 0));
			set("hp/limit_neilili", (wcs[1] - 0));
			var nn = query("hp/limit_neilili") - query("hp/max_neili")
			world.note("内力差上限:" + nn + "；需要吃露" + nn / 180);
			break;
		case "hpm_2":	// ^【潜能上限】(.*)【体会上限】(.*)
			set("hp/limit_pot", (wcs[0] - 0));
			set("hp/limit_th", (wcs[1] - 0));
			break;
	}
}
function on_allitem(name, output, wildcards) {
	var wcs = wildcards;
	var num = number(wcs[2]);
	if (num == 0) num = 1;
	if (wcs[4].toLowerCase() == "xun zhang")
		add_room_cmd("use xun zhang");
	else if ((wcs[4].toLowerCase() == "jiuyin zhenjing3") && num > 1)
		add_room_cmd("drop jiuyin zhenjing3");
	else
		set("allitem/" + wcs[4].toLowerCase(), num)

}
function on_item(name, output, wildcards) {
	var wcs = wildcards;
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
			set("item/jiuping", 0);
			set("item/gift", "null");
			set("item/cash", 0);
			set("item/9hua", 0);
			set("item/gangbiao", 0);
			set("item/sell", "null");
			set("item/qlkey", 0);
			set("allitem", {})
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
			} else if (output.indexOf("黄金") != -1) {
				var my = query("item/money") - 0;
				my += num * 100;
				set("item/money", my);
				set("item/gold", num);
			} else if (output.indexOf("一千两银票") != -1)
				set("item/cash", num);
			else if (output.indexOf("牛皮水袋") != -1)
				set("item/shuidai", num);
			else if (output.indexOf("醉熏风") != -1)
				set("item/jiuping", num);
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
				if (num > 999) send("drop 100 yufeng zhen;hand yufeng zhen");
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
			if (output.indexOf("记忆水晶") != -1) {
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

function on_global(name, output, wildcards) {
	var wcs = wildcards;
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
			else if (wcs[0] == "doctor") {
				send(get_var("cmd_wait"));
				open_timer1(10, "busy", "halt;hp;i;score;set no_teach prepare");
			}
			else if (wcs[0] == "lianxi") {
				send(get_var("cmd_wait"));
				open_timer1(1, "busy", "halt;hp;i;score;set no_teach prepare");
			}
			else if (wcs[0] == "go tl") {
				set("room/id", -1);
				goto(query("nextstep/loc"));
			}
			else if (wcs[0] == "wait letter") {
				do_wait();
			}
			else if (wcs[0] == "study") {
				set("other/touch", true);
				if (query("quest/flag") == "null") return;
				if (query("room/id") != get_var("loc_study")) {
					send("halt");
					set("nextstep/flag", "COMMANDS");
					set("nextstep/cmds", "#t+ pe_study;#t+ skfull;hp;set no_teach study");
					tl = get_var("loc_study");
					goto(tl);
					return;
				}
				var pot = query("hp/pot") - 0;
				if ((pot < get_var("min_pot") && query("hp/neili") < get_var("min_neili")) || pot < 100) {
					world.EnableTrigger("pe_study", false);
					world.EnableTrigger("skfull", false);
					send("halt;yun regenerate;hp;set no_teach prepare");
					return;
				}

				if (query("hp/jing") < 45 && query("hp/neili") < 30 && can_sleep()) {
					world.EnableTrigger("pe_study", false);
					world.EnableTrigger("skfull", false);
					send("halt;yun regenerate;hp;set no_teach prepare");
					return;
				}
				//if (get_var("cmd_study") != "jingxiu")
				if (get_var("cmd_study") == "yanjiu" || get_var("cmd_study").indexOf("xue") != -1)
					send("halt;" + get_study() + ";yun regenerate;" + get_var("cmd_studying"));
				else
					send(get_study());

				if (query("hp/th") < 100 && pot < get_var("max_pot") && Math.floor(Math.random() * 10) == 0) {
					world.EnableTrigger("pe_study", false);
					world.EnableTrigger("skfull", false);
					send("halt;yun regenerate;hp;set no_teach prepare");
					return;
				} else
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
					var num = query("item/cash") - 50;
					send("cun " + num + " cash;score");
				}
				else if (query("item/cash") > 1 && get_var("list_qask") == "") {
					var num = query("item/cash");
					send("cun " + num + " cash;i;score");
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
				if (query("item/shuidai") < 1 || query("item/food") < 10 || ns == "end" || ns == "dead") {
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
			}

			else if (wcs[0] == "fill neili") {
				if (query("hp/neili") < get_var("min_neili")) {
					send("hp;dazuo " + get_var("num_dazuo"));
					world.doafter(1, "set no_teach fill neili");

				} else {
					send("halt");
					to_kill();
				}
			}
			else if (wcs[0] == "eatlu.check") {
				send("i;set no_teach eatlu.checked")
			} else if (wcs[0] == "eatlu.checked") {
				if (query("allitem/magic water", true)) {
					world.EnableTrigger("on_trc_eatlu", true)
					send("join;hp;set no_teach eatlu.eat")
				} else {
					world.EnableTrigger("on_trc_eatlu", false)
					set("trceatlu", false)
					do_prepare()
				}
			} else if (wcs[0] == "eatlu.eat") {
				BusyTest(306, "set no_teach eatlu.check")
			} else if (wcs[0] == "heal") {
				stop_all();
				var eq = query("hp/eff_qi");
				if (eq < 21) send("mdan2;hp");

				if (query("hp/dispel") && !get_var("bool_drunk")) {
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
						if (query("hp/qi") < 1) add_room_cmd("mdan2");
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
			if ((get_var("cmd_study").indexOf("xue ") != -1) && (Math.floor(Math.random() * 5) == 0)) set("other/study", (new Date()).getTime());
			break;
		case "weapon":		// ^耐久度：(.*)%
			//if (query("weapon/id") == null) set("weapon/id",get_var("id_weapon"));
			set("weapon/dur", wcs[0] - 0)
			set("weapons/" + query("weapon/id"), wcs[0] - 0);
			break;
		case "reward":		// ^通过这次锻炼，你获得了(.*)点经验、(.*)点潜能、
			var exp = number(wcs[0]);
			exp += query("quest/exp");
			set("quest/exp", exp);
			var pot = number(wcs[1]);
			pot += query("quest/pot");
			set("quest/pot", pot);
			tongji(1);
			break;
		case "touch":		// ^(> )*你觉得一股热气从丹田冉冉升起。
			set("hp/neili", query("hp/max_neili") * 1);
			set("other/touch", true);
			break;
		case "nlempty":		// ^(> )*你觉得一股热气从丹田冉冉升起。
			if (query("other/touch")) send("mtc");
			set("other/touch", false);
			break;
		case "yjlxn":		// ^(> )*(研究|学习|练习)次数.*一次，.*不能超过
			if (query("other/touch")) {
				if (wcs[1] == "练习") {
					if (query("other/n_lx") - 1 > 0)
						set("other/n_lx", query("other/n_lx") - 1);
					else
						set("other/n_lx", 0);
				} else {
					if (query("other/n_yj") - 1 > 0)
						set("other/n_yj", query("other/n_yj") - 1);
					else
						set("other/n_yj", 0);
				}
				set("other/touch", false);
				send("mtc");
			}
			break;
		case "yjlxs":		// ^^(> )*(当前|本日)活动：多倍(LIANXI|YANJIU)上限
			if (wcs[2] == "LIANXI")
				set("other/n_lx", 3);
			else
				set("other/n_yj", 4);
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
			if (check_in_fb()) return;
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
			world.EnableTimer("t_pfm", false);
			break;
		case "flee":		// 看来该找机会逃跑了...			
			set("room/id", -1);
			send("yun recover;yun regenerate;hp;set no_teach heal");
			break;
		case "faint1":		// ^(> )*你的眼前一黑，接著什么也不知道了....
			stop_all(true);
			world.note("晕倒地点:" + query("room/id"));
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
			set("connect/time", (new Date()).getTime());
			set("hp/faint", "null");

			if (output.indexOf("连线进入") != -1 && !check_in_fb()) {
				send(get_var("cmd_login"));
				//				world.note("连线进入。看看发生什么");
				send(get_var("cmd_pre"));
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

			var ttimer1 = (new Date()).getTime();
			ttimer1 = (ttimer1 - query("connect/time")) / 1000;
			ttimer1 = 31 - ttimer1;
			if (ttimer1 < 2)
				ttimer1 = 2;
			world.note("等待" + ttimer1 + "秒后重连");
			open_timer1(ttimer1, "con_delay", null);
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
					send("#t+ level;skills1;hp;hp -m;i;unset map_prompt");
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
					set("npc/status", "end");
					set("npc/onkill", "")
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
						var wl = world.GetworldList();
						for (i = 0; i < wl.length; i++)
							nl += wl[i] + ", ";

						send(nl);
					} else if (cot[2] == null || cot[2] == "") {
						send("命令格式无效！");
					} else if (cot[2] == "#con") {
						var wd = world.getworld(cot[1]);
						wd.connect();
					} else {
						var wd = world.getworld(cot[1]);
						wd.send(cot[2]);
					}
					break;
				default:
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
		case "deposit":
			var deposit = wcs[0] - 0
			set("deposit", deposit)
			break
	}
}
function CmdDispel() {
	if (get_var("bool_drunk"))
		return "";
	var tt = "yun dispel";
	if (query("allitem/jiedu wan", true) && (query("hp/neili") > query("hp/max_neili") * 0.8))
		tt = "eat jiedu wan;" + tt;
	if (query("allitem/tianxin dan", true) && (query("hp/neili") > query("hp/max_neili") * 0.8))
		tt = "eat tianxin dan;" + tt;
	return tt;
}
function on_dispel(name, output, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "yd_dispel":	// ^(> )*(忽然浑身一阵剧痛，你中的化骨绵掌毒发了！|忽然你觉得四肢百赅是似乎有无......
			if (query("hp/exp") < 101000 || get_var("bool_drunk"))
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
			var room = get_var("loc_dispel")
			if (!room) {
				room = query("room/chat")
			}
			var fg = query("dispel/flag");
			if (fg == "end" || fg == "") {
				if (query("room/id") == room) {
					send("#tg+ gyd;#set dispel/flag dan;dazuo")
				} else {
					set("nextstep/cmds", "#tg+ gyd;#set dispel/flag dan;dazuo");
					set("nextstep/flag", "COMMANDS");
					goto(room);
				}
			} else if (fg == "yd") {
				set("dispel/flag", "dan");
			}
			break;
		case "yd_ok1":	// ^结果你没发现自己有任何异常。$
			//保护人质
			//open_timer1(2, "busy", "hp;i;set no_teach prepare");


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
				case "":
				case "end":
					var room = get_var("loc_dispel")
					if (room) {
						if (query("room/id") == room) {
							send("#tg+ gyd;#set dispel/flag dan;dazuo")
						} else {
							set("nextstep/cmds", "#tg+ gyd;#set dispel/flag dan;dazuo");
							set("nextstep/flag", "COMMANDS");
							goto(room);
						}
					}
					break
				case "yd":
					set("dispel/flag", "yd");
					send(CmdDispel() + ";dazuo");
					break;
				case "dan":
					set("dispel/flag", "ydr");
					send("mdan3;dazuo");
					break;
				case "ydr":
					set("dispel/flag", "dazuo1");
					send("yun recover;yun regenerate;hp;" + CmdDispel() + ";dazuo");
					break;
				case "dazuo1":
					if (query("room/id") == query("room/chat")) {
						set("dispel/flag", "inchat");
						send("special yuan;yun recover;yun regenerate;hp;" + CmdDispel() + ";dazuo");
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
								send("yun recover;yun regenerate;mdan2;dazuo");
							else
								send("yun recover;yun regenerate;yun inspire;mdan0;dazuo");

							set("dispel/count1", ct1 + 1);
						} else if (eq > 30 && ej > 30) {
							send("yun recover;yun regenerate;mdan2;mdan4;dazuo");
						} else {
							set("connect/auto", false);
							ydispel(false);
							telldm("dispel");
							NotifyDM("dispel fail")
							world.Disconnect();
							return;
						}
					} else if (eq < 65)
						send("yun recover;yun regenerate;yun heal;dazuo");
					else
						send("yun recover;yun regenerate;" + CmdDispel() + ";dazuo");
					break;
				case "inchat":
					ydispel(false);
					break;
			}
			break;
	}
}

function on_heal(name, output, wildcards) {
	var wcs = wildcards;
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

function on_timer(name) {
	switch (name) {
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
			updateHUD();
			if (query("quest/flag") == "null") return;

			if (query("timer/idle")) {
				if (query("hp/dispel")) {
					ydispel(true);
					return;
				}

				telldm("idle");

				set("room/id", -1);
				set("npc/find", 0);
				set("npc/coor", -1);
				set("quest/letter", false);
				world.SetVariable("name_npc", "aa");
				send("hp;i;set no_teach prepare");

				return;
			}

			set("timer/idle", true);
			break;
		case "t_con":
			autoconnect();
		case "t_heartbeat":
			if (get_var("cmd_heartbeat") != null && get_var("cmd_heartbeat") != "")
				add_room_cmd(get_var("cmd_heartbeat"));
			break;
	}
}

function on_alias(name, line, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "start0":
			tongji(0);
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

			StopMods();
			set("room/id", -1);
			set("stab/flag", true);
			set("stab/miss", true);
			set("hp/faint", "null");
			set("quest/flag", "kill");
			set("other/n_yj", 4);
			set("other/study", 1);
			set("other/n_lx", 3);
			world.EnableTrigger("ga", true);
			send(get_var("cmd_pre"))
			send("#t+ level;skills1;hp;hp -m;i;set wimpy 0;unset keep_idle");
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
			world.EnableTimer("t_kmg", false);
			world.EnableTriggerGroup("on_npc", false);
			world.EnableTrigger("step", false);
			world.EnableTrigger("ga", false);
			//world.EnableTrigger("setting", false);
			break;
		case "goto":
			goto(wcs[0]);
			break;
		case "radar":
			PrintRadar();
			break;
		case "kill":
			var npc = wcs[0];
			var loc = wcs[1];
			set("askyou/count", 0);
			set("npc/wd", -1);
			set("npc/find", 0);
			set("npc/coor", -1);
			set("npc/status", "start");
			set("npc/onkill", "")
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

		case "todo":
			var time = wcs[0] - 0;
			var todo_cmd = wcs[1];
			if (time > 0) {
				set("other/todo", time);
				set("other/todo_cmd", todo_cmd);
			} else {
				set("other/todo", -1);
				set("other/todo_cmd", "");
			}

			break;
		case "setvar":
			var varname = wcs[0]
			var varvalue = wcs[1]
			if (varname) {
				world.SetVariable(varname, varvalue ? varvalue : "");
				world.note("设置游戏设置变量:" + varname + "为" + varvalue);
			}
			break
		case "set":
			var varname = wcs[0]
			var varvalue = wcs[1]
			if (varname) {
				set(varname, varvalue ? varvalue : "");
				world.note("设置游戏data变量:" + varname + "为" + varvalue);
			}
			break
		case "unsetvar":
			var varname = wcs[0]
			if (varname) {
				world.SetVariable(varname, "");
			}
			break
		case "cmd":
			var cmdname = wcs[0]
			if (cmdname) {
				send(GetCmd(cmdname))
			}
			break
		case "rcmd":
			var cmds = wcs[0]
			if (cmds) {
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
		case "exstudycmd":
			var lsc = get_var("cmd_study");
			set("other/study", 1);
			world.SetVariable("cmd_study", get_var("cmd_study2"));
			world.SetVariable("cmd_study2", lsc);

			lsc = get_var("loc_study");
			world.SetVariable("loc_study", get_var("loc_study2"));
			world.SetVariable("loc_study2", lsc);

			lsc = get_var("list_skill");
			world.SetVariable("list_skill", get_var("list_skill2"));
			world.SetVariable("list_skill2", lsc);
			world.Note("学习指令交换完毕！")
			world.Note("学习指令1:【" + get_var("cmd_study") + "】【" + get_var("loc_study") + "】【" + get_var("list_skill") + "】")
			world.Note("学习指令2:【" + get_var("cmd_study2") + "】【" + get_var("loc_study2") + "】【" + get_var("list_skill2") + "】")
			break;
		case "repeat":
			var times = wcs[0]
			var cmds = wcs[1]
			if (isNaN(times)) {
				world.Note("次数" + times + "无效")
				return
			}
			var num = times - 0
			if (num <= 0 || num > 99) {
				world.Note("次数应该在0-99之间")
				return
			}
			for (var i = 0; i < num; i++) {
				send(cmds)
			}
			break
		case "stab":
			stop_all();
			set("stab/index", 0);
			set("stab/miss", false);
			send("hp;i;set no_teach prepare");
			break
		case "dis":
			set("connect/auto", false);
			set("connect/cmds", "");
			world.Disconnect();
			break
		case "protect":
		case "protect1":
			var npc = wcs[0];
			closed_protect();
			set("protect/step", 1);
			var loc, npcid;
			if (npc != "this")
				set("protect/name", npc);
			jishi("接受任务保护" + query("protect/name"));
			//set("protect/atime",(new Date()).getTime());		
			go_protect();
			break;
		case "con":
			set("connect/auto", true);
			world.Disconnect();
			autoconnect();
			break;
	}
}

function on_pk(name, output, wildcards) {
	var wcs = wildcards;
	switch (name) {
		case "pk_xkd":		// ^(> )*(看起来张三想杀死你！|张三轻吐一口气，掌力袭来，震得你|李四轻吐一口气，掌力袭来，震得你|看起来李四想杀死你！)
			var cmd = get_var("id") + ";" + get_var("passw")
				+ ";y;quit";
			reconnect(cmd);
			break;
		case "pk_hit":		// ^(> )*(.*)对著你大喝一声：看招！
		case "pk_guard":		// ^(> )*(.*)(一声怒吼，冲上前去，看来是要和你拼命。|一言不发，对你发动了攻击
		case "pk_kill":		// ^(> )*如果你要和(.*)性命相搏，请你也对这个人\((.*)\)下一次 kill 指令。
			//var cmd = get_var("id") + ";" + get_var("passw") 
			//	+ ";y;id here;quit";
			send(perform());
			send("chat* sl");
			add_log(output);
			//reconnect(cmd);
			break;
	}
}
function do_continue() {
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

function CmdMpf() {
	var str = get_var("cmd_backstab")
	return str ? str : "mpf"
}
function CmdMjq() {
	var str = get_var("cmd_jiqu")
	return str ? str : "mjq"
}

//--------------------------------------------------------------------------------
function on_trc_eatlu(name, output, wildcards) {
	send("eat magic water;hp;hp -m;i")
	world.EnableTrigger("on_trc_eatlu", false)
}

function BusyTest(loc, cmds) {
	world.EnableTriggerGroup("busytest", true)
	set("nextstep/loc", loc)
	set("nextstep/flag", "COMMANDS");
	set("nextstep/cmds", cmds);
	send("enchase bao")
}
function on_busy_test_busy(name, output, wildcards) {
	world.Note("busy")
	world.DoAfterSpecial(0.5, 'send("enchase bao")', 12);
}
function on_busy_test_nobusy(name, output, wildcards) {
	world.EnableTriggerGroup("busytest", false)
	goto(query("nextstep/loc"))
}
world.EnableTriggerGroup("busytest", false)

function EatLu() {
	set("trceatlu", true)
	do_prepare()
}

//-------------------------

function on_jubaoxiang(name, output, wildcards) {
	var wcs = wildcards;
	set("xiang", {
		"_used": wcs[0] - 0,
		"_max": wcs[1] - 0,
	})
	if (wcs[0] > 0) {
		world.EnableTrigger("jubaoxiang_start", true);
	}
}


function on_jubaoxiang_item(name, output, wildcards) {
	var wcs = wildcards;
	set("xiang/" + wcs[1], wcs[2] - 0)
}

function on_jubaoxiang_start(name, output, wildcards) {
	world.EnableTrigger("jubaoxiang_start", false);
	world.EnableTrigger("jubaoxiang_end", true);
	world.EnableTrigger("jubaoxiang_item", true);

}
function on_jubaoxiang_end(name, output, wildcards) {
	world.EnableTrigger("jubaoxiang_end", false);
	world.EnableTrigger("jubaoxiang_item", false);
}