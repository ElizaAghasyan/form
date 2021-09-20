import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';
import React, { useContext } from 'react'
import { FormContext } from '../../FormContext';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    styleSelect: {
        '& .MuiSelect-root': {
            paddingRight: "75px"
        }
    }
}))

const Select = (props) => {
    const { id, label, value, options } = props;
    const { handleChange } = useContext(FormContext);
    const classes = useStyles();


    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                className={classes.styleSelect}
                id={id}
                label={label}
                value={value}
                onSelect={handleChange}
            >
                <MenuItem>{value}</MenuItem>
                {
                    options.map(
                        item => <MenuItem key={item.id} value={value} >{item.title}</MenuItem>
                    )
                }
            </MuiSelect>
        </FormControl>
    );
}

export default Select;
