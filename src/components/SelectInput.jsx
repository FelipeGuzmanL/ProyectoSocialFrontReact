import React, { forwardRef } from 'react';

const SelectInput = forwardRef(({ id, label, options, disabled, valueKey = 'id', labelKey = 'name', ...props }, ref) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} disabled={disabled} ref={ref} {...props}>
                <option value="">-- SELECCIONE {label.toUpperCase()} --</option>
                {options.map(option => (
                    <option key={option[valueKey]} value={option[valueKey]}>
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectInput;
