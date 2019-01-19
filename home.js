// JQUERY PART

$(document).ready(function() {
  $(".first").click(function() {
    $(".play, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    aiCo = "#333";
    huCo = "white";
    console.log("white");
  });
  $(".second").click(function() {
    $(".play, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    console.log("black");
  });

  $("td").click(function() {
    move(this, huPlayer, huCo);
    console.log("clicked");
  });
});

// Global variables

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "#333";

// This function will be called for every click

function move(element, player, color) {
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    if (winning(board, player)) {
      setTimeout(function() {
        swal("YOU WIN!", "Excellent!", "sucess");
        replay();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function() {
        swal("TIE!", "Nice play!", "info");
        replay();
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      if (winning(board, aiPlayer)) {
        setTimeout(function() {
          swal("YOU LOSE!", "Try Again!", "warning");
          replay();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function() {
          swal("TIE!", "Nice play!", "info");
          replay();
        }, 500);
        return;
      }
    }
  }
}

// Replay Function

function replay() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

// The main minimax function

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

// Return the Available Spots or the possible next moves
function avail(reboard) {
  return reboard.filter(s => s != "P" && s != "C");
}

// All Winning Combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
