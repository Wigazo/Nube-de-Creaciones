if(window.name.indexOf("#tid=") == 0){
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
			name = "";
			location.href += "/" + tid;
		}
	}, 100);
}