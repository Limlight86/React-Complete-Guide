import React, {useEffect, useRef, useContext} from 'react'
import styles from './Cockpit.module.css'
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {

  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext)

  console.log(authContext.authenticated)

  useEffect(()=>{
    console.log("[Cockpit.js] useEffect");
    // setTimeout(()=>{
    //   alert('Saved Data to the cloud,');
    // }, 1000);
    toggleBtnRef.current.click();
    return () =>{
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);

  let assignedClasses = [];
  let btnClass = "";

  if (props.showPersons){
    btnClass = styles.red
  }

  if (props.personsLength <= 2){
    assignedClasses.push(styles.red);
  }
  if(props.personsLength <= 1){
    assignedClasses.push(styles.bold)
  }

  return(
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>
          This is really working!
      </p>
      <button
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.toggle}
      >
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Log In</button>
    </div>
  );
};

  export default React.memo(Cockpit);