(function(){

	this.Clever 		= function(){
		this.xHeader    = "X-Requested-With";
		this.xHeadParam = "XMLHttpRequest";
		this.tags 		= "app";
		this.clvr 		= "clvr-";
		this.href 		= this.clvr + "href";

		initialize.call(this);
	}
	Clever.prototype.httpGetAsync = function(theUrl, callback) {
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() {
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	        {
	        	callback(xmlHttp.responseText);
	        }
	    }
	    console.log("URL "+ theUrl);
	    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	    xmlHttp.setRequestHeader(this.xHeader,this.xHeadParam);
	    xmlHttp.send(null);

	};
	Clever.prototype.take = function(elem,attr) {
	    return elem.getAttribute(attr);

	};
	Clever.prototype.goBack = function() {
		window.location.hash = window.location.lasthash[window.location.lasthash.length-1];
		window.location.lasthash.pop();
	};

	function initialize() {
		var app = document.getElementsByTagName(this.tags)[0];
		var obj = this;
		var currentUrl = location.href;
		console.log(app.getAttribute("clvr-id"));
		var anchors = document.querySelector("app > [clvr-href]");
		anchors.addEventListener("click",function(e){
			e = e || window.event;
			    var elem = e.target || e.srcElement,
			        text = elem.textContent || text.innerText;
			console.log(elem.innerHTML);
			var slashUrl  = obj.take(elem,obj.href);
			if (slashUrl[0] != "/") {
				slashUrl="/"+slashUrl;
			}
			var url = location.origin+slashUrl;
			obj.httpGetAsync(url,function(data) {
				console.log(data);
				if (history.pushState) {
					currentUrl = url;
					
					window.history.pushState("", "",url);
				} else {
				  //document.location.hash = 'lookAtMeNow';
				    document.location.href = "/new-url";
				}
				app.innerHTML=data;
			});

			
		});
		if(window.history && history.pushState){ // check for history api support
			window.addEventListener('load', function(){
				// create history states
				history.pushState(-1, null); // back state
				history.pushState(0, null); // main state
				history.pushState(1, null); // forward state
				// history.go(-1); // start in main state
						
				this.addEventListener('popstate', function(event, state){
					// check history state and fire custom events
					// console.log(event.state);
					// if(state = event.state){
					// 	;
					// }
					obj.httpGetAsync(location.href,function(data) {
						console.log(data);
						app.innerHTML=data;
						initialize.call(obj);
					});


				}, false);
			}, false);
		}
		
	}
})();
