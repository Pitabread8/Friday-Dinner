let cs = [];
let vs = [];
let length = 50;
let cnums = 3;
let vnums = 7;
let votes = [];
let winners = [];
let cslider;
let vslider;
let menu;
let colors = ["#81B29A", "#53826C", "#64495A", "#392131", "#AD4865", "#7A163B", "#E07A5F", "#AA4C34", "#F2CC8F", "#BE9B61"]

function setup() {
    createCanvas(windowWidth, windowHeight - 220);
    background("#F4F1DE");
    strokeWeight(0);
    rectMode(CENTER)

    menu = createSelect();
    menu.position(length, 150);
    menu.option("Plurality");
    menu.option("Ranked");
    menu.option("Approval");
    menu.option("Score");

    for (c = 0; c < cnums; c++) {
        let random = Math.floor(Math.random() * colors.length);
        cs.push(new Candidate(c, colors[random]));
        votes.push(0);
        colors.splice(random, 1);
    }
    for (v = 0; v < vnums; v++) { vs.push(new Voter(cs)); }

    cslider = createSlider(3, 10, 3, 1);
    cslider.position(width / 2 - 200, 150);
    cslider.style('width', '600px');

    vslider = createSlider(3, 20, 7, 1);
    vslider.position(width / 2 - 200, 180);
    vslider.style("width", "600px");
    vslider.addClass("slider");
}

function draw() {
    background("#F4F1DE");

    let cval = cslider.value();
    let vval = vslider.value();
    textSize(20);
    fill("#E07A5F");
    text("Candidates", width / 2 - 260, 13);
    text("Voters", width / 2 - 240, 43);
    text(cval, width / 2 + 415, 13);
    text(vval, width / 2 + 415, 43);
    textSize(12);

    if (cval > cnums) {
        for (c = 0; c < cval - cnums; c++) {
            let random = Math.floor(Math.random() * colors.length);
            cs.push(new Candidate(cnums + c, colors[random]));
            votes.push(0);
            colors.splice(random, 1);
        }
        cnums = cval;
        for (v = 0; v < vnums; v++) { vs[v]["candidates"] = cs; }
    }
    if (cval < cnums) {
        for (c = 0; c < cnums - cval; c++) { colors.push(cs.pop()["color"]); }
        cnums = cval;
        for (v = 0; v < vnums; v++) { vs[v]["candidates"] = cs; }
    }

    vs.forEach(v => v.update());
    changeSystem();

    cs.forEach(c => c.update());
    cs.forEach(c => c.display());

    fill(224, 122, 95, 200)
    rect(width - 3 * length, height / 2, 5 * length, height)
    
    if (vval > vnums) {
        for (v = 0; v < vval - vnums; v++) { vs.push(new Voter(cs)); }
        vnums = vval;
    }
    if (vval < vnums) {
        for (v = 0; v < vnums - vval; v++) { vs.pop(); }
        vnums = vval;
    }

    votes = [];
    for (c = 0; c < cnums; c++) { votes.push(0); }

    switch (menu.value()) {
        case "Plurality":
            vs.forEach(countFPTPVotes);
            break;
        case "Ranked":
            vs.forEach(countBordaVotes);
            break;
        case "Approval":
            vs.forEach(countApprovalVotes);
            break;
        case "Score":
            vs.forEach(countScoreVotes);
            break;
        default:
            vs.forEach(countFPTPVotes);
    }

    fill("white");
    let final = votes.concat().sort((function (a, b) { return b - a }));
    for (let i in votes) {
        if (votes[i] === final[0]) { winners.push(i); }
        text(`Candidate ${i} got ${votes[i]} votes`, width - 3 * length, height - ((i * 1) + 2.25) * length);
    }
    textSize(16);
    if (winners.length === 1) { text(`The winner is Candidate ${winners}`, width - 3 * length, height - 1.25 * length); }
    else { text(`It was a tie between Candidates ${winners.join(" and ")}`, width - 3 * length, height - 1.25 * length, width / 8, height); }
    winners = [];
}

function changeSystem() {
    switch (menu.value()) {
        case "Plurality":
            vs.forEach(v => v.fptp());
            break;
        case "Ranked":
            vs.forEach(v => v.borda());
            break;
        case "Approval":
            vs.forEach(v => v.approval());
            break;
        case "Score":
            vs.forEach(v => v.score());
            break;
        default:
            vs.forEach(v => v.fptp());
    }
}

function countFPTPVotes(item, index) { votes[item["vote"]]++; }
function countBordaVotes(item, index) { for (let s in item["sorted"]) { votes[item["distances"].indexOf(item["sorted"][s])] += cnums - s; } }
function countApprovalVotes(item, index) { for (let d in item["approved"]) { votes[item["approved"][d]]++; } }
function countScoreVotes(item, index) { for (let d in item["approved"]) { votes[d] += item["approved"][d]; } }

function mousePressed() {
    let found = false;

    for (i = cs.length - 1; i >= 0; i--) {
        if (found === false) {
            if (mouseX > cs[i].x - length && mouseX < cs[i].x + length && mouseY > cs[i].y - length && mouseY < cs[i].y + length) {
                cs[i].pressed();
                found = true;
            }
        }
    }

    for (i = vs.length - 1; i >= 0; i--) {
        if (found === false) {
            if (mouseX > vs[i].x - length && mouseX < vs[i].x + length && mouseY > vs[i].y - length && mouseY < vs[i].y + length) {
                vs[i].pressed();
                found = true;
            }
        }
    }

    found = true;
}

function mouseReleased() {
    cs.forEach(c => c.dragging = false);
    vs.forEach(v => v.dragging = false);
}

class Shape {
    constructor() {
        this.x = random(3 * length, width - 6 * length - length);
        this.y = random(3 * length, height - 3 * length);
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        if (this.dragging) {
            this.x = mouseX + length + this.offsetX;
            this.y = mouseY + length + this.offsetY;
        }
    }

    pressed() {
        this.dragging = true;
        this.offsetX = this.x - length - mouseX;
        this.offsetY = this.y - length - mouseY;
    }
}

class Voter extends Shape {
    constructor(candidates) {
        super();
        this.candidates = candidates;
        this.vote = 0;
    }

    init() {
        this.distances = [];
        this.sum = 0;
        for (c = 0; c < this.candidates.length; c++) {
            this.distances.push(int(dist(this.x, this.y, this.candidates[c]["x"], this.candidates[c]["y"])));
            this.sum += c + 1;
        }
        this.sorted = this.distances.concat().sort((function (a, b) { return a - b }));
    }

    fptp() {
        this.init();
        this.vote = this.distances.indexOf(this.sorted[0]);
        fill(this.candidates[this.vote]["color"]);
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        noStroke();
    }
    borda() {
        this.init();
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        let start = 0;
        for (let a in this.sorted) {
            this.vote = this.distances.indexOf(this.sorted[a]);
            fill(this.candidates[this.vote]["color"]);
            noStroke();
            arc(this.x, this.y, length * 2, length * 2, start, start + radians(((this.candidates.length - a) / this.sum) * 360), PIE)
            start += radians(((this.candidates.length - a) / this.sum) * 360);
        }
    }
    approval() {
        this.init();
        this.approved = [];
        for (let d in this.distances) {
            if (this.distances[d] <= 700) {
                this.approved.push(d);
            }
        }
        fill("#F4F1DE");
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        let start = 0;
        for (let a in this.approved) {
            fill(this.candidates[this.approved[a]]["color"]);
            noStroke();
            arc(this.x, this.y, length * 2, length * 2, start, start + radians((1 / this.approved.length) * 360), PIE);
            start += radians((1 / this.approved.length) * 360);
        }
    }
    score() {
        this.init();
        this.approved = [];
        for (let d in this.distances) {
            if (this.distances[d] <= 1000) {
                let rating = (600 - (Math.ceil(this.distances[d] / 200) * 200 / 2)) / 100;
                this.approved.push(rating);
            }
            else { this.approved.push(0); }
        }
        fill("#F4F1DE");
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        let start = 0;
        for (let a in this.approved) {
            fill(this.candidates[a]["color"]);
            arc(this.x, this.y, length * 2, length * 2, start, start + radians(this.approved[a] * ((1 / this.approved.length) / 5) * 360), PIE);
            start += radians(this.approved[a] * ((1 / this.approved.length) / 5) * 360);
        }
        noStroke();
    }
}

class Candidate extends Shape {
    constructor(id, color) {
        super();
        this.id = id;
        this.color = color;
        this.dragging = false;
    }

    display() {
        let alpha = color(this.color)
        alpha.setAlpha(215);
        fill(alpha);
        stroke(0);
        strokeWeight(1);
        square(this.x, this.y, length * 3)
        fill("white");
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        text(`Candidate ${this.id}`, this.x, this.y);
    }
}