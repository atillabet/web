async function login(id) {
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var data = {"phone" : phone,
                 "password" : password};
	await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
		
    }).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
			localStorage.token = response['access_token'];
            window.open("./html/Main.html");
        }
        else {
            alert(res.info);
            var result = confirm("you arent unique");
            if (!result) {
                Location.reload()
            }
        }
    });
    return 0;
}