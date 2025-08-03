const open = document.querySelector("#fileButton");
const inputFile = document.querySelector("#file");
const main = document.querySelector("#main");
const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const VolumeUp = document.querySelector("#volumeUp");
const Volumedown = document.querySelector("#volumeDown");
const toast = document.querySelector(".toast");


const playPauseBtn = document.querySelector("#playPauseBtn");
const back10Btn = document.querySelector("#back10Btn");
const replayBtn = document.querySelector("#replayBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");


const chooseFile = () => {
    inputFile.click();
    console.log("hey");
}
const playFile =(obj) => {
    console.log("hi");

    // Clear previous video
    const existingVideo = main.querySelector("video");
    if (existingVideo) {
        existingVideo.pause();        // stop current video
        existingVideo.src = "";       // release memory
        main.removeChild(existingVideo);  // remove element
    }

    const video = obj.target.files[0];
    const videoLink = URL.createObjectURL(video);


    const videoElement = document.createElement("video");
    videoElement.src = videoLink;
    videoElement.setAttribute("class","video");
    main.appendChild(videoElement);
    videoElement.play();
    videoElement.loop = true;
}
const speedUpHandler = () =>{
    const videoElement = document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.playbackRate>3){
        return;
    }
    const increaseSpeed = videoElement.playbackRate+0.5;
    videoElement.playbackRate = increaseSpeed;
    showToast(increaseSpeed+"x");
}

const speedDownHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.playbackRate>0){
    const decreaseSpeed = videoElement.playbackRate-0.5;
    videoElement.playbackRate = decreaseSpeed;
    showToast(decreaseSpeed+"x");
    }

}

const VolumeUpHandler= () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.volume>=0.99){
        return;
    }
    const increaseVolume = videoElement.volume+0.1;
    videoElement.volume = increaseVolume;
    console.log(videoElement.volume);
    const percentage = increaseVolume*100;
    showToast(percentage+"%");
}

const VolumeDownHandler= () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null){
        return;
    }
    if(videoElement.volume<=0.1){
        videoElement.volume = 0;
    }
    const decreaseVolume = videoElement.volume-0.1;
    videoElement.volume = decreaseVolume;
    console.log(videoElement.volume);
    const percentage = decreaseVolume*100;
    showToast(percentage+"%");
}

// utility function for toast 

function showToast(message){
    // toast
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display="none";
    },1500);
}

open.addEventListener("click",chooseFile);
inputFile.addEventListener("change",playFile);
speedUp.addEventListener("click",speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);
VolumeUp.addEventListener("click",VolumeUpHandler);
Volumedown.addEventListener("click",VolumeDownHandler);



function getVideo() {
    return document.querySelector("video");
}

// Play / Pause Toggle
playPauseBtn.addEventListener("click", () => {
    const video = getVideo();
    if (!video) return;
    if (video.paused) {
        video.play();
        playPauseBtn.classList.remove("fa-play");
        playPauseBtn.classList.add("fa-pause");
    } else {
        video.pause();
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");
    }
});

// Back 10s
back10Btn.addEventListener("click", () => {
    const video = getVideo();
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Replay
replayBtn.addEventListener("click", () => {
    const video = getVideo();
    if (!video) return;
    video.currentTime = 0;
    video.play();
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
});

// Fullscreen
fullscreenBtn.addEventListener("click", () => {
    const video = getVideo();
    if (!video) return;
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});
