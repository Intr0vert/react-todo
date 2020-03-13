import React from 'react';
import TodoEl from '../TodoEl';
import Preloader from '../Preloader/Preloader';
import {checkboxHandler} from '../../requests/handlers';
import './taskstyle.css';

export default function TaskList(props: any) {
    const ownProps = props.props;
    const renderLists = () => {
        return (
            ownProps.todos.map((el: any, i: number) => 
                <TodoEl key={i} todo={el} props={ownProps}
                checkboxHandler={checkboxHandler}/>)
        )
    }

    return <>
        {ownProps.preloader.error && 
        <h2 className="todo--error">Somethink went wrong</h2>}

        {ownProps.preloader.fetchDone && !ownProps.preloader.error ?
            renderLists() :
            !ownProps.preloader.error ?
            <Preloader/> :
            <></>}
    </>
}