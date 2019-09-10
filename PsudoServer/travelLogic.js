const treasureHunt = require("./axios_config");
const move = require("./graph");
var fs = require("fs");

// Create empty arrays and list to hold map and paths
let traversalPath = [];
let reversePath = [];
let map = {};
let graph = {};
let name_changed = false;

// Create a variable for the current room
let currentRoom = null;
let coolDown = 16; // To account for the 15 second cool down period