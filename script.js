function createHead() {
    let fontlist = ["Quicksand", "Oswald", "Pangolin"];
    for (i = 0; i < fontlist.length; i++) {
        let font = document.createElement("link");
        font.setAttribute("rel", "stylesheet");
        font.setAttribute("href", `https://fonts.googleapis.com/css?family=${fontlist[i]}`);
        document.head.appendChild(font);
    }
}

function createNav(num) {
    document.body.append(Object.assign(document.createElement("h1"), {textContent: "A New Vote"}));
    let nav = document.createElement("nav");
    document.body.append(nav);
    nav.appendChild(Object.assign(document.createElement("ul"), {id: "nav-list"}));

    let navlist = ["Home", "Analysis", "Simulator", "Sources"];
    let filelist = ["index", "analysis", "sim", "sources"];
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

    for (i = 0; i < cardtitles.length; i++) {
        let card = document.createElement('div');
        card.className = "card";
        card.id = i;
        grid = document.getElementById('grid');
        grid.appendChild(card);

        card.appendChild(Object.assign(document.createElement("h3"), {textContent: cardtitles[i]}));

        card.addEventListener('click', () => {
            showInfo(card.id);
            let cards = document.getElementsByClassName("card");
            for (i = 0; i < cards.length; i++) {
                cards[i].className = "card";
            }
            card.classList.toggle("card-active");
        });
    }
}

function showInfo(index) {
    let cardtext = [
        "FPTP is the simplest and most common of the voting systems. Each voter votes once for their candidate of choice. The candidate with the most votes wins. [Not finished]", 
        "b",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra ante quam, non dignissim elit sollicitudin eu. Aliquam pulvinar vel diam id tincidunt. Fusce ultrices vitae nisl in fringilla. Nunc eu rutrum velit. Aenean gravida est vitae ultricies tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque tempor ipsum id lacinia. Nam finibus sem quis est dictum cursus. Phasellus sit amet nisl vitae purus imperdiet condimentum. Donec eu viverra risus. Morbi ut volutpat velit. Sed dignissim augue id gravida iaculis. Morbi sit amet nisl vel nisi laoreet pharetra.Aliquam quis purus sodales ex posuere cursus. Praesent blandit eu nisl vitae sodales. In in tempor sapien. Curabitur nec luctus justo. Integer tristique nibh quis posuere tincidunt. Sed imperdiet lobortis dolor vel accumsan. Aliquam facilisis ut metus non pulvinar. Donec vitae molestie urna, nec finibus felis. Donec sit amet iaculis mi. Praesent eget dolor non augue luctus tincidunt. Vestibulum vel aliquet enim. Donec at viverra odio. Aliquam eu nunc hendrerit, facilisis enim ut, venenatis ipsum. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed aliquet tortor bibendum elementum condimentum. Ut sit amet feugiat nibh. Sed quis cursus ante. Phasellus malesuada vitae urna sit amet venenatis. Cras eu velit sed nisl rhoncus varius et et lorem. Suspendisse potenti. Nunc venenatis iaculis sem, ac convallis quam volutpat at. Etiam vulputate luctus metus, quis porta turpis posuere a. Nunc nec purus ut diam gravida tempus a nec nisl. Cras in sem enim. Praesent ac tempor risus, eu sollicitudin est. Mauris a mauris viverra, vestibulum orci quis, fringilla nibh. Proin mattis nisi semper, imperdiet tellus non, aliquet sapien. Pellentesque sed massa fringilla, pretium tortor et, dapibus ligula. Fusce eget justo egestas massa luctus elementum. Aenean ac libero sit amet metus consequat finibus sed vel nulla. Phasellus volutpat aliquam odio nec aliquet. Etiam pulvinar libero eget justo fermentum efficitur. Sed lobortis, ipsum sed laoreet dictum, neque orci varius sem, luctus dignissim est nunc ut lorem. Nulla mollis ornare nulla ac scelerisque. Fusce commodo sagittis metus, sit amet tempor quam eleifend quis. Curabitur vulputate vitae diam in pretium. Suspendisse sed porttitor libero. Maecenas non orci lobortis, egestas sem ut, laoreet lacus. Etiam nisi metus, posuere ac metus at, elementum rhoncus mauris. Praesent vitae justo vel arcu imperdiet rhoncus eu ac lectus. Ut non placerat dolor, venenatis efficitur magna. Maecenas enim libero, interdum nec dapibus at, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra ante quam, non dignissim elit sollicitudin eu. Aliquam pulvinar vel diam id tincidunt. Fusce ultrices vitae nisl in fringilla. Nunc eu rutrum velit. Aenean gravida est vitae ultricies tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque tempor ipsum id lacinia. Nam finibus sem quis est dictum cursus. Phasellus sit amet nisl vitae purus imperdiet condimentum. Donec eu viverra risus. Morbi ut volutpat velit. Sed dignissim augue id gravida iaculis. Morbi sit amet nisl vel nisi laoreet pharetra.Aliquam quis purus sodales ex posuere cursus. Praesent blandit eu nisl vitae sodales. In in tempor sapien. Curabitur nec luctus justo. Integer tristique nibh quis posuere tincidunt. Sed imperdiet lobortis dolor vel accumsan. Aliquam facilisis ut metus non pulvinar. Donec vitae molestie urna, nec finibus felis. Donec sit amet iaculis mi. Praesent eget dolor non augue luctus tincidunt. Vestibulum vel aliquet enim. Donec at viverra odio. Aliquam eu nunc hendrerit, facilisis enim ut, venenatis ipsum. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed aliquet tortor bibendum elementum condimentum. Ut sit amet feugiat nibh. Sed quis cursus ante. Phasellus malesuada vitae urna sit amet venenatis. Cras eu velit sed nisl rhoncus varius et et lorem. Suspendisse potenti. Nunc venenatis iaculis sem, ac convallis quam volutpat at. Etiam vulputate luctus metus, quis porta turpis posuere a. Nunc nec purus ut diam gravida tempus a nec nisl. Cras in sem enim. Praesent ac tempor risus, eu sollicitudin est. Mauris a mauris viverra, vestibulum orci quis, fringilla nibh. Proin mattis nisi semper, imperdiet tellus non, aliquet sapien. Pellentesque sed massa fringilla, pretium tortor et, dapibus ligula. Fusce eget justo egestas massa luctus elementum. Aenean ac libero sit amet metus consequat finibus sed vel nulla. Phasellus volutpat aliquam odio nec aliquet. Etiam pulvinar libero eget justo fermentum efficitur. Sed lobortis, ipsum sed laoreet dictum, neque orci varius sem, luctus dignissim est nunc ut lorem. Nulla mollis ornare nulla ac scelerisque. Fusce commodo sagittis metus, sit amet tempor quam eleifend quis. Curabitur vulputate vitae diam in pretium. Suspendisse sed porttitor libero. Maecenas non orci lobortis, egestas sem ut, laoreet lacus. Etiam nisi metus, posuere ac metus at, elementum rhoncus mauris. Praesent vitae justo vel arcu imperdiet rhoncus eu ac lectus. Ut non placerat dolor, venenatis efficitur magna. Maecenas enim libero, interdum nec dapibus at, tempus nec felis. In fermentum vulputate quam sit amet maximus.", 
        "f"
    ];
    let info = document.getElementById("info-p");
    info.textContent = cardtext[index];
}