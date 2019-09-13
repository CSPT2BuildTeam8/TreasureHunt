const treasureHunt = require("./axiosConfig");
const graphData = require("./graphData.json");
const mapData =  require("./mapData.json");


//initialize to check status and get room location
let currentRoom = null
let coolDown = 16
let items = []
let randDirection = ""

//player status
let status = []
let strength = 0
let encumbrance = 0
let gold = 0
let inventory = []

//Function to Sell Items

sellTreasure = name => {

    treasureHunt.post("sell", { "name":name ,  "confirm":"yes"})
    .then(() =>{
        console.log(res.data)
        coolDown = res.data.cooldown
    })
    .catch(err =>{
        console.log(err.response)
        coolDown = err.response.data.cooldown
    })
};

  // Sell all treasure by looping through them
sellAllTreasure = () => {
    const items = items;
    for (let treasure of items) {
        setTimeout(() => {
            sellTreasure(treasure)
        }, coolDown * 1000);
        sellTreasure(treasure);
    }

};

  
  //Get Quickest path to node 
findQuickestPath = (start = currentRoom.room_id, target = '?') => {
    console.log("maybe in here")
    let graph = mapData;
    let queue = [];
    let visited = new Set();
    for (let room in graph[start]) {
        queue = [...queue, [{ [room]: graph[start][room] }]];
        console.log(queue)
    }

    while (queue.length) {
        let dequeued = queue.shift();

        let last_room = dequeued[dequeued.length - 1];

        for (let exit in last_room) {
        if (last_room[exit] === target) {
            if (target === '?') {
            dequeued.pop();
            }
            // dequeued.forEach(item => {
            // for (let key in item) {
            //     graph[item[key]][0].color = '#9A4F53';
            //  }
            // });
            return dequeued;
        } else {
            visited.add(last_room[exit]);

        for (let path in graph[last_room[exit]]) {
            if (visited.has(graph[last_room[exit]][path]) === false) {
                let path_copy = Array.from(dequeued);
                path_copy.push({ [path]: graph[last_room[exit]][path] });

                queue.push(path_copy);
            }
        }
        }
    }
}
    return 'That target is incorrect.';
};

goToStore = () => {
    console.log("now here?")
    const path = findQuickestPath(currentRoom.room_id, 1)
    setTimeout(() => {
        console.log(coolDown)
        followPath(path)
    }, coolDown * 1000);
    
}

followPath = (path) =>{
    console.log(path)
    for (let direction of path) {
        //console.log(direction)
        for (let d in direction) {
            coolDown = 10
            setTimeout(() => {
                console.log(coolDown)
                console.log(d)
                console.log(direction[d])
                console.log("traveling to store")
                // treasureHunt.post("move", { "direction":d, "next_room_id": direction[d].toString() })
                // .then(res => {
                // coolDown = res.data.cooldown
                // currentRoom = res.data
                // console.log(res.data)
                // })
                // .catch(err =>{
                //     console.log(err.response)
                //     coolDown = err.response.data.cooldown
                // })
            }, coolDown * 1000);
        }
    }
}

//Chooses a random direction based of available exits in current room
randomDirection= (obj) => {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};


init = () =>{
    treasureHunt
    .get("init")
    .then(res => {
    console.log("init: ", res.data);

      // Set the current_room to res.data
    currentRoom = res.data;

      // Print out the current room ID and the exits
      //console.log("Room ID: ", currentRoom.room_id);
      //console.log("Room exits: ", currentRoom.exits);

      // Set the cool down period to whatever it is in the current room
    coolDown = currentRoom.cooldown;
    randDirection = randomDirection(mapData[currentRoom.room_id])
    })
    .catch(err => console.error(err));

    setTimeout(() => {
        treasureHunt
        .post("status")
        .then(res => {
        console.log("status: ", res.data);
        status = res.data;
        strength = status.strength
        encumbrance = status.encumbrance
        gold = status.gold
        inventory = status.inventory
        })
        .catch(err => console.error(err.response));
    }, coolDown * 1000);
    


}

adventure =  async() => {

    //TODO: add ability to pick up more than once piece of treasure
    //Check player status before each search to check encumbrance
    await treasureHunt
    .post("status")
    .then(res => {
    console.log("status: ", res.data);
    status = res.data;
    strength = status.strength
    encumbrance = status.encumbrance
    gold = status.gold
    inventory = status.inventory
    })
    .catch(err => console.error(err.response));
    
    //if encumbrance is less than strength use wise explorer and search for treasure
    if(encumbrance < strength -2 ){
        //set a random direction of travel and get the next room based of mapData
        randDirection = randomDirection(mapData[currentRoom.room_id])
        var nextRoom = mapData[currentRoom.room_id][randDirection]

        setTimeout(() =>{
            console.log("exploring")
            treasureHunt.post("move", { "direction":randDirection, "next_room_id": nextRoom.toString() })
            .then(res => {
                coolDown = res.data.cooldown
                currentRoom = res.data
                console.log(res.data)

                if(res.data.items.length){
                    console.log("FOUND TREASURE")
                    setTimeout(()=>{
                        treasureHunt.post("take", {"name":res.data.items[0]})
                        .then((res) =>{
                            console.log(res.data)
                            setTimeout(() =>{
                                adventure()
                            }, coolDown * 1000)
                        })
                        .catch(err=>{
                            console.log(err.response)
                        })
                    }, coolDown * 1000)
                } else {
                    setTimeout(() =>{
                        adventure()
                    }, coolDown * 1000)
                }
            })
            .catch(err =>{
                console.log(err.response)
            })
        }, coolDown * 1000)
    } else {
        // Function that takes you to the store
        console.log("here")
        setTimeout(() => {
            console.log("maybe")
            goToStore()
        }, coolDown * 1000);
        
        }
    }


init()
setTimeout(() =>{
    adventure()
}, coolDown * 1000)
