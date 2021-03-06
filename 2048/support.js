documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;


function GetPosTop(i,j) {
	// 距离顶部的位置，只和 i 有关
	return cellSpace + i*(cellSpace+cellSideLength);
}

function GetPosLeft(i,j) {
	// 距离左侧的位置，只和 j 有关
	return cellSpace + j*(cellSpace+cellSideLength);
}

function GetNumberBackGroundColor(number) {
	switch(number){
		case 2:
			return "#eee4da";
		case 4:
			return "#ede0c8";
		case 8:
			return "#f2b179";
		case 16:
			return "#f59563";
		case 32:
			return "#f67c5f";
		case 64:
			return "#f65e3b";
		case 128:
			return "#edcf72";
		case 256:
			return "#edcc61";
		case 512:
			return "#9c0";
		case 1024:
			return "#33b5e5";
		case 2048:
			return "#09c";
		case 4096:
			return "#a6c";
		case 8192:
			return "#93c";
		default:
			return "black";
	}

}

function GetNumberColor(number) {
	if (number<=4) {
		return "#776e65";
	}
	return "white";
}

function NoSpace(board) {
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function CanMoveLeft(board) {
	for (var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++){
			if (board[i][j] != 0) {
				if (board[i][j-1] == 0 || board[i][j] == board[i][j-1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function CanMoveUp(board) {
	for (var j = 0; j < 4; j++) {
		for(var i = 1; i < 4; i++){
			if(board[i][j] != 0){
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function CanMoveRight(board) {
	for (var i = 0; i < 4; i++) {
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}

function CanMoveDown(board) {
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if(board[i][j] != 0){
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function NoBlockRow(row,col1,col2,board) {
	for (var i = col1+1; i < col2; i++) {
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}

function NoBlockCol( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function NoMove(board) {
	if (CanMoveUp(board)||
		CanMoveDown(board)||
		CanMoveRight(board)||
		CanMoveLeft(board)) {
		return false;
	}
	return true;
}
