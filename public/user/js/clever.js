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
					
					window.history.pushState("object or string", "demo-title",url);
				} else {
				  //document.location.hash = 'lookAtMeNow';
				    document.location.href = "/new-url";
				}
				app.innerHTML=data;
			});

			
		});

		window.onhashchange = function() {
		    console.log("UrlChange");
		    alert("");
		    if (window.innerDocClick) {
		        window.innerDocClick = false;
		    	console.log("InnerDocClick");
		    } else {
		        if (window.location.hash != '#undefined') {
		            //goBack();
		        	console.log("goBack");
		        } else {
		            //history.pushState("", document.title, window.location.pathname);
		            //location.reload();
		        	console.log("reloaded");
		        }
		    }
		}
	}
})();

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
            console.log("Working");
        }
        console.log("Working2");
        // ... whatever else you want to do
        // maybe call onhashchange e.handler
        return pushState.apply(history, arguments);
    }
})(window.history);


(function () {

	if(window.history && history.pushState){ // check for history api support
		window.addEventListener('load', function(){
			// create history states
			history.pushState(-1, null); // back state
			history.pushState(0, null); // main state
			history.pushState(1, null); // forward state
			history.go(-1); // start in main state
					
			this.addEventListener('popstate', function(event, state){
				// check history state and fire custom events
				console.log("Pop state working");
				if(state = event.state){
		
					event = document.createEvent('Event');
					event.initEvent(state > 0 ? 'next' : 'previous', true, true);
					this.dispatchEvent(event);
					
					// reset state
					history.go(-state);
				}
			}, false);
		}, false);
	}

	window.addEventListener('popstate', function(event) {
	    // The popstate event is fired each time when the current history entry changes.

	    //var r = confirm("You pressed a Back button! Are you sure?!");

	    // if (r == true) {
	    //     // Call Back button programmatically as per user confirmation.
	    //     history.back();
	    //     // Uncomment below line to redirect to the previous page instead.
	    //     // window.location = document.referrer // Note: IE11 is not supporting this.
	    // } else {
	    //     // Stay on the current page.
	    //     history.pushState(null, null, window.location.pathname);
	    // }
	    console.log(event);
	    //history.pushState(null, null, window.location.pathname);

	}, false);
})();