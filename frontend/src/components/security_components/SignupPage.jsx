import { useState, useActionState } from 'react';

export default function SignupPage({ onSwitch }) {
    const [newUsers, setNewUsers] = useState([]);

    async function addUser(newUser) {
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            return;
        }

        const savedUser = await response.json();
        setNewUsers((prevUsers) => {
            return [...prevUsers, newUser];
        });
    }

    function handleSubmission(prevFormData, formData) {
        const enteredFullname = formData.get('fullname');
        const enteredEmail = formData.get('email');
        const enteredPassword = formData.get('password');

        let errors = [];

        if (enteredFullname.trim() === '') {
            errors.push('enter fullname');
        }

        if (!enteredEmail.includes('@')) {
            errors.push("enter valid email");
        }

        if (enteredPassword.trim().length < 6) {
            errors.push('Please enter a password having more than 6 characters.')
        }

        if (errors.length > 0) {
            return {
                errors: errors,
                enteredValues: {
                    fullname: enteredFullname,
                    email: enteredEmail,
                    password: enteredPassword
                }

            }
        }

        const newUser = {
            fullname: enteredFullname,
            email: enteredEmail,
            password: enteredPassword
        };

        try {
            addUser(newUser);

        } catch (error) {
            console.log("line 58 user not added");
        }

        return {
            errors: null
        }
    }

    const [formState, formAction] = useActionState(handleSubmission, { errors: null });
    console.log(newUsers);

    const InputIcon = ({ children }) => (
        <div
            className="input-icon"
        >
            {children}
        </div>);

    return (
        <div className="auth-page-container">
            <div className="form-card">
                <div className="form-container">
                    <h2 className="form-heading">Create Account</h2>
                    <p className="form-subheading">Join us today! It's free and only takes a minute.</p>


                    <form action={formAction}>
                        <div className="input-wrapper">
                            <InputIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </InputIcon>

                            <input
                                type="text" id="fullname" name="fullname" defaultValue={formState.enteredValues?.fullname}
                                placeholder="Full Name"
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-wrapper">
                            <InputIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="{2}"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </InputIcon>

                            <input
                                type="email" id="email" name="email" defaultValue={formState.enteredValues?.email}
                                placeholder="Email"
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-wrapper">
                            <InputIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="{2}"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>

                            </InputIcon>
                            <input
                                type="password" id="password" name='password' defaultValue={formState.enteredValues?.password}
                                placeholder="Password"
                                required
                                className="input-field"
                            />
                        </div>

                        {formState.errors !== null && <ul className="errors">
                            {formState.errors.map(error => <li key={error}>{error}</li>)}
                        </ul>}

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Create Account
                        </button>

                    </form>
                    <p className="switch-form-text">
                        Already have an account? <button onClick={onSwitch}
                            className="switch-form-button">
                            Login
                        </button>
                    </p>
                </div>
            </div>

        </div>
    );
}