var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx   = 0;
var endy   = 0;


$(document).ready(function() {
	// 开始新的游戏
	PrepareForMobile();
	NewGame();
});

function PrepareForMobile() {


	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}

	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function NewGame() {
	// 初始化棋盘
	Init();
	// 随机两个格子生成数据
	GenerateOneNumber();
	GenerateOneNumber();
}

function Init() {
	// 初始化棋盘
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j); // 通过id获得每个小格子
			//设置格子的位置
			gridCell.css('top',GetPosTop(i,j));
			gridCell.css('left',GetPosLeft(i,j));
		}
	}
	// 为每个格子赋值为0
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	score = 0;

	UpdateBoardView();
}

function UpdateBoardView() {
	// 更新board中的数字
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class = "number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $("#number-cell-"+i+"-"+j);

			if (board[i][j] == 0) {
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",GetPosTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",GetPosLeft(i,j)+cellSideLength/2);
			}
			else{
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				theNumberCell.css("top",GetPosTop(i,j));
				theNumberCell.css("left",GetPosLeft(i,j));

				theNumberCell.css("background-color",GetNumberBackGroundColor(board[i][j]));
				theNumberCell.css("color",GetNumberColor(board[i][j]));
				if (board[i][j]>1023) {
					theNumberCell.css("font-size",40+'px');
				}
				else{
					theNumberCell.css("font-size",0.6*cellSideLength+'px');
				}
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false; 
		}

	}
	$('.number-cell').css('line-height',cellSideLength+'px');
	//$('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function GenerateOneNumber() {
	if(NoSpace(board)){
		return false;
	}

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	// while(true){
	// 	if(board[randx][randy] == 0){
	// 		break;
	// 	}
	// 	randx = parseInt(Math.floor(Math.random() * 4));
	// 	randy = parseInt(Math.floor(Math.random() * 4));
	// }
	var times = 0;

	while( times < 50 ) {
		if(board[randx][randy] == 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}  
	
	if (times == 50) {
		for (var i = 0; i < 4; i++) {
			for(var j =0 ; j < 4;j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
	}

	//随机生成一个数字
	var randNum = Math.random() < 0.5 ? 2 : 4;

	//显示数字
	board[randx][randy] = randNum;
	ShowNumWithAnimation(randx,randy,randNum);
}

$(document).keydown(function (event) {
	event.preventDefault();
	switch(event.keyCode){
		case 37: //left
			event.preventDefault();
			if(MoveLeft()){
				setTimeout("GenerateOneNumber()",210) ;
				setTimeout("IsGameOver()",300);
			}
		break;
		case 38: //up
			if(MoveUp()){
				setTimeout("GenerateOneNumber()",210) ;
				setTimeout("IsGameOver()",300);
			}
		break;
		case 39: //right
			event.preventDefault();
			if(MoveRight()){
				setTimeout("GenerateOneNumber()",210) ;
				setTimeout("IsGameOver()",300);
			}
		break;
		case 40: //down
			event.preventDefault();
			if(MoveDown()){
				setTimeout("GenerateOneNumber()",210) ;
				setTimeout("IsGameOver()",300);
			}
		break;
		default:
			break;
	}
});

document.addEventListener('touchstart',function (event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function (event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if (Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth) {
		return;
	}


	if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax > 0) {
			if (MoveRight()) {
				setTimeout("GenerateOneNumber()",210);
				setTimeout("IsGameOver()",300);
			}
		}
		else{
			if(MoveLeft()){
				setTimeout("GenerateOneNumber()",210);
				setTimeout("IsGameOver()",300);
			}
		}
	}
	else{
		if (deltay > 0) {
			if (MoveDown()) {
				setTimeout("GenerateOneNumber()",210);
				setTimeout("IsGameOver()",300);
			}
		}
		else{
			if (MoveUp()) {
				setTimeout("GenerateOneNumber()",210);
				setTimeout("IsGameOver()",300);
			}
		}
	}
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});


function IsGameOver() {
	// body...
	if( NoSpace(board) && NoMove(board)){
		GameOver();
	}
}

function GameOver() {
	alert("GameOver！");
}

function MoveLeft() {
	if(!CanMoveLeft(board)){
		return false;
	}
	//moveleft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && NoBlockRow(i,k,j,board)){
						//move
						ShowMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && NoBlockRow(i,k,j,board) && !hasConflicted[i][k]){
						//move
						ShowMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;


						score += board[i][k];

						UpdateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("UpdateBoardView()",200);
	return true;			
}

function MoveUp() {
	if(!CanMoveUp(board)){
		return false;
	}
	//moveup
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if(board[i][j] != 0){
				for(var k = 0; k < i; k++){
					if(board[k][j] == 0 && NoBlockCol(j,k,i,board)){
						//move
						ShowMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && NoBlockCol(j,k,i,board) && !hasConflicted[k][j]){
						//move
						ShowMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						hasConflicted[k][j] = true;
						UpdateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("UpdateBoardView()",200);
	return true;			
}

function MoveRight() {
	if(!CanMoveRight(board)){
		return false;
	}
	//moveright
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0 ; j--) {
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && NoBlockRow(i,j,k,board)){
						//move
						ShowMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && NoBlockRow(i,j,k,board)&& !hasConflicted[i][k]){
						//move
						ShowMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						hasConflicted[i][k] = true;
						UpdateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("UpdateBoardView()",200);
	return true;			
}

function MoveDown() {
	if(!CanMoveDown(board)){
		return false;
	}
	//moveup
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if(board[i][j] != 0){
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && NoBlockCol(j,i,k,board)){
						//move
						ShowMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && NoBlockCol(j,i,k,board)&& !hasConflicted[k][j]){
						//move
						ShowMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];

						UpdateScore(score);

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("UpdateBoardView()",200);
	return true;			
}	
