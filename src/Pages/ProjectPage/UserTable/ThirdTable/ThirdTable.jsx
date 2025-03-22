import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addThirdUser, addToFirstUser, addToPopedUser, addToSecondUser, changeThirdUser, selectTableUser } from '../../../../store/slices/FirstUserSlice/FirstUserSlice';

const ThirdTable = () => {
  const dispatch = useDispatch();
  const {ThirdUser,PopedUser} = useSelector(selectTableUser);
  const [active, setActive] = useState(false)

    const handleMoveToFirst= () => {
      dispatch(addToFirstUser(...PopedUser))
      setActive(false)
    }

    const handleMoveToSecond = () => {
      dispatch(addToSecondUser(...PopedUser))
      setActive(false)
    }
    return (
        <div className='FirstUser'>
          {
        active ? (
          <header className="ThirdHeader">
          <div className="MovingThirddDiv">
            <div>
              <p className="MoveTo">Move To</p>
            </div>
            <div className="MoveButtons">
              <button className="MoveToButtons" onClick={handleMoveToFirst}>First</button>
              <button className="MoveToButtons" onClick={handleMoveToSecond}>Second</button>
            </div>
          </div>
        </header>
        )
        :
        ''
      }
        <details>
        <summary>Add User</summary>
        <form
          className='AddUserForm'
          onSubmit={(e) => {
            e.preventDefault();
            const [firstName, lastName, age] = e.target;
            dispatch(addThirdUser({firstName: firstName.value, lastName: lastName.value, age: age.value}));
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
        {
                ThirdUser.map((user,index) => {
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
                      dispatch(changeThirdUser(index));
                      dispatch(addToPopedUser(user));
                      setActive(true);
                    }}
                  >
                    Change User
                  </button>
                </td>
              </tr>
                  )
                })
              }
        </tbody>
      </table>
      </div>
      
    )
}

export default ThirdTable