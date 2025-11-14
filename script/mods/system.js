function addtri(triname,trimatch,trigroup,triscript,triflag)
{
	if (triflag==null)
 		triflag=1064;
	else 
		triflag+=1064;
	trirerurnvalue=AddTriggerEx(triname, trimatch, "", triflag, -1, 0, "",  triscript, 0, 100)
	SetTriggerOption(triname,"group",trigroup)
	return trirerurnvalue
}

function removetri(trigroup)
{
    return world.DeleteTriggerGroup(trigroup);
}

function removetimer(timer)
{
    return world.DeleteTimerGroup(timer);	
}

function inittriggers(flag)
{
	if (flag == "protect") {
		//删除保护任务触发器
		removetri("ptj");
		removetri("ptj0");
		removetri("ptj1");
		removetri("ptj2");
		removetri("ptj_c");
		//set("protect/ready",false);
	}
	if (flag=="lgt") {
		//lgt
		removetri("glgt"); 	
		//set("lgt/ready",false);
	}
	
	if (flag=="qinling") {		
		removetri("gql"); 	
		removetri("gql_map"); 
		removetri("gql222"); 	
	}	
/*	if (get_var("default_task")!="cajob") {
		//cajob
		removetri("gca");
		removetri("gca1");
	}
	if (get_var("default_task")!="dilao1" && get_var("default_task")!="dilao2") {
		//dilao
		removetri("gdl");
		removetri("gdl1");
		removetri("gdl_map");
		removetri("gtj_map");	
		removetimer("timer_dl");
	}
	if (get_var("default_task")!="funquest") {
		//funquest
		removetri("gfq");
	}
	if (flag!="lgt" && flag!="mquest")
		//lgt
		removetri("glgt");   
	if (get_var("default_task")!="xuemo") {
		//删除保护任务触发器
		removetri("gxm");
		removetri("gxm1");
		removetri("gxm2");
		removetri("gget");
		removetri("gxm3");
	}
*/	
}
/*
function getnpcfromname(name)
{
	if (npc_list[name] == null) {
		var str = "getnpcfromname：" + name + "是无效的人物。"; 
		world.note(str);
		addlog(str);
		return false;
	}

	var id = npc_list[name]["id"];
	var loc = npc_list[name]["loc"];
	set("npc/name", name);
	set("npc/id", id);
	set("npc/loc", loc);
	world.SetVariable("name_npc", name);
	return true;
}

function ischinese(s){
    var ret=true;
    for(var i=0;i<s.length;i++)
    ret=ret && (s.charCodeAt(i)>=10000);
    return ret;
}
*/
function getnpclocfromname(name)
{
	return protect_npcs[name]["loc"];
}

function getnpclocfromid(id)
{
	var lt=-1;
	Object.keys(protect_npcs).forEach(function(key)
	{
		if (protect_npcs[key]["id"]==id)
			lt = protect_npcs[key]["loc"]-0;
	})
	return lt;
}
/*


function randomexit(exts)
{
	var re = new RegExp("[^;|,:]+", "g"); 
	//world.note(exts);
	var lt = exts.match(re);
	var ix = Math.floor(Math.random() * lt.length);
	return lt[ix];
}
*/