function Player(name) {
  this.name=name;
  this.roll = 0;
  this.score = 0;
  this.frame = 0;
  this.finalScore = {};
}

totalPlayers=[]

document.querySelector("#numberOfPlayers").addEventListener("submit", function(event) {
     document.getElementById("numberOfPlayersQuestion").classList.toggle('invisible');
     document.getElementById("nameOfPlayersQuestion").classList.toggle('invisible');
     event.preventDefault();
}, false);

document.querySelector("#namesOfPlayers").addEventListener("submit", function(event) {
     newPlayer = document.getElementById("playerName").value;
     let player = new Player(newPlayer)
     totalPlayers.push(player)
     document.getElementById("playerName").value = ""
     if(totalPlayers.length == document.getElementById("numberofPlayersValue").value){
       document.getElementById("nameOfPlayersQuestion").classList.toggle('invisible');
       document.getElementById("scoreInput").classList.toggle('invisible');
       for (var i = 0; i < totalPlayers.length; i++) {
        $("#scoreboard").append('<div id="name'+i+'" class="col s12"><h3>Player:' +totalPlayers[i].name +'</h3></div>')
       }
     }
     event.preventDefault();
}, false);

document.querySelector("#scoreInput").addEventListener("submit", function(event) {
    checkFrame(Number(document.getElementById("numberOfPinsValue").value))
    document.getElementById("numberOfPinsValue").value = ""
     event.preventDefault();
}, false);

function checkFrame(num){
  let frameNumbers =[];

  function isEqual(arr) {
  return arr == frameNumbers[0];
  }

  function findLowerFrame(arr) {
  return arr < frameNumbers[0];
  }

  for(var i=0; i<totalPlayers.length; i++){
    frameNumbers.push(totalPlayers[i].frame);
  }
    if (frameNumbers.every(isEqual)){
      totalPlayers[0].scores(num);
    } else {
      let playerIndex = frameNumbers.findIndex(findLowerFrame);
      totalPlayers[playerIndex].scores(num);
    }
}


function reducing(a, b) {
  return a + b;
}


function scoreReduction(obj) {
  total = 0;
  bowlingMath= [];

  for (var i = 0; i < Object.keys(obj).length; i++) {
    if(obj[i].reduce(reducing) < 10){
      bowlingMath.push(obj[i].reduce(reducing));
    }
    else if(obj[i].reduce(reducing) == 10 && obj[i].length == 2 && i !== 9) {
        bowlingMath.push(obj[i].reduce(reducing) + obj[i + 1][0]);}
     else if(obj[i].reduce(reducing) == 10 && obj[i].length == 1 && [i] < 9) {
       if(obj[i + 1].length == 2){
         bowlingMath.push(obj[i].reduce(reducing) + obj[i + 1].reduce(reducing));
       } else if(obj[i + 1].length == 1){
         bowlingMath.push(obj[i].reduce(reducing) + obj[i + 1][0] + obj[i + 2][0]);
       }
     }
     else if(obj[i].reduce(reducing) == 10 && obj[i].length == 2 && i == 9){
        bowlingMath.push(10 + obj[10][0]);
        return bowlingMath.reduce(reducing);
    }
    else if(obj[i].reduce(reducing) == 10 && obj[i].length == 1) {
        bowlingMath.push(10 + obj[10][0] + obj[11][0]);
        return bowlingMath.reduce(reducing);
    }
  }
  return bowlingMath.reduce(reducing);
}


Player.prototype.scores = function (num) {
  let name = this.name
  let score = this.finalScore

  function finder(element) {
  return element.name == name && element.finalScore == score;
  }

  if (Object.keys(this.finalScore).length > 11) {
  location.reload()
}
console.log(num);

if(num > 10){
  alert("invalid input: That number is more than there are pins avalible input a number between 0 and 10");
}

if (Object.keys(this.finalScore).length < 9) {
  if (num == 10 && this.roll == 0) {
    this.finalScore[this.frame] = [num];
    this.frame++;
    $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
  } else if (num < 10 && this.roll == 0) {
    this.score += num;
    this.finalScore[this.frame] = [num];
    this.roll++;
    $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
  } else if (num - this.score <= 10 && this.frame < 10 && this.roll == 1) {
    if (num > 10 - this.score) {
      alert("invalid input: That number is more than there are pins avalible input a number between 0 and " + (
      10 - this.score));
    } else {
      this.score += num;
      this.roll = 0;
      this.finalScore[this.frame].push(num);
      this.score = 0;
      this.frame++;
      $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
    }
  }
}
else if (Object.keys(this.finalScore).length == 9){
  if(this.finalScore[8].length == 1 && this.finalScore[8][0] < 10 ){
  this.finalScore[this.frame].push(num);
  this.frame++;
  $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
  } else {
    this.finalScore[this.frame] = [num];
    $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
  }
}
else if (Object.keys(this.finalScore).length == 10) {

  if(this.finalScore[9].length == 1 && this.finalScore[9][0] < 10 ){
  this.finalScore[this.frame].push(num);

  if (this.finalScore[9].reduce(reducing) < 10) {
    this.finalScore[10] = [0];
    this.finalScore[11] = [0];
     $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>","<div><h5>finalScore : "+scoreReduction(this.finalScore)+"<h5><div>")
    alert(this.name + " Good Game you're score was "+ scoreReduction(this.finalScore));
    this.frame = 12;
  }
  }
  //split
  else if(this.finalScore[9].reduce(reducing) == 10 && this.finalScore[9].length == 2){
    this.finalScore[10] = [num];
    this.finalScore[11] = [0];
     $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>","<div><h5>finalScore : "+scoreReduction(this.finalScore)+"</h5><div>")
    alert(this.name + " Good Game you're score was "+ scoreReduction(this.finalScore));
    this.frame = 12;
  }
  else if(this.finalScore[9].reduce(reducing) == 10 && this.finalScore[9].length == 1){
    this.finalScore[10] = [num];
    this.frame++;
    $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>")
  }
}
else if (Object.keys(this.finalScore).length == 11){
  this.finalScore[11] = [num];
   $("#name"+ totalPlayers.findIndex(finder)).append("<div><h5>"+Object.keys(this.finalScore).length+" : "+num+"</h5><div>","<div><h5>finalScore : "+scoreReduction(this.finalScore)+"<h5><div>")
    alert(this.name + " Good Game you're score was "+ scoreReduction(this.finalScore));
    this.frame = 12;
}
};
