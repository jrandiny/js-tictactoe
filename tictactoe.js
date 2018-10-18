var currentPlayer = 1;
var board = [0,0,0,0,0,0,0,0,0];

function initArray(location){
  var checkArray = [[0,4,8],[2,4,6]];

  checkArray.push([location,((location+3)%9),((location+6)%9)]);

  var base = Math.floor(location/3)
  base = base * 3;
  checkArray.push([base,base+1,base+2]);

  return checkArray;
}

function evalWin(lastMove){
  var checkArray = initArray(lastMove);

  for(cekGroup in checkArray){
    var menang = board[checkArray[cekGroup][0]] != 0;
    menang = menang && (board[checkArray[cekGroup][0]]==board[checkArray[cekGroup][1]]);
    menang = menang && (board[checkArray[cekGroup][1]]==board[checkArray[cekGroup][2]]);

    if(menang){
      alert("win");
    }
  }
}

function initClickHandler(){
  var tiles = document.getElementsByClassName('tile');

  for(var i = 0; i<tiles.length;i++){
    tiles[i].addEventListener("click", function(event){
      var loc = event.currentTarget.getAttribute("data-loc")-0;
      if(currentPlayer==1){
        event.currentTarget.className = "tile x";
        board[loc]=1;
        currentPlayer = 2;
      }else{
        event.currentTarget.className = "tile o";
        board[loc]=2;
        currentPlayer = 1;
      }

      evalWin(loc);
    },{once:true});
  }
}

window.onload=function(){
  initClickHandler();
}
