import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component { //If this was a class, render would be a required lifecycle method
  render() {
    //console.log(this.props.todos) //the todos from the state object of App.js is passed into todos and accessed here
    //A lot of this stuff is JSX, but you can write javascipt within {}
    return this.props.todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/> //todo is a prop
      ));
  }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired, //todos is an array of objects
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;
