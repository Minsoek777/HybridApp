// div 게임 판 배열
var cellArr = document.getElementsByClassName("cell");
// 숫자 배열
var numArr = Array(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
// 게임 초기화
function init(){
    for(var i=0; i<16; i++){
    	cellArr[i].innerHTML="";
    	numArr[i] = 0;
    }
    var score = document.getElementById("score");
    score.innerHTML=0;
    
  	randomNum();
  	randomNum();
}

// 게임 시작
function start(){
	document.getElementById("intro").style.display = 'none';
	document.getElementById("gamearea").style.display = 'block';
	init();
}
// 숫자 랜덤 생성
function randomNum(){
    var done=false;
    while(done==false){
        var num = Math.floor(Math.random()*16);
        if(numArr[num] == 0){
        	numArr[num] = getNewNum();
            done=true;
        }
    }
    setNum();
}

// 숫자 생성 (2,4)
function getNewNum(){
    var rand = parseInt(Math.random()*10);
    if(rand==0) return 4;
    return 2;
}

// div에 숫자 반영
function setNum(){
    for(var i=0; i<16; i++){
		cellArr[i].innerHTML = numArr[i] != 0 ? numArr[i] : ""; 
		setCellStyle(cellArr[i]);
	}
}