import React, { useState } from "react";
import "./RegPage.css";
import Logo from "../../components/Img/Logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import main from "../../components/Img/main.mp4"; 
import { useDispatch } from "react-redux";
import { RegUser } from "../../store/slices/UserSlice";

const RegPage = ({User_Data,Loged_User_Data}) => {
  const [value,setValue] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
    if (Loged_User_Data.length !== 0) {
      navigate("/profile");
    } 


  const HandlerSubmit = async (e) => {
    e.preventDefault();
    const [FirstName, LastName, Age, Login, Pass, RepeatPass] = e.target;
    const newUser = {
      id: new Date().getTime().toString(),
      FirstName: FirstName.value,
      LastName: LastName.value,
      Age: Age.value,
      Location: "",
      Bio:"",
      Profession:"",
      Hobbies:"",
      Login: Login.value,
      Pass: Pass.value,
      gender: value,
      isEditing: false,
      FriendRequest: [],   
      FriendList: [],
      Image:value === "Man" ? "https://ecofishresearch.com/wp-content/uploads/2022/03/690-6904538_men-profile-icon-png-image-free-download-searchpng.png" : "https://st2.depositphotos.com/3250055/8394/v/450/depositphotos_83944630-stock-illustration-female-avatar-profile-picture.jpg", 
      Photo: [
      ],
    };

    if (Pass.value === RepeatPass.value) {
      if (User_Data.find((el) => el.Login === Login.value)) {
        alert("User Already Exists");
      } else {
        await fetch("http://localhost:3005/users_Data", {
          method: "POST",
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
            className="RegInput"
            type="text"
            placeholder="type First Name..."
          />
          <input
            className="RegInput"
            type="text"
            placeholder="type Last Name..."
          />
          <input
          onKeyDown={(e) => {
            if(!/[0-9]/.test(e.key) && (e.key !== "Backspace" && e.key !== "Tab")) {
              e.preventDefault();
            }
          }} 
          className="RegInput" 
          type="text" 
          placeholder="type Age..." />
          
          <input className="RegInput" type="text" placeholder="type Login..." />
          <input
            className="RegInput"
            type="password"
            placeholder="type Password..."
          />
          <input
            className="RegInput"
            type="password"
            placeholder="Repeat Password..."
          />
          <div class="mydict">
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
