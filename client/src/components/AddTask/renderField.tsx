import React from 'react';
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from '@material-ui/core';

interface renderFieldProps {
    fieldName: string;
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
    fieldName,
    input,
    type,
    placeholder,
    meta: {
        touched,
        error,
        warning
    },
    ...custom
}: renderFieldProps) => (
        <FormControl className='todo--field'>
            <InputLabel
                htmlFor={`todo--${fieldName}`}>{fieldName}</InputLabel>
            <Input
                id={`todo--${fieldName}`}
                {...input}
                {...custom}
                placeholder={placeholder}
                />
            <FormHelperText>
                {touched &&
                    (error && <span className='todo--error'>{error}</span>) ||
                    (warning && <span className='todo--warning'>{warning}</span>)}
            </FormHelperText>
        </FormControl>
    )

export default renderField;