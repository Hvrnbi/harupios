// Clock

var dat = document.querySelector("#date-and-time");
var tz = Intl.DateTimeFormat().resolvedOptions().timeZone

function updateTime() {
    var currentTime = new Date().toLocaleString(navigator.languages[0], {"timezone": tz});

    dat.textContent = currentTime;
}

setInterval(updateTime, 1000);

// Drag elements (base code from https://www.geeksforgeeks.org/html/draggable-element-using-javascript/)

const dragElements = document.querySelectorAll(".draggable"); 

function onMouseDrag(event, element) {
    let leftValue = parseInt(window.getComputedStyle(element).left);
    let topValue = parseInt(window.getComputedStyle(element).top);

    if (0 < (leftValue + event.movementX) &&  (leftValue + event.movementX) < (window.window.innerWidth - element.offsetWidth)) {
        element.style.left = `${leftValue + event.movementX}px`;
    }

    if (0 < (topValue + event.movementY) && (topValue + event.movementY) < (window.window.innerHeight - element.offsetHeight)) {
        element.style.top = `${topValue + event.movementY}px`;
    }
}

dragElements.forEach((element) => {

    if (document.getElementById(element.id + "-header"))

    document.getElementById(element.id + "-header").addEventListener("mousedown", (e) => {
        const onMove = (event) => onMouseDrag(event, element); 

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMove);
        }, { once: true });
    });

    if (document.getElementById(element.id + "-open")) {
        document.getElementById(element.id + "-open").addEventListener("click", () => {
            openWindow(element);
            document.getElementById(element.id + "-open").classList.toggle("closed");
        })
    }

    if (document.getElementById(element.id + "-close")) {
        document.getElementById(element.id + "-close").addEventListener("click", () => {
            closeWindow(element);
            document.getElementById(element.id + "-open").classList.add("closed");
        })
    }
});

// Open & close windows

var dock = document.getElementById("dock-div");
var topbar = document.getElementById("topbar-div");

function closeWindow(elt) {
    elt.classList.add("hidden");
}

var biggestIndex = 0;

function openWindow(elt) {
    elt.classList.toggle("hidden");
    biggestIndex ++;
    elt.style.zIndex = biggestIndex;
    dock.style.zIndex = biggestIndex + 1;
    topbar.style.zIndex = biggestIndex + 1;
}

// Bell

var bellbtn = document.getElementById("notif-btn");
var bellsound = new Audio("../sounds/ding.mp3");

bellbtn.addEventListener("click", function() {
    bellsound.play();
});

// Book list app
var booktitle = document.getElementById("current-book-title");
var bookauthor = document.getElementById("current-book-author");
var bookend = document.getElementById("current-book-end-date");
var bookpubdate = document.getElementById("current-book-publication-date");
var bookcomments = document.getElementById("current-book-comments");
var booklisticon = document.getElementById("booklist-div-icon");

var currentbookid = books.length - 1;

function updateBook(id) {
    booktitle.textContent = books[id].title;
    bookauthor.textContent = "Written by " + books[id].author;
    bookend.textContent = "I finished it on " + books[id].end_date;
    bookpubdate.textContent = "It was published on " + books[id].publication_date;
    bookcomments.textContent = books[id].comments;
    booklisticon.textContent = books[id].icon;
}

function previousBook() {
    if (currentbookid > 0) {
        currentbookid --;
        updateBook(currentbookid);
    } else {
        alert("It was the first book !");
    }
}

function nextBook() {
    if (currentbookid < books.length - 1) {
        currentbookid ++;
        updateBook(currentbookid);
    } else {
        alert("It is the last book !");
    }
}

document.getElementById("next-book-btn").addEventListener("click", nextBook);
document.getElementById("previous-book-btn").addEventListener("click", previousBook);

updateBook(currentbookid);

// Super secret pong

var pongscore = document.getElementById("super-secret-pong-score");
var pongleftpaddle = document.getElementById("super-secret-pong-left-paddle");
var pongleftpaddleoffset = - 19;
var pongrightpaddle = document.getElementById("super-secret-pong-right-paddle");
var pongrightpaddleoffset = - 51;
var pongpaddlepos;
var pongball = document.getElementById("super-secret-pong-ball");
var pongballyoffset = -83;
var pongballx;
var pongballxvel;
var pongbally;
var pongballyvel;
var ponginterval;
var pongstatus = false;

function pongResetScore() {
    pongscore.textContent = "0";
}

function pongInit() {
    pongpaddlepos = 18;
    pongleftpaddle.style.top = "-1px";
    pongrightpaddle.style.top = "-33px";
    pongballx = 32;
    pongball.style.left = "32px";
    pongbally = 32;
    pongball.style.top = "-51px";
}

function pongStart() {
    pongInit();
    pongstatus = true;
    pongscore.textContent = "0";
    pongballxvel = 6;
    pongballyvel = 3;

    ponginterval = setInterval(updateBall, 100);
}

function updateBall() {
    if (0 > pongbally + pongballyvel || pongbally + pongballyvel > 196) {
        if (pongballyvel > 0) {
            pongballyvel = - Math.floor(Math.random() * 2) - pongballyvel;
        } else {
            pongballyvel = Math.floor(Math.random() * 2) - pongballyvel;
        }
    }

    if (18 > pongballx + pongballxvel || pongballx + pongballxvel > 374) {
        if (pongpaddlepos < pongbally + pongballyvel && pongbally + pongballyvel < pongpaddlepos + 32) {
            if (pongballxvel > 0) {
                pongballxvel = - Math.floor(Math.random() * 2) - pongballxvel;   
            } else {
                pongballxvel = Math.floor(Math.random() * 2) - pongballxvel; 
            }
            pongscore.textContent ++;
        } else {
            clearInterval(ponginterval);
            pongstatus = false;
            pongballx += pongballxvel;
            pongbally += pongballyvel;
            pongball.style.left = pongballx.toString() + "px";
            var pongballywithoffset = pongbally + pongballyoffset;
            pongball.style.top = pongballywithoffset.toString() + "px";
        }
    }

    pongballx += pongballxvel;
    pongbally += pongballyvel;
    pongball.style.left = pongballx.toString() + "px";
    var pongballywithoffset = pongbally + pongballyoffset;
    pongball.style.top = pongballywithoffset.toString() + "px";
}

document.getElementById("super-secret-pong-start").addEventListener("click", pongStart);

document.body.addEventListener("keydown", function(event) {
    if (event.key == "ArrowUp" && pongstatus) {
        if (0 < pongpaddlepos) {
            pongpaddlepos -= 4;
            var pongleftpaddleposwithoffset = pongpaddlepos + pongleftpaddleoffset;
            var pongrightpaddleposwithoffset = pongpaddlepos + pongrightpaddleoffset;
            pongleftpaddle.style.top = pongleftpaddleposwithoffset.toString() + "px";
            pongrightpaddle.style.top = pongrightpaddleposwithoffset.toString() + "px";
        }
    } else if (event.key == "ArrowDown" && pongstatus) {
        if (pongpaddlepos < 168) {
            pongpaddlepos += 4;
            var pongleftpaddleposwithoffset = pongpaddlepos + pongleftpaddleoffset;
            var pongrightpaddleposwithoffset = pongpaddlepos + pongrightpaddleoffset;
            pongleftpaddle.style.top = pongleftpaddleposwithoffset.toString() + "px";
            pongrightpaddle.style.top = pongrightpaddleposwithoffset.toString() + "px";
        }
    }
});

pongInit();

// Super secret button

var supersecretcounter = 0;
var pongSound = new Audio("../sounds/pong.mp3");

document.getElementById("harupios-btn").addEventListener("click", function() {
    supersecretcounter ++;
    pongSound.play();
    if (supersecretcounter == 8) {
        document.getElementById("super-secret-pong-div-open").classList.remove("hidden");
        document.getElementById("super-secret-pong-div").classList.remove("hidden");
    }
});
