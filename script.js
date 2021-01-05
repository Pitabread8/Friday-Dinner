function createCards() {
    let cardtitles = ["First Past the Post", "Two Round Runoff", "Instant Runoff/Alternative Vote", "Borda Count", "Condorcet Method", "Approval Voting", "Proportional Representation", "Score/Cardinal Voting"];
    let cardtext = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (i = 0; i < cardtitles.length; i++) {
        let card = document.createElement('div');
        card.className = "card";
        grid = document.getElementById('grid');
        grid.appendChild(card);

        let title = document.createElement('h2');
        title.innerHTML = `${cardtitles[i]}`;
        card.appendChild(title);

        let text = document.createElement('p');
        text.innerHTML = `${cardtext[i]}`;
        card.appendChild(text);
    }
}