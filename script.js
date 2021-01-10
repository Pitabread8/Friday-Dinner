function createCards() {
    let cardtitles = ["First Past the Post", "Two Round Runoff", "Instant Runoff/Alternative Vote", "Borda Count", "Condorcet Method", "Approval Voting", "Proportional Representation", "Score/Cardinal Voting"];

    for (i = 0; i < cardtitles.length; i++) {
        let card = document.createElement('div');
        card.className = "card";
        card.id = `${i}`
        grid = document.getElementById('grid');
        grid.appendChild(card);

        let title = document.createElement('h2');
        title.innerHTML = `${cardtitles[i]}`;
        card.appendChild(title);

        card.addEventListener('mouseover', () => {
            showInfo(card.id);
        });
    }
}

function showInfo(index) {
    let cardtext = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let info = document.getElementById("info-p");
    info.innerHTML = `${cardtext[index]}`;
    info.style.display = "inherit";
}