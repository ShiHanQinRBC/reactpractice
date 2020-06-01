import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
//import uuid from 'uuid'; // helps us generate a new id
//import { v4 as uuidv4 } from 'uuid'; //this is just a hardcoded backend but we started using the json placeholder

class App extends Component { //If this was a class, render would be a required lifecycle method
  /*Think of state as a cloud of data that hovers above all the components; 
    we send stuff up to change it and then it rains back down
    it's one way data flow
  */
  state = { //This is a JavaScript object
    //todos is an array of objects
    todos: []
      /*{
        id: uuidv4(), //When working with backend and databases u likely need id for resources
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuidv4(), 
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: uuidv4(), 
        title: 'Meeting with boss',
        completed: false
      }*/
  }

  //Lifecycle method
  componentDidMount() {
    //This returns a promise
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10') //can limit amount in the array
      .then(res => this.setState({ todos: res.data })); //These are todos we are getting from the json placeholder
  }

  //Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) { //Check that todo id matches the id passed into the function
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }
  //Deletes todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`) //this makes the delete request and returns a promise; deletes it on the server and updates it on the UI
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })); //Returns everything that is NOT the selected id 
    }

  //Add Todo
  addTodo = (title) => {
    //a new todo object is created and then added to the state
    /*const newTodo = {
      id:: uuidv4(),
      title,
      completed: false
    }*/
      // This mimics sending updated data to a server, does more than just update the UI
      axios.post('https://jsonplaceholder.typicode.com/todos', { //returns a promise
        title: title, //can just be title, 
        completed: false
      })
        .then(res => this.setState({ todos: [...this.state.todos, res.data] })); //cannot change the todos, simply copying it
  }

  render() {
    return ( //A lot of this stuff is JSX, but you can write javascipt within {}
      <Router>
        <div className="App">
        {/* to add the stuff from state it's like adding an html attribute 
            we are taking stuff from the state and passing it as a prop
            
            passing in todos as a prop below, so must add todos as a prop type*/}
        <div className='container'>
          <Header />
          <Route exact path='/' render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/> 
            </React.Fragment>
          )} />
          <Route path='/about' component={About} />
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
