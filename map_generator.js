/*
	The class for all of the rooms in a dungeon.  

	Room((size_x, size_y), tiles)

	(size_x, size_y)
		-an ordered pair representing the size of the room.

	tiles
		-a 2D list containing numbers that represent tiles inside the room.
			0 = blank space (non-useable)
			1 = floor tile (walkable)
			2 = corner tile (non-useable)
			3 = wall tile facing NORTH.
			4 = wall tile facing EAST.
			5 = wall tile facing SOUTH.
			6 = wall tile facing WEST.
			7 = door tile.
			8 = stairs leading to a higher lever in the dungeon.
			9 = stairs leading to a lower level in the dungeon.
 */
function Room(size_x, size_y, tiles){
	this.size		= new Array(size_x, size_y);
	this.tiles		= tiles;
	this.position	= null;
}

/*
	Use:
		var level_1 = new Level(100, 100, "Dank Depths", 15, 7, 7, 3, 3);
		debug_log(level_1.print_info());
 */
function Level(grid_size_x, grid_size_y, name, max_num_rooms, max_room_size_x, max_room_size_y, min_room_size_x, min_room_size_y) {
	this.grid_size 		= new Array(grid_size_x, grid_size_y);
	this.name			= name;
	this.max_num_rooms 	= max_num_rooms;
	this.min_room_size	= new Array(min_room_size_x, min_room_size_y);
	this.max_room_size	= new Array(max_room_size_x, max_room_size_y);
	this.rooms 			= new Array(); //Probably needs to be changed to cotnainroom class objects
	this.grid			= new Array();
	
	this.print_info = function(map){
		map = map || false;
		
		debug_log("Printing Level Info...");
		debug_log("Name:    "+this.name);
		debug_log("Size:    "+this.grid_size[0]+" X "+this.grid_size[1]);
		debug_log("Rooms:   "+this.rooms.length);
		
		if(map == true){
			debug_log("Generate map");
			for(var y=0; y<this.grid_size[1]; y++){
				debug_log( this.grid[y].toString() );
			}
		}
	}
	
	this.generate_room = function(min_size_x, min_size_y, max_size_x, max_size_y){
		//Caldulate the random size of the room
		//size_x	= Math.floor(Math.random() * max_size_x) + min_size_x;
		//size_y	= Math.floor(Math.random() * max_size_y) + min_size_y;
		size_x	= getRandomInt(min_size_x, max_size_x); 
		size_y	= getRandomInt(min_size_y, max_size_y);
		tiles	= new Array();
		
		//build the room and set the walls corners and floor values
		for(var y=0; y<size_y; y++){
			var row = new Array();
			for(var x=0; x<size_x; x++){
				if ( x == 0 && y == 0 ){
					row.push(2)
				} else if ( x == size_x-1 && y == 0 ){
					row.push(2)
				} else if ( x == 0 && y == size_y-1 ){
					row.push(2)
				} else if ( x == size_x-1 && y == size_y-1 ){
					row.push(2)
				} else if ( y == 0 ){
					row.push(3)
				} else if ( x == size_x-1 ){
					row.push(4)
				} else if ( y == size_y-1 ){
					row.push(5)
				} else if ( x == 0 ){
					row.push(6)
				} else {
					row.push(1)
				}
			}
			tiles.push(row);
			//debug_log( row.toString() );
		}
		var new_room = new Room(size_x, size_y, tiles);
		return new_room;
	}
	
	this.get_branching_position = function(){
		//Choose a random existing room to branch from
		var branching_room 			= this.rooms[Math.floor(Math.random()*this.rooms.length)];
		var branching_tile_position = new Array(0, 0);
		
		for(var i=0; i<( branching_room.size[0] * branching_room.size[1] ); i++){
			//Choose a ramdom tile
			var x = getRandomInt(branching_room.position[0], (branching_room.position[0] + branching_room.size[0]));
			var y = getRandomInt(branching_room.position[0], (branching_room.position[1] + branching_room.size[1]));
			//debug_log('X: '+x+'     Y: '+y);
			//debug_log('Cell is: '+this.grid[y][x]);
			
			//Check to see if this tile is not a corner or floor tile
			if(this.grid[y][x] > 2){
				branching_tile_position = new Array(x, y);
				break
			}
		}
		
		return branching_tile_position;
	}
	
	this.get_branching_direction = function(branching_position){
		debug_log("branching position tile: "+this.grid[branching_position[1]][branching_position[0]]);
		//Check the direction of the wall for future processing
		var direction = null;
		if ( this.grid[branching_position[1]][branching_position[0]] == 3 ){
			direction = "NORTH"
		} else if ( this.grid[branching_position[1]][branching_position[0]] == 4 ){
			direction = "EAST"
		} else if ( this.grid[branching_position[1]][branching_position[0]] == 5 ){
			direction = "SOUTH"
		} else if ( this.grid[branching_position[1]][branching_position[0]] == 6 ){
			direction = "WEST"
		} else {
			return false
		}
		//debug_log('Branching Position: '+branching_position[0]+' '+branching_position[1]);
		//debug_log('New direction check:'+direction);
		return direction
	}
	
	this.space_for_new_room = function(new_room_size, new_room_position){
		for(var y=new_room_position[1]; y<(new_room_position[1] + new_room_size[1]); y++){
			for(var x=new_room_position[0]; x<(new_room_position[0] + new_room_size[0]); x++){
				if ( x < 0 || x > (this.grid_size[0] - 1) ){
					return false;
				}
				if ( y < 0 || y > (this.grid_size[1] - 1) ){
					return false;
				}
				if ( this.grid[y][x] != 0) {
					return false;
				}
			}
		}
		return true;
	}
	
	this.place_room = function(room, grid_x, grid_y){
		room.position = new Array(grid_x, grid_y);
		
		//Writes the room data onto the grid
		for(var y=0; y<room.size[1]; y++){
			for(var x=0; x<room.size[0]; x++){
				this.grid[y + grid_y][x + grid_x] = room.tiles[y][x];
			}
		}
	}
	
	this.connect_rooms = function(branching_pos, direction){
		//Check to see if door has been placed yet
		var door = false;
	
		//Change the branching position from being a wall with a 25% chance of being a door instead
		if ( getRandomInt(1, 100) >= 75 ){
			this.grid[branching_pos[1]][branching_pos[0]] = 7;
		} else {
			this.grid[branching_pos[1]][branching_pos[0]] = 1;
			door = true;
		}
		
		//If a door has not been placed in the branching position, add a door to the entrance with a 25% probability
		var entrance = 1;
		if ( door == false ){
			if ( getRandomInt(1, 100) >= 75 ){
				entrance = 7;
			}
		}
		//Change the entrance to the new room from being a wall
		if ( direction == "NORTH" ){
			this.grid[branching_pos[1]-1][branching_pos[0]] = entrance;
		} else if ( direction == "EAST" ){
			this.grid[branching_pos[1]][branching_pos[0]+1] = entrance;
		} else if ( direction == "SOUTH" ){
			this.grid[branching_pos[1]+1][branching_pos[0]] = entrance;
		} else if ( direction == "WEST" ){
			this.grid[branching_pos[1]][branching_pos[0]-1] = entrance;
		}
	}
	
	this.generate_dungeon = function(){			
		//Fill out dungeon with unused tiles
		for(var y=0; y<this.grid_size[1]; y++){
			var row = new Array();
			for(var x=0; x<this.grid_size[0]; x++){
				row.push(0)
			}
			this.grid.push(row);
		}
		
		//Generate the first room
		this.rooms.push( this.generate_room( this.min_room_size[0], this.min_room_size[1], this.max_room_size[0], this.max_room_size[1] ) );
		
		//Work out the mid point of the dungeon
		var mid_x = Math.round( this.grid_size[0]/2 - (this.rooms[this.rooms.length-1].size[0]/2) );
		var mid_y = Math.round( this.grid_size[1]/2 - (this.rooms[this.rooms.length-1].size[1]/2) );
		
		//Place the first room
		this.place_room( this.rooms[this.rooms.length-1], mid_x, mid_y );
		
		//Mass loop to build rooms
		for(var i=0; i<( (this.grid_size[0] * this.grid_size[1]) * 2 ); i++){
			//Check for miss entrys
			//if( this.max_num_rooms !=0 ){
			if(this.rooms.length == this.max_num_rooms){
				//If max numbers of rooms ahve been made break out of making more
				break;
			}
			//}
			var branching_pos 		= this.get_branching_position();
			//if( branching_pos[1] != 0 && branching_pos[0] != 0 ){
				
				var direction 				= this.get_branching_direction(branching_pos);
				
				//If branch detected was a directional wall
				if(direction != false){
					var new_room_pos	= new Array(0, 0);
					var new_room			= this.generate_room( this.min_room_size[0], this.min_room_size[1], this.max_room_size[0], this.max_room_size[1] );
					
					if (direction 			== "NORTH") {
						new_room_pos 	= new Array(branching_pos[0] - Math.floor(new_room.size[0]/2), branching_pos[1] - new_room.size[1]);
					} else if (direction 	== "EAST") {
						new_room_pos 	= new Array(branching_pos[0] + 1, branching_pos[1] - Math.floor(new_room.size[1]/2));
					} else if (direction 	== "SOUTH") {
						new_room_pos 	= new Array(branching_pos[0] - Math.floor(new_room.size[0]/2), branching_pos[1] + 1);
					} else if (direction 	== "WEST") {
						new_room_pos 	= new Array(branching_pos[0] - (new_room.size[0]), branching_pos[1] - Math.floor(new_room.size[1]/2));
					}
					
					var space = this.space_for_new_room(new_room.size, new_room_pos );
					if( space == true ){
						this.place_room( new_room, new_room_pos[0], new_room_pos[1] );
						this.rooms.push( new_room );
						this.connect_rooms(branching_pos, direction);
					}
					
					debug_log("Direction: "+direction);
					debug_log("Space "+space);
					debug_log('New room pos: '+new_room_pos[0]+'x'+new_room_pos[1]);
				}
			//}
		}
	}
	
}