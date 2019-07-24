var constraints = { video: { facingMode: "user" }, audio: false };

var faceId1, faceId2;


const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger1 = document.querySelector("#camera--trigger"),
    cameraTrigger2 = document.querySelector("#camera--login")

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger1.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    let picture = cameraOutput.src
    fetch(picture)
    	.then(res => res.blob())
    	.then(blobData => {
    		
	           
    		var subscriptionKey = "be09c536a8e94b459644617e26450628"; //Enter your API Subscription Key here
	    
	        var uriBase =
	            "https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect"; //Change the region in the URL accordingly
	    
	        
	        var params = {
	            "returnFaceId": "true",
	            "returnFaceLandmarks": "false",
	        };
	      
	        $.ajax({
	            url: uriBase + "?" + $.param(params),

	            cache: false,

	            processData:false,
	    
	            
	            beforeSend: function(xhrObj){
	                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
	                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	            },
	    
	            type: "POST",
	    
	            
	            data: blobData,
	        })
	    
	        .done(function(data) {

	        	var naam = window.prompt("Enter your name ");
	        	alert("Your name is " + naam);
	        	if(typeof data[0] === 'undefined'){alert("Take a better picture!")}else{
	        	ff = (JSON.stringify(data[0].faceId));
	        	url = "http://localhost:8181/add" +'/'+naam+'/'+ff.replace(/['"]+/g, '');
  				$.ajax({
	            url: url,

	            beforeSend: function(xhrObj){
	                xhrObj.setRequestHeader("X-Requested-With");
	            },

	            cache: false,

	            processData:false,
	    	            	            
	            type: "GET",
	               
	            })
  				.done(function(data) {
  					console.log(data);
  					alert(data);
  				})
				console.log("FaceID:",(JSON.stringify(data[0].faceId)));
			}

	        })
	    
	        .fail(function(jqXHR, textStatus, errorThrown) {
	            
	            var errorString = (errorThrown === "") ?
	                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
	            errorString += (jqXHR.responseText === "") ?
	                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
	                    jQuery.parseJSON(jqXHR.responseText).message :
	                        jQuery.parseJSON(jqXHR.responseText).error.message;
	            alert(errorString);
	        });
	    	})

    
    cameraOutput.classList.add("taken");
};

cameraTrigger2.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    let picture = cameraOutput.src
    fetch(picture)
    	.then(res => res.blob())
    	.then(blobData => {
    		
	           
    		var subscriptionKey = "be09c536a8e94b459644617e26450628"; //Enter your API subscription key here again
	    
	        var uriBase =
	            "https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect"; //Change the region in the URL accordingly
	    
	        
	        var params = {
	            "returnFaceId": "true",
	            "returnFaceLandmarks": "false",
	        };
	      
	        $.ajax({
	            url: uriBase + "?" + $.param(params),

	            cache: false,

	            processData:false,
	    
	            
	            beforeSend: function(xhrObj){
	                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
	                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	            },
	    
	            type: "POST",
	    
	            
	            data: blobData,
	        })
	    
	        .done(function(data) {

	        	var naam = window.prompt("Enter your name ");
	        	alert("Your name is " + naam);
	        	if(typeof data[0] === 'undefined'){alert("Take a better picture!")}else{
	        	ff = (JSON.stringify(data[0].faceId));
	        	url = "http://localhost:8181/search" +'/'+naam;
  				$.ajax({
	            url: url,

	            beforeSend: function(xhrObj){
	                xhrObj.setRequestHeader("X-Requested-With");
	            },

	            cache: false,

	            processData:false,
	    	            	            
	            type: "GET",
	               
	            })
  				.done(function(data) {
  					if(typeof data.status === "undefined"){
  						alert(data);
  					}else {
  						alert((data.status));
  					}
  					console.log(data);
  					faceId2 = data.faceID;
  					console.log("faceId2 is:", faceId2);
  					deeta["faceId2"] = faceId2
  					deeta = JSON.stringify(deeta)
  					console.log(deeta);
  					$.ajax({
		            url:"https://centralindia.api.cognitive.microsoft.com/face/v1.0/verify?",

		            	            
		            beforeSend: function(xhrObj){
		                xhrObj.setRequestHeader("Content-Type","application/json");
		                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);

		            },
		    
		            type: "POST",

		            processData: false,

		    		cache: false,
		            
		            data: deeta,
		            })

	            .done(function(data){

	            	console.log(data.isIdentical);
	            	if(data.isIdentical){
	            		alert("You are being redirected");
	            		window.location = "http://localhost:3000/login";
	               	} else {
	            		alert("User not identified");
	            	}
	            })
  				})
				console.log("FaceID:",(JSON.stringify(data[0].faceId)));
				faceId1 = (JSON.stringify(data[0].faceId)).replace(/['"]+/g, '')
				console.log("faceId1 is:",faceId1);
				var deeta ={};
				deeta["faceId1"]=faceId1;
			}


				


	        })
	    
	        .fail(function(jqXHR, textStatus, errorThrown) {
	            
	            var errorString = (errorThrown === "") ?
	                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
	            errorString += (jqXHR.responseText === "") ?
	                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
	                    jQuery.parseJSON(jqXHR.responseText).message :
	                        jQuery.parseJSON(jqXHR.responseText).error.message;
	            alert(errorString);
	        });
	    	})

    
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);

