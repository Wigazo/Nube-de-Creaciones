chrome.runtime.onMessage.addListener(function(datos, sender, sendResponse) {
	switch(datos.accion){
		case "subir":
			var xhr = new XMLHttpRequest();
			xhr.open('GET', datos.url, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				console.log(this.status);
				if(this.status == 200){
					blob = new Blob([this.response]);
					var client = new Dropbox.Client({ key: "b2r6yecvzwp382k", token: "OCULTADO"});
					client.writeFile("BACKUP/" + datos.tid + "/" + datos.nombre, blob, {noOverwrite: true}, function(error, stat){
						if(error){
							alert(error);
						}
					});
				}else{
					chrome.runtime.sendMessage(datos);
				}
			};
			xhr.send();
		case "abrirDB":
			chrome.tabs.query({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid}, function(tabs){
				if(tabs.length == 0){
					chrome.tabs.query({active: true}, function(dbtabs){
						var client = new Dropbox.Client({ key: "b2r6yecvzwp382k", token: "OCULTADO"});
						client.mkdir("BACKUP/" + datos.tid, function(error, stat){
							if(error){
								console.log(error);
							}
							chrome.tabs.create({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid, active: false, index: dbtabs[0].index+1}, function(tab){
								chrome.tabs.query({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid}, function(tabs){
									if(tabs.length > 1){
										chrome.tabs.remove(tab.id);
									}
								});
							});
						});
					});
				}
			});
	}
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, command);
  });
});