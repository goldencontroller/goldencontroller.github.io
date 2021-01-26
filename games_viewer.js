urlparams = new URLSearchParams(location.search);

content = new XMLHttpRequest();
content.open("GET", "https://goldencontroller.github.io/games_info.json", false);
content.send();
content = JSON.parse(content.responseText);

game_selected = content[urlparams.get("game")];

document.title = game_selected.name + " | Games Viewer";

header = document.createElement("h1");
header.innerText = game_selected.name;
document.getElementById("bodycontent").appendChild(header);

desc = document.createElement("p");
desc.innerText = game_selected.description;
document.getElementById("bodycontent").appendChild(desc);

if (game_selected.weburl) {
    contain = document.createElement("div");
    contain.style.position = "relative";
    contain.id = "iframeparent";
    browsertitle = document.createElement("h2");
    browsertitle.innerText = "Play now in browser";
    document.getElementById("bodycontent").appendChild(browsertitle);
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
    document.getElementById("bodycontent").appendChild(contain);
}

downloadstitle = document.createElement("h2");
downloadstitle.innerText = "Downloads";
document.getElementById("bodycontent").appendChild(downloadstitle);
if (game_selected.downloads) {
    for (key in game_selected.downloads) {
        li = document.createElement("li");
        li.innerHTML = "<a href='" + game_selected.downloads[key] + "'>" + key + "</a>";
        document.getElementById("bodycontent").appendChild(li);
    }
}
else {
    message = document.createElement("span");
    message.innerText = "none";
    document.getElementById("bodycontent").appendChild(message);
}