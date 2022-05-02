let submitButton = document.querySelector('.submit-button');
let error = document.querySelector('.error');

let current_user = window.localStorage.getItem("loggedIn_user")
if (current_user) {
    window.location.href = '../index.html';
}

submitButton.onclick = e => {
    e.preventDefault();
    let form = document.querySelector('.form');

    if (form.checkValidity()) {
        let request_body = {
            firstName: form["firstName"].value,
            lastName: form["lastName"].value,
            phone: form["phone"].value,
            email: form["email"].value,
            password: form["password"].value,
        };
        let confirm_password = form["confirm_password"].value;

        if (request_body['password'] !== confirm_password) {
            error.innerHTML = "Passwords do not match.";
            return
        }

        fetch('http://localhost:5000/user', {
            method: 'POST',
            body: JSON.stringify(request_body),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status === 200) {
                window.location.href = '../index.html';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        error.innerHTML = e;
                        console.log(e);
                    }
                });
            }
        }).catch(e => {
            console.log(e)
        })
    }
    else {
        error.innerHTML = "All fields are required and should be valid!";
        console.log(e);
    }
}