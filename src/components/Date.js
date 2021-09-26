import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker( {onchange, field, formValue}) {

    if (!formValue[field.field]) {
        formValue[field.field] =  new Date()
    }
    return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={field.label}
                    onChange={(newValue) => {
                        onchange(field, newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    value={formValue[field.field]}
                    date={formValue[field.field]}
                />
            </LocalizationProvider>
    );
}
