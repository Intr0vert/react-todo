import React from 'react';
import {
    TextField,
} from '@material-ui/core';

interface renderFieldProps {
    input: string;
    type: string;
    placeholder: string;
    meta: {
        touched: string,
        error: object,
        warning: object,
    }
}

const renderField = ({
    input,
    type,
    placeholder,
    meta: {
        touched,
        error,
    },
    ...custom
}: renderFieldProps) => (
        <div className={'todo--field'}>
            <TextField 
                {...input}
                {...custom}
                placeholder={placeholder}
                />
            {touched &&
                (error && <span className='todo--error'>{error}</span>)}
        </div>
    )

export default renderField;