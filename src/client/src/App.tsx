import React, {Component} from 'react';
import {connect} from 'react-redux';
import {counterActions} from './reduser/actions';

class App extends Component<any, App> {
    // constructor(props:any) {
    //     super(props);
    // }

    render() : any {
        return (
            <>
                <button 
                onClick={() => this.props.IncrementBy(5)}>Increment</button>
                <button
                onClick={() => this.props.DecrementBy(10)}>Decrement</button>
            </>
        )
    }
}

export default connect(state => ({counts: state}), counterActions)(App);