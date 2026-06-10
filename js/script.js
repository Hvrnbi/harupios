// Functions //

function updateTime() {
    var currentTime = new Date().toLocaleString(navigator.languages[0], {"timezone": Intl.DateTimeFormat().resolvedOptions().timeZone});

    document.querySelector("#date-and-time").textContent = currentTime;
}

// Intervals //

setInterval(updateTime, 1000);