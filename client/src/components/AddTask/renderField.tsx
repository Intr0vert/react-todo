import React from 'react';

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
    }
}: renderFieldProps) => (
        <div className={'todo--field'}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched &&
                (error && <span className='todo--error'>{error}</span>)}
        </div>
    )

export default renderField;