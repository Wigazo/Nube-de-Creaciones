// ==UserScript==
// @name 		Nube de creaciones
// ==/UserScript==

if(location.href.indexOf("http://www.sporepedia2.com/t") == 0){
	function teclazo(e) {
		var evtobj = window.event? event : e
		if (evtobj.keyCode == 66 && evtobj.ctrlKey){
			var nav =  Array.prototype.slice.call(document.getElementsByClassName("nav"));
			nav  = nav.splice(0,nav.length/2);
			var subforo = nav[3].innerHTML;
			if(nav.length == 5){
				subforo += "/" + nav[4].innerHTML
			}
			var tid = location.pathname.split("/t")[1].split("-")[0].split("p")[0];
			window.open("https://www.dropbox.com/account#tid=" + tid + ",subforo=" + subforo, tid); 
		}
		if (evtobj.keyCode == 66 && evtobj.altKey){
			location.href = document.getElementsByClassName("i_icon_edit")[0].parentNode.getAttribute("href") + "&tick=true"; 
		}
	}
	document.onkeydown = teclazo;
}


if(location.href.indexOf("https://www.dropbox.com/account#tid=") == 0){
	var tid = location.hash.split("#tid=")[1].split(",")[0];
	var subforo = location.hash.split(",subforo=")[1]
	var w = open("https://www.dropbox.com/home/BACKUP/" + subforo, tid+"b"); 
	var interval = setInterval(function (){
	   if(w.document.getElementById("new_folder_button")){
			clearInterval(interval);
			w.document.getElementById("new_folder_button").click();
			w.document.getElementsByClassName("editor_field")[0].value = tid;
			w.document.getElementsByClassName("editor_field")[0].blur();
			w.location.href += "/" + tid;
			close();
		}
	}, 100);
}