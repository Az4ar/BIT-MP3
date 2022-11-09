const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const musicInfo = document.querySelector(".music-info");
const dance = document.querySelector(".dance-container");

// Titulo da musica
const song = ["AMOGUS","AMOGUS","AMOGUS","AMOGUS", ]; //Adicione aqui as musicas da pasta music

let songIndex = 0;


loadSong(song[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};


function playSong(){
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause")

    audio.play();

    progress.style.backgroundColor = "#d87093";    

    setGif();

    musicInfo.style.color = "#000"
    setRandomColor();
};

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    playBtn.querySelector("i.fas").classList.add("fa-play");

    audio.pause();

    progress.style.backgroundColor = "#fff";   
    
    removeGif();

    musicInfo.style.color = "#fff"
}

function nextSong(){
    songIndex += 1;

    if(songIndex === 5){
        songIndex = 0;
    }

    loadSong(song[songIndex]);
    playSong();
}

function prevSong(){
    songIndex -= 1;

    if(songIndex === -1){
        songIndex = 4;
    }

    loadSong(song[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Seleciona um random background-color

function randomNumber(){
    return Math.floor(Math.random() * 17 + 1);
}

function getRandomColor(){
    let index = randomNumber();

    let randomColorIndex = ["BLUE", "RED", "WHITE", "YELLOW", "PINK", "GREEN", "BLACK", "PURPLE", "ORANGE", "ALICEBLUE", "AQUAMARINE", "CHARTREUSE", "DARKBLUE", "CYAN", "DEEPPINK", "DEEPSKYBLUE", "FUCHSIA", "GOLD"];

    let color = randomColorIndex[index];
    console.log(color);

    return color;
}

function setRandomColor(){
    setInterval(setColor, 500);

     function setColor(){
        let randomColor = getRandomColor();
        
        document.body.style.transition = "background-color 0.5s";
        document.body.style.backgroundColor = randomColor;    
        console.log(randomColor);
    }
}

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

function setGif(){
    dance.style.opacity = "100%";
};

function removeGif(){
    dance.style.opacity = "0";
};
