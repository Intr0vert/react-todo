import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rootAction } from './ducs';
import AddTask from './components/AddTask/AddTask';
import {getTodoData} from './requests/handlers';
import TaskList from './components/TaskList/TaskList';

interface App {
    getTodoData: Function,
}

class App extends Component<any, App> {
    constructor (props:object) {
        super(props);
        
        this.getTodoData = getTodoData.bind(this);
    }

    addTaskHandler () {}

    componentDidMount() {
        this.props.dispatch(this.getTodoData());
    }

    render(): any {
        return (
            <div className="todo--wrapper">
                <h1>TODO: </h1>
                <TaskList props={this.props}/>
                <AddTask/>
            </div>
        )
    }
}

export default connect(
    (state: any)=>{
        return {
            todos: state.todoReducer,
            preloader: state.preloaderReducer,
        }
    },
    (dispatch:any)=>({
        dispatch,
        rootAction
    })
    )(App);