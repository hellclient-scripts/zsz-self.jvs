// var queue={
//     queue:[],
//     tick:1100,
//     timestamp:0,
//     sent:[]
// }

// queue.exec=function(cmds,grouped){
//     queue.append(cmds,grouped)
//     queue.send()
// }

// queue.limit=function(){
//     return world.GetVariable("num_cmds")/2
// }
// queue.echo=function(){
//     return get_var("bool_echo")
// }
// queue.discard=function(){
//     var c=queue.queue.length
//     queue.queue=[]
//     return c
// }
// queue.append=function(rawcmds,grouped){
//     var cmds=[]
//     rawcmds.forEach(function(data){
//         var splited=data.split("\n")
//         splited.forEach(function(c){
//             cmds.push(c)
//         })
//     });
//     if (grouped){
//         queue.queue.push(cmds)
//     }else{
//         cmds.forEach(function(data){
//             queue.queue.push([data])
//         })
//     }
// }

// queue.full=function(){
//     var d=new Date()
//     var ts=d.getTime()
//     while(queue.sent.length<queue.limit()){
//         queue.sent.push(ts)
//     }
// }

// queue.fulltick=function(){
//     queue.sent=[]
//     queue.full()
// }
// queue.clean=function(){
//     var d=new Date()
//     var ts=d.getTime()
//     var newsent=[]
//     queue.sent.forEach(function(data){
//         if((ts-data)<=queue.tick){
//             newsent.push(data)
//         }
//     })
//     queue.sent=newsent
// }
// queue.send=function(){
//     queue.clean()
//     while (queue.queue.length!=0 && queue.sent.length<queue.limit()){
//         var cmds=queue.queue[0]
//         if (queue.sent.length!=0){
//             if ((queue.limit()-queue.sent.length)<cmds.length){
//                 queue.fulltick()
//                 return
//             }
//         }
//         queue.queue.shift()
//         cmds.forEach(function(data){
//             var d=new Date()
//             var ts=d.getTime()
//             queue.sent.push(ts)
//             world.SendNoEcho(data)
//             if (queue.echo()){
//                 world.Note(data)
//             }
//         })
//     }
// }

// do_send_queue=function(){
//     queue.exec([])
// }
// queue.full()

// world.AddTimer("queuejs",0,0,0.05,"",1+16384,"do_send_queue")
// world.DiscardQueue=queue.discard
// world.queue=function(cmd,echo){
//     queue.exec([cmd],false)
// }
Metronome.settick(1100)
Metronome.setinterval(50)
world.DiscardQueue=function(){
    Metronome.discard()
}
world.queue=function(cmd,echo){
    Metronome.setbeats(world.GetVariable("num_cmds")/2)
    Metronome.push([cmd],false,echo)
}