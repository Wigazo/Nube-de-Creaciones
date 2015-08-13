chrome.runtime.onMessage.addListener(function(datos, sender, sendResponse) {
	switch(datos.accion){
		case "subir":
			var xhr = new XMLHttpRequest();
			xhr.open('GET', datos.url, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				blob = new Blob([this.response]);
				var client = new Dropbox.Client({ key: "b2r6yecvzwp382k", token: "lNg1OCSRRB0AAAAAAAAILmGCKpHT2k21aVHb4eHatND1JPRR9cHIALN5DuQDANIf"});
				client.writeFile(datos.nombre, blob, {noOverwrite: true}, function(error, stat){
					if(error){
						alert(error);
					}
				});
			};
			xhr.send();
			break;
		case "abrirDB":
			chrome.tabs.getSelected(null, function(tab) {
				var client = new Dropbox.Client({ key: "b2r6yecvzwp382k", token: "lNg1OCSRRB0AAAAAAAAILmGCKpHT2k21aVHb4eHatND1JPRR9cHIALN5DuQDANIf"});
				client.mkdir("BACKUP/" + datos.subforo + "/" + datos.tid, function(error, stat){
					if(error){
						console.log(error);
					}
					chrome.tabs.create({url: "https://www.dropbox.com/home/BACKUP/" + datos.subforo + "/" + datos.tid, active: false, index: tab.index+1});
				});
			});
	}
});