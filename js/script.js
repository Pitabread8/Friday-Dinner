function createNav(num) {
    document.body.append(Object.assign(document.createElement("img"), {id: "logo"}, {src: "assets/images/logo.png"}));
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

function createCards() {
    let cardtitles = ["First Past the Post", "Alternative Vote", "Approval Voting", "Score Voting"];
    let sections = document.getElementsByClassName("info-c");
    sections[sections.length - 1].classList.toggle("info-active");

    for (i = 0; i < cardtitles.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = i;
        menu = document.getElementById("menu");
        menu.appendChild(card);

        card.appendChild(Object.assign(document.createElement("h3"), {textContent: cardtitles[i]}));

        card.addEventListener("click", () => {
            let cards = document.getElementsByClassName("card");
            for (i = 0; i < cards.length; i++) {cards[i].className = "card";}
            card.classList.toggle("card-active");
            for (i = 0; i < sections.length; i++) {sections[i].className = "info-c";}
            sections[card.id].classList.toggle("info-active");
        });
    }
}

function createFooter() {
    let yr = new Date().getFullYear();
    let footer = document.getElementsByTagName("footer");
    footer[0].append(Object.assign(document.createElement("small"), {innerHTML: "Copyright &copy 2021 Friday Dinner. All Rights Reserved."}));
}