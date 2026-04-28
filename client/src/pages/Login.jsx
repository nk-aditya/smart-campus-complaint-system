import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem("name", res.data.user.name);

    alert("Login Successful");
    
    const role = res.data.user.role;
    
    if (role === "student") {
        window.location.href = "/student";
    } else if (role === "admin") {
        window.location.href = "/admin";
    } else if (role === "worker") {
        window.location.href = "/worker";
    }

  } catch (error) {
    alert("Login Failed");
    console.log(error.response?.data);
  }
};

  return (
    <div style={styles.container}>
      <form style={styles.box} onSubmit={handleLogin}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  box: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    fontSize: "16px"
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Login;