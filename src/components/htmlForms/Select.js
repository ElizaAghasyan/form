import { useState } from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    styleSelect: {
        '& .MuiFormControl-root': {
            width: '50%'
        }
    }
}))

const Select = (props) => {
    const { id, label, value, options } = props;
    const classes = useStyles();
    const [age, setAge] = useState();

    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                <MenuItem>None</MenuItem>
                {
                    options.map(
                        item => <MenuItem key={item.id} value={item.value}>{item.title}</MenuItem>
                    )
                }
            </MuiSelect>
        </FormControl>
    );
}

export default Select;
