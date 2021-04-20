let field = [' ',' ',' ',
			 ' ',' ',' ',
			 ' ',' ',' '];

let player_char = 'o';
let bot_char = 'x';


function playerLost(){
	if(field[0]==field[1] && field[1]==field[2] && field[0]==bot_char) return true;
	if(field[3]==field[4] && field[4]==field[5] && field[3]==bot_char) return true;
	if(field[6]==field[7] && field[7]==field[8] && field[6]==bot_char) return true;

	if(field[0]==field[3] && field[3]==field[6] && field[0]==bot_char) return true;
	if(field[1]==field[4] && field[4]==field[7] && field[1]==bot_char) return true;
	if(field[2]==field[5] && field[5]==field[8] && field[2]==bot_char) return true;

	if(field[0]==field[4] && field[4]==field[8] && field[0]==bot_char) return true;
	if(field[2]==field[4] && field[4]==field[6] && field[2]==bot_char) return true;

	else return false;
}
function playerWin(){
	if(field[0]==field[1] && field[1]==field[2] && field[0]==player_char) return true;
	if(field[3]==field[4] && field[4]==field[5] && field[3]==player_char) return true;
	if(field[6]==field[7] && field[7]==field[8] && field[6]==player_char) return true;

	if(field[0]==field[3] && field[3]==field[6] && field[0]==player_char) return true;
	if(field[1]==field[4] && field[4]==field[7] && field[1]==player_char) return true;
	if(field[2]==field[5] && field[5]==field[8] && field[2]==player_char) return true;

	if(field[0]==field[4] && field[4]==field[8] && field[0]==player_char) return true;
	if(field[2]==field[4] && field[4]==field[6] && field[2]==player_char) return true;

	else return false;
}
function allOccupied() {
	let i=0;
	for(; i<9; i++){
		if(field[i] == ' ') return false;
	}
	return true;
}

function botTurn(){

}

function checkWin(){
	if(playerWin()) {
		for(let i=0; i<9; i++){
			document.getElementById('cell'+i).className = 'cell_pressed';
		}
		alert("You win!");
	}
}
function checkLost(){
	if(playerLost()) {
		for(let i=0; i<9; i++){
			document.getElementById('cell'+i).className = 'cell_pressed';
		}
		alert("You lost!");
	}
}
function cellIsFree(i=0){
	if(field[i] == ' '){
		return true;
	}
	else return false;
}
function max(a, b){
	if(a>b) return a;
	else return b;
}
function min(a, b){
	if(a<b) return a;
	else return b;
}
function minimax(depth, bot_turn){
	if(playerWin()) return -1;
	else if(playerLost()) return 1;
	else if(allOccupied()) return 0;

	if(bot_turn == true){
		let i=0;
		let best_score = -2;
		for(; i<9; i++){
			if(cellIsFree(i)){
				field[i] = bot_char;
				best_score = max(best_score, minimax(depth+1, false));
				field[i] = ' ';
			}
		}
		return best_score;
	}
	else {
		let i=0;
		let best_score = 2;
		for(; i<9; i++){
			if(cellIsFree(i)){
				field[i] = player_char;
				best_score = min(best_score, minimax(depth+1, true));
				field[i] = ' ';
			}
		}
		return best_score;
	}
}

function botTurn(){
	let cell = 9;
	let best_score = -2;
	let i=0;
	for(; i<9; i++){
		if(cellIsFree(i)){
			field[i] = bot_char;
			let score = minimax(0, false);
			field[i] = ' ';
			if(score > best_score){
				best_score = score;
				cell = i;
			}
		}
	}
	field[cell] = bot_char;
	let block = document.getElementById('cell'+cell);
	block.textContent = bot_char;
	block.className = "cell_pressed";
}

function press(elem) {
	if(elem.className != "cell_pressed") {
		elem.textContent = player_char;
		field[elem.id.slice(-1)] = player_char;

		setTimeout(checkWin, 200);
		elem.className = "cell_pressed";

		setTimeout(botTurn, 300);
		setTimeout(checkLost, 400);
	}
}


