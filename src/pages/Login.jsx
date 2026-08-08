import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("doctorName", data.user?.doctorName || username.trim());

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo">Rx</div>
          <div className="logo-text">
            <h2>Prescription</h2>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to continue to your dashboard</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <div className="login-input-wrap">
            <span className="login-input-icon">👤</span>
            <input
              id="username"
              type="text"
              className="login-input"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <div className="login-input-wrap">
            <span className="login-input-icon">🔒</span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="login-toggle-visibility"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          🏥 Hospital
        </p>
      </div>
    </div>
  );
}

export default Login;
