let box=document.querySelector(".box"),
imge=box.querySelector(".imge img"),
mname=box.querySelector(".song .name"),
martist=box.querySelector(".song .artist"),
maudio=box.querySelector("#aud"),
pp=box.querySelector("#pp"),
pre=box.querySelector("#pre"),
next=box.querySelector("#next"),
bar=box.querySelector(".bar"),
timer1=box.querySelector(".timer .current"),
timer2=box.querySelector(".timer .duration"),
progress=box.querySelector(".progress"),
playlist=box.querySelector("#playlist"),
cls=box.querySelector(".cls"),
mlist=box.querySelector(".mlist"),
list=box.querySelector("ul");

let index=Math.floor(Math.random()*songs.length+1);
window.addEventListener("load",()=>{
    loadmusic(index);
    playing();
});

function loadmusic(ind)
{
    mname.innerText=songs[ind-1].name;
    martist.innerText=songs[ind-1].artist;
    imge.src=`images/${songs[ind-1].img}.svg`;
    maudio.src=`music/${songs[ind-1].src}.mp3`;  
    
}

function mplay(){
    box.classList.add("pause");
    maudio.play();
    pp.innerText='pause';
    playing();
}

function mpause(){
    box.classList.remove("pause");
    maudio.pause();
    pp.innerText="play_circle";
}
function nextsong(){
    let m=songs.length;
    if(index<m)
    index=(index+1)%(m+1);
    else
    index=1;
    loadmusic(index);
    mplay();
    playing();
}
function presong(){
    let n=songs.length;
    if(index==1)
    index=n;
    else
    index=(index-1)%n;
    loadmusic(index);
    mplay();
    playing();
}
pp.addEventListener("click",()=>{
    const ispaused=box.classList.contains("pause");
    ispaused?mpause():mplay();
    
});
pre.addEventListener("click",()=>{
    presong();
});
next.addEventListener("click",()=>{
    nextsong();
});


maudio.addEventListener('timeupdate',(e)=>{
    let curr=maudio.currentTime;
    //const curr=e.target.currentTime;
    let dur=maudio.duration;
    //const dur=e.target.duration;
    //let per=(maudio.currentTime/maudio.duration)*100;
    let per=(curr/dur)*100;
    bar.style.width=`${per}%`;
    maudio.addEventListener('loadeddata',()=>{
        let min=Math.floor(maudio.duration/60);
        let sec=Math.floor(maudio.duration%60);
        if(sec<10)
        sec=`0${sec}`
        timer2.innerText=`${min}:${sec}`; 
    });

        let min1=Math.floor(maudio.currentTime/60);
        let sec1=Math.floor(maudio.currentTime%60);
        if(sec1<10)
        sec1=`0${sec1}`
        timer1.innerText=`${min1}:${sec1}`;     
    });
    progress.addEventListener("click",(e)=>{       
    let change=(e.offsetX/progress.clientWidth)*maudio.duration;
    maudio.currentTime=change;
    mplay();
    }); 

const rep=box.querySelector("#rep");
rep.addEventListener("click",()=>{
let rtext=rep.innerText;
switch(rtext)
{
    case "repeat":
    rep.innerText="repeat_one";   
    break;
    case "repeat_one":
    rep.innerText="shuffle";
    break;
    case "shuffle":
    rep.innerText="repeat";
    break;    
}
});
maudio.addEventListener("ended",()=>{
    let rtext=rep.innerText;
switch(rtext)
{
    case "repeat":
    nextsong();   
    break;
    case "repeat_one":
    loadmusic(index);
    mplay();
    break;
    case "shuffle":
    const random=Math.floor(Math.random()*songs.length+1);
    loadmusic(random);
    mplay();
    break;    
}
});

for(let i=0;i<songs.length;i++){
    let li1=` <li in="${i+1}" class="p-3 d-flex justify-content-between">
              <div class="text-left">
              <h6 class="">${songs[i].name}</h6>
              <p>${songs[i].artist}</p>
              </div>
              <span class="p"></span>
              </li>`;
    list.insertAdjacentHTML("beforeend",li1);     
}
playlist.addEventListener("click",()=>{
    mlist.classList.toggle("d-none");
});
cls.addEventListener("click",()=>{
    playlist.click();
});
const allli=list.querySelectorAll("li");
function playing(){
for(let i=0;i<allli.length;i++)
{
    let p=allli[i].querySelector(".p");
    if(allli[i].classList.contains("play")){
    allli[i].classList.remove("play");
    p.innerText="";
    }
    if(allli[i].getAttribute("in")==index)
    {
    allli[i].classList.add("play");
    p.innerText="playing...";
    }
    allli[i].setAttribute("onclick","clicked(this)");
}
}
function clicked(self){
let ind=self.getAttribute("in");
index=ind;
loadmusic(index);
mplay();
playing();
}
let i=1;
const dark=box.querySelector(".upper .kk");
dark.addEventListener("click",()=>{
    if(i==1)
    {
    box.style.backgroundColor="black";
    box.style.color="white";
    mlist.style.backgroundColor="black";
    mlist.style.color="white";
    list.style.backgroundColor="black";
    list.style.color="white";  
    dark.innerText="light_mode"; 
    }
    else{
        box.style.backgroundColor="";
        box.style.color="";
        mlist.style.backgroundColor="";
        mlist.style.color="";
        list.style.backgroundColor="";
        list.style.color="";  
        dark.innerText="dark_mode";   
    }
    i=!i;
});
