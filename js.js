let difficulty_level = "";
let score = 0;
let selected = [];
let clicks = 0;
menu();

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function menu(){
  let difficulty = ["2x2","4x4","6x6"];
  let div = document.createElement("div");
  div.setAttribute("class","menu");
  let div_button = document.createElement("div");
  div_button.setAttribute("class","menu-button");
  let p_main = document.createElement("p");
  p_main.innerHTML = "Memory game";
  p_main.setAttribute("id","p-main");
  let p_sub = document.createElement("p");
  p_sub.innerHTML = "Select difficulty:";
  p_sub.setAttribute("id","p-sub");
  div.appendChild(p_main);
  div.appendChild(p_sub);
  for(let i = 0;i<3;i++){
    let button = document.createElement("button");
    button.innerHTML = difficulty[i];
    button.addEventListener("click",() => {
      game(difficulty[i]);
      difficulty_level = difficulty[i];
    });
    div_button.appendChild(button);
  }
  div.appendChild(div_button);
  document.body.appendChild(div);
}

function game(difficulty_level){
remove_menu();
let ikone = ["./img/bee.png","./img/bird.png","./img/bug.png","./img/bull.png","./img/butterfly.png","./img/cat.png","./img/chick.png","./img/chicken.png","./img/cow.png","./img/crab.png","./img/dog.png","./img/fox.png","./img/frog.png","./img/jaguar.png","./img/jellyfish.png","./img/orca.png","./img/pelican.png","./img/stork.png",];
let ikone_game = [];
let combination = [];
if(difficulty_level[0] == "2"){
  combination = [0,1,0,1];
  shuffleArray(combination);
  for(let i = 0;i<2;i++){
    shuffleArray(ikone);
    ikone_game.push(ikone[0]);
    ikone.shift();
  }
}
else if(difficulty_level[0] == "4"){
  combination = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7];
  shuffleArray(combination);
  for(let i = 0;i<8;i++){
    shuffleArray(ikone);
    ikone_game.push(ikone[0]);
    ikone.shift();
  }
}
else if(difficulty_level[0] == "6"){
  combination = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  shuffleArray(combination);
  ikone_game = ikone;
}

let table = document.createElement("table");
let stevec = 0;
for(let i = 0;i<difficulty_level[0];i++){
  let tr = document.createElement("tr");
  for(let j = 0;j<difficulty_level[0];j++){
    let td = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src",ikone[combination[stevec]]);
    td.setAttribute("class",combination[stevec]);
    stevec++;
    td.addEventListener("click",() => {
      if(selected.length == 2){
        if(selected[0] != selected[1]){
        for(let i = 0;i<2;i++){
          for(let j = 0;j<2;j++){
            document.getElementsByClassName(selected[i])[j].removeAttribute("id");
            document.getElementsByClassName(selected[i])[j].style.transform = "rotateY(0deg)";
          }
        }
      }
      selected = [];
    }
      td.style.transform = "rotateY(180deg)";
      td.style.transition = "transform 1s";
      td.setAttribute("id","flipped");
      clicks++;
      document.getElementById("clicks").innerHTML = "Clicks: " + clicks;
      selected.push(td.className);
      check();
      if(score == (difficulty_level[0]*difficulty_level[0])/2){
        game_win();
      }
    });
    td.appendChild(img);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
document.body.appendChild(table);
let div_info = document.createElement("div");
div_info.setAttribute("id","infos");
let p_score = document.createElement("p");
let p_clicks = document.createElement("p");
p_score.setAttribute("id","score");
p_clicks.setAttribute("id","clicks");
p_score.innerHTML = "Score: " + score;
p_clicks.innerHTML = "Clicks: " + clicks;
div_info.appendChild(p_score);
div_info.appendChild(p_clicks);
document.body.appendChild(div_info);
}

function remove_menu(){
  document.getElementsByClassName("menu")[0].remove();
}

function check(){
  if(selected.length < 2){}
  else if(selected.length == 2){
    if(selected[0] == selected[1]){
      score += 1;
      document.getElementById("score").innerHTML = "Score: " + score;
      console.log(selected);
    }
  }
}

function game_win(){
  document.getElementById("infos").remove();
  document.getElementsByTagName("table")[0].remove();
  let div = document.createElement("div");
  div.setAttribute("class","menu");
  let div_infos = document.createElement("div");
  div_infos.setAttribute("class","menu-info");
  let p_main = document.createElement("p");
  p_main.innerHTML = "You won!";
  p_main.setAttribute("id","p-main");
  let p_sub = document.createElement("p");
  p_sub.innerHTML = "Here's your final score: ";
  p_sub.setAttribute("id","p-sub");
  let p_score = document.createElement("p");
  p_score.innerHTML = "Score: " + score;
  p_score.setAttribute("id","p-score");
  let p_clicks = document.createElement("p");
  p_clicks.innerHTML = "Clicks: " + clicks;
  p_clicks.setAttribute("id","p-clicks");
  let p_rating = document.createElement("p");
  let rating = 1/(score**2/clicks);
  p_rating.innerHTML = "Rating: " + rating.toFixed(2);
  p_rating.setAttribute("id","p-rating");
  div_infos.appendChild(p_score);
  div_infos.appendChild(p_clicks);
  div_infos.appendChild(p_rating);
  div.appendChild(p_main);
  div.appendChild(p_sub);
  div.appendChild(div_infos);
  document.body.appendChild(div);
}