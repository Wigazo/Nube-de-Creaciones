// ==UserScript==
// @name 		Nube de creaciones
// @version		1.1
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
			wDB = window.open("https://www.dropbox.com/home/BACKUP/" + subforo, "#tid=" + tid); 
		}
		if (evtobj.keyCode == 66 && evtobj.altKey){
			if(typeof wDB != "undefined") wDB.close();
			location.href = document.getElementsByClassName("i_icon_edit")[0].parentNode.getAttribute("href") + "&tick=true"; 
		}
	}
	var wDB;
	document.onkeydown = teclazo;
}



if(location.href.indexOf("https://www.dropbox.com/home/BACKUP/") == 0 && window.name.indexOf("#tid=") == 0){
	var tid = window.name.split("#tid=")[1];
	var interval = setInterval(function (){
	   if(document.getElementById("new_folder_button")){
			clearInterval(interval);
			document.getElementById("new_folder_button").click();
			document.getElementsByClassName("editor_field")[0].value = tid;
			document.getElementsByClassName("editor_field")[0].blur();
			window.name = "";
			location.href += "/" + tid;
		}
	}, 100);
}