urlparams = new URLSearchParams(location.search);

content = new XMLHttpRequest();
content.open("GET", "https://goldencontroller.github.io/games_info.json", false);
content.send();
content = JSON.parse(content.responseText);

game_selected = content[urlparams.get("game")];

document.title = game_selected.name + " | Games Viewer";

header = document.createElement("h1");
header.innerText = game_selected.name;
document.body.appendChild(header);

desc = document.createElement("p");
desc.innerText = game_selected.description;
document.body.appendChild(desc);

if (game_selected.weburl) {
    contain = document.createElement("div");
    contain.style.position = "relative";
    browsertitle = document.createElement("h2");
    browsertitle.innerText = "Play now in browser";
    document.body.appendChild(browsertitle);
    iframe = document.createElement("iframe");
    iframe.src = game_selected.weburl;
    contain.appendChild(iframe);
    fullscreenbutton = document.createElement("button");
    fullscreenbutton.innerText = "Full screen";
    fullscreenbutton.onclick = function() { iframe.requestFullscreen() };
    fullscreenbutton.style.position = "absolute";
    fullscreenbutton.style.top = "5px";
    fullscreenbutton.style.left = "5px";
    contain.appendChild(fullscreenbutton);
    document.body.appendChild(contain);
}

downloadstitle = document.createElement("h2");
downloadstitle.innerText = "Downloads";
document.body.appendChild(downloadstitle);
if (game_selected.downloads) {
    for (key in game_selected.downloads) {
        li = document.createElement("li");
        li.innerHTML = "<a href='" + game_selected.downloads[key] + "'>" + key + "</a>";
        document.body.appendChild(li);
    }
}
else {
    message = document.createElement("span");
    message.innerText = "none";
    document.body.appendChild(message);
}