const startGameBt = document.querySelector('#startGameBtn');

startGameBtn.addEventListener('click', () => {
    modalEl.style.display = 'none'
}) 
// div 게임 판 배열
var cellArr = document.getElementsByClassName("cell");
// 숫자 배열
var numArr = Array(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);

const startGameBtn = document.querySelector('#startGameBtn')


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
// 칸 색칠
function setCellStyle(cell){
    var cellNum = parseInt(cell.innerHTML);
    switch(cellNum){
        case 2:
            cell.style.color="#FFFFFF";
            cell.style.background="#CBDDF5";
            break;
        case 4:
            cell.style.color="#FFFFFF";
            cell.style.background="#B1CCF0";
            break;
        case 8:
            cell.style.color="#FFFFFF";
            cell.style.background="#98BBEB";
            break;
        case 16:
            cell.style.color="#FFFFFF";
            cell.style.background="#7EAAE6";
            break;
        case 32:
            cell.style.color="#FFFFFF";
            cell.style.background="#6499E1";
            break;
        case 64:
            cell.style.color="#FFFFFF";
            cell.style.background="#4B89DC";
            break;
        case 128:
            cell.style.color="#FFFFFF";
            cell.style.background="#447CC7";
            break;
        case 256:
            cell.style.color="#FFFFFF";
            cell.style.background="#3D6FB3";
            break;
        case 512:
            cell.style.color="#FFFFFF";
            cell.style.background="#36629E";
            break;
        case 1024:
            cell.style.color="#FFFFFF";
            cell.style.background="#203A5E";
            break;
        case 2048:
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
            if(numArr[j] != 0){
                k=j;
                while(k<(i+1) && (numArr[k+1]== numArr[k] || numArr[k+1] == 0) ){
                    if( numArr[k+1]==numArr[k] && access==false ){
                    	numArr[k+1] = numArr[k+1] + numArr[k];
                        score.innerHTML = numArr[k+1] + parseInt(score.innerHTML);
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
    
    if(isMoved){
    	randomNum();
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
            if(numArr[j] != 0){
                k=j;
                while(k>(i-(i%4)) && (numArr[k-1]==numArr[k] || numArr[k-1] == 0)){
                    if( numArr[k-1]== numArr[k] && access==false ){
                    	numArr[k-1] = numArr[k-1] + numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k-1] + parseInt(score.innerHTML);
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
    if(isMoved){
    	randomNum();
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
            if(numArr[j] != 0){
                k=j;
                while(k<12 && (numArr[k+4]==numArr[k] || numArr[k+4] == 0)){
                    if( numArr[k+4] == numArr[k] && access==false ){
                    	numArr[k+4] = numArr[k+4]+numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k+4] + parseInt(score.innerHTML);
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
    
    if(isMoved){
    	randomNum();
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
            if(numArr[j] != 0){
                k=j;
                while(k>=i && (numArr[k-4] == numArr[k] || numArr[k-4] == 0)){
                    if( numArr[k-4] == numArr[k] && access==false ){
                        numArr[k-4]=numArr[k-4]+numArr[k];
                        numArr[k] = 0;
                        isMoved=true;
                        access=true;
                        score.innerHTML=numArr[k-4] + parseInt(score.innerHTML);
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
    startGameBtn.addEventListener('cl',()=>{
        animate()
    })
    setNum();
    
    if(isMoved){
    	randomNum();
    } else {
    	check();
    }
}