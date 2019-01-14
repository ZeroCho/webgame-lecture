var 테이블 = document.getElementById('table');
var 데이터 = [];
var 점수표 = document.getElementById('score');

function 초기화() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function() {
    var 열데이터 = [];
    데이터.push(열데이터);
    var tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(function() {
      열데이터.push(0);
      var td = document.createElement('td');
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  테이블.appendChild(fragment);
}

function 랜덤생성() {
  var 빈칸배열 = [];
  데이터.forEach(function(열데이터, i) {
    열데이터.forEach(function(행데이터, j) {
      if (!행데이터) {
        빈칸배열.push([i, j]);
      }
    });
  });
  if (빈칸배열.length === 0) {
    alert('게임오버: ' + 점수표.textContent);
    테이블.innerHTML = '';
    초기화();
  } else {
    var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
    데이터[랜덤칸[0]][랜덤칸[1]] = 2;
    그리기();
  }
}

function 그리기() {
  데이터.forEach(function(열데이터, i) {
    열데이터.forEach(function(행데이터, j) {
      if (행데이터 > 0) {
        테이블.children[i].children[j].textContent = 행데이터;
      } else {
        테이블.children[i].children[j].textContent = '';
      }
    });
  });
}

초기화();
랜덤생성();
그리기();

var 드래그시작 = false;
var 드래그중 = false;
var 시작좌표;
var 끝좌표;
window.addEventListener('mousedown', function(이벤트) {
  드래그시작 = true;
  시작좌표 = [이벤트.clientX, 이벤트.clientY];
});
window.addEventListener('mousemove', function(이벤트) {
  if (드래그시작) {
    드래그중 = true;
  }
});
window.addEventListener('mouseup', function(이벤트) {
  끝좌표 = [이벤트.clientX, 이벤트.clientY];
  if (드래그중) {
    var 방향;
    var x차이 = 끝좌표[0] - 시작좌표[0];
    var y차이 = 끝좌표[1] - 시작좌표[1];
    if (x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = '왼쪽';
    } else if (x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = '오른쪽';
    } else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = '아래';
    } else if (y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = '위';
    }
    console.log(x차이, y차이, 방향);
  }
  드래그시작 = false;
  드래그중 = false;

  switch (방향) {
    case '왼쪽':
      var 새데이터 = [
        [],
        [],
        [],
        []
      ];
      데이터.forEach(function(열데이터, i) {
        열데이터.forEach(function(행데이터, j) {
          if (행데이터) {
            if (새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length - 1] === 행데이터) {
              새데이터[i][새데이터[i].length - 1] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1];
            } else {
              새데이터[i].push(행데이터);
            }
          }
        });
      });
      console.log(새데이터);
      [1, 2, 3, 4].forEach(function(열데이터, i) {
        [1, 2, 3, 4].forEach(function(행데이터, j) {
          데이터[i][j] = 새데이터[i][j] || 0;
        });
      });
      break;
    case '오른쪽':
      var 새데이터 = [
        [],
        [],
        [],
        []
      ];
      데이터.forEach(function(열데이터, i) {
        열데이터.forEach(function(행데이터, j) {
          if (행데이터) {
            if (새데이터[i][0] && 새데이터[i][0] === 행데이터) {
              새데이터[i][0] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[i][0];
            } else {
              새데이터[i].unshift(행데이터);
            }
          }
        });
      });
      console.log(새데이터);
      [1, 2, 3, 4].forEach(function(열데이터, i) {
        [1, 2, 3, 4].forEach(function(행데이터, j) {
          데이터[i][3 - j] = 새데이터[i][j] || 0;
        });
      });
      break;
    case '위':
      var 새데이터 = [
        [],
        [],
        [],
        []
      ];
      데이터.forEach(function(열데이터, i) {
        열데이터.forEach(function(행데이터, j) {
          if (행데이터) {
            if (새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length - 1] === 행데이터) {
              새데이터[j][새데이터[j].length - 1] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
            } else {
              새데이터[j].push(행데이터);
            }
          }
        });
      });
      console.log(새데이터);
      [1, 2, 3, 4].forEach(function(행데이터, i) {
        [1, 2, 3, 4].forEach(function(열데이터, j) {
          데이터[j][i] = 새데이터[i][j] || 0;
        });
      });
      break;
    case '아래':
      var 새데이터 = [
        [],
        [],
        [],
        []
      ];
      데이터.forEach(function(열데이터, i) {
        열데이터.forEach(function(행데이터, j) {
          if (행데이터) {
            if (새데이터[j][0] && 새데이터[j][0] === 행데이터) {
              새데이터[j][0] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[j][0];
            } else {
              새데이터[j].unshift(행데이터);
            }
          }
        });
      });
      console.log(새데이터);
      [1, 2, 3, 4].forEach(function(행데이터, i) {
        [1, 2, 3, 4].forEach(function(열데이터, j) {
          데이터[3 - j][i] = 새데이터[i][j] || 0;
        });
      });
      break;
  }
  그리기();
  랜덤생성();
});