urlparams = new URLSearchParams(location.search);

content = new XMLHttpRequest();
content.open("GET", "https://goldencontroller.github.io/games_info.json", false);
content.send();
content = JSON.parse(content.responseText);

frame = document.createElement("iframe");
frame.src = content[urlparams.get("game")].weburl;
document.body.appendChild(frame);

fireEvent = function(key) {
    event = new KeyboardEvent("keydown", { "key": key });
    frame.dispatchEvent(event);
}