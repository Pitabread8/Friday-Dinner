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
let font;

// function preload() {
//     font = loadFont("../assets/fonts/Roboto-Regular.ttf");
// }

function setup() {
    createCanvas(windowWidth, windowHeight / 1.3);
    background("#F4F1DE");
    strokeWeight(0);
    // textFont(font);

    menu = createSelect();
    menu.position(length, 150);
    menu.option("Plurality");
    menu.option("Ranked");
    menu.option("Approval");
    menu.option("Score");

    for (c = 0; c < cnums; c++) {
        cs.push(new Candidate(c));
        votes.push(0);
    }
    for (v = 0; v < vnums; v++) { vs.push(new Voter(cs)); }

    vslider = createSlider(3, 20, 7, 1);
    vslider.position(width / 2 - 400, 150);
    vslider.style("width", "800px");
    vslider.addClass("slider");
}

function draw() {
    background("#F4F1DE");

    cs.forEach(c => c.display());
    changeSystem();
    
    fill(224, 122, 95, 200)
    rect(width - 3 * length, height - 2.5 * length, 5 * length)

    let vval = vslider.value();
    textSize(20);
    fill("#E07A5F");
    text(vval, width / 2 - 420, 13);
    textSize(12);

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
        text(`Candidate ${i} got ${votes[i]} votes`, width - 3 * length, height - ((i * 1) + 2) * length);
    }
    if (winners.length === 1) { text(`The winner is Candidate ${winners}`, width - 3 * length, height - length); }
    else { text(`It was a tie between Candidates ${winners.join(" and ")}`, width - 3 * length, height - length); }
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

class Shape {
    constructor() {
        this.x = random(3 * length, width - 3 * length);
        this.y = random(3 * length, height - 3 * length);
    }
}

class Voter extends Shape {
    constructor(candidates) {
        super();
        this.candidates = candidates;
        this.distances = [];
        this.sum = 0;
        for (c = 0; c < this.candidates.length; c++) {
            this.distances.push(int(dist(this.x, this.y, this.candidates[c]["x"], this.candidates[c]["y"])));
            this.sum += c + 1;
        }
        this.sorted = this.distances.concat().sort((function (a, b) { return a - b }));
        this.vote = 0;
    }

    fptp() {
        this.vote = this.distances.indexOf(this.sorted[0]);
        fill(this.candidates[this.vote]["color"])
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        noStroke();
    }
    borda() {
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, length * 2);
        let start = 0;
        for (let a in this.sorted) {
            this.vote = this.distances.indexOf(this.sorted[a]);
            fill(this.candidates[this.vote]["color"])
            noStroke();
            arc(this.x, this.y, length * 2, length * 2, start, start + radians(((this.candidates.length - a) / this.sum) * 360), PIE)
            start += radians(((this.candidates.length - a) / this.sum) * 360);
        }
    }
    approval() {
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
    constructor(id) {
        super();
        this.id = id;
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
    }

    display() {
        rectMode(CENTER)
        fill(this.color);
        stroke(0);
        strokeWeight(1);
        square(this.x, this.y, length * 3)
        fill("white");
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        text(`Candidate ${this.id}`, this.x, this.y);
    }
}