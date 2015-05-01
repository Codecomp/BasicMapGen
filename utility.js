/*
 * Utility functions for use in number and error processing
 */

//Output Content tomultiple devug locations for ease of viewing
function debug_log(content){
	//Comment/Uncomment the preferred method of logging errors, turning on console.log will flood console log on world gen!

	//console.log(content);
	$('#game_debug').append('<p>'+content+'</p>');
}

//Generate a random rounded down number between 2 numbers in a standard way
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function negativeInt( num ) {
	return num - (num * 2);
}

function is_even(num) 
{
   return isNumber(num) && (num % 2 == 0);
}

function is_odd(num)
{
   return isNumber(num) && (num % 2 == 1);
}

function isNumber(n)
{
   return n == parseFloat(n);
}