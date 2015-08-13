// ==UserScript==
// @name 		Nube de creaciones
// @author		Wigazo
// @version		1.5
// ==/UserScript==

if(location.href.indexOf("http://www.sporepedia2.com/t") == 0){
	function abrirMenuDescargar(){
		var elem = this;
		if(elem.tagName == "IMG"){
			elem = elem.nextSibling;
			elem.getElementsByTagName("input")[0].value = descargasCount;
		}
		elem.style.display = "initial";
	}
	function cerrarMenuDescargar(){
		var elem = this;
		if(elem.tagName == "IMG") elem = elem.nextSibling;
		elem.style.display = "none";
	}
	function descargarImagen(){
		descargasCount = parseInt(this.previousSibling.previousSibling.value);
		var iframe = document.createElement('iframe');
		iframe.src = this.parentNode.previousSibling.src;
		iframe.name = "#descargaNC=" + descargasCount + ".png";
		iframe.style.display = "none";
		document.getElementsByTagName("body")[0].appendChild(iframe);
		descargasCount++;
		this.parentNode.style.display = "none";
	}
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
		if (evtobj.keyCode == 66 && evtobj.shiftKey){
			imagenes.forEach(function(entry) {
				if(entry.getAttribute("src").indexOf(".imageshack.us/img") != -1) entry.setAttribute("src", "http://imageshack.com/a/" + entry.getAttribute("src").substring(entry.getAttribute("src").indexOf('.imageshack.us/')+15));
			}); 
			document.getElementsByClassName("post")[0].style.background = "#ffc246";
		}
	}
	var descargasCount = 1;
	var wDB;
	var imagenes = Array.prototype.slice.call(document.getElementsByClassName("content")[0].getElementsByTagName("img"));
	for(var i = 0; i < imagenes.length; i++){
		var newDiv = document.createElement("div");
		imagenes[i].parentNode.insertBefore(newDiv, imagenes[i].nextSibling);
		imagenes[i].addEventListener('mouseover', abrirMenuDescargar);
		newDiv.outerHTML = '<div style="position: absolute;display: none; padding: 15px;" class="forabg"><input class="inputbox" style="width: 100px;" onClick="this.select();"><br><button style="font-size: 17px;">DESCARGAR</button><a></div>';
		imagenes[i].addEventListener('mouseout', cerrarMenuDescargar);
		imagenes[i].nextSibling.addEventListener('mouseover', abrirMenuDescargar);
		imagenes[i].nextSibling.addEventListener('mouseout', cerrarMenuDescargar);
		imagenes[i].nextSibling.getElementsByTagName("button")[0].addEventListener('click', descargarImagen);
	}
	document.onkeydown = teclazo;
}

if(window.name.indexOf("#descargaNC=") == 0){
	var a = document.createElement('a');
	a.download = window.name.split("descargaNC=")[1];
	a.href = location.href;
	a.dispatchEvent(new Event("click"));
}

if(location.href.indexOf("https://www.dropbox.com/home/BACKUP/") == 0 && window.name.indexOf("#tid=") == 0){
	var tid = window.name.split("#tid=")[1];
	var interval = setInterval(function (){
	   if(document.getElementById("new_folder_button")){
			clearInterval(interval);
			var creada = false;
			var carpetas = Array.prototype.slice.call(document.getElementsByClassName("filename-link"));
			carpetas.forEach(function(entry) {
				if(entry.innerHTML == tid) creada = true;
			});
			if(!creada){
				document.getElementById("new_folder_button").click();
				document.getElementsByClassName("editor_field")[0].value = tid;
				document.getElementsByClassName("editor_field")[0].dispatchEvent(new Event("blur"));
			}
			unsafeWindow.name = "";
			location.href += "/" + tid;
		}
	}, 100);
}