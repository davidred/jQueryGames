(function () {
  if (typeof H === "undefined") {
    window.H = {};
  }

  var View = H.View = function (game) {
    this.game = game;
    this.startTower;
    this.endTower;
    this.setupStacks();
  };

  View.prototype.bindEvents = function () {
    var $towers = $(".tower");
    var that = this;

    $towers.on("click", function () {
      if (that.startTower === undefined) {
        that.startTower = this;
      } else {
        that.endTower = this;
        that.makeMove();
        that.startTower = undefined;
        that.endTower = undefined;
      };
    });
  }

  View.prototype.makeMove = function() {
    var startTowerIdx = $(".tower").index(this.startTower);
    var endTowerIdx = $(".tower").index(this.endTower);

    that = this;

    //determine if move is valid
    if (this.game.isValidMove(startTowerIdx, endTowerIdx)) {
      //make the move
      this.game.move(startTowerIdx, endTowerIdx);

      //move disc
      that.moveDisc(startTowerIdx, endTowerIdx);

      //check if won
      if (this.game.isWon()) {
        alert("u rule")
      }
    } else {
      alert("Invalid move");
    }
  };

  View.prototype.moveDisc = function(startTowerIdx, endTowerIdx) {
    firstTowerRowIdx = startTowerIdx * 3; // 0 * 3 => 0, 1 * 3 => 3
    secondTowerRowIdx = endTowerIdx * 3;

    console.log("taking list num: " + firstTowerRowIdx);
    console.log(secondTowerRowIdx);

    var $towerRows = $('.tower-row');

    //find top disc
    for (var i = firstTowerRowIdx; i < firstTowerRowIdx + 3; i++) {
      if ($($towerRows[i]).hasClass("disc1") ||
          $($towerRows[i]).hasClass("disc2") ||
          $($towerRows[i]).hasClass("disc3")) {
            break;
      }
    };

    console.log("top disc is: " + i);

    var klass = $($towerRows[i]).attr("class");
    $($towerRows[i]).removeClass(klass);
    $($towerRows[i]).addClass("tower-row");
    console.log($towerRows[i]);

    for (var j = secondTowerRowIdx + 2; j >= secondTowerRowIdx; j--) {
      if (!$($towerRows[j]).hasClass("disc1") &&
          !$($towerRows[j]).hasClass("disc2") &&
          !$($towerRows[j]).hasClass("disc3")) {
            break;
      }
    };

    console.log("lowest empty disc is: " + j);

    console.log($towerRows[j]);
    $($towerRows[j]).addClass(klass);

  };

  View.prototype.setupStacks = function () {
    var $body = $("body");
    var $board = $("<ul></ul>");

    $body.append($board);
    // var $board = $("ul")
    $board.addClass("board");

    for (var i = 0; i < 3; i++) {
      var $tower = $("<li></li>");
      $tower.addClass("tower");
      $board.append($tower);
      var $grid = $("<ul></ul>");
      $grid.addClass("tower-grid");
      $tower.append($grid);
      //

      for (var j = 0; j < 3; j++) {
        var $row = $("<li></li>");
        $row.addClass("tower-row");
        $grid.append($row);
      };
    };

    var $firstTower = $($("tower-grid")[0]);

    for (var i = 0; i < 3; i++){
      $($(".tower-row")[i]).addClass("disc"+(i+1));
    }
  };


})();