import {
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio,
    RadioGroup as MuiRadioGroup,
    Select as MuiSelect,
    TextField
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from '@material-ui/core';
import BasicDatePicker from "./Date";

const useStyles = makeStyles(() => ({
    radio: {
        '&$checked': {
            color: '#1976d2'
        }
    },
    warningStyles: {
        "& .MuiFormLabel-root.Mui-error": {
            color: "red !important"
        }
    },
    checked: {}
}))

const InputElements = ({ field: { type, field, label, items, error=null, options }, setFieldValue}) => {
    const classes = useStyles()
    switch (type) {
        case 'text':
            return (
                <TextField
                    error={false}
                    variant="outlined"
                    label={label}
                    name={field}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                    className={error ? classes.warningStyles : null}
                />)
        case 'number':
            return (
                <TextField
                    error={false}
                    variant="outlined"
                    label={label}
                    name={field}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                    className={error ? classes.warningStyles : null}
                />
            )
        case 'select':
            return (
                <FormControl variant="outlined">
                    <InputLabel>{label}</InputLabel>
                    <MuiSelect
                        label={label}
                        onChange={(e) => {
                            setFieldValue(field, e.target.value);
                        }}
                    >
                        <MenuItem>None</MenuItem>
                        {
                            options.map(
                                item => <MenuItem key={item.id} value={item.value}>{item.title}</MenuItem>
                            )
                        }
                    </MuiSelect>
                </FormControl>
            )
        case 'datePicker':
            return (
                <BasicDatePicker
                    field={field}
                    label={label}
                    onchange={setFieldValue}
                />
            )
        case 'checkbox':
            return (
                <span style={{left: '-12px', position: 'relative'}} className='checkbox'>
                    <Checkbox
                        onChange={(e) => {
                            setFieldValue(field, e.target.checked);
                        }}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <label>{label}</label>
                </span>
            )
        case 'radio':
            return (
                <FormControl>
                    <FormLabel>{label}</FormLabel>
                    <MuiRadioGroup
                        onChange={(e) => {
                            setFieldValue(field, e.target.value);
                        }}
                    >
                        {
                            items.map(
                                item => (
                                    <FormControlLabel
                                        value={item.value}
                                        key={item.id}
                                        control={<Radio classes={{root: classes.radio, checked: classes.checked}} />}
                                        label={item.label}
                                    />
                                )
                            )
                        }
                    </MuiRadioGroup>
                </FormControl>
            )
        default:
            return null;
    }

}

export default InputElements;
