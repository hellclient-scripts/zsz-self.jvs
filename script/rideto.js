var rideto = {}
rideto.mode = 0
rideto.lastTry = 0
// Mapper.setroomname("ride-pet", "飞行坐骑")
// rideto.load = function () {
//     var lines = world.ReadLines("rideto.h")
//     lines.forEach(function (data) {
//         data = data.trim()
//         if (data && !data.startsWith("//")) {
//             mapper.parsepath("ride-pet", data)
//         }
//     })
//     rideto.loadRideable("ridable.h")
//     rideto.loadRideable("ridable2.h")
// }
// rideto.loadRideable = function (name) {
//     var lines = world.ReadLines(name)
//     lines.forEach(function (data) {
//         data = data.trim()
//         if (data && !data.startsWith("//")) {
//             let path = Mapper.newpath()
//             path.from = data
//             path.to = "ride-pet"
//             path.tags = ["ride"]
//             path.command = "#skip"
//             Mapper.addpath(data, path)
//         }
//     })
// }
world.AddTriggerEx("rideto.noHorse", "^你还没有座骑！$", "", 1 | 8 | 32 | 1024 | 16384, -1, 0, "", "rideto.noHorse", 0, 100);
world.AddTriggerEx("rideto.onUnride", "^你骑着马没法上灵感塔去！$", "", 1 | 8 | 32 | 1024 | 16384, -1, 0, "", "rideto.onUnride", 0, 100);
// world.AddTriggerEx("rideto.onRide", "^你骑在马上，大喝一声“走喽”，飞奔而去。。。", "", 1 | 8 | 32 | 1024 | 16384, -1, 0, "", "rideto.onRide", 0, 100);
world.AddTriggerEx("rideto.onRideLater", "^你现在正在和人家动手， 哪能骑马走人呀。", "", 1 | 8 | 32 | 1024 | 16384, -1, 0, "", "rideto.onRideLater", 0, 100);


rideto.onRide = function () {
    // world.EnableTriggerGroup("gsm", 0);
    // world.EnableTrigger("step", true);
}
rideto.onUnride = function () {
    rideto.mode = 0
    send("unride")
    send("set no_teach prepare")
}
rideto.onRideLater = function () {
    rideto.lastTry = (new Date()).getTime()
    rideto.mode = 2
    send("set no_teach prepare")
}
rideto.noHorse = function () {
    var cmd = get_var("cmd_ride") || ""
    cmd = cmd.trim()
    if (rideto.mode == 0 && cmd && cmd != "t") {
        rideto.mode = 1
        send(cmd + ";whistle;" + cmd)
        send("set no_teach prepare")
        return
    }
    rideto.lastTry = (new Date()).getTime()
    rideto.mode = 2
    send("set no_teach prepare")
}
rideto.getTag = function () {
    var cmd = get_var("cmd_ride") || ""
    cmd = cmd.trim()
    if (cmd) {
        if (rideto.mode == 0 || rideto.mode == 1) {
            return "ride"
        }
        if ((new Date()).getTime() - rideto.lastTry > 5 * 1000) {
            rideto.mode = 0
            return "ride"
        }
    }
    return ""
}

// rideto.load()