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


}

adventure = () => {

    //TODO: add ability to pick up more than once piece of treasure
    //Check player status before each search to check encumbrance
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
        //go to store
    }

}

init()
setTimeout(() =>{
    adventure()
}, coolDown * 1000)