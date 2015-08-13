chrome.runtime.onMessage.addListener(function(datos, sender, sendResponse) {
	chrome.downloads.download({"url": datos.url, "filename": "Nube de creaciones/" + datos.nombre});	
});