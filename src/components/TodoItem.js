import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none' //This is a ternary operator
        }
    }

    render() {
        const { id, title } = this.props.todo; //destructuring: this helps you pull out stuff to somply stuff so you can write less (you don't need to write this.todo.... anymore)
        return (
            // Inline styling requires double curly brackets! style={{backgroundColor: '#f4f4f4'}}
            // or set the style to a const style={itemstyle}
            // or make the style a method if style needs to be changed (dynamic styling)
            <div style={this.getStyle()}>
                <p>
                    {/* cannot set or change the state so easily/directly
                        must "climb the ladder and hierarchy to access the state object
                        
                        Todo has a prop markComplete, so that's how we are able to access that method
                        must bind the function so it has access to state and other functions*/}
                    <input type='checkbox' onChange={this.props.markComplete.bind(this, id)}/> 
                    { title }
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                    </p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
