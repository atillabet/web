const login_url = 'http://localhost:6996/main'

async function login(id) {
    var inputs = document.getElementById(id).elements;
    var username = inputs['uname'].value;
    var password = inputs['psw'].value;
    var hash = btoa(username + ":" + password);
    var url = login_url;
    let h = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    h.append('Accept', 'application/json');
    let auth = 'Basic ' + hash;
    h.append('Authorization', auth);
    const request = new Request(url,
        {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: h
        });
    await fetch(request).then(async (response) => {
        var res = await response.json();
        if (response.status == 200) {
            var token = res.access_token
            localStorage.setItem('token', token);
            window.location.replace("./main.html");
        }
        else {
            alert(":(((") // eslint-disable-line no-alert, quotes, semi
        }
    });
    return 0;
}