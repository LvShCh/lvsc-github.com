function ShowNumWithAnimation(i,j,number) {
	var numberCell = $("#number-cell-"+i+"-"+j);

	numberCell.css("background-color",GetNumberBackGroundColor(number));
	numberCell.css("color",GetNumberColor(number));
	numberCell.text(number);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:GetPosTop(i,j),
		left:GetPosLeft(i,j)
	},50);
}

function ShowMoveAnimation(fromx,fromy,tox,toy) {
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:GetPosTop(tox,toy),
		left:GetPosLeft(tox,toy),
	},200);
}

function UpdateScore(score) {
	$("#score").text(score);
}
