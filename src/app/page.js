"use client" 
import './style.css';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const check = () => {
    const credentialsArray = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
    ];

    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    const matchedCredentials = credentialsArray.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (matchedCredentials) {
      alert('Login successful!');
      router.push("/add"); // Replace "/dashboard" with your desired path
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form className="login-form">
          <input type="text" placeholder="username" id="usernameInput" />
          <input type="password" placeholder="password" id="passwordInput" />
          <button type="button" onClick={check}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
