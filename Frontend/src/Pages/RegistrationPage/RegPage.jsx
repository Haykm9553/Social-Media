import React, { useState } from "react";
import "./RegPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import main from "../../components/Img/main.mp4";
import { useDispatch } from "react-redux";
import { RegUser } from "../../store/slices/UserSlice";

const RegPage = ({ profile, users }) => {
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"));
  if (user) {
    navigate("/profile");
  }

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const [FirstName, LastName, Age, Login, Pass, RepeatPass] = e.target;

    const newUser = {
      first_name: FirstName.value,
      last_name: LastName.value,
      age: Age.value,
      login: Login.value,
      password: Pass.value,
      gender: gender,
      location: "",
      bio: "",
      profession: "",
      hobbies: "",
      friend_request: [],
      friend_list: [],
      image:
        gender === "Man"
          ? "http://localhost:8000/storage/Image/Man-Photo.webp"
          : "http://localhost:8000/storage/Image/Woman-Photo.png",
      photo: [],
    };

    if (Pass.value !== RepeatPass.value) {
      alert("Wrong Password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        return;
      }

      dispatch(RegUser(newUser));
      navigate("/Login");
    } catch (error) {
      console.error("Registration error", error);
    }

    e.target.reset();
  };

  const checkedGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="RegPage">
      <div className="overplay"></div>
      {/* <video src={main} autoPlay loop muted></video> */}

      <div className="RegHeader">
        <img className="Regimg" src={Logo} alt="Logo" />
      </div>

      <div className="RegWindow">
        <form onSubmit={HandlerSubmit}>
          <input name="firstName" className="RegInput" type="text" placeholder="First Name..." />
          {errors.first_name && <span className="error">{errors.first_name[0]}</span>}

          <input name="lastName" className="RegInput" type="text" placeholder="Last Name..." />
          {errors.last_name && <span className="error">{errors.last_name[0]}</span>}

          <input
            name="age"
            className="RegInput"
            type="text"
            placeholder="Age..."
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                e.preventDefault();
              }
            }}
          />
          {errors.age && <span className="error">{errors.age[0]}</span>}

          <input name="login" className="RegInput" type="text" placeholder="Login..." />
          {errors.login && <span className="error">{errors.login[0]}</span>}

          <input name="pass" className="RegInput" type="password" placeholder="Password..." />
          {errors.password && <span className="error">{errors.password[0]}</span>}

          <input name="repeatPass" className="RegInput" type="password" placeholder="Repeat Password..." />

          <div className="mydict">
            <div>
              <label>
                <input type="radio" name="radio" value="Man" onChange={checkedGender} />
                <span>Man</span>
              </label>
              <label>
                <input type="radio" name="radio" value="Woman" onChange={checkedGender} />
                <span>Woman</span>
              </label>
            </div>
            {errors.gender && <span className="error">{errors.gender[0]}</span>}
          </div>

          <button className="RegButton">Submit</button>
        </form>

        <p>
          Already have an account? <NavLink to="/Login">Log in.</NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegPage;
