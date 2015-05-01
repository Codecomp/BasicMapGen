function World_loader( tile_size, map_size, canvas_width, canvas_height, position_x, position_y, level){
	this.current_level = level;
	
	this.position_x = position_x; //centeral loaded position
	this.position_y = position_y; 
	
	this.x_start 	= null; //setup update_loaded_grid variables
	this.y_start 	= null;
	this.x_end 		= null;
	this.y_end	 	= null;
	
	this.tiles_x 	= null; //setup update_screen_size variables
	this.tiles_y 	= null;
	this.load_tiles = null;
	this.loader_size= null;
	
	//Function to calculate the required amount of tiles and pixels that will fill the screen
	this.update_screen_size = function(){
		//Calculate how many tiles need to be loaded to fill the screen and surrounding area
		this.tiles_x 		= ( canvas_width / tile_size[0] ) + 4;
		this.tiles_y 		= ( canvas_height / tile_size[1] ) + 4;
		
		//Check to see if tiles required is even and forces it to be odd (to facilitate easier centering of world on load
		if( is_even( this.tiles_x) ){
			this.tiles_x++;
		}
		if( is_even( this.tiles_y) ){
			this.tiles_y++;
		}
		
		//Calculate the required amounts to load
		this.load_tiles		= new Array( this.tiles_x, this.tiles_y); //How many tiles can fit on the screen and need to be loaded	
		this.loader_size	= new Array( ( this.tiles_x * tile_size[0] ), ( this.tiles_y * tile_size[1] ) ) //The Pixel size of the world loaded into memory
	}
	this.update_screen_size();

	//function to calculate where to cope the grid from and to for the drawable area
	this.update_loaded_grid = function(){
		//Remove the middle tile and calculate where to collect the grids data from
		this.x_start = Math.floor(this.position_x - ( ( ( this.tiles_x - 1 ) / 2 ) +1 ) );
		this.y_start = Math.floor(this.position_y - ( ( this.tiles_y - 1 ) / 2 ) );
		
		this.x_end 	= this.x_start + this.tiles_x;
		this.y_end 	= this.y_start + this.tiles_y;	
		
		
		//debug_log("World to be loaded is: "+this.loader_size[0]+" by "+this.loader_size[1]);
		//debug_log("Tile count to load: "+this.load_tiles[0]+" x "+this.load_tiles[1]);
		//debug_log( "Loading world from: "+x_start+" to "+y_start );
		//debug_log( "Loading world to  : "+x_end+" to "+y_end );
	}
	this.update_loaded_grid();
	
	//Function to draw the local scree area onto the canvas
	this.draw = function(canvas){		
		
		var draw_start_x	= tile_size[0] * 3;
		var draw_start_y	= tile_size[1] * 2;
		var draw_count 		= new Array( 0, 0 ); // the cell counter
			//debug_log(draw_start_x);
		
		
		for( var y=this.y_start; y<this.y_end; y++ ){
			draw_count[0] = 0;
			for( var x=this.x_start; x<this.x_end; x++ ){
				canvas.fillStyle = cell_colour(this.current_level.grid[y][x]);
				canvas.fillRect(
					(draw_count[0]*tile_size[0] - draw_start_x),
					(draw_count[1]*tile_size[1] - draw_start_y),
					(draw_count[0]*tile_size[0]+tile_size[0] - draw_start_x),
					(draw_count[1]*tile_size[1]+tile_size[1] - draw_start_y)
				);
				//debug_log("Drawing from "+ (draw_loc[0]*tile_size[0]) + " " + (draw_loc[1]*tile_size[1]) );
				//debug_log("Drawing to    "+ (draw_loc[0]*tile_size[0]+tile_size[0]) + " " + (draw_loc[1]*tile_size[1]+tile_size[1]) );
				
				draw_count[0]++;
			}
			draw_count[1]++;
		}
	}
	
}