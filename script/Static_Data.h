//--------------------------------------------------------------------------------
var map_list = {		// 5步范围
	"map_ts" : "nu;sd;ed;ed;sd;nd;n。;s;wu;ed;su;s;ed;wu;n;nu;wu;wu",
	"map_nh" : "w;e;e;n;s;w;s;w;enter;out;e;n;n;n;n;e;e;w;n;s;s;n;w;n;n;s;s;w;w;e;e;s;s;s",
	"map_qz" : "e;w;s;n;n;n;n;n;n;s;s;s;s;s;w;w;w;sw;sw;ne;ne;e;e;e",
	"map_rz" : "s;s;s;n;n;n;n;e;n;e;w;s;w;n;n;w;e;n;n;s;w;e;s;s;s;s;w;s;n;n;n;n;nu;sd;s;s;s;w;nu;nu;wu;ed;sd;sd;w;nu;w;e;sd;e;e;e",
	"map_xx" : "nu;wu;wu;nu;sd;ed;ed;sd;s;ed;nw;w;e;e;w;nw;se;se;se;sw;w;e;ne;e;se;nw;w;nw;wu;n;nd;wu;nu;n;s;sd;ed;n。;n;s;nw;w;e;ne;se;sw;s;su",
	"map_fs" : "w;w;w;w;nw;se;e;e;e;e;e;e;e;n;s;s;u;d;n;e;e;e;w;w;w;w;n;n;nu;nd;su;sd;s;s;s;s;s;w;e;e;n;s;w;s;w;enter;out;e;n;n;n;n;w;w",
	"map_gw" : "s;s;s;sw;sw;ne;ne;n;n;n;n;n;se;nw;w;e;n;n;w;s;n;e;s;e;s;n;ne;ne;enter;out;sw;sw;e;ne;e;n;e。;e;se;e;se;e;n;s;e;eu;su;eu;e;w;wd;nd;wd;w;w;nw;w;nw;w。;w;s;w;sw;w;w;s;s;s",
	"map_wg" : "se;e;n;n;e;e;e;w;w;w;w;n;w;e;n;u;d;s;s;w;n;s;s;n;w;ne;eu;ne;nu;sd;sw;se;eu;wd;nw;wd;nu;nw;n;s;nw;se;sw;ne;se;sd;sw;e;e;e;s;s;e;s;w;w;e;s;s;n;se;nw;n;n;w;nw",
	"map_cd" : "n;n;n;w;n;s;e;s;s;s;e;se;ne;sw;s;e;e;e;w;w;w;w;w;n;s;s;s;s;s;s;wu;ed;n;n;n;e;ne;se;nw;sw;w;w;sw;n;nu;sd;s;ne;nw;sw;ne;n;w;w;w;e;e;e;e;w;n;nw;se;ne;nw;se;e",
	"map_lz" : "s;sw;sw;sw;sw;ne;ne;ne;ne;n;n;w;e;n;n;s;w;s;n;w;n;s;s;n;w;e;e;n;open door、n;e;w;n;s;w;e;open door、s;s;e;e;n;s;s;n;e;ne;n;n;n;s;s;ne;n;s;sw;s;sw;w;w;s;s",
	"map_fz" : "n;s;s;n;w;w;w;n;s;nw;nw;se;se;e;e;e;e;su;nd;n;enter;n;n;s;w;e;s;out;s;e;n;nu;sd;s;e;su;nd;e;e;e;n;s;eu;n;s;wd;w;w;w;w;s;e;w;s;e;w;w;w;n;s;e;e;s;s;s;s;s;e;w;s;n;w;e;n;n;n;n;n;n;n;w;w",
	"map_hs" : "s;e;e;w;w;s;w;nw;se;e;s;e;w;s;s;n;n;n;n;n;nw;sw;ne;nw;ne;sw;w;n;s;nw;n;ne;ne;sw;n;w;e;s;s;e;w;s;n;w;e;n;sw;s;se;e;se;se;e;n;s;s;e;w;n;e;n;s;e;s;n;e;e;se;su;su;eu;eu;su;eu;eu;su。;su;su;su;nd;nd;wu;nu;sd;wu;ed;ed;nd;nd;wd;wd;nd;wd;wd;nd;nd;nw;w;w;w;w;w",
	"map_ss" : "n;n;nu;ne;sw;nw;nu;sd;w;e;se;sd;s;s;s;s;n;e;n;e;n;s;w;n;n;s;s;s;s;s;s;n;n;n;w;w;w;nu;w;ne;sw;nw;se;n;n;s;s;e;sd;e;nu;nu;wu;nu;nu;nu;e;eu。;nu;nu;nu;n;e;w;w;sd;sd;sd;sd;wd;w;sd;sd;sd;ed;sd;sd;e;n",
	"map_yz" : "w;w;w;n;w;s;e;e;e;e;e;e;e;e;n;s;se;nw;w;w;w;w;s;s;s;s;su;nd;w;e;e;w;n;n;se;s;n;e;ne;e;w;sw;w;nw;n;n;n;e;w;w;e;n;w;u;d;e;n;e;s;n;e;s;n;e;n;e;n;w;n;s;s;s;s;s;w;e;se;nw;n;n;n;n;e;e;ne;n;n;s;s;sw;se;s;e;w;s;n;w;e;n;nw;w;w;w;w;w;w;n;s;s;n;w;n;n;n;s;s;s;w;w;w;w;s;s;n;n;w;n;s;w;e;e;e;e;e;e;e;e;n;w;e;n;e;u;d;w;n;n;n;n;n;s;s;s;s;w;w;w;n;n;s;w;s;e;e;e;e;s;s;w;e;s;w;n;s;s;n;w;e;e;e;e;w;s;n;w;s;w;e;s;s;n;n;n;w;s;n;n;s;e;s;s;s",
	"map_xi" : "e;w;w;e;n;e;w;w;e;n;w;n;s;w;e;e;n;n;s;s;e;n;s;s;n;e;s;e;w;w;e;n;e;n;s;s;n;e;nu;sd;su;nd;e;w;w;w;n;e;w;n;e;w;n;e;w;n;s;w;w;w;n;s;w;e;e;n;e;w;w;e;n;wu;wu;wu;ed;ed;ed;eu;eu;eu;wd;wd;wd;n;e;w;w;e;n;n;s;s;s;s;s;w;n;s;w;w;e;n;s;s;w;e;s;s;s;e;w;w;e;s;s;se;nw;n;n;n;w;n;s;s;n;w;nu;nu;nu;sd;sd;sd;su;su;su;nd;nd;nd;w;e;e;e;e;n;n;n;n;s;s;s;s;e;s;e;w;w;e;s;e;w;w;e;s;e;w;w;e;s;s;w;e;e;e;w;w;s;s;n;n;n;wu;wu;wu;ed;ed;ed;eu;eu;eu;wd;wd;wd;n;n;n;n;e;n;n。;n;s;s;s;w;s;s",
	"map_sz" : "nw;sw;s;n;n;w;nw;se;e;s;ne;se;sw;s;w;wu;ed;eu;n;s;ne;sw;s;n;wd;e;n;ne;s;s;e;w;s;sw;ne;s;sw;n;s;nw;se;s;n;w;n;s;s;n;w;w;w;w;nw;se;e;e;e;e;e;se;s;ne;sw;sw;ne;e;ne;sw;e;se;e;s;n;w;nw;w;w;s;e;w;w;w;w;sw;ne;e;e;e;s;s;sw;ne;e;eu;ed;ne;e;w;sw;wu;wd;w;n;n;n;n;ne;n;w;e;ne;e;se;n;s;s;n;e;e;n;nw;ne;sw;w;e;se;s;s;e;e;w;su;nd;n;se;nw;e;n;e;w;se;nw;w;w;w;w;w;nw;n;n;n;n",
	"map_zn" : "n;s;s;n;e;n;w;e;n;u;d;s;s;e;e;e;e;w;w;w;s;s;e;s;w;n;w;nw;n;w;w;ne;nu;nw;n;s;nw;se;sw;ne;se;sd;eu;se;eu;n;e;w;w;e;nu;nu;nu;wu;wu;nu;nu;n;w;nw;w;e;n;ed;wu;nu;nu;nu;nu;nu;se;eu;nu;nu;sd;sd;su;e;eu;wd;nu;nu;sd;sd;w;su;su;s;n;nd;nd;nd;wd;nw;sd;sd;wu;nd;su;wu;sd;nu;nu;wu;ed;sd;ed;nw;nd;nd;n;nd;nd;nd;su;su;su;s;su;su;se;ed;sd;sd;sd;s;se;e;s;sd;sd;ed;ed;sd;sd;sd;s;wd;nw;ne;nu;nu;e;nu;w;nu;sd;sd;sd;sd;sw;wd;sw;e",
	"map_hz" : "eu;wd;wd;wu;nw;se;ed;n;n;enter;n;s;out;s;nw;e;n;w;w;s;e;e;w;su;nd;n;se;ne;su;su;su;su;su;su;ed;ed;n;e;w;s;e;ed;ed;ed;e;s;w;e;e;e;w;w;s;wu;enter;out;ed;n;n;e;eu;eu;ed;ed;ne;ne;ne;n;e;w;n;n;n;w;nu;sd;sw;n;n;s;s;s;se;nw;n;w;n;n;s;s;s;s;w;enter;out;e;s;s;s;s;w;e;s;s;e;nu;sd;s;enter;out;n;w;w;n;w;n;s;s;n;e;n;ne;n;w;e;n;wu;ed;sw;s;sw;su;sd;sw;sw;e;ed;ed;ed;e;ne;e;e;e;ne;w;w;ne;sw;e;e;ne;n;n;n;n;w;sw;w;w;sw;s;sw;sw;sw;s;eu",
	"map_ca" : "e;e;e;e;e;w;n;s;w;w;w;w;w;sw;ne;s;s;e;e;w;w;s;s;n;n;n;n;w;w;n;n;s;s;s;e;w;s;n;n;e;e;n;n;n;n;n;s;w;n;s;s;n;w;n;s;s;s;n;n;w;n;s;s;n;w;s;s;s;n;w;e;e;w;n;n;se;nw;sw;ne;n;n;ne;nu;ne;nd;su;sw;sd;sw;s;s;w;w;n;s;s;n;w;n;s;w;n;s;s;s;s;e;w;s;se;nw;w;w;w;nu;wd;w;e;eu;sd;e;e;e;e;e;n;n;s;s;s;s;n;n;w;w;s;e;w;s;s;s;n;e;s;n;e;n;s;s;n;e;n;s;s;n;e;ne;sw;nw;se;s;sw;w;w;w;s;n;w;e;e;e;e;ne;n;e;e;e;e;n;n;s;s;s;n;w;n;s;s;n;w;n;s;s;n;w;n;s;s;n;w;n;e;w;n;w;w;e;s;n;e;e;e;w;s;n;w;n;n;e;w;w;e;n;n;n;n;s;s;e;e;w;n;s;w;w;w;s;s;w;w;e;e;s;s;e;s;s;e;w;w;e;n;n;e;e;s;s;n;n;e;e;w;n;e;w;n;n;n;w;n;s;e;s;s;e;e",
	"map_xy" : "wu;n;nu;wu;wu;nu;sd;ed;ed;sd;s;ed;n;s;nw;w;e;e;w;nw;se;se;se;sw;w;w;w;e;e;e;ne;e;se;e;e;w;w;nw;w;nw;wu;n;nd;n。;n;s;nw;w;e;ne;se;sw;s;wu;nu;sd;ed;su;s;ed;se;e;se;w;w;w。;w;n;n;s;s;w;w;w;e;e;s;s;se;se;n;s;s;n;nw;nw;nw;se;sw;sw;ne;ne;ne;ne;sw;sw;n;n;e;e。;e;e;e;nw;w;nw;se;sw;w;w;n;n。;e。;e。;ne;n;n;wu;s;su;su;wu;wu;s;wu;ed;n;ed;ed;su;ed;ed;n;n;n;e;w;s;s;s;wu;wu;wu;wu;su;wu;sd;enter;out;n;su;nd;s;nu;ed;nd;ed;ed;nd;nd;nd;n;ed;s;s;sw;w;w。;s。;s。;e;e;ne;nw;sw。;ne;n;s;nw;se;wu;n;s;ed;se;sw;w;w;w;e;e;e;ne;e;w;nw;se;w。;w;nw;s;n;ne;ne;sw;nu;nu;sd;sd;sw;w;n;s;w;nw;e;w;nu;nu;sd;sd;nw;nw;n;w;sw;ne;e;s;se;se;se;e;e;se;e。;e;nw",
	"map_dl" : "n;n;n;n;ne;sw;nw;se;s;s;s;nw;n;ne;n;nu;enter;out;ne;sw;w;e;sd;s;e;enter;u;u;u;d;d;d;out;s;s;e;w;w;e;s;s;n;e;s;n;w;w;s;n;e;n;n;n;w;sw;nw;n;n;n;nu;nd;su;e;e;w;n;s;s;n;w;sd;s;s;s;sw;w;w;s;sd;e;sw;e;w;w;enter;out;e;s;s;s;se;e;w;s;n;nw;wu;w;e;ed;n;n;eu;eu;ed;nu;enter;out;sd;s;sw;se;e;enter;n;u;e;e;w;enter;out;w;w;enter;out;e;d;s;out;e;e;se;se;e;e;w;w;nw;nw;s;s;s;sw;sw;s;n;w;e;n;u;d;s;ne;ne;s;e;e;w;s;n;n;u;u;d;d;s;w;se;s;n;sw;s;n;w;e;n;w;e;s;ne;nw;n;n;n;n;n;e;ne;s;n;n;w;n;n;s;s;e;nu;eu;ed;e;ne;e;e;se;eu;ed;ne;sw;su;nd;sw;su;sd;e;e;w;s;eu;wd;n;n;e;u;d;w;s;w;nu;nd;ne;wu;wd;nw;w;w;nw;w;wd;n;n;n;s;s;s;w;enter;u;u;u;u;d;d;d;d;out;w;wu;nw;wu;w;n;s;s;n;wd;w;w;e;s;e;n;s;w;w;n;n;n;s;s;s;e;s;e;e;w;n;s;s;n;w;w;w;e;e;s;e;u;d;w;s;e;n;s;s;n;w;w;s;n;n;enter;n;s;u;d;out;s;e;n;n;n;n"
	};

var map_list1 = {		// 1步范围
	"map_ts" : "nu;sd;ed;wu",
	"map_nh" : "w;e;e;w;n;s;s;n",
	"map_qz" : "e;w;n;s;s;n;w;e",
	"map_rz" : "w;e;n;s;s;n",
	"map_xx" : "s;n;nd;su;nu;sd",
	"map_fs" : "w;e;e;e;s;s;n;n;w;w",
	"map_gw" : "s;n;n;n;n;n;w;e;s;e;ne;ne;enter;out;sw;sw;e;ne;e;n;e。;e;se;e;se;e;e;w;n;s;w;nw;w;nw;w。;w;s;w;sw;w;w;s;s;s",
	"map_wg" : "se;nw;n;w;n;s;s;n;w;e;e;s",
	"map_cd" : "e;w;n;s;w;sw;s;s;sw;ne;se;e;e;ne;n;n;nw;w",
	"map_lz" : "s;n;n;n;e;e;w;n;s;s;n;w;w;n;s;s;n;w;e;e;s;s",
	"map_fz" : "n;s;s;n;w;e;e;e;e;e;e;w;w;w;s;s;s;s;n;n;n;n;w;w",
	"map_hs" : "s;n;nw;nw;w;n;s;nw;se;e;se;se;e;e;e;e;e;se;su;su;eu;eu;su;eu;eu;wd;wd;nd;wd;wd;nd;nd;nw;w;w;w;w;w",
	"map_ss" : "n;s;s;w;w;e;nu;nu;wu;nu;nu;nu;e;eu。;nu;sd;wd;w;sd;sd;sd;ed;sd;sd;e;n",
	"map_yz" : "e;w;s;n;w;e;n;n;n;n;n;n;n;s;w;e;s;s;s;w;w;w;w;e;e;e;e;e;e;e;e;w;s;n;n;s;w;w;w;s;s;s",
	"map_xi" : "e;w;s;n;w;e;n;n;n;s;e;e;n;n;e;w;n;e;w;w;w;n;s;w;w;s;s;s;s;n;w;e;e;e;s;s",
	"map_sz" : "nw;se;sw;ne;s;s;s;s;se;e;e;w;n;s;nw;se;s;n;w;sw;s;e;e;se;e;w;nw;w;w;s;s;s;e;w;sw;ne;n;n;w;w;w;sw;ne;e;e;e;n;n;nw;w;n;s;s;n;w;e;e;ne;n;n;n;n",
	"map_zn" : "e;w;n;s;s;n;w;ne;nu;sd;eu;ne;nu;nu;nu;e;w;nu;sd;sd;sd;sd;sw;se;eu;n;nu;nu;nu;wu;wu;nu;nu;n;w;nw;w;e;n;nu;nu;nu;nu;nu;se;eu;nu;nu;sd;sd;su;su;su;s;n;nd;nd;nd;wd;nw;sd;sd;wu;nw;nd;nd;n;nd;nd;nd;su;su;su;s;su;su;se;ed;sd;sd;sd;s;se;e;s;sd;sd;ed;ed;sd;sd;sd;s;wd;nw;wd;sw;e",
	"map_hz" : "eu;wd;wd;n;ne;ne;su;sd;nu;nd;ne;n;ne;e;s;s;w;e;s;s;s;s;s;s;w;sw;ne;n;w;n;s;s;n;e;s;e;e;e;ne;w;w;ne;sw;e;e;ne;n;n;n;n;w;sw;w;w;sw;s;sw;sw;sw;s;eu",
	"map_ca" : "e;w;w;s;s;s;w;w;w;w;s;sw;ne;n;n;n;e;w;w;e;n;n;n;n;e;w;n;n;n;n;s;s;s;s;w;w;s;s;w;w;w;w;e;e;e;e;n;n;e;e;e;e;s;s;e;e;e",
	"map_xy" : "se;sw;w;w;n;n。;e。;e。;ne;n;n;wu;s;su;su;su;ed;wu;wu;ed;nd;nd;nd;n;ed;s;s;sw;w;w。;s。;s。;e;e;ne;nw",
	"map_dl" : "n;nw;n;ne;e;enter;out;s;n;w;sw;nw;sw;ne;n;n;n;nu;e;e;w;n;s;s;n;w;sd;s;s;s;se;s;se;s;w;w;nu;sd;s;n;wu;wd;wd;s;s;se;e;w;s;n;nw;n;n;n;e;w;w;e;ne;w;s;s;eu;eu;ed;e;e;s;s;s;s;s;s;w;w;enter;out;w;e;e;e;s;s;s;s;e;e;w;n;s;s;n;w;n;sw;sw;n;s;s;n;w;e;ne;ne;n;n;n;n;e;ne;n;w;e;nu;nu;ed;e;enter;out;e;eu;e;se;e;e;se;eu;ed;sw;su;sd;e;e;w;n;s;s;n;w;nu;nd;ne;wu;wd;nw;w;w;sw;w;wu;wd;nu;nw;wu;w;wd;w"
	}; 

//hsbackup (s;e;e;w;w;s;w;nw;se;e;s;e;w;s;s;n;n;n;n;n;nw;sw;ne;nw;ne;sw;w;n;s;nw;n;ne;ne;sw;n;w;e;s;s;e;w;s;n;w;e;n;sw;s;se;e;se;se;e;n;s;s;e;w;n;e;n;s;e;s;n;e;e;se;su;su;eu;eu;su;eu;eu;su。;su;su;su;nd;nd;wu;nu;sd;wu;ed;ed;nd;nd;wd;wd;nd;wd;wd;nd;nd;nw;w;w;w;w;w)
//--------------------------------------------------------------------------------
var loc_list = {
	"扬州" : {"id" :   54, "sh" : "yz", "map" : "map_yz", "info" : "01;02;27;41;45;12;07;09;40"},
	"襄阳" : {"id" :  139, "sh" : "xi", "map" : "map_xi", "info" : "09"},
	"长安" : {"id" :  254, "sh" : "ca", "map" : "map_ca", "info" : "12;17;47;13;14"},
	"武功" : {"id" :  897, "sh" : "wg", "map" : "map_wg", "info" : "13;15"},
	"终南" : {"id" :  710, "sh" : "zn", "map" : "map_zn", "info" : "13;14;15"},
	"苏州" : {"id" :  931, "sh" : "sz", "map" : "map_sz", "info" : "05;04;40;07;03;06"},
	"杭州" : {"id" :  859, "sh" : "hz", "map" : "map_hz", "info" : "08;07;06"},
	"成都" : {"id" :  683, "sh" : "cd", "map" : "map_cd", "info" : "39;43;42;44;50"},
	"汝州" : {"id" : 1070, "sh" : "rz", "map" : "map_rz", "info" : "27;31;28;29;30"},
	"嵩山" : {"id" : 1094, "sh" : "ss", "map" : "map_ss", "info" : "27;28;31;29;30"},
	"佛山" : {"id" :  394, "sh" : "fs", "map" : "map_fs", "info" : "21;23;22;57;24"},
	"南海" : {"id" :  416, "sh" : "nh", "map" : "map_nh", "info" : "23;21"},
	"福州" : {"id" :  203, "sh" : "fz", "map" : "map_fz", "info" : "24;26;56;21"},
	"泉州" : {"id" :  212, "sh" : "qz", "map" : "map_qz", "info" : "26;24;21"},
	"华山" : {"id" :  989, "sh" : "hs", "map" : "map_hs", "info" : "18;20;19;47;02"},
	"天山" : {"id" : 1165, "sh" : "ts", "map" : "map_ts", "info" : "16;17;48"},
	"星宿" : {"id" : 1158, "sh" : "xx", "map" : "map_xx", "info" : "17;16;48"},
	"灵州" : {"id" : 1202, "sh" : "lz", "map" : "map_lz", "info" : "37;38"},
	"关外" : {"id" : 1216, "sh" : "gw", "map" : "map_gw", "info" : "36"},
	"大理" : {"id" :  443, "sh" : "dl", "map" : "map_dl", "info" : "32;21;33;34;35"},
	"西域" : {"id" : 1150, "sh" : "xy", "map" : "map_xy", "info" : "16;17;48;49;44;39;50"}
	};

var far_list = new Array("佛山","南海","泉州","福州","汝州","嵩山","星宿","天山","武功","灵州","长安","华山","襄阳","扬州","苏州","杭州","成都","终南","关外","大理","西域");

//--------------------------------------------------------------------------------
var info_list = {
	"01" : {"name" : "店小二",   "id" : "xiao er",          "area" : "yz", "loc" : 27},
	"02" : {"name" : "祖千秋",   "id" : "zu qianqiu",       "area" : "yz", "loc" : 1043},
	"03" : {"name" : "小贩",     "id" : "seller",           "area" : "sz", "loc" : 961},
	"04" : {"name" : "张天师",   "id" : "zhang tianshi",    "area" : "sz", "loc" : 981},
	"05" : {"name" : "店小二",   "id" : "xiao er",          "area" : "sz", "loc" : 928},
	"06" : {"name" : "老船夫",   "id" : "lao chuanfu",      "area" : "jx", "loc" : 1577},
	"07" : {"name" : "店小二",   "id" : "xiao er",          "area" : "jx", "loc" : 1575},
	"08" : {"name" : "店小二",   "id" : "xiao er",          "area" : "hz", "loc" : 815},
	"09" : {"name" : "店小二",   "id" : "xiao er",          "area" : "xi", "loc" : 141},
	"12" : {"name" : "店小二",   "id" : "xiaoer",           "area" : "ca", "loc" : 312},
	"13" : {"name" : "店小二",   "id" : "xiao er",          "area" : "wg", "loc" : 895},
	"14" : {"name" : "小贩",     "id" : "seller",           "area" : "wg", "loc" : 279},
	"15" : {"name" : "小贩",     "id" : "seller",           "area" : "zn", "loc" : 744},
	"16" : {"name" : "九翼道人", "id" : "jiuyi daoren",     "area" : "xy", "loc" : 1163},
	"17" : {"name" : "波斯商人", "id" : "bosi shangren",    "area" : "xy", "loc" : 1150},
	"18" : {"name" : "小贩",     "id" : "seller",           "area" : "hs", "loc" : 1053},    
	"19" : {"name" : "小贩",     "id" : "seller",           "area" : "hs", "loc" : 1002},
	"20" : {"name" : "李铁嘴",   "id" : "teller",           "area" : "hs", "loc" : 1056},
	"21" : {"name" : "凤七",     "id" : "feng qi",          "area" : "fs", "loc" : 403},
	"22" : {"name" : "凤一鸣",   "id" : "feng yiming",      "area" : "fs", "loc" : 400},
	"23" : {"name" : "渔夫",     "id" : "yu fu",            "area" : "fs", "loc" : 420},
	"24" : {"name" : "店小二",   "id" : "xiao er",          "area" : "fz", "loc" : 221},
	"25" : {"name" : "小贩",     "id" : "seller",           "area" : "fz", "loc" : 206},
	"26" : {"name" : "船夫",     "id" : "chuan fu",         "area" : "fz", "loc" : 215},
	"27" : {"name" : "店小二",   "id" : "xiao er",          "area" : "rz", "loc" : 1071},
	"28" : {"name" : "小贩",     "id" : "seller",           "area" : "rz", "loc" : 1094},
	"29" : {"name" : "店小二",   "id" : "xiao er",          "area" : "rz", "loc" : 1067},
	"30" : {"name" : "老船夫",   "id" : "lao chuanfu",      "area" : "rz", "loc" : 1075},
	"31" : {"name" : "店小二",   "id" : "xiao er",          "area" : "rz", "loc" : 1080},
	"32" : {"name" : "店小二",   "id" : "xiao er",          "area" : "dl", "loc" : 531},
	"33" : {"name" : "店小二",   "id" : "xiao er",          "area" : "dl", "loc" : 477},
	"34" : {"name" : "小贩",     "id" : "seller",           "area" : "dl", "loc" : 609},
	"35" : {"name" : "老年僧人", "id" : "laonian sengren",  "area" : "dl", "loc" : 654},
	"36" : {"name" : "店小二",   "id" : "xiao er",          "area" : "gw", "loc" : 1223},
	"37" : {"name" : "店小二",   "id" : "xiao er",          "area" : "lz", "loc" : 1174},
	"38" : {"name" : "店小二",   "id" : "xiao er",          "area" : "lz", "loc" : 1201},
	"39" : {"name" : "店小二",   "id" : "xiao er",          "area" : "cd", "loc" : 696},
	"40" : {"name" : "小贩",     "id" : "seller",           "area" : "th", "loc" : 946},
	"41" : {"name" : "店小二",   "id" : "xiao er",          "area" : "yz", "loc" : 1684},
	"42" : {"name" : "小贩",     "id" : "seller",           "area" : "cd", "loc" : 671},
	"43" : {"name" : "方人智",   "id" : "fang renzhi",      "area" : "cd", "loc" : 688},
	"44" : {"name" : "卓玛",     "id" : "zhuoma",           "area" : "cd", "loc" : 1638},
	"45" : {"name" : "店小二",   "id" : "xiao er",          "area" : "wd", "loc" : 1489},
	"46" : {"name" : "船夫",     "id" : "chuanfu",          "area" : "sz", "loc" : 1748},
	"47" : {"name" : "店小二",   "id" : "xiao er",          "area" : "yd", "loc" : 1011},
	"48" : {"name" : "店小二",   "id" : "xiao er",          "area" : "xy", "loc" : 1149},
	"49" : {"name" : "小贩",     "id" : "seller",           "area" : "xy", "loc" : 1784},
	"50" : {"name" : "店小二",   "id" : "xiao er",          "area" : "cd", "loc" : 701},
	"51" : {"name" : "陈老头",   "id" : "chen laotou",      "area" : "bj", "loc" : 1350},
	"52" : {"name" : "小贩",     "id" : "xiao fan",         "area" : "em", "loc" : 609},
	"53" : {"name" : "张乘风",   "id" : "zhang chengfeng",  "area" : "hm", "loc" : 2494},
	"54" : {"name" : "店小二",   "id" : "xiao er",          "area" : "bj", "loc" : 1297},
	"55" : {"name" : "店小二",   "id" : "xiao er",          "area" : "bj", "loc" : 1321},
	"56" : {"name" : "店小二",   "id" : "xiao er",          "area" : "fz", "loc" : 236},
	"57" : {"name" : "店小二",   "id" : "xiao er",          "area" : "fs", "loc" : 1542}
	};

//--------------------------------------------------------------------------------
var cn_sname = {
"阿" : "a", "艾" : "ai", "白" : "bai", "蔡" : "cai", "曹" : "cao", "陈" : "chen", "戴" : "dai", "窦" : "dou", "邓" : "deng", "狄" : "di", "杜" : "du", "段" : "duan", "范" : "fan", "樊" : "fan", "房" : "fang", "风" : "feng", "符" : "fu", "福" : "fu", "高" : "gao", "古" : "gu", "关" : "guan", "郭" : "guo", "毛" : "mao", "韩" : "han", "胡" : "hu", "花" : "hua", "洪" : "hong", "侯" : "hou", "黄" : "huang", "贾" : "jia", "蒋" : "jiang", "金" : "jin", "孔" : "kong", "匡" : "kuang", "廖" : "liao", "梁" : "liang", "李" : "li", "林" : "lin", "刘" : "liu", "龙" : "long", "陆" : "lu", "卢" : "lu", "罗" : "luo", "马" : "ma", "牛" : "niu", "庞" : "pang", "裴" : "pei", "彭" : "peng", "戚" : "qi", "齐" : "qi", "钱" : "qian", "乔" : "qiao", "秦" : "qin", "邱" : "qiu", "裘" : "qiu", "仇" : "qiu", "沙" : "sha", "商" : "shang", "尚" : "shang", "邵" : "shao", "沈" : "shen", "师" : "shi", "施" : "shi", "宋" : "song", "孙" : "sun", "童" : "tong", "万" : "wan", "王" : "wang", "魏" : "wei", "卫" : "wei", "吴" : "wu", "武" : "wu", "萧" : "xiao", "肖" : "xiao", "项" : "xiang", "许" : "xu", "徐" : "xu", "薛" : "xue", "杨" : "yang", "羊" : "yang", "阳" : "yang", "易" : "yi", "尹" : "yin", "俞" : "yu", "赵" : "zhao", "钟" : "zhong", "周" : "zhou", "郑" : "zheng", "朱" : "zhu", "东方" : "dongfang", "独孤" : "dugu", "慕容" : "murong", "欧阳" : "ouyang", "司马" : "sima", "西门" : "ximen", "尉迟" : "yuchi", "长孙" : "zhangsun", "诸葛" : "zhuge", "上官" : "shangguan", "夏侯" : "xiahou", "闻人" : "wenren", "皇甫" : "huangfu", "澹台" : "tantai", "公治" : "gongzhi", "淳于" : "chunyu", "申屠" : "shentu", "公孙" : "gongsun", "公羊" : "gongyang", "轩辕" : "xuanyuan", "令狐" : "linghu", "钟离" : "zhongli", "宇文" : "yuwen", "慕容" : "murong", "仲孙" : "zhongsun", "司徒" : "situ", "司空" : "sikong", "端木" : "duanmu", "公良" : "gongliang", "百里" : "baili", "东郭" : "dongguo", "鲜于" : "xianyu", "南郭" : "nanguo", "呼延" : "huyan", "羊舌" : "yangshe", "东门" : "dongmen", "纳兰" : "nalan", "南官" : "nanguan", "南宫" : "nangong", "拓拔" : "tuoba", "完颜" : "wanyan", "耶律" : "yelv"};

var cn_pname = {
"ai" : "艾皑哀蔼隘埃瑷嫒捱", "an" : "安黯谙岸鞍埯鹌", "ao" : "奥傲敖骜翱鳌", "ang": "昂盎肮", "ba" : "罢霸跋魃", "bai": "白佰", "ban": "斑般", "bang" : "邦", "bei": "北倍贝备", "biao" : "表标彪飚飙", "bian" : "边卞弁忭", "bu" : "步不", "cao": "曹草操漕", "cang" : "苍仓", "chang": "常长昌敞玚", "chi": "迟持池赤尺驰炽", "ci" : "此次词茨辞慈", "du" : "独都", "dong" : "东侗", "dou": "都篼", "fa" : "发乏珐", "fan": "范凡反泛帆蕃", "fang" : "方访邡昉", "feng" : "风凤封丰奉枫峰锋", "fu" : "夫符弗芙", "gao": "高皋郜镐", "hong" : "洪红宏鸿虹泓弘", "hu" : "虎忽湖护乎祜浒怙", "hua": "化花华骅桦", "hao": "号浩皓蒿浩昊灏淏", "ji" : "积极济技击疾及基集记纪季继吉计冀祭际籍绩忌寂霁稷玑芨蓟戢佶奇诘笈畿犄", "jian" : "渐剑见建间柬坚俭", "kan": "刊戡龛", "ke" : "可克科刻珂恪溘牁", "lang" : "朗浪廊琅阆莨", "li" : "历离里理利立力丽礼黎栗荔沥栎璃", "lin": "临霖林琳", "ma" : "马犸", "mao": "贸冒貌冒懋矛卯瑁", "miao" : "淼渺邈", "nan": "楠南腩赧", "pian" : "片翩胼", "qian" : "潜谦倩茜乾虔千", "qiang": "强羌锖玱", "qin": "亲琴钦沁芩矜", "qing" : "清庆卿晴", "ran": "冉然染燃", "ren": "仁刃壬仞", "sha": "沙煞", "shang": "上裳商", "shen" : "深审神申慎参莘", "shi": "师史石时十世士诗始示适炻", "shui" : "水", "si" : "思斯丝司祀嗣巳", "song" : "松颂诵", "tang" : "堂唐棠瑭", "tong" : "统通同童彤仝", "tian" : "天田忝", "wan": "万宛晚", "wei": "卫微伟维威韦纬炜惟玮为", "wu" : "吴物务武午五巫邬兀毋戊", "xi" : "西席锡洗夕兮熹惜", "xiao" : "潇萧笑晓肖霄骁校", "xiong": "熊雄", "yang" : "羊洋阳漾央秧炀飏鸯", "yi" : "易意依亦伊夷倚毅义宜仪艺译翼逸忆怡熠沂颐奕弈懿翊轶屹猗翌", "yin": "隐因引银音寅吟胤訚烟荫", "ying" : "映英影颖瑛应莹郢鹰", "you": "幽悠右忧猷酉", "yu" : "渔郁寓于余玉雨语预羽舆育宇禹域誉瑜屿御渝毓虞禺豫裕钰煜聿", "zhi": "制至值知质致智志直治执止置芝旨峙芷挚郅炙雉帜", "zhong": "中忠钟衷", "zhou" : "周州舟胄繇昼", "zhu": "竹主驻朱祝诸珠著竺", "zhuo" : "卓灼灼拙琢濯斫擢焯酌", "zi" : "子资兹紫姿孜梓秭", "zong" : "宗枞", "zu" : "足族祖卒", "zuo": "作左佐笮凿"};
//--------------------------------------------------------------------------------
