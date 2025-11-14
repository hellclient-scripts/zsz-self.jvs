SetHUDSize(5)
function updateHUD(){
    let line = JSON.parse(NewLine())
    let line2 = JSON.parse(NewLine())
    let line3 = JSON.parse(NewLine())
    let line4 = JSON.parse(NewLine())
    let line5 = JSON.parse(NewLine())	
	var time_now = new Date().getTime();
    let word = JSON.parse(NewWord("角色状态 "))
	var color1 = "";
	var str1 = '';

	//第一行
	var str='';
	str = str + "【精气】" + (query("hp/jing")+'').padStart(7,' ')  +"/"+(query("hp/max_jing")+'').padStart(7,' ')+"【"+(query("hp/eff_jing")+'').padStart(3,' ')+"%】|";
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/jing"),query("hp/max_jing"));
    word.Color = status_color(query("hp/jing"),query("hp/max_jing"));
    line.Words.push(word)
	
	str='';
	str = str + "【精力】" + (query("hp/jingli")+'').padStart(9,' ')  +"/"+(query("hp/max_jingli")+'').padStart(9,' ');	
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/jingli"),query("hp/max_jingli"));
    word.Color = status_color(query("hp/jingli"),query("hp/max_jingli"));
    line.Words.push(word)

 
	//第二行
	str='';
	str = str + "【气血】" + (query("hp/qi")+'').padStart(7,' ')  +"/"+(query("hp/max_qi")+'').padStart(7,' ')+"【"+(query("hp/eff_qi")+'').padStart(3,' ')+"%】|";
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/qi"),query("hp/max_qi"));
    word.Color = status_color(query("hp/qi"),query("hp/max_qi"));
    line2.Words.push(word)		
	
	
	str='';
	str = str + "【内力】" + (query("hp/neili")+'').padStart(9,' ')  +"/"+(query("hp/max_neili")+'').padStart(9,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/neili"),query("hp/max_neili"));
    word.Color = status_color(query("hp/neili"),query("hp/max_neili"));
    line2.Words.push(word)		
	

	
	
	//第三行
    str=''
	str = str + "【食物】" + (query("hp/food")+'').padStart(21,' ')  +"  |";

	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/food"),1000);
    word.Color = status_color(query("hp/food"),1000);	
	line3.Words.push(word)
	str=''
	str = str + "【潜能】" + (query("hp/pot")+'').padStart(9,' ')  +"/"+(get_var("max_pot")+'').padStart(9,' ');	
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(get_var("max_pot")-query("hp/pot"),get_var("max_pot"));
    word.Color = status_color(get_var("max_pot")-query("hp/pot"),get_var("max_pot"));	
	line3.Words.push(word)
	
	//第四行
    str=''
	str = str + "【饮水】" + (query("hp/water")+'').padStart(21,' ')  +"  |";
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("hp/water"),1000);
    word.Color = status_color(query("hp/water"),1000);	
	line4.Words.push(word)
	str=''	
	
	str = str + "【经验】" + (query("hp/exp")+'').padStart(9,' ')   +"/"+(get_var("max_exp")+'').padStart(9,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(get_var("max_exp")-query("hp/exp"),get_var("max_exp"));
    word.Color = status_color(get_var("max_exp")-query("hp/exp"),get_var("max_exp"));	
    line4.Words.push(word)

	//第五行
    
	str=''
	str = str + "【黄金】" + (query("item/gold")+'').padStart(7,' ')  +"/"+(query("deposit")+'').padStart(7,' ');
	str = (str+'').padEnd(27,' ')+"|";
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(query("deposit"),10000);
    word.Color = status_color(query("deposit"),10000);	
    line5.Words.push(word)
	
	str=''
	str = str + "【体会】" + (query("hp/th")+'').padStart(9,' ')+"/"+(get_var("max_th")+'').padStart(9,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = status_bold(get_var("max_th")-query("hp/th"),get_var("max_th"));
    word.Color = status_color(get_var("max_th")-query("hp/th"),get_var("max_th"));	
    line5.Words.push(word)	
	
	//列分割符
	str = '|';
	word = JSON.parse(NewWord(str))	
    word.Bold = true
    word.Color = 'Cyan'
    line.Words.push(word)
	line2.Words.push(word)
	line3.Words.push(word)
	line4.Words.push(word)
	line5.Words.push(word)	
	//第二列	
	str = "【ID:" + get_var("id") + "】 "
	str = (str+'').padEnd(15,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = true
    word.Color = 'Cyan'
    line.Words.push(word)
	
	str = ''
	str += "【任务状态:"+query("quest/flag")+"】";
	str = (str+'').padEnd(10,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = true
	if (query("quest/flag")!= "kill")
		word.Color = 'Red'
	else 
		word.Color = 'Cyan'
    line.Words.push(word)	


	
	//二列3行 闲置时间
	var lastk=query("npc/busystart");
	var num_lk =(time_now-lastk)/1000;		
	str = "【距离上次干npc:" + num_lk+"秒】";
	str = str.substring(0,30);
	str = (str+'').padEnd(26,' ');
	word = JSON.parse(NewWord(str))	
    word.Bold = true
    if (num_lk> 60 && query("quest/flag")== "kill")
		word.Color = 'Red'
	else if (num_lk> 30 && query("quest/flag")== "kill")
		word.Color = 'Yellow'
	else
		word.Color = 'Cyan'
    line2.Words.push(word)

	//二列四行:学习状态
	str = ''	
	if (!can_study()) {
		str += "----学习1已完成，请及时调整学习策略---";
		color1 = 'Red'
	}
	else {
		str += "【学习:"+get_var("list_skill");
		color1 = 'Cyan'
	}
	str = str.substring(0,28);
	str = (str+'').padEnd(28,' ');	 
	str += "】";		
	word = JSON.parse(NewWord(str))
	word.Bold = true
	word.Color = color1
	line3.Words.push(word)
	//二列五行:todo
	str = '【任务:'
	color1 = 'Cyan'
/*	if (query("other/todo")>= 0)
	{
		str += query("other/todo")+"分钟后需做:"+query("other/todo_cmd")+"】";
		if (query("other/todo")== 0 )
			color1 = 'Red'
	}
*/	str += get_var("list_boss");
	str = (str+'').padEnd(28,' ');
	str = str.substring(0,28);
	str += "】";

	
	
	word = JSON.parse(NewWord(str))	
    word.Bold = true
	word.color = color1;
	line4.Words.push(word)
	
	//二列5行:npc状态  字符串长度问题，经常对不齐，放在最下面
	str = ''
	str += "【npc:" + query("npc/name") + "】, loc:" + query("npc/loc");
	if (query("npc/loc") == "很远") {
		var fx = query("quest/far");
		str += ", 当前" + fx + ":" + far_list[fx];
	}
	str = str.substring(0,30);
	str = (str+'').padEnd(28,' ');
	
	word = JSON.parse(NewWord(str))	
    word.Bold = true
	word.Color = 'Cyan'
	line5.Words.push(word)	
	//列分割符
	str = '|';
	word = JSON.parse(NewWord(str))	
    word.Bold = true
    word.Color = 'Cyan'
    line.Words.push(word)
	line2.Words.push(word)
	line3.Words.push(word)
	line4.Words.push(word)
	line5.Words.push(word)
//最后一列
	if (query("quest/flag") != "kill" && num_lk > 10000) {
	
		str = "  ∩ ∩"
		str = (str+'').padEnd(15,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
	//    word.Color = 'Cyan'
		line.Words.push(word)

		str = " (▪.▪)"
		str = (str+'').padEnd(15,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
	//    word.Color = 'Cyan'
		line2.Words.push(word)		

		str = " ┖█┓"
		str = (str+'').padEnd(15,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
	//    word.Color = 'Cyan'
		line3.Words.push(word)		

		str = "  ┛┕"
		str = (str+'').padEnd(15,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
	//    word.Color = 'Cyan'
		line4.Words.push(word)
		
		str = "2024年1月12日"
		str = (str+'').padEnd(15,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
	//    word.Color = 'Cyan'
		line5.Words.push(word)		
	}
	else {	
		str = ''
		str += "【完成:"
		str1 = query("quest/count")+"】【累完:"+'';			
		str += str1.padStart(8,' ');	
		str1 = query("stat/count")+"】【经:"+'';		
		str += str1.padStart(12,' ');	
		str1 = query("quest/exp")+"】【潜:"+'';		
		str += str1.padStart(12,' ');
		str1 = query("quest/pot")+ "】"+'';	
		str += str1.padStart(12,' ');
		//str = (str+'').padEnd(35,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
		word.color = 'Cyan';
		line.Words.push(word)
		
		str = ''
		str += "【时:"
		str1 = query("stat/minute") + "分】【效率:"+'';	
		str += str1.padStart(9,' ');	
		str1 = query("stat/eff")+"/时】【验:"+'';		
		str += str1.padStart(11,' ');	
		str1 = query("stat/eff_exp")+"/时】【能:"+'';		
		str += str1.padStart(10,' ');
		str1 = query("stat/eff_pot")+"/时】"+'';	
		str += str1.padStart(10,' ');
		//str = (str+'').padEnd(35,' ');
		word = JSON.parse(NewWord(str))	
		word.Bold = true
		word.color = 'Cyan';
		line2.Words.push(word)	
		if (query("lgt/flag")) {
			str = ''
			str += "【爬塔:"+(query("lgt/floor")+' ').padStart(8,' ')+"】";
			str += "【符文"+(query("lgt/charm")+' ').padStart(10,' ')+"】";
			//str += "【npc"+(query("lgt/npc")+' ').padStart(10,' ')+"】";
		
			word = JSON.parse(NewWord(str))	
			word.Bold = true
			word.color = 'Green';
			line3.Words.push(word)	
			str = ''
			str += "【囚徒"+(query("lgt/npc")+' ').padStart(35,' ')+"】";
		
			word = JSON.parse(NewWord(str))	
			word.Bold = true
			word.color = 'Green';
			line4.Words.push(word)			
		} 
		else {
			str = ''
			str += "【保护:"+(query("protect/name")+' ').padStart(8,' ')+"】";
			if (get_var("list_boss").indexOf("qinling") != -1) {
				str = '';
				str = ql_report();			
			} else
			if (get_var("list_boss").indexOf("protect") != -1)
			{
				str += "【经验"+(query("protect/exp")+' ').padStart(10,' ')+"】";
				str += "【潜能"+(query("protect/pot")+' ').padStart(10,' ')+"】";
			}		
			word = JSON.parse(NewWord(str))	
			word.Bold = true
			word.color = 'Cyan';
			line3.Words.push(word)	
			
			str = ''
			if (get_var("list_boss").indexOf("protect") != -1)
			{
				str += "【数量:"+(query("protect/count")+' ').padStart(4,' ')+"】";
				str += "【量率:"+(query("protect/eff")+' ').padStart(3,' ')+"/时】";
				str += "【经率:"+(query("protect/eff_exp")+' ').padStart(5,' ')+"/时】";	
				str += "【潜率:"+(query("protect/eff_pot")+' ').padStart(5,' ')+"/时】";	
			}		
			word = JSON.parse(NewWord(str))	
			word.Bold = true
			word.color = 'Cyan';
			line4.Words.push(word)	
			
			str = ''
			var busyeff=query("stat/busyeff")
			if (busyeff && get_var("bool_showbusy")){
				str +="【平均 busy:"+busyeff.toFixed(2)
			}
			if (!get_var("bool_nohelp") && query("stat/count")){
				var rate=query("stat/helped")*100/query("stat/count")
				str += "】【线报率:"+rate.toFixed(2)+"%】"; 
			}
			word = JSON.parse(NewWord(str))	
			word.Bold = true
			word.color = 'Cyan';
			line5.Words.push(word)	
		}
	}
/*	str = ''
	str += "【用时:" + query("stat/minute") + "分】";
	str += "效率:"+query("stat/eff")+"/时】";		
	str += "经率:"+query("stat/eff_exp")+"/时】";
	str += "潜率:"+query("stat/eff_pot")+"/时】";		 
	word = JSON.parse(NewWord(str))	
    word.Bold = true
	word.color1 = 'Cyan';
	line2.Words.push(word)
*/
	
    UpdateHUD(0, JSON.stringify([line,line2,line3,line4,line5]))

    let summaryline=JSON.parse(NewLine());
    let summaryline2=JSON.parse(NewLine());

    word = JSON.parse(NewWord("速:"))
    summaryline.Words.push(word)
    word = JSON.parse(NewWord(''+query("stat/eff")))
    //word.Color='Green'
	word.Color = status_color(query("stat/eff"),300);	
    word.Bold=true
    summaryline.Words.push(word)
    word = JSON.parse(NewWord(" 闲:"))
    summaryline.Words.push(word)
    word = JSON.parse(NewWord(''+num_lk))
	word.Color = status_color(120-num_lk,120);	
    //word.Color='Green'
    word.Bold=true
    summaryline.Words.push(word)
    word = JSON.parse(NewWord(" 金:"))
    summaryline.Words.push(word)
    word = JSON.parse(NewWord(''+query("deposit")))
   // word.Color='Green'
	word.Color = status_color(query("deposit"),10000);		
    word.Bold=true
    summaryline.Words.push(word)
	

	word = JSON.parse(NewWord("学:"))
    summaryline2.Words.push(word)	
	if (!can_study()) {
		str = "----学习1已完成---";
		color1 = 'Red'
	}
	else {
		str = get_var("list_skill");
		color1 = 'Cyan'
	}	
	str = str.substring(0,30);
	   
	word = JSON.parse(NewWord(str))
	word.Bold = true
	word.Color = color1
	summaryline2.Words.push(word)
	
    SetSummary(JSON.stringify([summaryline,summaryline2]))

}
function status_bold(current,max)
{
        return true;
		var percent;
 
        if (max>0 ) percent = current * 100 / max;
        else percent = 100;
        if (percent > 100) return true;
        if (percent >= 90) return true;
        if (percent >= 60) return true;
        if (percent >= 30) return false;
        if (percent >= 10) return true;
        return false;
}
function status_color(current,max)
{
        var percent;
        if (max>0 ) percent = current * 100 / max;
        else percent = 100;
        if (percent > 100) return 'Cyan';
        if (percent >= 80) return 'Green';
        if (percent >= 60) return 'Yellow';
        if (percent >= 40) return 'Yellow';
        if (percent >= 20) return 'Magenta';
        return 'Red'; 
/*        if (max>0 ) percent = current * 100 / max;
        else percent = 100;
        if (percent > 100) return 'Cyan';
        if (percent >= 90) return 'Green';
        if (percent >= 60) return 'Yellow';
        if (percent >= 30) return 'Yellow';
        if (percent >= 10) return 'Red';
        return 'Red';*/
}
updateHUD()