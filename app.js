document.getElementById("search").addEventListener("click",function(){
doSumThing();
})

function doSumThing(){
    let song = document.getElementById("input").value;
        fetch(`https://api.lyrics.ovh/suggest/${song}`)
        .then(res=>res.json())
        .then(data=>{
            const songList = document.getElementById("song-list")
            document.getElementById("song-list").innerText="";
            const array = data.data;

        for(let i= 10; i<array.length; i++){
            const element = array[i];
            const title = element.title;
            const artist= element.artist.name;
            const p=document.createElement("p");
           p.innerHTML=
           `<div class="single-result row align-items-center my-3 p-3">
               <div class="col-md-9">
                   <h3 id="title" class="lyrics-name">${title}</h3>
                   <p class="author lead">Album by <span>${artist}</span></p>
               </div>
               <div class="col-md-3 text-md-right text-center">
                   <button onclick="getLyrics('${artist}','${title}')"class="btn btn-success">Get Lyrics</button>
               </div>
            </div>`
            songList.appendChild(p);

        };   

    });
}
function getLyrics(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res=>res.json())
    .then(data =>{
     console.log(data);
const lyricSection = document.getElementById("lyrics");
        const p = document.createElement("p");
        p.innerText=`${data.lyrics}`
        lyricSection.appendChild(p);
    })
}
     