function createNav(num) {
    let imglist = ["about", "analysis", "sim", "resources", "404"];
    let gif = true;
    document.body.append(Object.assign(document.createElement("img"), { id: "logo" }, { src: `images/logos/${imglist[num]}.gif` }, {
        onclick: function () {
            let element = document.getElementById("logo");
            if (gif === true) {
                element.src = `images/logos/${imglist[num]}.png`;
            }
            else {
                element.src = `images/logos/${imglist[num]}.gif`;
            }
            gif = !gif;
        }
    }));

    let nav = document.createElement("nav");
    document.body.append(nav);
    nav.appendChild(Object.assign(document.createElement("ul"), { id: "nav-list" }));

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

        card.appendChild(Object.assign(document.createElement("h3"), { textContent: cardtitles[i] }));

        card.addEventListener("click", () => {
            for (i = 0; i < cards.length; i++) { cards[i].className = "card"; }
            card.classList.toggle("card-active");
            let anchor = document.getElementById(sections[card.id].id);
            for (i = 0; i < sections.length; i++) { sections[i].style.paddingTop = "initial"; }
            anchor.style.paddingTop = "45px";
            window.location.href = `#${anchor.id}`;
        });
    }
}

let url = (window.location.pathname);
let file = url.substring(url.lastIndexOf('/') + 1);

if (file.includes("analysis")) {
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        let positions = [];
        for (s = 0; s < sections.length; s++) { positions.push(sections[s].offsetTop); }

        let scroll = window.scrollY + 421;
        let closest = positions.reverse().find(e => e <= scroll);
        positions.reverse()

        let index = positions.indexOf(closest);
        for (i = 0; i < cards.length; i++) { cards[i].className = "card"; }
        cards[index].classList.toggle("card-active");

        imglist = ["blank", "fptp", "ranked", "approval", "score"];
        document.getElementById("ballot").src = `images/ballots/${imglist[index]}.png`;
    }
}

let modalstatus = false;

function changeModal() {
    let modal = document.getElementById("help-modal");
    if (!modalstatus) {
        modal.style.display = "initial";
    }
    else {
        modal.style.display = "none";
    }
    modalstatus = !modalstatus;
    // document.getElementById("help-modal").style.display = "none";
}

let slideIndex;

function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function createFooter() {
    let yr = new Date().getFullYear();
    let footer = document.getElementsByTagName("footer");
    footer[0].append(Object.assign(document.createElement("small"), { innerHTML: "Copyright &copy 2021 Friday Dinner. All Rights Reserved." }));
}