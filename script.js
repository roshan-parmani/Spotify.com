console.log("Lets go with js ");
let songs;
let currFolder;
let currentSong = new Audio();
let firstLoad = true;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins < 10 ? "0" + mins : mins;
  const formattedSecs = secs < 10 ? "0" + secs : secs;

  return `${formattedMins}:${formattedSecs}`;
}
async function getData(folder) {
  currFolder = folder;
  let a = await fetch(`https://github.com/roshan-parmani/Spotify.com/tree/main/songs/${folder}`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3") || element.href.endsWith(".m4a")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  return songs;
}
let play = document.querySelector(".play");

const playmusic = (track) => {
  currentSong.src = `/${currFolder}/` + track;

  
  if (!firstLoad) {
    currentSong.play();
    play.src = "pause.svg";
  } else {
    play.src = "play.svg"; // show play icon on first load
    firstLoad = false;
  }
  // after generating song list
Array.from(document.querySelectorAll(".play-now-btn")).forEach((btn, index) => {
  btn.addEventListener("click", () => {
    playmusic(songs[index]);
    currentSong.play();
    play.src = "pause.svg";
  });
});

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".time").innerHTML = "00:00/00:00";




  let songUl = document
    .querySelector(".songlist")
    .getElementsByTagName("ol")[0];
  songUl.innerHTML = "";
  for (const song of songs) {
    // songUl.innerHTML = songUl.innerHTML + `<li>${song.replaceAll("%20"," ")}</li>`;
    songUl.innerHTML =
      songUl.innerHTML +
      `
        
                  <li>
                    <img src="music.svg" alt="" height="20px">
                    <div class="info">
                    <div class="songname">${song.replaceAll("%20", " ")}</div>
                    <div class="artist-name">Roshan</div>
                    </div>
                   <div class="play-now">
                      <p>play now</p>
                        <img src="play.svg" class="play-now-btn" alt="">
                   </div>  
                </li>`;
  }

  //   Array.from*document.querySelector(".songlist").getElementsByTagName("li").array.forEach(e => {
  //         e.addEventListener("click",element=>{
  //        console.log(e.querySelector(".info").firstElementChild.innerHTML)
  //           playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

  //         })
  //  })
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
};

async function displayAlbums() {
  let a = await fetch(`https://github.com/roshan-parmani/Spotify.com/tree/main/songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let anchors = div.getElementsByTagName("a");
  let cardSec = document.querySelector(".card-sec");

       let firstFolder = null;
 let array =  Array.from(anchors) 
   for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/")) {
    

      let folder = e.href.split("/").slice(-2)[1];
      if(!firstFolder) firstFolder = folder;
      //get the metadata from the folder
      let a = await fetch(`https://github.com/roshan-parmani/Spotify.com/tree/main/songs/${folder}/info.json`);
      response = await a.json();

      cardSec.innerHTML =
      cardSec.innerHTML +
      ` <div data-folder="${folder}" class="song-card">
                    <div class="icon">
                        <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <polygon points="6 4 20 12 6 20 6 4" />
                        </svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="" width="230px">
                    <div class="title">
                        <h3>${response.title}</h3>
                        <p>${response.discription}</p>
                    </div>

                </div>`
    }
  
  };
  // automatic load the first folder
  if (firstFolder) {
    songs = await getData(`songs/${firstFolder}`);
    playmusic(songs[0]);
  }

  Array.from(document.getElementsByClassName("song-card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getData(`songs/${item.currentTarget.dataset.folder}`);
      playmusic(songs[0]);
    });
  });
  
}

async function main() {
  songs = await getData("songs/ncs");
  console.log(songs);
  

    
 
  

  // add a function for display albums

  displayAlbums();

  //  i attach event listner here

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // add eventlistner for timeupdate

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".time").innerHTML = `
        ${formatTime(currentSong.currentTime)}/ ${formatTime(
      currentSong.duration
    )}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // add event listner for seekbar

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //Add an eventlistner on hambergur

  document.querySelector(".hamb").addEventListener("click", () => {
    document.querySelector(".library").style.left = "0";
    document.querySelector(".plus").style = "display:none";
  });

  //Add an eventlistner on close button

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".library").style.left = "-120%";
  });

  //Add eventlistner to previous

  document.querySelector(".prev").addEventListener("click", () => {
    console.log("previous clicked");

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 >= 0) {
      playmusic(songs[index - 1]);
    }
  });

  document.querySelector(".next").addEventListener("click", () => {
    console.log("next clicked");

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 > length) {
      playmusic(songs[index + 1]);
    }
  });

  // add event listner for folder

  
}
main();
