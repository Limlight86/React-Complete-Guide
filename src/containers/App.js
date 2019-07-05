import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Person/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import Aux from '../hoc/Aux' 
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changedCounter: 0,
    authenticated: false
  }

  // static getDerivedStateFromProps(props,state){
  //   console.log("[App.js] getDerivedStateFromProps", props);
  //   return state;
  // }

  // componentWillMount(){
  //   console.log("[App.js] componentWillMount")
  // }

  componentDidMount(){
    console.log("[App.js] componentDidMount")
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("[App.js] shouldComponentUpdate")
    return true
  }

  componentDidUpdate(){
    console.log("[App.js] componentDidUpdate")
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({ persons:persons })
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState( (prevState, props) => {
      return{ 
        persons : persons, 
        changedCounter: prevState.changedCounter + 1 
       }
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  loginHandler = () =>{
    this.setState({authenticated: true})
  }

  toggleCockpit = () =>{
    const doesShow = this.state.showCockpit;
    this.setState( {showCockpit: !doesShow } )
  }

  render () {
    console.log("[App.js] render")
    let persons = null;
    let cockpit = null;

    if ( this.state.showPersons ) {  
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated} />
      );
    } 

    if (this.state.showCockpit){
      cockpit = (
        <Cockpit
          title={this.props.appTitle}
          personsLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          toggle={this.togglePersonsHandler} 
          />
      )
    }

    return (
      <Aux>
        <button onClick={this.toggleCockpit}>
          {this.state.showCockpit ? "Remove Cockpit" : "Show Cockpit" }
        </button>
        <AuthContext.Provider 
          value={{authenticated: this.state.authenticated,
          login: this.loginHandler
          }}
        >
          {cockpit}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, styles.App);
