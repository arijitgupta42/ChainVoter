var express = require('express');

var app = express();

var fs = require('fs');

var server = app.listen(8181, listening);

var users = JSON.parse(fs.readFileSync('users.json'));

function listening(){
	console.log("listening on port 8181....");
}

app.use(express.static('website'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/add/:username/:faceid?', addUser);

function addUser(request, response){
	var username = request.params.username;
	var faceid = request.params.faceid;
	if(users[username]){
		response.send("user already present")
	} else {


			if(!faceid){
				response.send("faceId is required");
			} else {
				users[username] = faceid;
				var data = JSON.stringify(users, null, 2);
				fs.writeFile('users.json', data, finished);

				function finished(err){
					console.log("user added");
				}
				response.send("User " + username + " with faceId " + faceid + " was added !" );
				
				}
		    }
	    }

app.get('/show', showUsers);

function showUsers(request, response) {
	response.send(users);
}

app.get('/search/:username/', searchUser);

function searchUser(request, response) {
	var username = request.params.username;
	if( users[username]){
		reply = {
			status:"User found",
			username: username,
			faceID: users[username]
		}

		response.send(reply);
	} else {
		response.send("User not found");
	}

}