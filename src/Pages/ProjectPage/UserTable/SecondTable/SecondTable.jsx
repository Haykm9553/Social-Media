import React, { useState } from "react";
import "./SecondTable.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSecondUser,
  addToFirstUser,
  addToPopedUser,
  addToThiredUser,
  changeSecondUser,
  selectTableUser,
} from "../../../../store/slices/FirstUserSlice/FirstUserSlice";

const SecondTable = () => {
  const dispatch = useDispatch();
  const { SecondUser, PopedUser } = useSelector(selectTableUser);
  const [active, setActive] = useState(false);

  const handleMoveToFirst = () => {
    dispatch(addToFirstUser(...PopedUser));
    setActive(false);
  };

  const handleMoveToThird = () => {
    dispatch(addToThiredUser(...PopedUser));
    setActive(false);
  };
  return (
    <div className="FirstUser">
      {active ? (
        <header className="SecondHeader">
          <div className="MovingSecondDiv">
            <div>
              <p className="MoveTo">Move To</p>
            </div>
            <div className="MoveButtons">
              <button className="MoveToButtons" onClick={handleMoveToFirst}>First</button>
              <button className="MoveToButtons" onClick={handleMoveToThird}>Third</button>
            </div>
          </div>
        </header>
      ) : (
        ""
      )}
      <details>
        <summary>Add User</summary>
        <form
          className='AddUserForm'
          onSubmit={(e) => {
            e.preventDefault();
            const [firstName, lastName, age] = e.target;
            dispatch(
              addSecondUser({
                firstName: firstName.value,
                lastName: lastName.value,
                age: age.value,
              })
            );
            e.target.reset();
          }}
        >
          <label>
            First Name:
            <input type="text" />
          </label>
          <label>
            Last Name:
            <input type="text" />
          </label>
          <label>
            Age:
            <input type="text" />
          </label>
          <button className="MoveToButtons">Add User</button>
        </form>
      </details>
      <table className="FirstTable">
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Change User</th>
          </tr>
        </thead>
        <tbody>
          {SecondUser.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="MoveToButtons"
                    onClick={() => {
                      dispatch(changeSecondUser(index));
                      dispatch(addToPopedUser(user));
                      console.log(PopedUser);
                      
                      
                      setActive(true);
                    }}
                  >
                    Change User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SecondTable;
