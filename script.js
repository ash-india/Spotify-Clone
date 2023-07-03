console.log("This is Spotify");

// Initialize the variables
let songIndex=1;
let audioElement = new Audio('./songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName("songItem"));
let masterSongName=document.getElementById("masterSongName");
let playingSong=false;
let nextSongIcon=document.getElementById('next');

let songs=[
    {songName: "Rasiya - Bhramastra", filePath: "./songs/1.mp3", coverPath: "https://i.ytimg.com/vi/F_oNAi5DcEU/0.jpg"},
    {songName: "Qaafirana - kedarnath", filePath: "./songs/2.mp3", coverPath: "https://i.ytimg.com/vi/ZmcBC9-wAXM/0.jpg"},
    {songName: "Haawayein- Jab Harry met Sejal", filePath: "./songs/3.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b2730f29b052ea18eb757ec7ca9a"},
    {songName: "Phir Bhi Tumko Chaahunga - Half Girlfriend", filePath: "./songs/4.mp3", coverPath: "https://i.ytimg.com/vi/_iktURk0X-A/0.jpg"},
    {songName: "O Bedardeya - TJMM", filePath: "./songs/5.mp3", coverPath: "https://i.ytimg.com/vi/AYGL8Zu1nIY/0.jpg"},
    {songName: "Channa Mereya - ADHM", filePath: "./songs/6.mp3", coverPath: "https://i.ytimg.com/vi/284Ov7ysmfA/0.jpg"},
    {songName: "Sawan Aaya Hai - Creature", filePath: "./songs/7.mp3", coverPath: "https://i.ytimg.com/vi/B5_6jfGsyjA/0.jpg"},
    {songName: "IJAZAT - ONE NIGHT STAND", filePath: "./songs/8.mp3", coverPath: "https://i.ytimg.com/vi/Ob4wvIHUmnA/0.jpg"},
    {songName: "Ve Maahi - Kesari", filePath: "./songs/9.mp3", coverPath: "https://i.ytimg.com/vi/Z1-qmKn7DQY/0.jpg"},
    {songName: "Kalank Title Track - Kalank", filePath: "./songs/10.mp3", coverPath: "https://i.ytimg.com/vi/Grr0FlC8SQA/0.jpg"}
]

songItems.forEach((element,i)=>{
    // console.log(element,i);
    let tempAudio=new Audio(songs[i].filePath);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerHTML =songs[i].songName;
    tempAudio.addEventListener('loadedmetadata', () => {
        let minutes = Math.floor(tempAudio.duration / 60);
        let seconds = Math.floor(tempAudio.duration % 60);
        let durationString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        element.getElementsByClassName('timeStamptext')[0].innerText = `${durationString}`;
    });
})

// audioElement.play();

// Handle play/pause Click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        changeStatusOfSongstoPlay();
    }
    else{
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate')

    // update seekbar
    // console.log(audioElement.duration);
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
    if(progress==100){
        nextSongIcon.click();
    }
})

myProgressBar.addEventListener('change',()=>{
    // console.log(audioElement);
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    //     element.classList.remove('fa-pause-circle');
    //     element.classList.add('fa-play-circle');
    // })

    let element=document.getElementById(`${songIndex}`);
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    audioElement.pause();
    gif.style.opacity=0;
    playingSong=false;
}

const changeStatusOfSongstoPlay=()=>{
    let element=document.getElementById(`${songIndex}`);
    element.classList.remove("fa-play-circle");
    element.classList.add("fa-pause-circle");
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    playingSong=true;
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        if(playingSong){
            makeAllPlays();
            if(songIndex!=parseInt(e.target.id)){
                songIndex=parseInt(e.target.id);
                changeStatusOfSongstoPlay();
                audioElement.src=`./songs/${songIndex}.mp3`;
                masterSongName.innerHTML=songs[songIndex-1].songName;
                audioElement.currentTime=0;
                audioElement.play();
            }
            else{
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        }
        else if(!playingSong){
            makeAllPlays();
            if(songIndex!=parseInt(e.target.id)){
                songIndex=parseInt(e.target.id);
                // e.target.classList.remove('fa-play-circle');
                // e.target.classList.add('fa-pause-circle');
                changeStatusOfSongstoPlay();
                audioElement.src=`./songs/${songIndex}.mp3`;
                masterSongName.innerHTML=songs[songIndex-1].songName;
                audioElement.currentTime=0;
                audioElement.play();
            }
            else{
                changeStatusOfSongstoPlay();
                audioElement.play();
            }
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    makeAllPlays();
    if(songIndex==10) songIndex=1;
    else songIndex+=1;
    // console.log(songIndex);
    changeStatusOfSongstoPlay();
    audioElement.src=`./songs/${songIndex}.mp3`;
    masterSongName.innerHTML=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
})

document.getElementById('previous').addEventListener('click',()=>{
    makeAllPlays();
    if(songIndex<=1) songIndex=1;
    else songIndex-=1;
    // console.log(songIndex);
    changeStatusOfSongstoPlay();
    audioElement.src=`./songs/${songIndex}.mp3`;
    masterSongName.innerHTML=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
})  