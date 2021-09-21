import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    rootInput: {
        width: '50%'
    }
})

const Input = (props) => {
    const [inputName, setInputName] = useState()
    const { name, label, value } = props;
    const classes = useStyles()

    return (
        <TextField
            className={classes.rootInput}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={e => setInputName(e.target.value)}
        />
    )
}

export default Input;
