import React, { useState } from "react";
import "./RegPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import main from "../../components/Img/main.mp4"; 
import { useDispatch } from "react-redux";
import { RegUser } from "../../store/slices/UserSlice";

const RegPage = ({profile,users}) => {
  const [value,setValue] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userProfile"))

  if(user){
    navigate("/profile")
  }

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    const [FirstName, LastName, Age, Login, Pass, RepeatPass] = e.target;
    const newUser = {
      first_name: FirstName.value,
      last_name: LastName.value,
      age: Age.value,
      login: Login.value,
      password: Pass.value,
      gender: value,
      location: "",
      bio:"",
      profession:"",
      hobbies:"",
      is_editing: false,
      friend_request: [],   
      friend_list: [],
      image:value === "Man" ? "http://localhost:8000/storage/Image/Man-Photo.webp" : "http://localhost:8000/storage/Image/Woman-Photo.png", 
      photo: [
      ],
    };

    if (Pass.value === RepeatPass.value) {
      if (users.find((el) => el.Login === Login.value)) {
        alert("User Already Exists");
      } else {
        await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        dispatch(RegUser(newUser))
         navigate("/Login");
      }
    } else alert("Wrong Password");

    e.target.reset();
  };

  const checkedGender = (e)=>{
    setValue(e.target.value)
  }

  return (
    <div className="RegPage">
      <div className="overplay"></div>
      <video src={main} autoPlay loop muted></video>
      <div className="RegHeader">
        <img className="Regimg" src={Logo} alt="Logo" />
      </div>
      <div className="RegWindow">
        <form onSubmit={(e) => HandlerSubmit(e)}>
          <input
            name="firstName"
            className="RegInput"
            type="text"
            placeholder="type First Name..."
          />
          <input
            name="lastName"
            className="RegInput"
            type="text"
            placeholder="type Last Name..."
          />
          <input
            name="age"
          onKeyDown={(e) => {
            if(!/[0-9]/.test(e.key) && (e.key !== "Backspace" && e.key !== "Tab")) {
              e.preventDefault();
            }
          }} 
          className="RegInput" 
          type="text" 
          placeholder="type Age..." />
          
          <input
            name="login" 
          className="RegInput" 
          type="text" 
          placeholder="type Login..." />
          <input
            name="pass"
            className="RegInput"
            type="password"
            placeholder="type Password..."
          />
          <input
            name="repeatPass"
            className="RegInput"
            type="password"
            placeholder="Repeat Password..."
          />
          <div className="mydict">
            <div>
              <label >
                <input type="radio" name="radio"  value={"Man"} onChange={(e) => {checkedGender(e) }}/>
                <span>Man</span>
              </label>
              <label >
                <input type="radio" name="radio" value={"Woman"} onChange={(e) => {checkedGender(e) }}/>
                <span>Woman</span>
              </label>
            </div>
          </div>

          <button className="RegButton">Sumbit</button>
        </form>
        <p>Already have an account? <NavLink to={"/Login"}>Log in.</NavLink> ?</p>
      </div>
    </div>
  );
};

export default RegPage;