var ts='1682362176426';
var publicKey='63d1ee6e81259f5891e335d22e5b5936';
var hash = 'b93a626ecf93a9627564dad0ddabac64';
const FAVOURITES='favourites';

//get the id of hero using url of the page
const url=new URLSearchParams(window.location.search)
const id=url.get('id');

const getFavFromLocal=()=>{
    return localStorage.getItem(FAVOURITES)?JSON.parse(localStorage.getItem(FAVOURITES)):[];
}

const renderButton=()=>{
    const heroes=getFavFromLocal();
    const btn=document.getElementById('button');
    if(heroes.includes(id)){
        btn.innerHTML=`<button onclick='addtofav()'>Remove from favorites</button>`
    }else{
        btn.innerHTML=`<button onclick='addtofav()'>add to favorites</button>`
    }
}
renderButton();

// this  is a function to search for a specific hero and displaying its details
const fetchHero=async ()=>{
    let link=`https://gateway.marvel.com:443/v1/public/characters?name=${id}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    let response=await fetch(link);
    response=await response.json();
    let hero=response.data.results[0];
    let comics='';
    hero.comics.items.map((comic)=>{
        comics+=comic.name+', ';
    })
    let events='';
    hero.events.items.map((event)=>{
        events+=event.name+', ';
    })
    let series='';
    hero.series.items.map((s)=>{
        series+=s.name+', ';
    })
    let stories='';
    hero.stories.items.map((story)=>{
        stories+=story.name+', ';
    })
    const ele=document.getElementById('hero-details');
    let html=`
            <div id='img-div'>
                <img alt='' src='${hero.thumbnail.path+'.'+hero.thumbnail.extension}'>
            </div>
            
            <div id='right-div'>
                <h1>Hero Name: &nbsp${hero.name}</h1>
                <p><b>Description:</b> &nbsp${hero.description}</p>
                <p><b>Comics:</b>${comics}</p>
                <p><b>Events:</b>${events}</p>
                <p><b>Series:</b>${series}</p>
                <p><b>Stories:</b>${stories}</p>
            </div>
    `

    ele.innerHTML+=html;
}

fetchHero();

const addtofav=()=>{
    let favouriteHeroes=getFavFromLocal();
    if(favouriteHeroes.includes(id)){
        let newfav=favouriteHeroes.filter((item)=>item!=id);
        localStorage.setItem(FAVOURITES,JSON.stringify(newfav));
    }else{
        favouriteHeroes.push(id);
        localStorage.setItem(FAVOURITES,JSON.stringify(favouriteHeroes));
    }
    renderButton();
}

