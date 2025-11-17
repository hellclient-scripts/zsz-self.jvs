var mapper = {
    result: "",
}
mapper.HMM = eval(Include("hmm/hmm.js"), "hmm/hmm.js");
mapper.Database = new mapper.HMM.MapDatabase()
mapper.Context = new mapper.HMM.Context()
mapper.HomeRooms=[]
mapper.Paths=[]
mapper.NewRoom = function (key, name, exits = []) {
    let model = mapper.HMM.Room.New()
    model.Key = key
    model.Name = name
    model.Exits = exits
    return model
}
mapper.NewExit = function (command, to, cost = 1) {
    let model = mapper.HMM.Exit.New()
    model.Command = command
    model.To = to
    model.Cost = cost
    return model
}
mapper.sh = {
    "east": "e", "south": "s", "west": "w", "north": "n", "southeast": "se", "southwest": "sw",
    "northeast": "ne", "northwest": "nw", "eastup": "eu", "eastdown": "ed", "southup": "su",
    "southdown": "sd", "westup": "wu", "westdown": "wd", "northup": "nu", "northdown": "nd",
    "up": "u", "down": "d", "enter": "enter", "out": "out", "cross": "cross"
};

mapper.re = {
    "e": "w", "s": "n", "w": "e", "n": "s", "se": "nw", "sw": "ne", "ne": "sw", "nw": "se",
    "eu": "wd", "ed": "wu", "su": "nd", "sd": "nu", "wu": "ed", "wd": "eu", "nu": "sd",
    "nd": "su", "u": "d", "d": "u", "enter": "out", "out": "enter"
};
mapper.getroom = function (id) {

    var result = mapper.Database.APIGetRoomExits(id, mapper.Context, mapper.HMM.MapperOptions.New())
    var data = []
    var self = this;
    result.forEach(function (exit) {
        data.push(self.filterdir(exit.Command) + ":" + exit.To)
    })
    this.result = data.join(",")
}
mapper.lines = []
mapper.filterdir = function (dir) {
    var re = /[。·！]/g;
    dir = dir.replace(re, "");
    if (dir.indexOf("、") != -1) {
        dir = dir.split("、");
        dir = dir[dir.length - 1];
    }
    return dir
}
mapper.newFind = function (rid, max) {
    var exits = mapper.Database.APIGetRoomExits(rid, mapper.Context, mapper.HMM.MapperOptions.New())
    var todo = []
    exits.forEach(function (exit) {
        todo.push({
            command: exit.Command,
            to: exit.To,
        })
    })
    return {
        rid: rid,
        max: max,
        todo: [todo],
        re: [],
        walked: {
            rid: true
        },
        result: []
    }
}
mapper.nextFind = function (find) {
    if (find.todo.length < find.max && find.todo[find.todo.length - 1].length != 0) {
        var path = find.todo[find.todo.length - 1].pop()
        if (find.walked[path.to]) {
            return
        }
        var recmd = this.re[path.command]
        if (!recmd) {
            return
        }
        var todo = []
        var exits = mapper.Database.APIGetRoomExits(path.to, mapper.Context, mapper.HMM.MapperOptions.New())

        var re
        exits.forEach(function (exit) {
            todo.push({
                command: exit.Command,
                to: exit.To,
            })
            if (exit.Command == recmd && exit.To == find.rid) {
                re = {
                    command: exit.Command,
                    to: exit.To,
                }
            }
        })
        if (re) {
            find.todo.push(todo)
            find.re.push(re)
            find.rid = path.to
            find.walked[path.to] = true
            find.result.push(path.command)
        }
    } else {
        find.todo.pop()
        re = find.re.pop()
        find.rid = re.to
        find.result.push(re.command)
    }
}
mapper.getareapath = function name(start, depth) {
    var find = this.newFind(start, depth)
    while (find.todo.length != 1 || find.todo[0].length != 0) {
        this.nextFind(find)
    }
    this.result = find.result.join(";")
}
mapper.getrmid = function (data) {
    this.result = ""
    var name = data.split("|", 1)
    var result = []
    var opt = mapper.HMM.APIListOption.New()
    var filter=mapper.HMM.RoomFilter.New()
    filter.HasAnyName=[name[0]]
    mapper.Database.APISearchRooms(filter, opt).forEach(function (room) {
        result.push(room.Key)
    })
    this.result = result.join(";")
    if (this.result == "") {
        this.result = "null"
    }
}
mapper.getroomexitssorted = function (id) {
    var result = mapper.Database.APIGetRoomExits(id, mapper.Context, mapper.HMM.MapperOptions.New())
    var exits = [];
    var self = this;
    result.forEach(function (exit) {
        if (self.re[exit.Command]) {
            exits.push(exit.Command)
        }
    })
    return exits.sort().join(",")
}

mapper.filterexitsorted = function (e) {
    var result = e.split(",")
    var exits = [];
    var self = this;
    result.forEach(function (exit) {
        var s = self.sh[exit]
        if (s) {
            exits.push(s)
        }
    })
    return exits.sort().join(",")
}
mapper.execgetrmid = function (data) {
    this.result = ""
    var name = SplitN(data, "=", 2)
    var result = []
    var opt = mapper.HMM.APIListOption.New()
    mapper.Database.APIListRooms(opt).forEach(function (room) {
        if (room.Name === name[0]) {
            result.push(room.Key)
        }
    })
    if (name.length == 1) {
        this.result = result.join(",")
    } else {
        if (result.length == 1) {
            this.result = result
        } else {
            var exits = this.filterexitsorted(name[1])
            for (var id in result) {
                if (this.getroomexitssorted(id) == exits) {
                    this.result = id
                    break;
                }
            }
        }
    }
    if (this.result == "") {
        this.result = "null"
    }
}
mapper.getidfrname = function (name) {
    var result = []
    var opt = mapper.HMM.APIListOption.New()
    mapper.Database.APIListRooms(opt).forEach(function (room) {
        if (room.Name === name[0]) {
            result.push(room.Key)
        }
    })
    this.result = result.join(";")
    if (this.result == "") {
        this.result = "null"
    }
}
mapper.settags = function (tags) {
    for (var key in tags) {
        this.Context.WithTags([mapper.HMM.ValueTag.New(tags[key], 1)])
    }
}
mapper.getpath = function (fl, fly, to) {
    
    let result = mapper.Database.APIQueryPathAny([fl], to, this.Context, mapper.HMM.MapperOptions.New())
    if (result == null) {
        return null
    }
    let path = []
    result.Steps.forEach(step => {
        path.push(step)
    })
    return path
}
mapper.search = function (fl, tl, fm) {
    var tags = fm.split(",")
    mapper.initTags()
    mapper.settags(tags)
    var result = mapper.getpath(fl, 1, tl.split(","))
    var steps = []
    if (result) {
        result.forEach(function (data) {
            if (data.command != "#skip") {
                steps.push(data.Command)
            }
        })
        this.result = steps.join(";")
    } else {
        this.result = "null"
    }

}
mapper.searchlist = function (fl, tl, fm) {
    mapper.settags([fm])
    var result = mapper.getpath(fl, 1, tl.split(","))
    var steps = []
    if (result) {
        result.forEach(function (data) {
            if (data.command != "#skip") {
                steps.push(data.Command)
            }
        })
        this.result = result.join(";")
    } else {
        this.result = "null"
    }
}

mapper.exitid = function (rid, dir) {
    var flylist = []
    var exits = mapper.Database.APIGetRoomExits(rid, mapper.Context, mapper.HMM.MapperOptions.New())
    var result = "null"
    flylist.concat(exits).forEach(function (path) {
        if (mapper.filterdir(path.Command) == mapper.filterdir(dir)) {
            result = path.To + ""
        }
    })
    this.result = result

}

mapper.exec = function (cmd) {
    var data = SplitN(cmd, " ", 3)
    if (data[0] != "mush" || data.length < 2) {
        throw (new Error("unknown mapper command " + cmd))
    } else {
        switch (data[1]) {
            case "areapath":
                var msg = SplitN(data[2], " ", 2)
                mapper.getareapath(msg[0], msg[1])
                break;
            case "exitid":
                var msg = SplitN(data[2], ":", 2)
                mapper.exitid(msg[0], msg[1])
                break;
            case "filt":
                mapper.getroom(data[2])
                break;
            default:
                if (data.length == 2) {
                    mapper.execgetrmid(data[1])
                } else {
                    var msg = SplitN(data[2], " ", 2)
                    mapper.search(data[1], msg[0], msg[1])
                }
                break;
        }
    }
}

mapper.addhouse = function (line) {
    if (line) {
        var data = line.split(" ")
        if (data.length != 3) {
            world.Note("解析房屋信息失败，格式应该为 '包子铺 bzp 1558' ")
            return
        }
        var hosuename = data[0]
        var houesid = data[1]
        var houseloc = data[2]
        mapper.HomeRooms = [
            mapper.NewRoom("1933", `${hosuename}大院`, [
                mapper.NewExit("n", "1934"),
                mapper.NewExit("out", houseloc),
            ]),
            mapper.NewRoom("1934", `${hosuename}前庭`, [
                mapper.NewExit("e", "1936"),
                mapper.NewExit("push、n。", "1937"),
                mapper.NewExit("s", "1933"),
                mapper.NewExit("w", "1935"),
            ]),
            mapper.NewRoom("1935", `右卫舍`, [
                mapper.NewExit("e", "1934"),
            ]),
            mapper.NewRoom("1936", `左卫舍`, [
                mapper.NewExit("w", "1934"),
            ]),
            mapper.NewRoom("1937", `走道`, [
                mapper.NewExit("n", "1938"),
                mapper.NewExit("push、s。", "1934"),
            ]),
            mapper.NewRoom("1938", `${hosuename}迎客厅`, [
                mapper.NewExit("n", "1939"),
                mapper.NewExit("s", "1937"),
                mapper.NewExit("open door、e", "2533"),
            ]),
            mapper.NewRoom("1939", `议事厅`, [
                mapper.NewExit("e", "1941"),
                mapper.NewExit("n", "1942"),
                mapper.NewExit("s", "1938"),
                mapper.NewExit("w", "1940"),
            ]),
            mapper.NewRoom("1940", `${hosuename}武厅`, [
                mapper.NewExit("e", "1939"),
            ]),
            mapper.NewRoom("1941", `${hosuename}武厅`, [
                mapper.NewExit("w", "1939"),
            ]),
            mapper.NewRoom("1942", `${hosuename}中庭`, [
                mapper.NewExit("open west、w", "1943"),
                mapper.NewExit("n", "1944"),
                mapper.NewExit("s", "1939"),
            ]),
            mapper.NewRoom("1943", `左厢房`, [
                mapper.NewExit("e", "1942"),
            ]),
            mapper.NewRoom("1944", `后院`, [
                mapper.NewExit("e", "-1"),
                mapper.NewExit("n", "1947"),
                mapper.NewExit("s", "1942"),
                mapper.NewExit("w", "1945"),
            ]),
            mapper.NewRoom("1945", `厨房`, [
                mapper.NewExit("e", "1944"),
            ]),
            mapper.NewRoom("1946", `备用`, [
                mapper.NewExit("e。", "1949"),
            ]),
            mapper.NewRoom("1947", `后花园`, [
                mapper.NewExit("e", "1948"),
                mapper.NewExit("s", "1944"),
                mapper.NewExit("open door、w、close door", "2681"),
            ]),
            mapper.NewRoom("1948", `竹林`, [
                mapper.NewExit("e", "1949"),
                mapper.NewExit("w", "1947"),
            ]),
            mapper.NewRoom("1949", `听涛阁`, [
                mapper.NewExit("w", "1948"),
            ]),
        ]
        let path=mapper.HMM.Path.New();
        path.From=houseloc;
        path.To="1933";
        path.Command=houesid
        mapper.Paths.push(
            path
        )
        world.Note("在位置 " + houseloc + " 添加房屋" + hosuename + "入口[" + houesid + "]")
        mapper.HouseID = houesid
        mapper.HouseLoc = houseloc

    } else {
        world.Note("变量 house 未设置")
    }
}
mapper.addhouse(GetVariable("house"))
mapper.initTags = function () {
    mapper.Context = mapper.HMM.Context.New();
    mapper.Context.WithRooms(mapper.HomeRooms)
    mapper.Context.WithPaths(mapper.Paths)

}
mapper.open = function (filename) {
    world.Note("Open map file " + filename)
    mapper.Database.Import(ReadFile(filename))
    return
}