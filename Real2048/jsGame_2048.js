// div 게임 판 배열
var cellArr = document.getElementsByClassName("cell");
// 숫자 배열
var numArr = Array(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);

// 상하좌우 이동
function moveNum(obj){
    switch(obj.getAttribute("id")){
        case "ArrowUp":up();  break; //up 위로 올라감
        case "ArrowDown":down(); break; //down 아래로 내렴
        case "ArrowLeft":left(); break;//left 왼쪽으로 감
        case "ArrowRight":right(); break; //right 오른쪽으로 감
    }
}

// 게임 초기화
function init(){
    for(var i=0; i<16; i++){
    	cellArr[i].innerHTML="";
    	numArr[i] = 0;
    }
    var score = document.getElementById("score");
    score.innerHTML=0;
    
  	randomNum(); //숫자 랜덤 
  	randomNum();
}
class map{

}
// 게임 시작
function start(){
	document.getElementById("intro").style.display = 'none';
	document.getElementById("gamearea").style.display = 'block';
	init();
}
//게임 끝
function end() {
	var score = document.getElementById("score").innerHTML;
	var bestScore = document.getElementById("bestScore").innerHTML;
	
	alert("score : "+ score);
	//게임이 종료되면 경고창과 함꼐 자신의 최고점수가 뜸
	if(parseInt(bestScore) < parseInt(score)){
		localStorage.removeItem("2048_best_score");
		localStorage.setItem("2048_best_score", score);
		document.getElementById("bestScore").innerHTML = score;		
	}
	
	
	
	document.getElementById("intro").style.display = 'block';
	document.getElementById("gamearea").style.display = 'none';
	document.getElementById("score").innerHTML = "0";
}
// 숫자 랜덤 생성
function randomNum(){
    var done=false;
    while(done==false){
        var num = Math.floor(Math.random()*16); //16칸 상자 안에 숫자가 랜덤으로 배치
        if(numArr[num] == 0){
        	numArr[num] = getNewNum(); //숫자가 생성됨
            done=true;
        }
    }
    setNum();
}


// 숫자 생성 (2,4)
function getNewNum(){
    var rand = parseInt(Math.random()*10);
    if(rand==0) return 4; //처음에 랜덤으로 아무 자리에 숫자가 생성
    return 2;
}

// div에 숫자 반영
function setNum(){
    for(var i=0; i<16; i++){
		cellArr[i].innerHTML = numArr[i] != 0 ? numArr[i] : ""; 
		setCellStyle(cellArr[i]);
	}
}
// 칸 색칠
function setCellStyle(cell){
    var cellNum = parseInt(cell.innerHTML);
    switch(cellNum){
        case 2://숫자 2에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#CBDDF5";
            break;
        case 4://숫자 4에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#B1CCF0";
            break;
        case 8://숫자 8에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#98BBEB";
            break;
        case 16://숫자 16에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#7EAAE6";
            break;
        case 32://숫자 32에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#6499E1";
            break;
        case 64://숫자 64에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#4B89DC";
            break;
        case 128://숫자 128에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#447CC7";
            break;
        case 256://숫자 256에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#3D6FB3";
            break;
        case 512://숫자 2에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#36629E";
            break;
        case 1024://숫자 1024에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#203A5E";
            break;
        case 2048://숫자 2048에만 나오는 색상
            cell.style.color="#FFFFFF";
            cell.style.background="#15273E";
            break;
        default:
            if(cellNum>2048){
                cell.style.color="#FFFFFF";
                cell.style.background="#0A131F";
            }
            else{
                cell.style.color="#684A23";
                cell.style.background="#E5EEFA";
            }
            break;
    }
}

// 왼쪽
function right(){
    var isMoved=false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    //fixed
    for(var i=14; i>0; i-=4){
        access = false;
        for(var j=i; j>=i-2; j--){
            if(numArr[j] != 0){//숫자들이 이동할 때 같은 숫자끼리 충돌 시 둘이 합쳐져 하나의 블록이 되고 블록의 숫자는 두 블록의 합이 된다.
                k=j;
                while(k<(i+1) && (numArr[k+1]== numArr[k] || numArr[k+1] == 0) ){
                    if( numArr[k+1]==numArr[k] && access==false ){//오른쪽으로 갈 수록 숫자 증가
                    	numArr[k+1] = numArr[k+1] + numArr[k];
                        score.innerHTML = numArr[k+1] + parseInt(score.innerHTML);//숫자 생성지 점수 증가
                        numArr[k] = 0; 
                        isMoved=true;
                        access=true;
                    } else if( numArr[k+1]==numArr[k] && access==true ){
                    	access==false;
                    } else if(numArr[k+1] == 0){
                    	numArr[k+1] = numArr[k];
                        numArr[k] = 0; 
                        isMoved=true;
                    }
                    k++;
                }
            }
        }
        
    }

    setNum();
    
    if(isMoved){//숫자가 움직이면
    	randomNum();//다른 자리에 숫자가 랜덤으로 생성
    } else {
    	check();
    }
}

//오른쪽
function left(){
    var isMoved=false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for(var i=13; i>0; i-=4){
        access = false;
        for(var j=i; j<=i+2; j++){
            if(numArr[j] != 0){//숫자들이 이동할 때 같은 숫자끼리 충돌 시 둘이 합쳐져 하나의 블록이 되고 블록의 숫자는 두 블록의 합이 된다.
                k=j;
                while(k>(i-(i%4)) && (numArr[k-1]==numArr[k] || numArr[k-1] == 0)){
                    if( numArr[k-1]== numArr[k] && access==false ){//왼쪽으로 갈 술혹 숫자 증가
                    	numArr[k-1] = numArr[k-1] + numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k-1] + parseInt(score.innerHTML);//숫자 생성지 점수 증가
                    }
                    else if( numArr[k-1] == numArr[k] && access==true ){
                    	access==false;
                    }
                    else if(numArr[k-1] ==  0 ){
                    	numArr[k-1] = numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                    }
                    k-=1;
                }
            }
        }
        
    }

    setNum();
    if(isMoved){//숫자가 움직이면
    	randomNum();//다른 자리에 숫자가 랜덤으로 생성
    } else {
    	check();
    }
}
//아래
function down(){
    var isMoved=false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for(var i=11; i>7; i-=1){
        access = false;
        for(var j=i; j>=0; j=j-4){
            if(numArr[j] != 0){//숫자들이 이동할 때 같은 숫자끼리 충돌 시 둘이 합쳐져 하나의 블록이 되고 블록의 숫자는 두 블록의 합이 된다.
                k=j;
                while(k<12 && (numArr[k+4]==numArr[k] || numArr[k+4] == 0)){
                    if( numArr[k+4] == numArr[k] && access==false ){
                    	numArr[k+4] = numArr[k+4]+numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k+4] + parseInt(score.innerHTML);//숫자 생성지 점수 증가
                    } else if( numArr[k+4] == numArr[k] && access==true ){
                    	access==false;
                    } else if(numArr[k+4] == 0){
                    	numArr[k+4] = numArr[k];
                        numArr[k] = 0; 
                        isMoved=true;
                    }
                    k+=4;
                }
            }
        }
    }

    setNum();
    
    if(isMoved){//숫자가 움직이면
    	randomNum();//다른 자리에 랜덤으로 숫자가 생성
    } else {
    	check();
    }
}

//위
function up(){
    var isMoved=false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for(var i=7; i>3; i-=1){
        access = false;
        for(var j=i; j<(i+9); j+=4){
            if(numArr[j] != 0){//숫자들이 이동할 때 같은 숫자끼리 충돌 시 둘이 합쳐져 하나의 블록이 되고 블록의 숫자는 두 블록의 합이 된다.
                k=j;
                while(k>=i && (numArr[k-4] == numArr[k] || numArr[k-4] == 0)){
                    if( numArr[k-4] == numArr[k] && access==false ){
                        numArr[k-4]=numArr[k-4]+numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k-4] + parseInt(score.innerHTML);//숫자 생성지 점수 증가
                    }
                    else if( numArr[k-4] == numArr[k] && access==true ){
                    	access==false;
                    }
                    else if(numArr[k-4] == 0){
                    	numArr[k-4]=numArr[k];
                        numArr[k] = 0; 
                        isMoved=true;
                    }
                    k-=4;
                }
            }
        }
    }

    setNum();
    
    if(isMoved){//숫자가 움직이면
    	randomNum();//다른 자리에 숫자가 랜덤으로 생성
    } else {
    	check();
    }
}

// 게임 종료 체크
function check(){
	var x = false;
	for(var i =0 ;i<16;i++){
        switch(i){
            case (0):
                if(numArr[0]==numArr[1]||numArr[0]==numArr[4]){
                    x=true;    
                };
                break;
            case (1):
                if(numArr[1]==numArr[0]||numArr[1]==numArr[2]||numArr[1]==numArr[5]){
                    x=true;    
                };
                break;
            case (2):
                if(numArr[2]==numArr[1]||numArr[2]==numArr[3]||numArr[2]==numArr[6]){
                    x=true; 
                };
                break;
            case (3):
                if(numArr[3]==numArr[2]||numArr[3]==numArr[7]){
                    x=true; 
                };
                break;
            case (4):
                if(numArr[4]==numArr[0]||numArr[4]==numArr[5]||numArr[4]==numArr[8]){
                  x=true;   
                };
                break;
            case (5):
                if(numArr[5]==numArr[1]||numArr[5]==numArr[4]||numArr[5]==numArr[6]||numArr[5]==numArr[9]){
                    x=true; 
                };
                break;
            case (6):
                if(numArr[6]==numArr[2]||numArr[6]==numArr[5]||numArr[6]==numArr[7]||numArr[6]==numArr[10]){
                    x=true; 
                };
                break;
            case (7):
                if(numArr[7]==numArr[3]||numArr[7]==numArr[6]||numArr[7]==numArr[11]){
                    x=true; 
                };
                break;
            case (8):
                if(numArr[8]==numArr[4]||numArr[8]==numArr[9]||numArr[8]==numArr[12]){
                    x=true; 
                };
                break;
            case (9):
                if(numArr[9]==numArr[5]||numArr[9]==numArr[8]||numArr[9]==numArr[10]||numArr[9]==numArr[13]){
                    x=true; 
                };
                break;
            case (10):
                if(numArr[10]==numArr[6]||numArr[10]==numArr[9]||numArr[10]==numArr[11]||numArr[10]==numArr[14]){
                    x=true; 
                };
                break;
            case (11):
                if(numArr[11]==numArr[7]||numArr[11]==numArr[10]||numArr[11]==numArr[15]){
                    x=true; 
                };
                break;
            case (12):
                if(numArr[12]==numArr[8]||numArr[12]==numArr[13]){
                    x=true; 
                };
                break;
            case (13):
                if(numArr[13]==numArr[9]||numArr[13]==numArr[12]||numArr[13]==numArr[14]){
                    x=true; 
                };
                break;
            case (14):
                if(numArr[14]==numArr[10]||numArr[14]==numArr[13]||numArr[14]==numArr[15]){
                    x=true; 
                };
                break;
            case (15):
                if(numArr[15]==numArr[11]||numArr[15]==numArr[14]){
                    x=true; 
                };
                break;
        }
        
        if(numArr[i] == 0){
        	x=true; 
            break;
        }
	}
    if(!x){
    	end();
   	}
}
