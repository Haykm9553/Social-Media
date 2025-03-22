import React, { useEffect, useState } from "react";
import "./MyProfilePage.css";
import { useParams } from "react-router-dom";
import {
  selectSectionContent,
  setActiveSection,
} from "../../store/slices/SectionSlice/SectionSlice";
import { useDispatch, useSelector } from "react-redux";


function MyProfilePage() {
  const { id } = useParams();
  const [singleData, setSingleData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/Loged_User/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleData([data]));
  }, []);
  

  const dispatch = useDispatch();
  const sectionContent = useSelector(selectSectionContent);

  
  const FindImage = singleData[0]?.Photo?.map((el) => {
    return el.key ? el.url : ""
    
  });
  
  console.log(FindImage);
  

  return (
    <div className="MyProfilePage">
     {
        singleData.map((data) => {
          return(
            <div key={data.id}> 
              <div style={{ marginBottom: "20px" }}>
            <img
              src={FindImage.length !== 0 ? FindImage : data.Image }
              style={{
                backgroundColor: "#ccc",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            ></img>
            <h2>
              {data.FirstName} {data.LastName}
            </h2>
            <p>Friends: 330</p>
          </div>
    
          <nav className="nav-buttons" style={{ marginBottom: "20px" }}>
            <button
              onClick={() => dispatch(setActiveSection("Info"))}
              className="nav-button"
            >
              Info
            </button>
            <button
              onClick={() => dispatch(setActiveSection("Friends"))}
              className="nav-button"
            >
              Friends
            </button>
            <button
              onClick={() => dispatch(setActiveSection("Photo"))}
              className="nav-button"
            >
              Photo
            </button>
            
          </nav>
    
          <div className="section-content" >
            {sectionContent}
          </div>
            </div>
          )
        })
     }
    </div>
  );
}

export default MyProfilePage;
