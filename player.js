function Player(name, job, canvas_player){
	this.name		= name;
	this.position 	= [0, 0]; //Characters position on the map
	this.canvas		= canvas_player;
	
	this.limiter	= 5; //Frames required to pass between movements
	this.limiter_counter = 0;

	this.update_position = function(position_x, position_y){
		this.position = [position_x, position_y];
	}
	
	this.move = function(){
		if(this.limiter_counter == 0){
			if (keydown.a) {
				//$('#player').css('left', ( parseInt($('#player').css('left'), 10) - this.width ) );
				if( movement_check("WEST", this.position[0], this.position[1]) ){
					this.position[0]--;
					this.limiter_counter = this.limiter;
					return true;
				}
			} else if (keydown.d) {
				//$('#player').css('left', ( parseInt($('#player').css('left'), 10) + this.width ) );
				if( movement_check("EAST", this.position[0], this.position[1]) ){
					this.position[0]++;
					this.limiter_counter = this.limiter;
					return true;
				}
			} else if (keydown.w) {
				//$('#player').css('top', ( parseInt($('#player').css('top'), 10) - this.height ) );
				if( movement_check("NORTH", this.position[0], this.position[1]) ){
					this.position[1]--;
					this.limiter_counter = this.limiter;
					return true;
				}
			} else if (keydown.s) {
				//$('#player').css('top', ( parseInt($('#player').css('top'), 10) + this.height ) );
				if( movement_check("SOUTH", this.position[0], this.position[1]) ){
					this.position[1]++;
					this.limiter_counter = this.limiter;
					return true;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	this.draw = function(){
		this.canvas.fillStyle = '#37FF00';
		this.canvas.fillRect(this.position[0]*this.width, this.position[1]*this.height, this.width, this.height);
	}
	
}