
import "./LoginPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { LogIn } from "../../store/slices/UserSlice";
import main from "../../components/Img/main.mp4";
import { useEffect } from "react";
const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("userProfile"))

  

  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const [Login, Password] = e.target;
  
    const credentials = {
      login: Login.value,
      password: Password.value,
    };
  
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
          
        },
        body: JSON.stringify(credentials),
        
      });
  
      const text = await res.text(); 
  
     
  
      let data = {};
      try {
        data = JSON.parse(text); 
      } catch (error) {
        console.error("ERROR PARSING JSON:", error);
        alert("Invalid JSON");
        return;
      }
     
      
  
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        dispatch(LogIn(data.user));
        navigate("/profile");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  
    e.target.reset();
  };
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return (
    <div className="main">
      <div className="overplay"></div>

      <video src={main} autoPlay loop muted />
      <div className="LoginPage">
        <div className="Header">
          <img className="img" src={Logo} alt="Logo" />
        </div>
        <div className="LoginWindow">
          <form onSubmit={(e) => handlerSubmit(e)}>
            <input className="LoginInput" type="text" placeholder="Login" name="login" />
            <input
            name="password"
              className="LoginInput"
              type="password"
              placeholder="Password"
            />
            <button className="LoginButton">Enter</button>
            <p>If you dont have account </p>
            <button
              className="CreateAccount"
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
