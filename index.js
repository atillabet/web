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
		if (response.status == 200) {
            window.open("./html/Main.html");
        }
        else {
            alert(res.info);
            var result = confirm("you arent unique");
            if (!result) {
                Location.reload()
            }
        }
		return response.json()
    }).then((data) =>{
       localStorage.setItem("token" ,token);
	});
    return 0;
}