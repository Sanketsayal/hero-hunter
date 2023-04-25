const FAVOURITES='favourites';
var ts='1682362176426';
var publicKey='63d1ee6e81259f5891e335d22e5b5936';
var hash = 'b93a626ecf93a9627564dad0ddabac64';

const getFavFromLocal=()=>{
    return localStorage.getItem(FAVOURITES)?JSON.parse(localStorage.getItem(FAVOURITES)):[];
}

const addtofav=(key)=>{
    let favouriteHeroes=getFavFromLocal();
    if(favouriteHeroes.includes(key)){
        let newfav=favouriteHeroes.filter((item)=>item!=key);
        localStorage.setItem(FAVOURITES,JSON.stringify(newfav));
    }else{
        favouriteHeroes.push(key);
        localStorage.setItem(FAVOURITES,JSON.stringify(favouriteHeroes));
    }
    
    
    const x=document.getElementById(key);
    x.classList.toggle('fav');
}


const displayFav=()=>{
    const f=document.getElementById('favourites');
    f.innerHTML='';
    let favouriteHeroes=getFavFromLocal();
    console.log(favouriteHeroes);
    favouriteHeroes.map(async (hero)=>{
        let link=`https://gateway.marvel.com:443/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        let response=await fetch(link);
        response=await response.json();
        console.log(response);
        let pic=response.data.results[0];
        let html=`
            <div class="hero-card">
                <img alt='' src='${pic.thumbnail.path+'.'+pic.thumbnail.extension}'>
                <div class='name-card'>
                    <a href='hero.html?id=${hero}'>
                        <h2>${hero}</h2>
                    </a>
                    <span id="${hero}" class='fav' onclick='addtofav("${hero}")'><i class="fa-solid fa-star"></i></span>
                </div>
            </div>
        `;
        f.innerHTML+=html;
    })
    
}
