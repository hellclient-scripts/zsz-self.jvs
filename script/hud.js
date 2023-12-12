SetHUDSize(3)
function updateHUD(){
    var date = new Date();
    var time2 = date.getTime();
    var lastk=query("npc/busystart");
    var num_lk =(time2-lastk)/1000;		

    let line = JSON.parse(NewLine())
    let line2= JSON.parse(NewLine())
    let line3= JSON.parse(NewLine())

    let word = JSON.parse(NewWord("HUD面板 "))
    word.Bold = true
    word.Color = "Cyan"
    line.Words.push(word)
    var num_lk =(lastk==0)?0:(time2-lastk)/1000;		
    // str += "距离上次干npc:" + num_lk+"秒";
    word = JSON.parse(NewWord("距离上次干npc:"))
    line.Words.push(word)
    let duration=formatDuration(num_lk);
    word = JSON.parse(NewWord(duration))
    word.Color=num_lk>600?'Red':'Green';
    word.Bold = true
    line.Words.push(word)
    if (!get_var("bool_nohelp") && query("stat/count")){
		var rate=query("stat/helped")*100/query("stat/count")
		word = JSON.parse(NewWord( "，线报率:"+rate.toFixed(2)+"%")) 
        line.Words.push(word)
	}

    if (query("other/todo")>= 0)
    {
        word = JSON.parse(NewWord("【"+query("other/todo")+"分钟后需做:"+query("other/todo_cmd")+"】"));
        line.Words.push(word)
    }
    word = JSON.parse(NewWord("npc:" + query("npc/name") + ", loc:" + query("npc/loc")+" "))
    line2.Words.push(word)
    if (query("npc/loc") == "很远") {
		var fx = query("quest/far");
		word = JSON.parse(NewWord(", 当前" + fx + ":" + far_list[fx]));
        line2.Words.push(word)
	}
    word = JSON.parse(NewWord( ", 完成:" +  query("quest/count") + ", quest:" + query("quest/flag")))
    line2.Words.push(word)
	word = JSON.parse(NewWord(", 效率:" +  query("stat/eff") + "/小时, 用时:" + query("stat/minute") + "分钟")); 
    line2.Words.push(word)
	var busyeff=query("stat/busyeff")
	if (busyeff && get_var("bool_showbusy")){
		word = JSON.parse(NewWord(", 平均 busy:"+busyeff.toFixed(2)))
        line2.Words.push(word)
	}

    word = JSON.parse(NewWord("经验："));
    line3.Words.push(word)
    word = JSON.parse(NewWord(formatExp(query('hp/exp'))));
    word.Color='Green'
    word.Bold=true
    line3.Words.push(word)

    word = JSON.parse(NewWord(" 潜能:"));
    line3.Words.push(word)
    word = JSON.parse(NewWord(formatExp(query('hp/pot'))));
    word.Color=query('hp/pot')<get_var("max_pot")?'Green':'Red';
    word.Bold=true
    line3.Words.push(word)

    UpdateHUD(0, JSON.stringify([line,line2,line3]))



    var summeryline=JSON.parse(NewLine())
    var summeryline2=JSON.parse(NewLine())
    word = JSON.parse(NewWord("划水:"))
    summeryline.Words.push(word)
    word = JSON.parse(NewWord(duration))
    word.Color=num_lk>600?'Red':'Green';
    word.Bold = true
    summeryline.Words.push(word)

    word = JSON.parse(NewWord(" 效率:"))
    summeryline.Words.push(word)
    word = JSON.parse(NewWord(''+query("stat/eff")))
    word.Color=query("stat/eff")<200?'Red':'Green'
    word.Bold = true
    summeryline.Words.push(word)

    word = JSON.parse(NewWord("经验："));
    summeryline2.Words.push(word)
    word = JSON.parse(NewWord(formatExp(query('hp/exp'))));
    word.Color='Green'
    word.Bold=true
    summeryline2.Words.push(word)

    word = JSON.parse(NewWord(" 潜能:"));
    summeryline2.Words.push(word)
    word = JSON.parse(NewWord(formatExp(query('hp/pot'))));
    word.Color=(query('hp/pot')<get_var("max_pot"))?'Green':'Red';
    word.Bold=true
    summeryline2.Words.push(word)

    SetSummary(JSON.stringify([summeryline,summeryline2]))

}
updateHUD();

function formatDuration(duration){
    duration=Math.floor(duration);
    let unit='秒'
    if (duration>60){
        duration=Math.floor(duration/60)
        unit='分'
        if (duration>60){
            duration=Math.floor(duration/60)
            unit='小时'
        }
        if (duration>24){
            duration=Math.floor(duration/60)
            unit='天'
        }
        if (duration>99){
            duration='99+'
        }
    }
    return ''+duration+unit
}

function formatExp(value){
    let unit='';
    if (value>1000000){
        unit='W'
        value=Math.floor(value/10000)
        if (value >1000){
            unit='M'
            value=Math.floor(value/100)
        }
    }
    return ''+value+unit;
}