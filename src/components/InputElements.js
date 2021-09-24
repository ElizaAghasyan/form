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
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    radio: {
        '&$checked': {
            color: '#1976d2'
        }
    },
    checked: {}
}))

const InputElements = ({ field: { type, field, label, items, value, options }, setFieldValue}) => {
    const classes = useStyles()
    switch (type) {
        case 'text':
            return (
                <TextField
                    variant="outlined"
                    label={label}
                    name={field}
                    value={value}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                />)
        case 'number':
            return (
                <TextField
                    variant="outlined"
                    label={label}
                    name={field}
                    value={value}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                />
            )
        case 'select':
            return (
                <FormControl variant="outlined">
                    <InputLabel>{label}</InputLabel>
                    <MuiSelect
                        label={label}
                        value={value}
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
        case 'checkbox':
            return (
                <span style={{left: '-12px', position: 'relative'}} className='checkbox'>
                    <Checkbox
                        onChange={(e) => {
                            setFieldValue(field, e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <label>{label}</label>
                </span>
            )
        case 'radio':
            return (
                <FormControl>
                    <FormLabel>{label}</FormLabel>
                    <MuiRadioGroup
                        value={value}
                        onChange={(e) => {
                            setFieldValue(field, e.target.value);
                        }}
                    >
                        {
                            items.map(
                                item => (
                                    <FormControlLabel key={item.id} value={item.value} control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label={item.value} />
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
