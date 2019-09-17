const treasureHunt = require("./axiosConfig");
const move = require("./graphLogic");
var fs = require("fs");

// Create empty arrays and list to hold map and paths
let traversalPath = [];
let reversePath = [];
let map = {};
let graphLogic = {};
let name_changed = false;

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
// the map and should continue until map.length==500
adventure = () => {
  let room_ID = currentRoom.room_id;
  let unexplored_rooms = [];

  // Create a helper function to move between rooms and pause for cool down
  // This uses the move() function from graphLogic.js to move between the current and target room
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

  graphLogic[room_ID] = currentRoom;

  console.log("The graph length is now: ", Object.keys(graphLogic).length);

  //   Create array of unexplored rooms
  for (var key in map[room_ID]) {
    if (map[room_ID][key] == "?") {
      unexplored_rooms.push(key);
    }
  }

  console.log("The remaining unexplored rooms are:\n", unexplored_rooms);

  /* 
  The following conditional will handle:
  1. Free movement: there is nothing stopping the explorer from moving to another room
  2. Dead end: the explorer can reverse his/her path until a room has an unexplored exit
  3. Dead end at start: the whole map should have been traversed
  Based on the above, the if statements should have these conditions:
  1. unexplored_rooms > 0
  2. unexplored_rooms == 0 && reversePath.length
  3. unexplored_rooms == 0 && reversePath.length == 0
  TODO: Add in the logic that picks up treasure, etc.
  */

  if (unexplored_rooms.length > 0) {
    console.log("Can explore");
    // Pick a room from the unexplored_rooms array
    let move_forward = unexplored_rooms[0];
    unexplored_rooms = [];

    // Add the next move to the traversalPath array
    traversalPath.push(move_forward);

    // Add the opposite direction move to the reversePath array
    let reverse_move = reverse(move_forward);
    reversePath.push(reverse_move);

    /*
    Use setTimeout and POST('move') to move to the next room
    Add the new room_id to the map
    Add the exits to the map
    Add the opposite direction move to the map
    Change cool down to current room cool down
    */
    setTimeout(() => {
      treasureHunt.post("move", { direction: move_forward }).then(res => {
        // Save room_id to previous_room_id and set new currentRoom
        let previous_room_id = room_ID;
        currentRoom = res.data;

        // Update the map with the path forward from the previous room
        map[previous_room_id][move_forward] = currentRoom.room_id;

        // Set a new room_id
        let new_room_id = currentRoom.room_id;

        // Check if the new_room_id is in the map object, and if not, add it
        if (!map[new_room_id]) {
          map[new_room_id] = {};
        }

        // Add unexplored exits for the new room to the map with a X
        currentRoom.exits.forEach(exit => {
          if (map[new_room_id][exit.toString()] == undefined) {
            map[new_room_id][exit.toString()] = "?";
          }
        });

        // Update new rooms reverse_move room with the previous_room_id
        map[new_room_id][reverse_move] = previous_room_id;

        graphLogic[new_room_id] = currentRoom;

        //Write out the current graph to graphData.json (updates every move)
        // fs.writeFile(
        //   "./graphData.json",
        //   JSON.stringify(graphLogic, null, 2),
        //   "utf-8",
        //   function(err, result) {
        //     if (err) console.log("error", err);
        //   }
        // );

        // // Write out the current map to mapData.json (updates every move)
        // fs.writeFile(
        //   "./mapData.json",
        //   JSON.stringify(map, null, 2),
        //   "utf-8",
        //   function(err, result) {
        //     if (err) console.log("error", err);
        //   }
        // );

        // console.log("Finished writing map and graph data to disk.");

         // Check if the currrent room allows you to change names
        if (currentRoom.room_id === 467 && !name_changed) {
          setTimeout(() => {
          treasureHunt
            .post("change_name", {
            name: "James Hutton",
            confirm: "aye"
          })
            .then(res => {
            coolDown = res.data.cooldown;
            name_changed = true;
          })
          .catch(err => console.log("Error changing names: ", err, currentRoom));
    }, coolDown * 1000);
  }

        // Set the cooldown to the current room's cool down length
        coolDown = res.data.cooldown;

        if (Object.keys(map).length !== 500) {
          setTimeout(() => {
            adventure();
          }, coolDown * 1000);
        }
      });
    });

    // Check if map.length == 500 and if not, loop through adventure() again
  } else if (unexplored_rooms.length == 0 && reversePath.length) {
    console.log("Can not go that way");
    // Get last move from reversePath array
    let reversed_path = reversePath.pop();

    // Add the reversed move to the traversalPath
    traversalPath.push(reversed_path);

    // Use setTimeout and POST('move') to move to the reversed room
    setTimeout(() => {
      treasureHunt
        .post("move", { direction: reversed_path })
        .then(res => {
          currentRoom = res.data;
          coolDown = res.data.cooldown;
          console.log("Currently in room ", currentRoom.room_id);

          if (Object.keys(map).length !== 500) {
            setTimeout(() => {
              adventure();
            }, coolDown * 1000);
          }
        })
        .catch(err =>
          console.log("There was a problem reversing out of a dead end: ", err)
        );
    });
  } else if (unexplored_rooms.length == 0 && reversePath.length == 0) {
    console.log(
      "Map Complete! The map length is: ",
      Object.keys(map).length
    );

    return map;
  }
};

// Run the adventure function (while will continue till map.length==500)
// while waiting the correct amount of time between each move
setTimeout(() => {
  adventure();
}, coolDown * 1000);



