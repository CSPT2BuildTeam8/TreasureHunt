# Load world
world = World()

world.loadGraph(roomGraph)
world.printRooms()
player = Player("Name", world.startingRoom)

#Easily get reverse direction of direction just traveled
reverseDir = {'n': 's', 's': 'n', 'e': 'w', 'w': 'e'}

# Path traveled to visit all the rooms
traversalPath = []

# Keep track of path segments for traveling back
reversePath = [None]

#Room graph I am building
rooms = {}

#Dictionary to iterate through exits
roomsdict = {}

# visited = [False] * (len(roomGraph)+1)

#Add room zero to graph & dictionary
rooms[0] = player.currentRoom.getExits()
roomsdict[0] = player.currentRoom.getExits()

#get graph to same length as roomGraph - to ensure all rooms visited
while len(rooms) < len(roomGraph)-1:
    if player.currentRoom.id not in rooms:
        #Add room to graph
        rooms[player.currentRoom.id] = player.currentRoom.getExits()
        roomsdict[player.currentRoom.id] = player.currentRoom.getExits()
        #Get last direction traveled
        lastDirection = reversePath[-1]
        #Remove last exit from exits to explore - make dead ends
        roomsdict[player.currentRoom.id].remove(lastDirection)

    # Hit dead end room, turn around
    while len(roomsdict[player.currentRoom.id]) < 1: 
        reverse = reversePath.pop()
        traversalPath.append(reverse)
        player.travel(reverse)

    #First available exit in room
    exit_dir = roomsdict[player.currentRoom.id].pop(0)
    #Add to traversal list
    traversalPath.append(exit_dir)
    # Add reverse direction to reverse path
    reversePath.append(reverseDir[exit_dir])
    # travel
    player.travel(exit_dir)

    #To get last room
    if len(roomGraph) - len(rooms) ==1:
        rooms[player.currentRoom.id] = player.currentRoom.getExits()

# print(rooms)


# TRAVERSAL TEST
visited_rooms = set()
player.currentRoom = world.startingRoom
visited_rooms.add(player.currentRoom)
for move in traversalPath:
    player.travel(move)
    visited_rooms.add(player.currentRoom)

if len(visited_rooms) == len(roomGraph):
    print(f"TESTS PASSED: {len(traversalPath)} moves, {len(visited_rooms)} rooms visited")
else:
    print("TESTS FAILED: INCOMPLETE TRAVERSAL")
    print(f"{len(roomGraph) - len(visited_rooms)} unvisited rooms")



#######
# UNCOMMENT TO WALK AROUND
#######
# player.currentRoom.printRoomDescription(player)
# while True:
#     cmds = input("-> ").lower().split(" ")
#     if cmds[0] in ["n", "s", "e", "w"]:
#         player.travel(cmds[0], True)
#     else:
#         print("I did not understand that command.")