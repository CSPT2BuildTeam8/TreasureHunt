const treasureHunt = require("./axiosConfig");
const move = require("./graphLogic");
var fs = require("fs");

// Create empty arrays and list to hold map and paths
let traversalPath = [];
let reversePath = [];
let map = {};
let graphLogic = {};

// Create a variable for the current room
let currentRoom = null;
let coolDown = 16; // To account for the 15 second cool down period

// Create a helper function to reverse the N, S, E, W direction
const reverse = direction => {
    let result = "";
  
    if (direction == "n") {
      result = "s";
    } else if (direction == "s") {
      result = "n";
    } else if (direction == "w") {
      result = "e";
    } else if (direction == "e") {
      result = "w";
    }
  
    return result;
  };
  
// Initialize: this will just return the first room (room_id = 0)
treasureHunt
  .get("init")
  .then(res => {
    console.log("init: ", res.data);

    // Set the current_room to res.data
    currentRoom = res.data;

    // Print out the current room ID and the exits
    console.log("Room ID: ", currentRoom.room_id);
    console.log("Room exits: ", currentRoom.exits);

    // Set the cool down period to whatever it is in the current room
    coolDown = currentRoom.cooldown;
  })
  .catch(err => console.error(err));

  
// This function will hold all of the actual logic for moving through
// the map until map.length==500
adventure = () => {
    let room_ID = currentRoom.room_id;
    let unexplored_rooms = [];
    // Create a helper function to move between rooms and pause for cool down
    // This uses the move() function from graph.js to move between the current and target room
    const toRoom = (current_room_id, target_room_id) => {
      const directions = move(current_room_id, target_room_id);

      directions.forEach(direction => {
        setTimeout(() => {
          treasureHunt.post("move", { direction }).then(res => {
            coolDown = res.data.coolDown;
            currentRoom = res.data;
          });
        }, coolDown * 1000);
      });
    };

    
  //   Check if the current room is in the map object, and if not, add it
  if (!map[room_ID]) {
    map[room_ID] = {};
  }

  console.log("The map length is now: ", Object.keys(map).length);

  //   Add unexplored exits to the map with a X
  currentRoom.exits.forEach(exit => {
    if (map[room_ID][exit.toString()] == undefined) {
      map[room_ID][exit.toString()] = "?";
    }
  });

  // console.log("The map now looks like this:\n", map);

  graph[room_ID] = currentRoom;

  console.log("The graph length is now: ", Object.keys(graph).length);

  // console.log("The whole  graph now looks like this:\n", graph);

  //   Create array of unexplored rooms
  for (var key in map[room_ID]) {
    if (map[room_ID][key] == "?") {
      unexplored_rooms.push(key);
    }
  }

  console.log("The remaining unexplored rooms are:\n", unexplored_rooms);

}

setTimeout(() => {
    adventure();
  }, coolDown * 1000);
