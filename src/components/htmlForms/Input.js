import { TextField } from '@material-ui/core';
import React, { useContext } from 'react'
import { FormContext } from '../../FormContext';

const Input = (props) => {
    const { name, label, value, id } = props;
    const { handleChange } = useContext(FormContext)

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={event => handleChange(id, event)}
        />
    )
}

export default Input;
