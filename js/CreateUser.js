function register(id) {
    inputs = document.getElementById(id).elements;
    var firstName = inputs['firstName'].value;
    var lastName = inputs['lastName'].value;
    var password = inputs['password'].value;
    var phone = inputs['phone'].value;
    var email = inputs['email'].value;

    var confirmPassword = inputs['confirmPassword'].value;
    const select = document.getElementById('Status');
    var status = select.options[select.selectedIndex].value;
    if (confirmPassword != password) {
        alert("you already has forgot your possword :/");
        return 0;
    }
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "phone": phone,
		"email" : email,
    }
    fetch('http://localhost:5000/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}