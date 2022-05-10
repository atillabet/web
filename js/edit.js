async function edit(id) {
    var name = document.getElementById('firstName').value;
    var data = {"firstName" : name};
	var token = localStorage.token;
    let auth = 'Bearer ' + token;
	
	await fetch('http://localhost:5000/user/1', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
		  'Content-Type': 'application/json',
		  'Authorization' : auth
		}
    }).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
			localStorage.setItem('token', response['access_token']);
            window.open("./Main.html");
        }
        else {
            alert(auth);
        }
    });
    return 0;
}