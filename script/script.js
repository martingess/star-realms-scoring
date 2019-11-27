let influence = document.getElementById("playerOneInfluence"),
    add = document.getElementById("playerOneScore"),
    btnSendFirstResults = document.getElementById("sendResults"),
    hpBarCurrent = document.getElementById("hpBarCurrent"),
    startInfluence = window.localStorage.getItem('startInfluence'),
    startHpBars = document.getElementsByClassName("hpBar"),
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
let playerOne = {
    name: playersNames[0],
    currentInfluence: document.getElementById("playerOneInfluence"),
    addInfluence: playersAddInfluenceInput[0],
    influenceBar: document.getElementById("hpBarCurrent1"),
    btnSendResults: document.getElementById("sendResults1"),
    oldParam: startInfluence

}
let playerTwo = {
    name: playersNames[1],
    currentInfluence: document.getElementById("playerTwoInfluence"),
    addInfluence: playersAddInfluenceInput[1],
    influenceBar: document.getElementById("hpBarCurrent2"),
    btnSendResults: document.getElementById("sendResults2"),
    oldParam: startInfluence

}
let playerThree = {
    name: playersNames[2],
    currentInfluence: document.getElementById("playerThreeInfluence"),
    addInfluence: playersAddInfluenceInput[2],
    influenceBar: document.getElementById("hpBarCurrent3"),
    btnSendResults: document.getElementById("sendResults3"),
    oldParam: startInfluence

}
let playerFour = {
    name: playersNames[3],
    currentInfluence: document.getElementById("playerFourInfluence"),
    addInfluence: playersAddInfluenceInput[3],
    influenceBar: document.getElementById("hpBarCurrent4"),
    btnSendResults: document.getElementById("sendResults4"),
    oldParam: startInfluence

}

function colorHpBars(hpBars) {
    for (let i = 0; i < hpBars.length; i++) {
        hpBars[i].style.background = '#3aa56a';
        hpBars[i].style.width = '100%';
        hpBars[i].style.height = '100%';

    }
}
colorHpBars(startHpBars)

playerOne.currentInfluence.value = startInfluence;
playerTwo.currentInfluence.value = startInfluence;
playerThree.currentInfluence.value = startInfluence;
playerFour.currentInfluence.value = startInfluence;



//листнеры для кнопок подсчёта
playerOne.btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(playerOne)
});
playerTwo.btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(playerTwo)
});
playerThree.btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(playerThree)
});
playerFour.btnSendResults.addEventListener('click', (event) => {
    event.preventDefault();
    makeResult(playerFour)
});

//вернуть старые результаты лиснтеры
returnOldBtns[0].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(playerOne);
    hpBarUpdate(playerOne)
})
returnOldBtns[1].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(playerTwo);
    hpBarUpdate(playerTwo)
})
returnOldBtns[2].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(playerThree);
    hpBarUpdate(playerThree)
})
returnOldBtns[3].addEventListener("click", function (event) {
    event.preventDefault();
    returnOld(playerFour);
    hpBarUpdate(playerFour);
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
if ( !(save1) ){
    savesSlots[0].textContent = "Пустой слот";
} else {
    let saveDate = new Date(save1.nowDate)
    savesSlots[0].textContent = `Дата сохранения: ${saveDate.getHours()}:${saveDate.getMinutes()}:${saveDate.getSeconds()}. Игроки: ${save1.playersNames}`;
}
if ( !(save2) ){
    savesSlots[1].textContent = "Пустой слот";
} else {
    let saveDate = new Date(save2.nowDate)
    savesSlots[1].textContent = `Дата сохранения: ${saveDate.getHours()}:${saveDate.getMinutes()}:${saveDate.getSeconds()}. Игроки: ${save2.playersNames}`;
}

if ( !(save3) ){
    savesSlots[2].textContent = "Пустой слот";
} else {
    saveDate = new Date(save3.nowDate)
    savesSlots[2].textContent = `Дата сохранения: ${saveDate.getHours()}:${saveDate.getMinutes()}:${saveDate.getSeconds()}. Игроки: ${save3.playersNames}`;
}


// Сохранение
saveBtn[0].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = {
        playerOne: {
            influence: playerOne.currentInfluence.value,
            name: playerOne.name
        },
        playerTwo: {
            influence: playerTwo.currentInfluence.value,
            name: playerTwo.name
        },
        playerThree: {
            influence: playerThree.currentInfluence.value,
            name: playerThree.name
        },
        playerFour: {
            influence: playerFour.currentInfluence.value,
            name: playerFour.name
        },
        numberOfPlayers: numberOfPlayers,
        startInfluence: startInfluence,
        playersNames: playersNames,
        nowDate: new Date()
    };
    window.localStorage.setItem("save1", JSON.stringify(save1));
});

saveBtn[1].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = {
        playerOne: {
            influence: playerOne.currentInfluence.value,
            name: playerOne.name
        },
        playerTwo: {
            influence: playerTwo.currentInfluence.value,
            name: playerTwo.name
        },
        playerThree: {
            influence: playerThree.currentInfluence.value,
            name: playerThree.name
        },
        playerFour: {
            influence: playerFour.currentInfluence.value,
            name: playerFour.name
        },
        numberOfPlayers: numberOfPlayers,
        startInfluence: startInfluence,
        playersNames: playersNames,
        nowDate: new Date()

    };
    window.localStorage.setItem("save2", JSON.stringify(save1));
});

saveBtn[2].addEventListener("click", (event) => {
    event.preventDefault();
    let save1 = {
        playerOne: {
            influence: playerOne.currentInfluence.value,
            name: playerOne.name
        },
        playerTwo: {
            influence: playerTwo.currentInfluence.value,
            name: playerTwo.name
        },
        playerThree: {
            influence: playerThree.currentInfluence.value,
            name: playerThree.name
        },
        playerFour: {
            influence: playerFour.currentInfluence.value,
            name: playerFour.name
        },
        numberOfPlayers: numberOfPlayers,
        startInfluence: startInfluence,
        playersNames: playersNames,
        nowDate: new Date()

    };
    window.localStorage.setItem("save3", JSON.stringify(save1));
});


loadBtn[0].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save1.numberOfPlayers);
    startInfluence = save1.startInfluence;
    playerOne.currentInfluence.value = save1.playerOne.influence;
    playerTwo.currentInfluence.value = save1.playerTwo.influence;
    playerThree.currentInfluence.value = save1.playerThree.influence;
    playerFour.currentInfluence.value = save1.playerFour.influence;

    playerNamesUpdate(save1.playersNames)

    hpBarUpdate(playerOne);
    hpBarUpdate(playerTwo)
    hpBarUpdate(playerThree)
    hpBarUpdate(playerFour)

})
loadBtn[1].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save2.numberOfPlayers);
    startInfluence = save2.startInfluence;
    playerOne.currentInfluence.value = save2.playerOne.influence;
    playerTwo.currentInfluence.value = save2.playerTwo.influence;
    playerThree.currentInfluence.value = save2.playerThree.influence;
    playerFour.currentInfluence.value = save2.playerFour.influence;

    playerNamesUpdate(save2.playersNames)

    hpBarUpdate(playerOne);
    hpBarUpdate(playerTwo)
    hpBarUpdate(playerThree)
    hpBarUpdate(playerFour)

})
loadBtn[2].addEventListener("click", (event) => {
    event.preventDefault()
    setNumberOfPlayers(+save3.numberOfPlayers);
    startInfluence = save3.startInfluence;
    playerOne.currentInfluence.value = save3.playerOne.influence;
    playerTwo.currentInfluence.value = save3.playerTwo.influence;
    playerThree.currentInfluence.value = save3.playerThree.influence;
    playerFour.currentInfluence.value = save3.playerFour.influence;

    playerNamesUpdate(save3.playersNames)

    hpBarUpdate(playerOne);
    hpBarUpdate(playerTwo)
    hpBarUpdate(playerThree)
    hpBarUpdate(playerFour)

})

saveMenuBtn.addEventListener("click", ()=>{
    saveswrapper.style.display = "flex";
});
closeSavesBtn.addEventListener("click", ()=>{
    saveswrapper.style.display = "none";
})