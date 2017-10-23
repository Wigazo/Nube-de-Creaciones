import * as Dropbox from 'dropbox';
let dropbox = new Dropbox({accessToken: process.env.MIX_DROPBOX_TOKEN});

chrome.runtime.onMessage.addListener(function(datos, sender, sendResponse) {
	switch(datos.accion) {
		case 'abrirDB':
			chrome.tabs.query({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid}, function(tabs){
				if(tabs.length == 0){
					chrome.tabs.query({active: true}, function(dbtabs){
						dropbox.filesCreateFolderV2({
							path: `/BACKUP/${datos.tid}`,
							autorename: true
						})
						.then( () => {
							chrome.tabs.create({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid, active: false, index: dbtabs[0].index+1}, function(tab){
								chrome.tabs.query({url: "https://www.dropbox.com/home/BACKUP/" + datos.tid}, function(tabs){
									if(tabs.length > 1){
										chrome.tabs.remove(tab.id);
									}
								});
							});
						})
						.catch(error => {
							console.error(error);
							alert('Ocurrió un error');
						});
					});
				}
			});
		break;
		
		case 'subir':
			var xhr = new XMLHttpRequest();
			xhr.open('GET', datos.url, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				if(this.status == 200){
					var blob = new Blob([this.response]);
					dropbox.filesUpload({
						contents: blob,
						path: `/BACKUP/${datos.tid}/${datos.nombre}`
					})
					.catch(error => {
						alert(error);
						console.error('Ocurrió un error');
					});
		
				}else{
					chrome.runtime.sendMessage(datos);
				}
			};
			xhr.send();
		break;
	}

});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, command);
  });
});