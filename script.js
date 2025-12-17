// Starting message to check if the script is running
console.log('Starting Spotify Clone Script');

// Array to store all songs data
let songs = [];

// Audio object to control music playback
let currentSong = new Audio();

// Variable for future folder use
let currFolder;

// Function to convert seconds into MM:SS format
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

// Function to fetch songs data from songs.json
async function getSongData() {
    let response = await fetch('songs.json');
    songs = await response.json();
    return songs;
}

// Function to display song list in sidebar
function songList() {
    const ul = document.querySelector(".songList ul");
    ul.innerHTML = "";

    songs.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("song-item");
        li.innerHTML = `
            <img class="invert" width="34" src="images/music.svg" alt="">
            <img class="song-cover" width="40" height="40" src="${song.image || 'images/default.jpg'}" alt="${song.name}">
            <div class="info">
                <div>${song.name.replace(".mp3", "")}</div>
                <div>${song.artist || "Artist Unknown"}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="images/play.svg" alt="">
            </div>
        `;
        li.addEventListener("click", () => {
            playMusic(song.file);
        });
        ul.appendChild(li);
    });
}

// Function to play selected song
const playMusic = (track, pause = false) => {
    currentSong.src = track;
    if (!pause) {
        currentSong.play();
        document.getElementById("playPausebtn").src = "images/pause.svg";
    }

    let currentSongData = songs.find(song => song.file === track);

    // Update song title and artist
    document.querySelector(".song-title").textContent = currentSongData.name.replace(".mp3", "");
    document.querySelector(".song-artist").textContent = currentSongData.artist || "Artist Unknown";

    // Update album image
    const albumCover = document.querySelector(".album-cover");
    if (albumCover) {
        albumCover.src = currentSongData.image || "images/default.jpg";
        albumCover.alt = currentSongData.name;
    }

    // Reset time display
    document.querySelector(".current-time").textContent = "0:00";
    document.querySelector(".total-time").textContent = "0:00";
}

// Main function that runs the app
async function main() {

    // Load songs from JSON
    songs = await getSongData();
    console.log('Songs loaded:', songs);

    // Show songs in sidebar
    songList();

    // Load first song without playing
    if (songs.length > 0) {
        playMusic(songs[0].file, true);
    }

    // Play and pause button logic
    const playPauseBtn = document.getElementById("playPausebtn");
    playPauseBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playPauseBtn.src = "images/pause.svg";
        } else {
            currentSong.pause();
            playPauseBtn.src = "images/play.svg";
        }
    });

    // Update time and seekbar while song plays
    currentSong.addEventListener("timeupdate", () => {
        const currentTime = secondsToMinutesSeconds(currentSong.currentTime);
        const duration = secondsToMinutesSeconds(currentSong.duration);

        document.querySelector(".current-time").textContent = currentTime;
        document.querySelector(".total-time").textContent = duration;

        const percent = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".seekbar").style.setProperty('--progress', percent + '%');
    });

    // Click on seekbar to change song position
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Previous song button logic
    document.querySelector(".songbuttons img:first-child").addEventListener("click", () => {
        currentSong.pause();
        console.log("Previous clicked");
        let index = songs.findIndex(song => song.file === currentSong.src);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1].file);
        }
    });

    // Next song button logic
    document.querySelector(".songbuttons img:last-child").addEventListener("click", () => {
        currentSong.pause();
        console.log("Next clicked");
        let index = songs.findIndex(song => song.file === currentSong.src);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1].file);
        }
    });

    // Volume control elements
    const volumeIcon = document.querySelector(".player-right img");
    const volumeSlider = document.querySelector(".volume-slider");

    // Function to update volume bar color
    function updateVolumeSlider(value) {
        const percent = value;
        volumeSlider.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #4d4d4d ${percent}%, #4d4d4d 100%)`;
    }

    // Set default volume
    currentSong.volume = 0.5;
    updateVolumeSlider(50);

    // Change volume using slider
    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        currentSong.volume = volume;
        updateVolumeSlider(e.target.value);

        if (volume === 0) {
            volumeIcon.src = "images/mute.svg";
        } else {
            volumeIcon.src = "images/volume.svg";
        }
    });

    // Mute and unmute when volume icon is clicked
    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            volumeSlider.value = 0;
            updateVolumeSlider(0);
            volumeIcon.src = "images/mute.svg";
        } else {
            currentSong.volume = 0.5;
            volumeSlider.value = 50;
            updateVolumeSlider(50);
            volumeIcon.src = "images/volume.svg";
        }
    });
}

// Start the app
main();
