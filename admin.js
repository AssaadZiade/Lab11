let wsUrl = "ws://localhost:8080";
let connection = new WebSocket(wsUrl);

connection.onopen = function () {
    console.log("connected");
}

document.getElementById("load-users").addEventListener("click", function(){
    connection.send("LoadUsers");
})

connection.onmessage = function(e) {
      var globalChat = JSON.parse(e.data);
      const h1 = document.createElement("h1");
      h1.innerText = "Welcome Admin";
      document.getElementById("users").appendChild(h1);
      globalChat.array.forEach(element => {
          const p1 = document.createElement("p");
          p.innerHTML = `<br>Name:${element.firstName}<br>Last Name: ${element.lastName}<br>Gender: ${element.gender}<br>Description: ${element.description}<hr>`;
          document.getElementById("users").appendChild(p);
      });
}
