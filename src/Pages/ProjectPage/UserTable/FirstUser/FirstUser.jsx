import { useState } from 'react';
import { addFirstUser, addToPopedUser, addToSecondUser, addToThiredUser, changeFirstUser, selectTableUser } from '../../../../store/slices/FirstUserSlice/FirstUserSlice';
import './FirstUser.css'
import { useDispatch, useSelector } from 'react-redux';


const FirstTable = () => {
    const dispatch = useDispatch();
    const {FirstUser, PopedUser} = useSelector(selectTableUser);
    const [active, setActive] = useState(false)

    
    const handleMoveToSecond = () => {
      dispatch(addToSecondUser(...PopedUser))
      setActive(false)
    }

    const handleMoveToThird = () => {
      dispatch(addToThiredUser(...PopedUser))
      setActive(false)
    }
    return (
      <div className='FirstUser'> 
      {
        active ? (
          <header className="FirstHeader">
          <div className="MovingDiv">
            <div>
              <p className="MoveTo">Move To</p>
            </div>
            <div className="MoveButtons">
              <button className='MoveToButtons' onClick={handleMoveToSecond}>Second</button>
              <button className='MoveToButtons' onClick={handleMoveToThird}>Third</button>
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
            dispatch(addFirstUser({firstName: firstName.value, lastName: lastName.value, age: age.value}) );
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
          <button className='MoveToButtons'>Add User</button>
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
                FirstUser.map((user,index) => {
                  return (
                    <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className='MoveToButtons'
                    onClick={() => {
                      dispatch(changeFirstUser(index));
                      dispatch(addToPopedUser(user));
                      setActive(true)
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
  };
  
  export default FirstTable;