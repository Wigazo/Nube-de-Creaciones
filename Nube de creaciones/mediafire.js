if(window.name.indexOf("#descargaMF=") == 0){
	if(typeof(document.getElementsByClassName("download_link")[0]) != "undefined"){
		chrome.runtime.sendMessage({accion: "subir", url: document.getElementsByClassName("download_link")[0].getElementsByTagName("a")[0].href, subforo: window.name.split("descargaMF=")[1].split("-")[0], tid: window.name.split("descargaMF=")[1].split("-")[1], nombre: window.name.split("descargaMF=")[1].split("-")[2] + "." + location.pathname.split(".")[location.pathname.split(".").length-1]});
	}else{
		window.onbeforeunload = function(e) {
			return "No se pudo descargar. Posiblemente se haya caído. De lo contario, intenta descargar manualmente (otra posible causa es que tenga contraseña).";
		};
		window.name = "";
	}
	window.close();
	window.onbeforeunload = null;
}