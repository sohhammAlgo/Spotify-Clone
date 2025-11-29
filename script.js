console.log('Starting Spotify Clone Script');

let songs = [];
let audio = new Audio();

function renderTracks(songs) {
    const container = document.createElement("div");
    container.id = "track-container";
    document.body.appendChild(container);
    container.innerHTML = "";

    songs.forEach((song, index) => {
        const row = document.createElement("div");
        row.classList.add("track-row");
        row.dataset.index = index;

        row.innerHTML = `
      <div>${index + 1}</div>
      <div>${song.name}</div>
      <div>${song.size}</div>
      <div>${song.modified}</div>
    `;

        row.addEventListener("click", () => playSong(song.file));
        container.appendChild(row);
    });
}

async function getSongData() {
    let response = await fetch('songs.json');
    songs = await response.json();
    renderTracks(songs);
    return songs;
}

async function main(){
    songs = await getSongData();
    console.log('Songs loaded:', songs);
    duration(songs[0].file);
    songList();
}

function playSong(url) {
    audio.src = url;
    audio.play();
}

function songList() {
    const ul = document.querySelector(".songList ul");
    ul.innerHTML = "";

    songs.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("song-item");
        li.innerHTML = `
            <img src="images/music.svg" width="18" alt="">
            <img src="${song.image || 'images/default.jpg'}" width="40" alt="">
            <span>${song.name.replace(".mp3", "")}</span>
            <span> - ${song.artist || 'Unknown Artist'}</span>
            <span class="duration">${duration(song.file)}</span>
        `;
        li.addEventListener("click", () => playSong(song.file));
        ul.appendChild(li);
    });
}


function duration(url){
    audio.addEventListener('ontimeupdate',()=>{
        let duration = audio.duration();
        return duration;
    });
 }

main();