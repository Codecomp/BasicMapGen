# Basic Map Generator

Simple HTML5, JavaScript and Canvas random map generation.
This was an exploratory project looking into the use of javaScript OOP and HTML5 games, The plan was to create a map generator that could be used and them explored. Some code for placing a character on screen zoomed in exists but is non functional in this current state as I can't remember how i built it.

## Installation

1. download to your machine
2. Download a copy of jQuery
3. Download a copy of jQuery HotKeys [http://github.com/tzuryby/hotkeys]
4. Place jQuery and jQuery HotKeys in download directory
5. Update links in index.php to jQuery and jQuery HotKeys

## Usage

Use WASD to moe the green player around the map

In game.js you cna change the global game variables  to update room max and min sizes and change between map and game mode.

Setting map mode to true will display the entire map and let your character move around with WASD.
Setting ma mode to false will zoom in on the player, but the player will not be drawn correctly, player is "invisible".

You can change the variables that generate the level_1 variable to change room sizes and max number of rooms
	var level_1 = new Level(grid_size_x, grid_size_y, name, max_num_rooms, max_room_size_x, max_room_size_y, min_room_size_x, min_room_size_y);

## Contributing

Why would you?

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license
