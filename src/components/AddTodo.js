import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    //This is an example component state
    state = { 
        title: ''
    }

    onSubmit = e => { //form would automatically submit to the file but we don't want that so we prevent the default
        e.preventDefault();
        this.props.addTodo(this.state.title); //Pass it up
        this.setState({ title: ""});
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value }); /* Don't need to climb hierarchy since we are using component state
                                                                           Here we are setting title to the value typed into the field
                                                                           For the sake of code reusability, use e.target.name*/
    render() {
        return (
           <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
               <input //Usually want to have a state for our input field components
                type='text' 
                name='title' 
                style={{ flex: '10', padding: '5px' }}
                placeholder='Add Todo ...'
                value={this.state.title}
                onChange={this.onChange}
               />
               <input 
                type='submit'
                value='Submit'
                className='btn'
                style={{flex: '1'}}
               />
           </form>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo
