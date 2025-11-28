console.log('Starting Spotify Clone Script');

async function getSongData(){
    let songs = await fetch();
    let response = await songs.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let songsList = [];
    for(let i=0;i<as.length;i++){
        let a = as[i];
        if(a.href.includes('.mp3')){
            songsList.push({
                name: a.innerText,
                url: a.href
            });
        }
    }
}