
function createNav(num) {
    let imglist = ["about", "analysis", "sim", "resources", "404"];    
    let gif = false;
    document.body.append(Object.assign(document.createElement("img"), {id: "logo"}, {src: `images/logos/${imglist[num]}.png`}, {
        onclick: function() {
            let element = document.getElementById("logo");
            if (gif === true) {
                element.src  = `images/logos/${imglist[num]}.png`;
                element.style.height = "50px";
                element.style.margin = "15px auto";
            }
            else {
                element.src = `images/logos/${imglist[num]}.gif`;
                element.style.height = "63px";
                element.style.margin = "10px auto";
            }
            gif = !gif; 
        }
    }));
    
    let nav = document.createElement("nav");
    document.body.append(nav);
    nav.appendChild(Object.assign(document.createElement("ul"), {id: "nav-list"}));

    let navlist = ["About", "Analysis", "Simulator", "Resources"];
    let filelist = ["index", "analysis", "sim", "resources"];
    for (i = 0; i < navlist.length; i++) {
        let list = document.getElementById("nav-list");
        let item = document.createElement("li");
        list.appendChild(item);
        
        let link = document.createElement("a");
        link.setAttribute("href", `${filelist[i]}.html`);
        link.textContent = navlist[i];
        if (i === num) { link.id = "nav-main"; }
        item.appendChild(link);
    }
}

let sections = document.getElementsByClassName("info-c");
let cards = document.getElementsByClassName("card");

function createCards() {
    let cardtitles = ["Overview", "Plurality Voting", "Ranked Voting", "Approval Voting", "Score Voting"];

    for (i = 0; i < cardtitles.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = i;
        menu = document.getElementById("menu");
        menu.appendChild(card);

        card.appendChild(Object.assign(document.createElement("h3"), {textContent: cardtitles[i]}));

        card.addEventListener("click", () => {
            for (i = 0; i < cards.length; i++) {cards[i].className = "card";}
            card.classList.toggle("card-active");
            let anchor = document.getElementById(sections[card.id].id);
            for (i = 0; i < sections.length; i++) {sections[i].style.paddingTop = "initial";}
            anchor.style.paddingTop = "35px";
            window.location.href = `#${anchor.id}`;
        });
    }
}

let url = (window.location.pathname);
let file = url.substring(url.lastIndexOf('/')+1);

if (file.includes("analysis")) {
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        let positions = [];
        for (s = 0; s < sections.length; s++) {positions.push(sections[s].offsetTop);}
        let scroll = window.scrollY + 201;
        let closest = positions.reduce((a, b) => {return Math.abs(b - scroll) < Math.abs(a - scroll) ? b : a;});
        let index = positions.indexOf(closest);
        for (i = 0; i < cards.length; i++) {cards[i].className = "card";}
        cards[index].classList.toggle("card-active");

        imglist = ["fptp", "fptp", "ranked", "approval", "score"];
        document.getElementById("ballot").src = `images/ballots/${imglist[index]}.png`;
    }   
}

function createFooter() {
    let yr = new Date().getFullYear();
    let footer = document.getElementsByTagName("footer");
    footer[0].append(Object.assign(document.createElement("small"), {innerHTML: "Copyright &copy 2021 Friday Dinner. All Rights Reserved."}));
}