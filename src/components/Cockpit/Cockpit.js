import React, {useEffect} from 'react'
import styles from './Cockpit.module.css'

const Cockpit = (props) => {
  useEffect(()=>{
    console.log("[Cockpit.js] useEffect")
  })

  let assignedClasses = [];
  let btnClass = "";

  if (props.showPersons){
    btnClass = styles.red
  }

  if (props.persons.length <= 2){
    assignedClasses.push(styles.red);
  }
  if(props.persons.length <= 1){
    assignedClasses.push(styles.bold)
  }

  return(
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>
          This is really working!
      </p>
      <button
      className={btnClass}
      onClick={props.toggle}>Toggle Persons
      </button>
    </div>
  )}

  export default Cockpit