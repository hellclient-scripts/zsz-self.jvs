// 用于根据正方形迷宫地图获取路径。
function MyMaze(dp)  
{
	this.data = new Array(dp*dp);
	this.flag = new Array(dp*dp);
	this.start = 0;
	this.cloc = 0;
	this.end = 0;
	this.clock = 0;
	this.size = dp;
	this.length = dp*dp;

	this.init = function() {
		this.clock = 0;
		for (var i=0; i<this.length; i++) {
			this.data[i] = "";
			this.flag[i] = 0;
		}
		return;
	};

	this.addexit = function(dex, dir) {
		if (dex < 0 || dex >= this.length) return m_FAIL;

		if (this.data[dex] == null) this.data[dex] = "";
		this.data[dex] += dir;
		return "OK";
	};

	this.exitid = function(dex, dir) {
		var nex = -1;
		if (dir == "e") nex = dex + 1;
		else if (dir == "s") nex = dex + this.size;
		else if (dir == "w") nex = dex - 1;
		else if (dir == "n") nex = dex - this.size;
		if (nex >= this.length) nex = -1;
		return nex;
	};

	this.search = function() {
		var pot, dex, nex, dir, open, exts, path, fag, cot;

		pot = 0;
		cot = 1;
		path = "";
		this.clock ++;
		open = new Array;
		exts = new Array;
		this.flag[this.cloc] = this.clock;
		open[open.length] = this.cloc;
		exts[exts.length] = this.data[this.cloc];
		while (1) {
			if (cot >= this.length) return path;

			fag = 0;
			dex = open[pot];
			for (var i=0; i<exts[pot].length; i++) {
				dir = exts[pot].charAt(i);
				nex = this.exitid(dex, dir);
				if (nex == -1) continue;
				if (this.flag[nex] == this.clock) continue;

				if (path == "") path = dir;
				else path += ";" + dir;

				exts[pot] = exts[pot].replace(dir, "");
				pot = open.length;

				this.flag[nex] = this.clock;
				open[open.length] = nex;
				exts[exts.length] = this.data[nex];
				fag = 1;
				cot ++;
				break;
			}

			if (fag == 0) {
				if (exts[pot] == "") return path;
				dir = exts[pot].charAt(0);
				nex = this.exitid(open[pot], dir);	

				if (path == "") path = dir;
				else path += ";" + dir;

				exts[pot] = exts[pot].replace(dir, "");

				for (var i=pot; i>=0; i--) {
					if (open[i] == nex) {
						pot = i;
						fag = 1;
						break;
					}
				}

				if (fag == 0) return path;
			}
		}		
	};

	this.goto = function(loc) {
		var pot, dex, nex, dir, open, path, pat;
		if (this.cloc == loc) return "";

		pot = 0;
		this.clock ++;
		open = new Array;
		path = new Array;
		this.flag[this.cloc] = this.clock;
		open[open.length] = this.cloc;
		path[path.length] = "";
		while (1) {
			if (pot >= open.length) return m_FAIL;

			dex = open[pot];
			for (var i=0; i<this.data[dex].length; i++) {
				dir = this.data[dex].charAt(i);
				nex = this.exitid(dex, dir);
				if (nex == -1) continue;
				if (this.flag[nex] == this.clock) continue;

				if (path[pot] == "") pat = dir;
				else pat = path[pot] + ";" + dir;

				if (nex == loc) return pat;
				this.flag[nex] = this.clock;
				open[open.length] = nex;
				path[path.length] = pat;				
			}

			pot ++;	
		}
	};
}

function on_fuben(name, output, wildcards)
{
	var wcs = wildcards;
	switch (name) {
		case "fb_enterbusy":   //你还需要等0才能进入秦始皇陵墓副本。|为了降低游戏CPU负担，游戏副本的创建必须每隔2分钟一次。		
			open_timer1(1, "busy", "unride;enter door");
			break;
		case "fb_goodluck":   //祝你好运气			
			enter_fuben();	
			break;
		case "fb_gift":	//^[> ]*当(.*)一声，一(只|个|块|粒|根|颗|枚|锭|片|束|些|份|本)(.*)从天而降，掉落在你面前。
			add_log(output);
			break;
		case "fb_out":	// ^[> ]*(一阵时空的扭曲将你传送到另一个地方|虚空$)
			out_fuben();
			break;
	}	
}
function enter_fuben()
{
	set("fuben/type","");
	set("fuben/infb",true);
	world.EnableTriggerGroup("gfb_enter",true);
	world.EnableTriggerGroup("gfb_gl",true);
}
function out_fuben()
{
	stop_all();
	close_fb();
	set("room/id",-1);
	set("weapon/id",get_var("id_weapon"));
	send("halt;"+get_var("cmd_pre")+";l " + get_var("id_weapon") + " of me;mtc;i;hp;set no_teach prepare");
}	
function close_fb()
{
	set("fuben/infb",false);
	world.EnableTriggerGroup("gfb_enter", 0);
	world.EnableTriggerGroup("gfb_gl", 0);
	
	if (query("fuben/type") == "qinling")
		set_qinling(0);
	set("fuben/type","");	
}	

function check_in_fb(){
    return query("fuben/infb");
}