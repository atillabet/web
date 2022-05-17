import React, { useState } from "react";
import  "./index.css"
import { Link, Navigate, useNavigate } from "react-router-dom";

let loginUser = request_body => {
    return fetch('http://localhost:5000/user/login', {
        method: "POST",
        body: JSON.stringify(request_body),
        headers: {'Content-Type': 'application/json'}
    });
}

const Login = () => {

    const navigation = useNavigate();
    const [data, setData] = useState({
        username:'',
        password:''
    })
    const [error, setError] = useState("")

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value})
    }

    const signButtonHandle = ev => {
        ev.preventDefault();

        let request_body = {
            username: data.username,
            password: data.password
        };

        loginUser(request_body).then(response => {
            if (response.status === 200) {
                window.localStorage.setItem('token', JSON.stringify(request_body));
                navigation('/account');
            } else {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch(() => {
            console.log(ev);
        });


    if(localStorage.getItem('token'))
    {
        return <Navigate to="/" />
    }
    else{
        return (<div className="main">


            <form className="form" onSubmit={signButtonHandle}>
                <h1>Sign in</h1>
                <div>
                    <label>
                        <input placeholder="Enter phone" type="text" className="field" value={data.username} onChange={handleChange} required></>
                    </label>
                    <label>
                        <input placeholder="Enter password" type="password" className="field" value={data.password} onChange={handleChange} required></>
                    </label>
                    <div>
                        <button className="sign_button">login</button>
                    </div>
                </div>
                <p className="error"{error}/>
            </form>
            <p className="text">Don't have an account? - <Link to={"/register"}>Sign up!</Link></p>
        </div>)
            }

        }
    }

export default Login;