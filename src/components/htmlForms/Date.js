import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import {TextField} from "@material-ui/core";

export default function CustomDateTimePicker(props) {
    const [value, setValue] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <MobileDateTimePicker
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    label={props.label}
                    onError={console.log}
                    minDate={new Date('2018-01-01T00:00')}
                    inputFormat="yyyy/MM/dd hh:mm a"
                    mask="___/__/__ __:__ _M"
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
