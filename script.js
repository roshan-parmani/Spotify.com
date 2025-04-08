
console.log("Lets go with js ")

let currentSong = new Audio()

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins < 10 ? "0" + mins : mins;
  const formattedSecs = secs < 10 ? "0" + secs : secs;

  return `${formattedMins}:${formattedSecs}`;
}
async function getData(){
   let a = await fetch("https://github.com/roshan-parmani/Spotify.com/tree/main/songs")
   let response = await a.text();

   let div = document.createElement("div")
   div.innerHTML=response;
   let as = div.getElementsByTagName("a")

   let songs=[]
   for(let i = 0; i<as.length; i++){
    const element = as[i];
      if(element.href.endsWith(".mp3") || element.href.endsWith(".m4a")){
        songs.push(element.href.split("/songs/")[1])
      }
   }

 return songs
}
let play = document.querySelector(".play")

   const playmusic = (track) =>{
    currentSong.src = "/songs/" +track
    currentSong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML =track
    document.querySelector(".time").innerHTML ="00:00/00:00"
   }

 

async function main(){
    let songs = await getData()
    console.log(songs)
    
    let songUl = document.querySelector(".songlist").getElementsByTagName("ol")[0]
    for (const song of songs) {
        // songUl.innerHTML = songUl.innerHTML + `<li>${song.replaceAll("%20"," ")}</li>`;
        songUl.innerHTML = songUl.innerHTML + `
        
                  <li>
                    <img src="music.svg" alt="" height="20px">
                    <div class="info">
                    <div class="songname">${song.replaceAll("%20" ," ")}</div>
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
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
});


 //  i attach event listner here
     
     play.addEventListener("click" , ()=>{
          if(currentSong.paused){
            currentSong.play()
             play.src="pause.svg"
          }
          else{
            currentSong.pause()
            play.src="play.svg"
          }
     })
   
     // add eventlistner for timeupdate

     currentSong.addEventListener("timeupdate",   ()=>{
        document.querySelector(".time").innerHTML =`
        ${formatTime(currentSong.currentTime)}/ ${formatTime(currentSong.duration)}`
       document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";

     })

     // add event listner for seekbar

     document.querySelector(".seekbar").addEventListener("click",e=>{
      let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
      document.querySelector(".circle").style.left  = percent +"%";
      currentSong.currentTime = ((currentSong.duration)*percent)/100;
     })

      
  }
main()
