var currentPlayer = 1;
var board = [0,0,0,0,0,0,0,0,0];
var playing = true;

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
      if(currentPlayer==1){
        openDialog("O menang");
      }else{
        openDialog("X menang");
      }
      playing = false;
    }
  }

  if(playing){
    if(!board.includes(0)){
      openDialog("Seri")
      playing = false;
    }
  }
}

function updateTurnIndicator(){
  if(currentPlayer==1){
    document.getElementById("turnX").className="slider-part X turn";
    document.getElementById("turnO").className="slider-part O";
  }else{
    document.getElementById("turnO").className="slider-part O turn";
    document.getElementById("turnX").className="slider-part X";
  }
}

function initGame(){
  var tiles = document.getElementsByClassName('tile');

  updateTurnIndicator();

  for(var i = 0; i<tiles.length;i++){
    tiles[i].addEventListener("click", function(event){
      if(playing){
        var loc = event.currentTarget.getAttribute("data-loc")-0;
        if(currentPlayer==1){
          event.currentTarget.className = "tile x bg-color-X";
          board[loc]=1;
          currentPlayer = 2;
        }else{
          event.currentTarget.className = "tile o bg-color-O";
          board[loc]=2;
          currentPlayer = 1;
        }

        evalWin(loc);
        updateTurnIndicator();
      }
    },{once:true});
  }
}

function openDialog(text){
  var modal = document.getElementById("modal-result");
  var modalText = document.getElementById("modal-title")
  modalText.innerHTML = text;
  modal.className = "modal modal-open";
}

function closeDialog(){
  var modal = document.getElementById("modal-result");
  modal.className = "modal";
}

window.onload=function(){
  initGame();
}
