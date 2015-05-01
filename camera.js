function Camera(position_x, position_y, tile_size){
	this.tile_size	= tile_size;
	this.position 	= new Array(position_x, position_y); //Current tile the camera is centered on
	this.offset		= new Array(0, 0); //offset in pixels from the current tile
	
	//Function to move the camera
	this.move = function(up, right, down, left){
		this.offset[0] += right + left;
		this.offset[1] += up + down;
	}
	
	//function to check if the offset has gone over the size of a tiloe into a new tile
	this.check_position = function(){
		if( this.offset[0] > tile_size[0] ){
			//move right one
		} else if ( this.offset[0] < negativeInt(tile_size[0])  ) {
			//move left
		} else if ( this.offset[1] > tile_size[1] ){
			//move down one
		} else if ( this.offset[1] < negativeInt(tile_size[1])  ) {
			//move up
		}
		
		//need negatives
	}
	
}