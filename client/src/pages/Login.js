import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // TODO: Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center'>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
