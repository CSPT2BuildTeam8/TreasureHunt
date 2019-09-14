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

//Store location
let room_id = null

//Function to Sell Items

sellTreasure = async name => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/',
        headers: {
          Authorization: process.env.API_KEY
        },
        data: {
          name,
          confirm: 'yes'
        }
      });
      console.log(res);
      this.setState({
        messages: [...res.data.messages],
        cooldown: res.data.cooldown
      });
      await this.wait(1000 * res.data.cooldown);
    } catch (err) {
      console.log('There was an error.');
      console.dir(err);
      this.setState({ cooldown: err.response.data.cooldown });
      throw new Error(err.response.data.errors[0]);
    }
  };

  // Sell all treasure by looping through them
  sellAllTreasure = async () => {
    const { inventory } = this.state;
    for (let treasure of inventory) {
      await this.sellTreasure(treasure);
    }
    await this.getStatus();
  };

  
  //Get Quickest path to node 
  findQuickestPath = (start = this.state.room_id, target = '?') => {
    let { graph } = this.state;
    let queue = [];
    let visited = new Set();
    for (let room in graph[start][1]) {
      queue = [...queue, [{ [room]: graph[start][1][room] }]];
    }

    while (queue.length) {
      let dequeued = queue.shift();

      let last_room = dequeued[dequeued.length - 1];

      for (let exit in last_room) {
        if (last_room[exit] === target) {
          if (target === '?') {
            dequeued.pop();
          }
          dequeued.forEach(item => {
            for (let key in item) {
              graph[item[key]][0].color = '#9A4F53';
            }
          });
          return dequeued;
        } else {
          visited.add(last_room[exit]);

          for (let path in graph[last_room[exit]][1]) {
            if (visited.has(graph[last_room[exit]][1][path]) === false) {
              let path_copy = Array.from(dequeued);
              path_copy.push({ [path]: graph[last_room[exit]][1][path] });

              queue.push(path_copy);
            }
          }
        }
      }
    }
    return 'That target is incorrect.';
  };

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
        // Function that takes you to the store
        goToStore = async () => {
            const path = this.findQuickestPath(this.state.room_id, 1)
            for (let direction of path) {
                for (let d in direction) {
                    await this.flyToRooms(d, direction[d]);
                }
            }
        }
    }

}

init()
setTimeout(() =>{
    adventure()
}, coolDown * 1000)