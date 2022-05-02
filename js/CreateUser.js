let submitButton = document.querySelector('.submit');

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

        if (request_body['password'] !== form["confirmPassword"].value) {
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
        })
    }

}