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
            document.getElementById(element.id + "-close").classList.add("closed");
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
