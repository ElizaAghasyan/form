import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup as MuiRadioGroup,
    Select as MuiSelect,
    TextField
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import BasicDatePicker from "./Date";

const useStyles = makeStyles(() => ({
    radio: {
        '&$checked': {
            color: '#1976d2'
        }
    },
    checked: {}
}))

const InputElements = ({field, setFieldValue, error, formValue}) => {
    const classes = useStyles();
    switch (field.type) {
        case 'text':
            return (
                <TextField
                    value={formValue[field.field]}
                    error={error}
                    variant="outlined"
                    label={field.label}
                    name={field.field}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                />)
        case 'number':
            return (
                <TextField
                    value={formValue[field.field]}
                    error={error}
                    variant="outlined"
                    label={field.label}
                    name={field.field}
                    onChange={(e) => {
                        setFieldValue(field, e.target.value);
                    }}
                />
            )
        case 'select':
            return (
                <FormControl variant="outlined">
                    <InputLabel>{field.label}</InputLabel>
                    <MuiSelect
                        value={formValue[field.field]}
                        error={error}
                        label={field.label}
                        onChange={(e) => {
                            setFieldValue(field, e.target.value);
                        }}
                    >
                        <MenuItem>None</MenuItem>
                        {
                            field.options.map(
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
                    onchange={setFieldValue}
                    error={error}
                    formValue={formValue}
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
                    <label>{field.label}</label>
                </span>
            )
        case 'radio':
            return (
                <FormControl>
                    <FormLabel>{field.label}</FormLabel>
                    <MuiRadioGroup
                        value={formValue[field.field]}
                        onChange={(e) => {
                            setFieldValue(field, e.target.value);
                        }}
                    >
                        {
                            field.items.map(
                                item => (
                                    <FormControlLabel
                                        value={item.value}
                                        key={item.id}
                                        control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
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
