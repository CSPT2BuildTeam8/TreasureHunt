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


//Global Functions 

//Function to Sell Items

sellTreasure = name => {

    treasureHunt.post("sell", { "name":name ,  "confirm":"yes"})
    .then(() =>{
        console.log(res.data)
        coolDown = res.data.cooldown
        sellAllTreasure()
    })
    .catch(err =>{
        console.log(err.response)
        //coolDown = err.response.data.cooldown
    })
};

  // Sell all treasure by looping through them
sellAllTreasure = () => {
    console.log(inventory)
    if(inventory.length) {
        setTimeout(() => {
            sellTreasure(inventory[0])
        }, coolDown * 1000);
    } else{
        console.log("no more treasure")
    }

};


  //Get Quickest path to target room
findQuickestPath = (start = currentRoom.room_id, target = '?') => {
    let graph = mapData;
    let queue = [];
    let visited = new Set();
    for (let room in graph[start]) {
        queue = [...queue, [{ [room]: graph[start][room] }]];
    }

    while (queue.length) {
        let dequeued = queue.shift();

        let last_room = dequeued[dequeued.length - 1];

        for (let exit in last_room) {
        if (last_room[exit] === target) {
            if (target === '?') {
            dequeued.pop();
            }
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


//get to the store 
goToStore = () => {
    const path = findQuickestPath(currentRoom.room_id, 250)
    setTimeout(() => {
        console.log(coolDown)
        followPath(path, 250)
    }, coolDown * 1000);
    
}


//follow a path 
let count = 0
followPath = (path, target) =>{
    if(currentRoom.room_id === target){
        console.log("in target room")
        if(target === 1){
            sellAllTreasure()
        }
    } else {
        direction = Object.keys(path[count])[0]
        nextRoom = Object.values(path[count])[0]
        console.log(direction, nextRoom)
        console.log(count)

        setTimeout(() => {
            treasureHunt
            .get("init")
            .then(res => {
            currentRoom = res.data;
            coolDown = currentRoom.cooldown;
            console.log("you are in room", currentRoom.room_id)
            
                console.log("here")
                setTimeout(() => {
                    console.log("traveling to room", target)
                    treasureHunt.post("move", { "direction":  Object.keys(path[count])[0] , "next_room_id": Object.values(path[count])[0].toString } )
                    .then(res => {
                    coolDown = res.data.cooldown
                    currentRoom = res.data
                    console.log(res.data)
                    count++
                    setTimeout(() => {
                        followPath(path, target)
                    }, coolDown * 1000);
                    })
                    .catch(err =>{
                        console.log(err.response)
                        coolDown = err.response.data.cooldown
                    })
                }, coolDown * 1000);
                
            })
            .catch(err => {console.error(err)});
        }, coolDown * 1000);


        console.log(currentRoom.room_id, target)

    }

}

//Chooses a random direction based of available exits in current room
randomDirection= (obj) => {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};


//Initialize to get stats 

init = () =>{
    treasureHunt
    .get("init")
    .then(res => {
    console.log("init: ", res.data);

    currentRoom = res.data;
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
        //If you need to drop an item
        // setTimeout(() => {
        //     treasureHunt
        //     .post("drop", {"name":status.inventory[0]})
        //     .then(res => {
        //     console.log(res.data);
        //     })
        //     .catch(err => console.error(err.response));
        // }, coolDown * 1000);
    
        })
        .catch(err => console.error(err.response));
    }, coolDown * 1000);
    
    
}

//adventure to pick up treasure and go to store until you have 1000 gold

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
    if(encumbrance < strength -9 ){
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
        setTimeout(() => {
            goToStore()
        }, coolDown * 1000);
        
        }
}


init()

setTimeout(() =>{
    adventure()
}, coolDown * 1000)
