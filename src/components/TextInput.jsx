import React, { forwardRef } from 'react';
import '../styles/TextInput.css';

const TextInput = forwardRef(({ id, label, type = 'text', ...props }, ref) => {
    return (
        <div className='text-input'>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} ref={ref} {...props} />
        </div>
    );
});

export default TextInput;
