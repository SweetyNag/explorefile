console.log("lets write javascript")
let currentSong = new Audio();
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

}
//let previewContainer=document.querySelector('.preview');
//let previewBox=previewContainer.querySelectorAll('.preview');
//document.querySelectorAll('.CardContainer .card').forEach(card=>{
 //   card.onclick=()=>{

  //      previewContainer.style.display='flex';
   //     let name=card.getAttribute('data-folder');
   //     previewBox.forEach(preview=>{
   //         let target=preview.getAttribute('data-tar');
   //         if(name=target){
    //            preview.classList.add('active');
/*            }
        })
    }
})
previewBox.forEach(close=>{
    close.querySelector('.invert').onclick= ()=>{
        close.classList.remove('active');
        previewContainer.style.display='none';
    }
})*/










async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])

        }
    }
    // show all the songs in the playlist
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img  class="invert" src="svgs/music.svg"> 
                           <div class="info">
                               <div>${song.replaceAll("%20", " ")} </div>
                               <div>sweety</div>
                           </div>
                           <div class="playnow">
                               <span>play now</span>
                           <img class="invert"  src="svgs/play.svg">
                           </div> </li>`;
    }
    //play the first song
    //var audio=new Audio(songs[0]);
    //audio.play();

    //audio.addEventListener("loadeddata",() =>{
    //the duration variable now holds the duration(in seconds)of the audio clip
    //   let durtion=audio.duration;
    //  console.log(audio.duration,audio.currentSrc,audio.currentTime);
    //});

    //attach event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {
            //console.log=(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    return songs
}
const playMusic = (track, pause = false) => {
    /*let audio=new Audio("/songs/" +track);*/
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "svgs/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

}

async function displayAlbums() {
    console.log("display albums")
        let a = await fetch(`/songs/`);
        let response = await a.text();

        let div = document.createElement("div")
        div.innerHTML = response;
        let anchors = div.getElementsByTagName("a")
          
        let CardContainer= document.querySelector(".CardContainer")
        let array = Array.from(anchors)
        for (let index = 0; index < Array.length; index++) {
                 const e = array[index];

             if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
                  let folder = e.href.split("/").slice(-2)[0]
            //get the metadata of the folder

                  let a = await fetch(`/songs/${folder}/info.json`)
                  let response = await a.json();
                  console.log(response)
                  CardContainer.innerHTML = CardContainer.innerHTML + `<div data-folder="${folder}"class="card ">
                  <div class="play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                       <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                           stroke-linejoin="round" />
                    </svg>
                   </div>
                   <img src="/songs/${folder}/photo1.jpg" alt="">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                   </div>`
        }
    }
          // console.log(anchors)

             //load the playlist whenevercard is clicked
            Array.from(document.getElementsByClassName("card")).forEach(e => {
            console.log(e)
            e.addEventListener("click", async item => {
            console.log(item,item.currentTarget.dataset)
             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
             playMusic(songs[0])
                  })
               })

                 //write somthig new




    }

async function Main() {


    async function search() {
        let filter = document.getElementById('find').value.toUpperCase();
        let item = document.querySelectorAll('.Card');
        let l = document.getElementsByTagName('h2');
        for (var i = 0; i <= l.length; i++) {
            const e = l[index];
            let a = item[i].getElementsByTagName('h2')[0];

            let value = a.innerHTML || a.innerText || a.textContent;
            if (value.toUpperCase().indexOf(filter) > -1) {
                item[i].style.display = "";
            }
            else {
                item[i].style.display = "none";
            }
        }
        l.from(document.getElementsByClassName("card")).forEach(e => {
            console.log(e)
            e.addEventListener("click", async item => {
            console.log(item,item.currentTarget.dataset)
             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
             playMusic(songs[0])
                  })
               })
         
            
    }













    // let currentSong=new Audio();
    //get the listof all the songs (we are taking 8 songs )


    await getSongs("songs/ncs")
    playMusic(songs[0], true)

    //display all the albums on the page
    await displayAlbums()


    //console.log(songs) 

    // in this case i'm showing alll the song in the playlist





    //attach an event lisener to play next and previous

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svgs/pause.svg"

        }
        else {
            currentSong.pause()
            play.src = "svgs/play.svg"
        }
    })


    //listen for time update event means when we play the song that time seekbar also 
    //run ,circle move
    currentSong.addEventListener("timeupdate", () => {
        //  console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    })
    // add and event lisner to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })
    // add an event listerner for hanburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //add an event listerner for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //add an event listner to previous
    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("previous clicked")
        //console.log(currentSong)
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

        //console.log(songs,index)
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }

    })
    //add an event listner to  next
    next.addEventListener("click", () => {
        console.log("next click")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

        //console.log(songs,index)
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("svgs/mute.svg", "svgs/volume.svg")
        }
    })

    //add event listnerto mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {

        if (e.target.src.includes("svgs/volume.svg")) {
            e.target.src = e.target.src.replace("svgs/mute.svg", "svgs/volume.svg")
            currentSong.volumme = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;

        }
        else {
            e.target.src = e.target.src.replace("svgs/mute.svg", "svgs/volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;

        }
    })
}
Main()

