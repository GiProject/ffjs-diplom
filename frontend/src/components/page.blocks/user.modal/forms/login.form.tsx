import * as React from 'react';

export default function LoginForm() {
    return (
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    );
};