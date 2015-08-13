function abrirMenuDescargar(){
	var elem = this;
	if(elem.tagName != "DIV"){
		elem = elem.nextSibling;
		elem.getElementsByTagName("input")[0].value = descargasCount;
	}
	elem.style.display = "initial";
}

function cerrarMenuDescargar(){
	var elem = this;
	if(elem.tagName != "DIV") elem = elem.nextSibling;
	elem.style.display = "none";
}

function descargarImagen(){
	descargasCount = parseInt(this.previousSibling.previousSibling.value);
	chrome.runtime.sendMessage({accion: "subir", url: this.parentNode.previousSibling.src, subforo: subforo, tid: tid, nombre: descargasCount + ".png"});
	descargasCount++;
	this.parentNode.style.display = "none";
}

function descargarMF(){
	descargasCount = parseInt(this.previousSibling.previousSibling.value);
	var a = document.createElement("a");
	a.href = this.parentNode.previousSibling.href;
	a.target = "#descargaMF=" + subforo + "-" + tid + "-" + descargasCount;
	var evt = document.createEvent("MouseEvents");    
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
	a.dispatchEvent(evt);
	descargasCount++;
	this.parentNode.style.display = "none";
}

document.addEventListener('keydown', function(e) {
	var evtobj = window.event? event : e
	if (evtobj.keyCode == 66 && evtobj.ctrlKey){
		chrome.runtime.sendMessage({accion: "abrirDB", subforo: subforo, tid: tid});
	}
	if (evtobj.keyCode == 66 && evtobj.altKey){
		location.href = document.getElementsByClassName("i_icon_edit")[0].parentNode.getAttribute("href") + "&tick=true"; 
	}
	if (evtobj.keyCode == 66 && evtobj.shiftKey){
		imagenes.forEach(function(entry) {
			if(entry.getAttribute("src").indexOf(".imageshack.us/img") != -1) entry.setAttribute("src", "http://imageshack.com/a/" + entry.getAttribute("src").substring(entry.getAttribute("src").indexOf('.imageshack.us/')+15));
		}); 
		document.getElementsByClassName("post")[0].style.background = "#ffc246";
	}
});


var nav =  Array.prototype.slice.call(document.getElementsByClassName("nav"));
nav  = nav.splice(0,nav.length/2);
var subforo = nav[3].firstChild.innerHTML;
if(nav.length == 5){
	subforo += "/" + nav[4].firstChild.innerHTML;
}
var tid = location.pathname.split("/t")[1].split("-")[0].split("p")[0];

var descargasCount = 1;

var imagenes = Array.prototype.slice.call(document.getElementsByClassName("postbody")[0].getElementsByClassName("content")[0].getElementsByTagName("img"));
for(var i = 0; i < imagenes.length; i++){
	var newDiv = document.createElement("div");
	imagenes[i].parentNode.insertBefore(newDiv, imagenes[i].nextSibling);
	imagenes[i].addEventListener('mouseover', abrirMenuDescargar);
	newDiv.outerHTML = '<div style="position: absolute; display: none; margin: 0px; padding: 15px;" class="forabg"><input class="inputbox" style="width: 100px;" onClick="this.select();"><br><button style="font-size: 17px; width: 100%;">SUBIR</button><a></div>';
	imagenes[i].addEventListener('mouseout', cerrarMenuDescargar);
	imagenes[i].nextSibling.addEventListener('mouseover', abrirMenuDescargar);
	imagenes[i].nextSibling.addEventListener('mouseout', cerrarMenuDescargar);
	imagenes[i].nextSibling.getElementsByTagName("button")[0].addEventListener('click', descargarImagen);
}

var urls = Array.prototype.slice.call(document.getElementsByClassName("postbody")[0].getElementsByClassName("content")[0].getElementsByTagName("a"));
for(var i = 0; i < urls.length; i++){
	if(urls[i].href.indexOf("http://adf.ly/246619/") == 0){
		urls[i].href = urls[i].href.split("http://adf.ly/246619/")[1];
	}
	if(urls[i].href.indexOf("http://www.mediafire.com/") == 0 || urls[i].href.indexOf("https://www.mediafire.com/") == 0){
		var newDiv = document.createElement("div");
		urls[i].parentNode.insertBefore(newDiv, urls[i].nextSibling);
		urls[i].addEventListener('mouseover', abrirMenuDescargar);
		newDiv.outerHTML = '<div style="position: absolute; display: none; margin: 0px; padding: 15px;" class="forabg"><input class="inputbox" style="width: 100px;" onClick="this.select();"><br><button style="font-size: 17px; width: 100%;">SUBIR</button><a></div>';
		urls[i].addEventListener('mouseout', cerrarMenuDescargar);
		urls[i].nextSibling.addEventListener('mouseover', abrirMenuDescargar);
		urls[i].nextSibling.addEventListener('mouseout', cerrarMenuDescargar);
		urls[i].nextSibling.getElementsByTagName("button")[0].addEventListener('click', descargarMF);
	}
}