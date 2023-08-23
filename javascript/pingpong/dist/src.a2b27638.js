// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
//global variables

targetWidth = 800;
targetHeight = 1160;
width = Math.min(targetWidth, window.innerWidth);
height = Math.min(targetHeight, window.innerHeight);
var player1_Score = 0;
var player2_Score = 0;
var gameStarted = false;

//we are using local storage to keep track of HighScore and the person who scored it
//using local storage enables us to retrieve data even after refreshing the page
var leadingPlayer = localStorage.getItem('leadingPlayer') || "This is your First game";
var topScore = localStorage.getItem('topScore') || "0";

//game objects
var player = {
  pWidth: 150,
  pHeight: 40,
  pSpeed: 100,
  pX: 475
};
//player 1 has one property different from player 2 thats "y" direction.
var player1 = {
  p1Y: 10
};
var player2 = {
  p2Y: height - 50
};
var ball = {
  x: width / 2,
  y: height / 2,
  VX: 5,
  VY: 5 //Game level set to easy by default for testing
  //increasing the velocity makes the game challenging
  //5 is easy level, 10 is medium and 15 is hard
};
// Get the audio element
var clickSound = document.getElementById("clickSound");
var gameUP = document.getElementById("gameUP");

//functions
function init() {
  var canvas = document.getElementById("myCanvas");
  canvas.width = width;
  canvas.height = height;
  pen = canvas.getContext('2d');
  drawball();
  drawLine();
  gameloop(canvas);
}

// Display initial alert message
window.alert("Press Enter TWICE to start the game");

// Listen for the Enter key press to start the game
window.addEventListener("keydown", function (event) {
  if (!gameStarted && event.key == "Enter") {
    gameStarted = true; // Set gameStarted to true
    init(); // Start the game only once when Enter key is pressed
  }
});

function gameloop(canvas) {
  var pen = canvas.getContext("2d");
  pen.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawball();
  drawLine();
  moveBall();
  ballCollision();
  // Call other update functions if needed

  requestAnimationFrame(function () {
    return gameloop(canvas);
  }); //this line actually makes the "looping work" 
}
;
function drawLine() {
  //a thin dotted mid-line that goes over canvas board
  pen.beginPath();
  pen.setLineDash([20]);
  pen.moveTo(0, height / 2);
  pen.lineTo(width, height / 2);
  pen.strokeStyle = "black";
  pen.stroke();
}
function drawPlayer() {
  pen.fillStyle = 'blue';
  pen.fillRect(player.pX, player1.p1Y, player.pWidth, player.pHeight);
  pen.strokeRect(player.pX, player1.p1Y, player.pWidth, player.pHeight);
  pen.fillRect(player.pX, player2.p2Y, player.pWidth, player.pHeight);
  pen.strokeRect(player.pX, player2.p2Y, player.pWidth, player.pHeight);
}
//eventListener that is responsible for catching the keyPress of playerBar movement 
window.addEventListener("keydown", movePlayer);
function movePlayer(event) {
  var keyPressed = event.keyCode;
  var playerRight = 68;
  var playerLeft = 65;
  var RightArrow = 39;
  var LeftArrow = 37;
  switch (keyPressed) {
    case RightArrow:
    case playerRight:
      if (player.pX + player.pWidth < width) {
        player.pX += player.pSpeed;
      }
      break;
    case LeftArrow:
    case playerLeft:
      if (player.pX > 0) {
        player.pX -= player.pSpeed;
      }
      break;
  }
}
function drawball() {
  pen.beginPath();
  pen.arc(ball.x, ball.y, 35, 2 * Math.PI, false);
  pen.fillStyle = "red";
  pen.fill();
}
function moveBall() {
  ball.x += ball.VX;
  ball.y += ball.VY;
  //make the ball to reverse the 'x' direction when touches side borders
  if (ball.x < 0 || ball.x > width) {
    ball.VX *= -1;
  }
  //make the ball to reset position when 'Y' direction goes out of boundary
  if (ball.y < 0) {
    // Play the sound effect
    gameUP.play();
    player2_Score++;
    console.log("player2_Score:", player2_Score);
    if (player1_Score > player2_Score) {
      leadingPlayer = "Player 1";
    } else {
      leadingPlayer = "Player 2";
    }
    leadScore = Math.max(topScore, player1_Score, player2_Score); //gets the highest score
    localStorage.setItem('topScore', leadScore); //updates the value to topScore (topScore is variable present in local storage)
    localStorage.setItem('leadingPlayer', leadingPlayer); //update the leadingPlayer also (in Local Storage)
    var retrievedHighScore = localStorage.getItem('topScore'); // Retrieves the value from Local Storage

    //show alert
    window.alert("player 2 win this round, High Score is" + "  :  " + retrievedHighScore + ", scored  by " + leadingPlayer + "        please press ENTER to start next round");
    resetBall(); //calling reset function
  } else if (ball.y > height) {
    // Play the sound effect
    gameUP.play();
    player1_Score++;
    console.log("player1_Score:", player1_Score);
    if (player1_Score > player2_Score) {
      leadingPlayer = "Player 1";
    } else {
      leadingPlayer = "Player 2";
    }
    leadScore = Math.max(topScore, player1_Score, player2_Score); //gets the highest score
    localStorage.setItem('topScore', leadScore); //updates the value to topScore (topScore is variable present in local storage)
    var _retrievedHighScore = localStorage.getItem('topScore'); // Retrieves the value from Local Storage
    localStorage.setItem('leadingPlayer', leadingPlayer); //update the leadingPlayer also (in Local Storage)

    //show alert
    window.alert("player 1 win this round, High Score is" + "  :  " + _retrievedHighScore + ", scored  by " + leadingPlayer + "        please press ENTER to start next round");
    resetBall(); //calling reset function
  }
}

function resetBall() {
  // bringing ball to middle position
  ball.x = width / 2;
  ball.y = height / 2;
  // bringing playerBar to normal location
  player.pX = width / 2 - player.pWidth / 2;
}
function ballCollision() {
  // When the ball collides with playerBar then reverse the Y direction
  if (ball.y < player1.p1Y + player.pHeight && ball.x >= player.pX && ball.x <= player.pX + player.pWidth) {
    ball.VY *= -1;
    // Play the sound effect
    clickSound.play();
  }
  // When the ball collides with playerBar then reverse the Y direction
  if (ball.y > player2.p2Y - player.pHeight && ball.x >= player.pX && ball.x <= player.pX + player.pWidth) {
    ball.VY *= -1;
    // Play the sound effect
    clickSound.play();
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37767" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map