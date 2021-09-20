import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

const MyCheckbox = (props) => {
    const { label, id } = props;
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <label style={{'textAlign': 'center', 'marginTop':'10px'}}>{label}</label>
            <Checkbox
                id={id}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </>
    );
}

export default MyCheckbox;
