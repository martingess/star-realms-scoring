let numberOfPlayers = document.getElementById("numberOfPlayers"),
    startInfluence = document.getElementById('startInfluence'),
    sendBtn = document.getElementById('sendBtn'),
    showNumberOfPlayers = document.querySelector('#showNumberOfPlayers'),
    playerNameFields = document.querySelectorAll('.playerName'),
    playerNameInput = document.querySelectorAll('.playerNameInput'),
    playersCounterCurrent = 0,
    playersNames = [];


numberOfPlayers.addEventListener("change", function(){
    playersCounterOld = playersCounterCurrent;
    playersCounterCurrent = 0;
    showNumberOfPlayers.value = numberOfPlayers.value;
    for(let i = 0; i < numberOfPlayers.value; i++) {
        playerNameFields[i].style.display = "block";
        playersCounterCurrent++;
    }
    if (playersCounterCurrent<playersCounterOld){
           for (let i = playersCounterOld-1; i > playersCounterCurrent-1; i--) {
        playerNameFields[i].style.display = "none";
    } 
    }
});

sendBtn.addEventListener("click", function(){
window.localStorage.setItem('numberOfPlayers', numberOfPlayers.value);
window.localStorage.setItem('startInfluence', startInfluence.value);

for (let i = 0; i < numberOfPlayers.value; i++){
    playersNames.push(playerNameInput[i].value);
}

window.localStorage.setItem('playersNames', JSON.stringify(playersNames));
});
