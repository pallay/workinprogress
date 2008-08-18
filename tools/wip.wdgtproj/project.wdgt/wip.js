var wip_config = {
	url : null,
	username : null,
	password : null
};


function setup() {
	wip_config.username = widget.preferenceForKey(createKey("username"));
	wip_config.password = widget.preferenceForKey(createKey("password"));
	wip_config.url = widget.preferenceForKey(createKey("url"));
	
	if (!wip_config.username || (wip_config.username == "undefined")) {
		wip_config.username = "";
    }
	if (!wip_config.password || (wip_config.password == "undefined")) {
		wip_config.password = "";
    }
	if (!wip_config.url || (wip_config.url == "undefined")) {
		wip_config.lastStatus = "";
    }
	if (!wip_config.username || !wip_config.password || !wip_config.url){
		setTimeout ('showSettings();', 1000); // don't interfere with ripples
	}
}
function isConfigured() {
	wip_config.username = widget.preferenceForKey(createKey("username"));
	wip_config.password = widget.preferenceForKey(createKey("password"));
	wip_config.url = widget.preferenceForKey(createKey("url"));
	return wip_config.url && wip_config.username && wip_config.password 
}
function wipURL() {
	if(!isConfigured())
		return null
	return wip_config.url.replace("http://", "http://".concat(wip_config.username.replace(/@/, "%40"), ":", wip_config.password, "@")).concat("/statuses.json");
}
function updateStatus(){
	if(!isConfigured())
		return;
	status = document.getElementById("message").value;
	
	
	loading();

	request = new XMLHttpRequest();
	request.onload = function(e){ statusUpdated(e, request); stopLoading();getStatuses(); };
	request.open("POST", wipURL(), true);
	request.setRequestHeader("Cache-Control", "no-cache");
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.setRequestHeader("Content-Length", status.length);
	request.send("status[message]=" + status);
}

function statusUpdated(event,request) {
	document.getElementById("loading").style.display = "none";
	document.getElementById("message").value = "";
}

function createKey(key){
	return widget.identifier + '-' + key;
}

function showSettings(){
	var front = document.getElementById("front");
	var back = document.getElementById("back");
	
	if (window.widget)
		widget.prepareForTransition("ToBack");	// freeze widget for change
	
	front.style.display = "none";	// hide front
	back.style.display = "block";	// show back
	
	if (window.widget)
		setTimeout ('widget.performTransition();', 0);	// and flip the widget over
}

function saveSettings(){
	var front = document.getElementById("front");
	var back = document.getElementById("back");
	
	if (window.widget)
		widget.prepareForTransition("ToFront");	// freeze widget for change
	
	
	back.style.display = "none";
	front.style.display = "block";
	
	

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var url = document.getElementById("wip_url").value;
	if (window.widget) {
		widget.setPreferenceForKey(username, createKey("username"));
		widget.setPreferenceForKey(password, createKey("password"));
		widget.setPreferenceForKey(url, createKey("url"));
		setTimeout ('widget.performTransition();', 0);	// and flip the widget over
	}
	getStatuses();
}

function getStatuses() {
	if(!isConfigured()) 
		return;
	loading();
	request = new XMLHttpRequest();
	request.onload = function(e){ displayStatuses(e, request); stopLoading();};
	request.open("GET", wipURL(), true);
	request.setRequestHeader("Cache-Control", "no-cache");
	request.send(null);
}

function displayStatuses(event, request) {
	var statuses = eval(request.responseText);
	document.getElementById("status_messages").innerHTML = "";
	for(i=0;i<statuses.length;i++) {
		li = document.createElement("li");
		gravatar_wrapper = document.createElement("div");
		gravatar = document.createElement("img");
		message = document.createElement("span");
		gravatar_wrapper.className ="gravatar";
		
		gravatar.alt = statuses[i].status.user_name;
		gravatar.src = statuses[i].status.user_gravatar_url;
		
		message.innerHTML = statuses[i].status.message;
		
		gravatar_wrapper.appendChild(gravatar);
		li.appendChild(gravatar_wrapper);
		li.appendChild(message);
		document.getElementById("status_messages").appendChild(li);
	}
}

function loading() {
	document.getElementById("loading").style.display ="block";
}
function stopLoading() {
	document.getElementById("loading").style.display ="none";
}
if (window.widget) {
    widget.onshow = getStatuses;
}
