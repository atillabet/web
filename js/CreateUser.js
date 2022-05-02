async function register(id) {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
	
    if (confirmPassword != password) {
        alert("wrong");
        return 0;
    }
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "phone": phone,
		"email" : email,
    }
    await fetch('http://localhost:5000/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
            var token = res.access_token
            localStorage.setItem('token', token);
            window.location.replace("../index.html");
        }
        else {
            alert(res.info);
            var result = confirm("you arent unique. please be, ok?");
            if (!result) {
                Location.reload()
            }
        }
    });
}