let submitButton = document.querySelector('.submit-button');
let error = document.querySelector('.error');

let current_user = window.localStorage.getItem("loggedIn_user")
if (current_user) {
    window.location.href = 'html/Main.html';
}

submitButton.onclick = e => {
    e.preventDefault();
    let form = document.querySelector('.form');

    if (form.checkValidity()) {
        let request_body = {
            username: form["username"].value,
            password: form["password"].value
        };

        loginUser(request_body).then(response => {
            if (response.status === 200) {
                window.localStorage.setItem('loggedIn_user', JSON.stringify(request_body));
                window.location.href = 'html/Main.html';
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
        error.innerHTML = "All fields should be valid!";
        console.log(e);
    }
}

let loginUser = request_body => {
    return fetch('http://localhost:5000/user/login', {
        method: "GET",
        body: JSON.stringify(request_body),
        headers: {'Content-Type': 'application/json'}
    });
}