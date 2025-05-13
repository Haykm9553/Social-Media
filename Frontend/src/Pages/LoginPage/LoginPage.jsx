import "./LoginPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogInLocal, LogInSession } from "../../store/slices/UserSlice";
import main from "../../components/Img/main.mp4";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert("Login failed.");
        }
        return;
      }
      
      if (credentials.remember) {
        localStorage.setItem("token", data.access_token);
        dispatch(LogInLocal(data.user));
      } else {
        sessionStorage.setItem("token", data.access_token);
        dispatch(LogInSession(data.user));
      }

      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }

    setCredentials({
      login: "",
      password: "",
      remember: false,
    });
  };

  return (
    <div className="main">
      <div className="overplay"></div>
      {/* <video src={main} autoPlay loop muted /> */}
      <div className="LoginPage">
        <div className="Header">
          <img className="img" src={Logo} alt="Logo" />
        </div>
        <div className="LoginWindow">
          <form onSubmit={handlerSubmit}>
            <input
              className="LoginInput"
              type="text"
              placeholder="Login"
              name="login"
              value={credentials.login}
              onChange={(e) =>
                setCredentials({ ...credentials, login: e.target.value })
              }
            />
            {errors.login && <span className="error">{errors.login[0]}</span>}

            <input
              name="password"
              className="LoginInput"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            {errors.password && (
              <span className="error">{errors.password[0]}</span>
            )}

            <div>
             <div className="RememberLabel">
              <input
                name="remember"
                id="remember"
                type="checkbox"
                checked={credentials.remember}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    remember: e.target.checked,
                  })
                }
              />
                <label  htmlFor="remember">Remember me</label>
             </div>
            </div>

            <button className="LoginButton">Enter</button>

            <p className="dontHaveAccount">If you don't have an account</p>
            <button
              className="CreateAccount"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Create new Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
