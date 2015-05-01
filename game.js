$(window).load(function() {

	//Setup the canvas to contail the tile map and define its size
	var ct				= document.getElementById("screen");
	$('#screen').css('width', canvas_width);
	$('#screen').attr('width', canvas_width);
	$('#screen').attr('height', canvas_height);
	canvas_tiles		= ct.getContext("2d");

	//Setup the canvas to contail the player
	var cp				= document.getElementById("player");
	$('#player').css('width', canvas_width);
	$('#player').attr('width', canvas_width);
	$('#player').attr('height', canvas_height);
	canvas_player		= cp.getContext("2d");

	$('#game_screen').css('width', canvas_width);
	$('#game_screen').css('height', canvas_height);

	game_start(); //Start the game

});

var canvas_tiles = null;
var canvas_player = null;

var tile_size 			= new Array();
var player_size			= new Array();
var map_size			= new Array( 100, 100 );
var canvas_width 		= 600; 				//Pixel width of game screen
var canvas_height 		= 400; 				//Pixel height of game screen
var game_fps			= 30; 				//FPS for the game to update, lower number slower the game runs but more stable
var game_running		= true;
var map_mode			= true;				//Determines weather to zoom in on character or not
var map_generated		= false;			//Determines if the map has been drawn already in map mode

if( map_mode == true ){
	tile_size 			= [4, 4]; 			//defines pixel size per tile
	player_size			= [4, 4];			//Defines the player sprite size in px
} else {
	tile_size 			= [20, 20]; 		//defines pixel size per tile
	player_size			= [20, 20];			//Defines the player sprite size in px
}

var world_loader		= null;

//fucntion to start the game
function game_start(){

	//Generate test level
	var level_1 = new Level(map_size[0], map_size[1], "Intro land", 20, 10, 10, 8, 8);
	level_1.generate_dungeon();
	level_1.print_info(false);

	//Grabs the top floor room, gets its size and chooses a random position that is not an exterior wall
	var starter_room 	= level_1.rooms[0];
	var starter_x 		= starter_room.position[0] + getRandomInt( 1, (starter_room.size[0]-2) );
	var starter_y 		= starter_room.position[1] + getRandomInt( 1, (starter_room.size[1]-2) );
	level_1.grid[starter_y][starter_x] = 9; //Places a purple block on start position

	//Create the player
	var player			= new Player('Testificate', 1, canvas_player);
	player.width 		= player_size[0];
	player.height 		= player_size[1];
	player.position[0] 	= starter_x;
	player.position[1] 	= starter_y;

	//Loads the world
	world_loader = new World_loader( tile_size, map_size, canvas_width, canvas_height, starter_x, starter_y, level_1 );

	//Setup the game loop that runs functions at the FPS rate
	setInterval(function() {
		//Check to see if the game has been paused
		if( game_running == true ){
			update(player, world_loader);
			draw(player, world_loader, level_1);
		}
	}, 1000/game_fps);
}

//Function to control data changes
function update(player, world_loader){
	//If not viewing map mode clear the map at the FPS rate
	if( !map_mode ){
		canvas_tiles.clearRect(0, 0, canvas_width, canvas_height);
	}

	//Count down frames before player can move
	if( player.limiter_counter > 0 ){ player.limiter_counter --; }

	//Check if player if moving
	if( player.move() ){
		debug_log("Movement made");

		canvas_player.clearRect(0, 0, canvas_width, canvas_height);

		if( !map_mode ){
			world_loader.position_x = player.position[0];
			world_loader.position_y = player.position[1];
			world_loader.update_loaded_grid();
		}
	}
}

//Function to control drawing on the canvas
function draw(player, world_loader, level_1){
	//Draw map mode
	if( map_mode && !map_generated ){
		debug_log('Drawing the map');
		map_generated = true; 	//Only draw the map once
		draw_map(level_1);		//Draw the map
	}
	//Draw non map mode
	if( !map_mode ) {
		world_loader.draw(canvas_tiles); //Draw the cameras view of the map
	}
	//Draw the player
	player.draw();
	//game_running	= false;	//Uncomment to only generate mp once and not generate at FPS
}

//Function to draw the map on the canvas (Big maps cause massive slowdowns)
function draw_map(level){
	for(var y=0; y<level.grid_size[1]; y++){
		for(var x=0; x<level.grid_size[0]; x++){
			canvas_tiles.fillStyle = cell_colour(level.grid[y][x]);
			canvas_tiles.fillRect((x*4),(y*4),(x*4+4),(y*4+4)); //TODO make this use tile width/height
		}
	}
}

function movement_check(direction, new_pos_x, new_pos_y){
	debug_log("Checking movement "+direction);
	if( direction == "WEST" ){
		debug_log((new_pos_x+1));
		if( check_cell( (new_pos_x-1), new_pos_y ) ){
			return true;
		}
	} else if( direction == "EAST" ) {
		if(check_cell( (new_pos_x+1), new_pos_y ) ){
			return true;
		}
	} else if( direction == "NORTH" ) {
		if( check_cell( new_pos_x, (new_pos_y-1) ) ){
			return true;
		}
	} else if( direction == "SOUTH" ) {
		if( check_cell( new_pos_x, (new_pos_y+1) ) ){
			return true;
		}
	}

	return false;
}

//Function to check if a cell is able to be moved into
function check_cell(pos_x, pos_y){
	debug_log( "Checking movement into cell "+pos_x+" x "+pos_y+" Type: "+world_loader.current_level.grid[pos_y][pos_x] );

	if( world_loader.current_level.grid[pos_y][pos_x] == 1 || world_loader.current_level.grid[pos_y][pos_x] == 7 || world_loader.current_level.grid[pos_y][pos_x] == 9 ){
		return true;
	}
	return false;
}