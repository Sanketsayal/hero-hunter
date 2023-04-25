var ts='1682362176426';
var publicKey='63d1ee6e81259f5891e335d22e5b5936';
var hash = 'b93a626ecf93a9627564dad0ddabac64';

// a function to fetch list of heroes from api
const fetchItems=async()=>{
    
    let apiLink=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    let response=await fetch(apiLink);
    let list=await response.json();
    let heroes=list.data.results;
    displayHeroes(heroes);

};

fetchItems()


// a function to display heroes fetched through api call
const displayHeroes=(heroes)=>{

    const heroList=document.getElementById('hero-container');

    heroes.map((hero)=>{
        const item=`
            <div class="hero-card">
                <img alt='' src='${hero.thumbnail.path+'.'+hero.thumbnail.extension}'>
                <div class='name-card'>
                    <a href='hero.html?id=${hero.name}'>
                        <h2>${hero.name}</h2>
                    </a>
                    <span id="${hero.name}" onclick='addtofav("${hero.name}")'><i class="fa-solid fa-star"></i></span>
                </div>
            </div>
        `

        heroList.innerHTML+=item;
    });

};

// this is a function to search the hero name entered in the search bar throught the api and displaying the matching heroes
const searchHero=async()=>{
    const search=document.getElementById('search-bar');
    let text=search.value;
    let link=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${text}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    let response=await fetch(link);
    let heroes=await response.json();
    const ele=document.getElementById('search-result');
    heroes.data.results.map((hero)=>{
        let html=`
            <div class='search-result-item' key='${hero.name}'>
                <img alt='' src='${hero.thumbnail.path+'.'+hero.thumbnail.extension}'>
                    <a href='hero.html?id=${hero.name}'>
                    <span>${hero.name}<span>
                </a>
                <span id="${hero.name}" onclick='addtofav("${hero.name}")'><i class="fa-solid fa-star"></i></span>
            </div>
        `
        ele.innerHTML+=html;
    });
};






