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
			var url = location.origin+obj.take(elem,obj.href);
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