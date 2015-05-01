function cell_colour(cell){

	var colour = "#000000";
	if( cell == 2 || cell == 3 || cell == 4 || cell == 5 || cell == 6 ){
		colour = "#cccccc";
	}
	if( cell == 1 ){
		colour = "#ffffff";
	}
	if( cell == 7 ){
		colour = "#cc00aa";
	}
	if( cell == 9 ){
		colour = "#7F00FF";
	}
	
	return colour;
}