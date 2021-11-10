# 使用普渡杖qm,其他连招打副本的demo

在list_cmd中，先定义两个pfm

```
pudu:yun recover;yong staff.zhao twice
lian:yun recover;yong unarmed.wu and unarmed.you

```

再定义两套设置,其中#weapon为切换你的武器，jiali 50为你普渡杖需要的jiali

```
qm:#weapon wield staffa;#setvar cmd_pfm #cmd pudu;#setvar cmd_cheapshot #cmd pudu;jiali 50
fb:#weapon wield sworda;#setvar cmd_pfm #cmd lian;#setvar cmd_cheapshot #cmd lian;jiali 1
pudu:yun recover;yong staff.zhao twice
lian:yun recover;yong unarmed.wu and unarmed.you

```

将cmd_pre设置为

```
#cmd qm
```
将cmd_3boss,cmd_jxz,cmd_digong,cmd_xm设置为
```
#cmd fb
```
# 使用普渡杖qm,其他杖法打副本
这个和上一条的区别是jifa部分会冲突，所以添加一个jifastaff的alias

list_cmd:
```
pudu:yong staff.zhao twice
lian:yong staff.jun twice
setpfm:wp1on;alias jifastaff jifa staff pudu-zhang;jifastaff;#setvar cmd_pfm #cmd pudu;;#setvar cmd_backstab #cmd pudu;#setvar cmd_cheapshot #cmd pudu;#q
setfb:wp1on;alias jifastaff jifa staff lvjia-ji;jifastaff;#setvar cmd_pfm #cmd lian;#setvar cmd_backstab #cmd lian;#setvar cmd_cheapshot #cmd lian;#q
```
list_lian:
```
staff:lihua-spear,lvjia-ji,pudu-zhang:wp1on:jifastaff

```
cmd_pre是

```
wp1on;#cmd setpfm
```

cmd_3boss,cmd_jxz,cmd_digong,cmd_xm设置为
```
yun powerup;yun shield;wp1on;#cmd setfb
```

