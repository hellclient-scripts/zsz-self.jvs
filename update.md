# 更新记录

## 21.11.20
* 修正 rcmd问题
## 21.11.13
* 修正玉蜂针keep到乾坤袋的问题
## 21.11.11
* 血魔发本等待时由直接汲取改为发送cmd_wait
* 解决cmd_aquest和cmd_bquest可能不触发的问题
* yanjiu加入判断，不到10点潜能不研究
* 加入变量cmd_jiqu,用于设置汲取命令，如#wp1on;jiqu sword-cognize.可以配合合#rcmd 随机汲取武学和剑道，留空发送mjq
* 加入#jiqu指令，发送cmd_jiqu到mud
* 加入bool_drunk,喝醉熏风，不yun dispel,需要配合群邪辟易天赋
* 加入cmd_master命令，留空发送dd，给头后执行的命令
* 调整钢镖购买和玉蜂针逻辑
* 适当增加cmd_digong的调用次数，方便powerup等
## 21.11.01
* 加入地图管理功能，在小人图标中查看
* 加入聚贤装捡守城录
* 加入钢镖开关bool_gangbiao,设为t会自动买钢镖,设为f需要判断pfm里是否有yuce字眼，钢镖购买量提升为400
* list_lian技能可以同时通过 | 和回车来分割不同的技能
* 加入变量cmd_cheapshot,即原来的pfm_lich用于晕血魔副本的巫妖,留空会发送pfm_lich到服务器，和原来的表现一致
* 加入变量cmd_backstab,即原来的mpf用于攻击有特防npc和血魔丁一，留空会发送mpf到服务器，和原来的表现一致。注：为保证兼容性，杀丁一时留空发的还是cmd_pfm。
* 血魔丁一的pfm从原来的cmd_pfm变成mpf，以便做针对性的设置
* 加入变量list_cmd，类似list_lian, | 或回车分隔 按名字注册的命令，可以通过 #cmd 名字发送。格式为 pfm:yong sowrd.kuangfeng and throwing.yuce;busy:yong throwing.tianhua twice,然后#cmd pfm
* 加入指令#cmd #cmd 命令名 可以使用list_cmd里注册过的命令。一般用于cmd_pfm等位置
* 加入指令#setvar和#unsetvar,用于修改变量设置。主要用于cmd_pre和cmd_xuemo，切换副本和qm的设置。格式为 #setvar 变量名 变量值 ;#unsetvar 变量名
* 加入命令#rcmd,随机执行给定的list_cmd里的指令，一般用于qm随机找npc学技能或者门贡商店换商品。比如 #rcmd fmjz fmgao fmlu
* 加入命令#weapon,格式为#weapon wield staffa #weapon wear strikea。用于切换武器，修改id_weapon,并会占据wp1on和wp1off的alias。
* 加入变量bool_showbusy,设为t会显示每个任务的busy时间(从npc晕倒到npc死亡)
* 由于原客户端部分apibug,客户端需要升级到1101版本
* 1101客户端有两个额外的修改，一个是通过上下箭头切换历史发送命令，另一个是原历史命令按钮改为批量发送功能，方便留post或做计划

### 关于#cmd和#weapon用普渡和葵花做qm范例

list_cmd为

```
pudu:yun recover;yong staff.twice
kuihua:yun recover;yong sword.wu and sword.you
you:yong recover;yong sword.you twice
```

cmd_pre为
```
#weapon wield staffa;#setvar cmd_pfm #cmd pudu;#setvar cmd_backstab #cmd pudu;
```

* cmd_3boss
* cmd_jxz
* cmd_xm
* cmd_digong
```
#weapon wield sworda;#setvar cmd_pfm #cmd kuihua;#setvar cmd_backstab #cmd you 
```
为了保证正常修理，id_weapon3为
```
sworda,staffa,armora
```
## 21.10.04
* 加入将军府的rideto路径，id_pass设为jjf2可以使用
* 不保存记忆水晶，以免卡住
## 21.09.30
* 加入将军府
* 加入珠光宝气楼(黑店)
## 21.09.13
修正study时内力不足直接sleep,如果此时身上有毒会死的bug
* 加入模块 聚宝箱管理>补充饮食 补充计划任务id的吃喝
* 加入模块 聚宝箱管理>补充九花材料 补充做九花的材料
* gold不够后refind时加入duihuan 10 cash to gold避免兑换的还是gold造成机器卡住
* 加入#stab命令，用于更新loc_mlist后重新插10lv
* 地图加入鲁班e的村长家，并将最大定位步数从5提升到8,减少被卡住的概率
* qz和gm部分npc位置修正

## 21.09.03
* 修正下副本不修理主武器的问题
* 调整取款买债券的金额，从1001 cash 提升到2001 cash
* 调整线报，为了避免重名，只有在线报位置在当前任务城市或很远时，才去下kill
* 调整下副本接到同名线报会尝试去做任务导致副本卡住的问题
## 21.08.30

引入按组发送，发组发送指命令会等到有足够发送空间一次性发送出去，避免因为当前心跳的发送空间不够被拆成多次发送。

* 在将、符号(地图文件中使用的分行符号)转化为换行时，将、符号分割的命令视为一组，避免发生门开后，移动命令被分到下一心跳造成行走失败
* #lian 命令默认以分组方式发送
* 下kill时会进行判断，如果npc没有逃走过，会保证killnpc的命令按组发送，避免被npc先busy。已经逃走的npc由于会主动kill，还是按原方式发送。

## 历史修改

* 修正send命令逻辑，提升发送稳定性，提升num_cmds可以设置的数值
* 引入锁定队列功能，防止清除队列时命令被清除，即实现原#q的保证命令都被执行的功能
* 引入助理按钮，提供各种功能
* 引入 #npc 命令，可以通过 #npc yang guo的方式直接前往npc位置
* 引入 #xx od xxx,比如 #20 eat renshen wan，方便执行重复命令
* 引入 #setvar 变量名 变量值 命令 设置变量功能，方便批量调整大米
* 引入 #login 命令，自动连接mud(如果需要) 并登陆
* 加入自动买钢刀功能
* 加入自动买债券功能
* 加入初始化模块
* 加入设置助理
* 加入屠人场吃lu功能
* 加入san兵器功能
* 加入练技能读书功能
* 加入广播找NPC功能
* 其他小修正
