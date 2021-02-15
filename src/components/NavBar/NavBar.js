import React from 'react'
import { LOGOUT, CHANGE_FIELD } from '../../store/actions';
import history from '../history';

export const NavBar = ({setMainState, users, email, score}) => {

  const [isToggled, setIsToggled] = React.useState(false);
  
  const onClick = () => {
    setMainState(LOGOUT)
    setMainState(CHANGE_FIELD, { email: '', password: '' })
    history.push("/");
  }

  const showTable = () => {
    let str = '';
    score.forEach(score => {
      str += score.name;
      str += ' - '
      str += score.count;
      str += '\n'
    });
    alert(str)
  }

  const userName = () => {
    let name = '';
    users.forEach(user => {
      if(user.email === email)
        name = user.name
    });
    return name;
  }

  const onToggle = () => {
    setIsToggled(!isToggled);
    if(isToggled === false) {
      document.body.style.backgroundColor = "#627CA2"
      document.body.style.color = "white"
      document.body.style.textShadow = "0 0 3px #000"
    } else {
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
    }
  }
  
  return (
    <div className='navbar'>
      <div>
        <span className="mx-3 align-top">THEME MODE</span>
        <label className="mx-3 toggle-switch">
          <input type="checkbox" checked={isToggled} onChange={onToggle} />
          <span className="switch" />
        </label>
      </div>
      <button onClick={showTable} className="btn btn-outline-primary">Table scores</button>
      <div>
      <span>Welcome, {userName()}!</span>
      <button onClick={onClick} className="btn btn-primary mx-3 me-3">
        Quit
      </button>
      </div>
    </div>
)}
