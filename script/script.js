let influence = document.querySelectorAll(".playerInfluence"),
    add = document.getElementById("playerOneScore"),
    sendResults = document.querySelectorAll(".sendResults"),
    hpBarCurrent = document.querySelectorAll('.hpBar'),
    startInfluence = window.localStorage.getItem('startInfluence'),
    playerSections = document.querySelectorAll(".playerField"),
    numberOfPlayers = window.localStorage.getItem("numberOfPlayers"),
    returnOldBtns = document.querySelectorAll('.returnOld'),
    playersNamesField = document.querySelectorAll(".showPlayerNameField"),
    playersAddInfluenceInput = document.querySelectorAll(".addInfluence"),
    log = document.querySelector('.logBody'),
    saveBtn = document.querySelectorAll(".js-save-btn"),
    loadBtn = document.querySelectorAll(".js-load-btn"),
    saveMenuBtn = document.querySelector("#js-saves-menu-btn"),
    saveswrapper = document.querySelector(".saves-wrapper"),
    savesSlots = document.querySelectorAll(".save-slot"),
    closeSavesBtn = document.querySelector(".close-window");

logUpdate("begin");

function setNumberOfPlayers(numberOfPlayers) {
    for (i = 0; i < numberOfPlayers; i++) {
        playerSections[i].style.display = "flex";
    }
}

//Имена игроков
let playersNames = JSON.parse(window.localStorage.getItem("playersNames"))
setNumberOfPlayers(numberOfPlayers);

function playerNamesUpdate(playersNamesArray) {
    for (let i = 0; i < playersNamesField.length; i++) {
        playersNamesField[i].textContent = playersNamesArray[i];
    }
}
playerNamesUpdate(playersNames);

//Данные игроков
class User {
    constructor(name, influence, playersAddInfluenceInput, hpBarCurrent, btnSendResults, oldParam){
        this.name = name,
        this.currentInfluence = influence,
        this.addInfluence = playersAddInfluenceInput,
        this.influenceBar = hpBarCurrent,
        this.btnSendResults = btnSendResults,
        this.oldParam = oldParam;
    }
}

let players = [];

for (let i = 0; i<4; i++){
    players[i] = new User(playersNames[i], influence[i], playersAddInfluenceInput[i], hpBarCurrent[i], sendResults[i])
}

function colorHpBars(hpBars) {
    for (let i = 0; i < hpBars.length; i++) {
        hpBars[i].style.background = '#3aa56a';
        hpBars[i].style.width = '100%';
        hpBars[i].style.height = '100%';

    }
}
colorHpBars(hpBarCurrent);

players[0].currentInfluence.value = startInfluence;
players[1].currentInfluence.value = startInfluence;
players[2].currentInfluence.value = startInfluence;
players[3].currentInfluence.value = startInfluence;



//листнеры для кнопок подсчёта
players[0].btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(players[0]);
});
players[1].btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(players[1])
});
players[2].btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(players[2])
});
players[3].btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(players[3])
});

//вернуть старые результаты лиснтеры
returnOldBtns[0].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(players[0]);
    hpBarUpdate(players[0])
})
returnOldBtns[1].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(players[1]);
    hpBarUpdate(players[1])
})
returnOldBtns[2].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(players[2]);
    hpBarUpdate(players[2])
})
returnOldBtns[3].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(players[3]);
    hpBarUpdate(players[3]);
})

function returnOld(player) {
    let tempOldParam = player.currentInfluence.value;
    player.currentInfluence.value = player.oldParam;
    player.oldParam = tempOldParam;
    logUpdate("returnOld", player);
}

function makeResult(player) {
    if (!(isNaN(player.addInfluence.value))) {
        player.oldParam = +player.currentInfluence.value;
        player.currentInfluence.value = (+player.addInfluence.value) + (+player.currentInfluence.value);
        hpBarUpdate(player)
        logUpdate("afterChange", player);
    }
    player.addInfluence.value = "";
}

function logUpdate(type, player) {
    var nowDate = new Date();
    let logOutput;
    if (type == 'afterChange') {
        logOutput = `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}: Влияние игрока ${player.name} изменилось на ${player.addInfluence.value} <br>`;
    } else if (type == 'returnOld') {
        logOutput = `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}: влияние игрока ${player.name} возвращено к значению ${player.currentInfluence.value} (раньше было ${player.oldParam}) <br>`
    } else if (type == "begin") {
        logOutput = `<p> ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}: кол-во игроков: ${numberOfPlayers}, стартовое влияние: ${startInfluence}`
    }

    log.insertAdjacentHTML("afterbegin", logOutput);
}

function hpBarUpdate(player) {
    if (player === 'all'){

    }

    if ((player.currentInfluence.value / startInfluence) >= 1) {
        player.influenceBar.style.background = "darkblue";
    } else if ((player.currentInfluence.value / startInfluence) >= 0.7 && (player.currentInfluence.value / startInfluence) < 1) {
        player.influenceBar.style.background = '#3aa56a';
    } else if (player.currentInfluence.value / startInfluence < 0.7 && player.currentInfluence.value / startInfluence > 0.3) {
        player.influenceBar.style.background = 'yellow';
    } else {
        player.influenceBar.style.background = 'red';
    }
    if (player.currentInfluence.value > 0) {
        player.influenceBar.style.width = (player.currentInfluence.value / startInfluence) * 100 + "%";
    } else {
        player.influenceBar.style.width = 0 + "%";
    }

}

let save1 = JSON.parse(window.localStorage.getItem("save1"))
let save2 = JSON.parse(window.localStorage.getItem("save2"))
let save3 = JSON.parse(window.localStorage.getItem("save3"))

// Проверка на сохранения

function checkSave(save, slotNum){
    if ( !(save) ){
        savesSlots[slotNum].textContent = "Пустой слот";
    } else {
        let saveDate = new Date(save.nowDate)
        savesSlots[slotNum].textContent = `Дата сохранения: ${saveDate.getHours()}:${saveDate.getMinutes()}:${saveDate.getSeconds()}. Игроки: ${save.playersNames}`;
    }
}

checkSave(save1, 0);
checkSave(save2, 1);
checkSave(save3, 2);


class SavePlayerInfo{
    constructor(){
        this.playerOne = {
            influence: players[0].currentInfluence.value,
            name: players[0].name
        },
        this.playerTwo = {
            influence: players[1].currentInfluence.value,
            name: players[1].name
        },
        this.players[2] = {
            influence: players[2].currentInfluence.value,
            name: players[2].name
        },
        this.players[3] = {
            influence: players[3].currentInfluence.value,
            name: players[3].name
        },
        this.numberOfPlayers = numberOfPlayers,
        this.startInfluence = startInfluence,
        this.playersNames = playersNames,
        this.nowDate = new Date();
    }
}

// Сохранение
saveBtn[0].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = SavePlayerInfo();
    window.localStorage.setItem("save1", JSON.stringify(save1));
});

saveBtn[1].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = new SavePlayerInfo();
    window.localStorage.setItem("save2", JSON.stringify(save1));
});

saveBtn[2].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = new SavePlayerInfo();
    window.localStorage.setItem("save3", JSON.stringify(save1));
});

function loadSave(save){
    startInfluence = save.startInfluence;
    players[0].currentInfluence.value = save.players[0].influence;
    players[1].currentInfluence.value = save.players[1].influence;
    players[2].currentInfluence.value = save.players[2].influence;
    players[3].currentInfluence.value = save.players[3].influence;
}

loadBtn[0].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save1.numberOfPlayers);
    startInfluence = save1.startInfluence;
    players[0].currentInfluence.value = save1.players[0].influence;
    players[1].currentInfluence.value = save1.players[1].influence;
    players[2].currentInfluence.value = save1.players[2].influence;
    players[3].currentInfluence.value = save1.players[3].influence;

    playerNamesUpdate(save1.playersNames)

    hpBarUpdate(players[0]);
    hpBarUpdate(players[1])
    hpBarUpdate(players[2])
    hpBarUpdate(players[3])

})
loadBtn[1].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save2.numberOfPlayers);
    startInfluence = save2.startInfluence;
    players[0].currentInfluence.value = save2.players[0].influence;
    players[1].currentInfluence.value = save2.players[1].influence;
    players[2].currentInfluence.value = save2.players[2].influence;
    players[3].currentInfluence.value = save2.players[3].influence;

    playerNamesUpdate(save2.playersNames)

    hpBarUpdate(players[0]);
    hpBarUpdate(players[1])
    hpBarUpdate(players[2])
    hpBarUpdate(players[3])

})
loadBtn[2].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save3.numberOfPlayers);
    startInfluence = save3.startInfluence;
    players[0].currentInfluence.value = save3.players[0].influence;
    players[1].currentInfluence.value = save3.players[1].influence;
    players[2].currentInfluence.value = save3.players[2].influence;
    players[3].currentInfluence.value = save3.players[3].influence;

    playerNamesUpdate(save3.playersNames)

    hpBarUpdate(players[0]);
    hpBarUpdate(players[1])
    hpBarUpdate(players[2])
    hpBarUpdate(players[3])

})

saveMenuBtn.addEventListener("click", ()=>{
    saveswrapper.style.display = "flex";
    saveswrapper.style.marginLeft = "0px";
});
closeSavesBtn.addEventListener("click", ()=>{
    saveswrapper.style.display = "none";
})