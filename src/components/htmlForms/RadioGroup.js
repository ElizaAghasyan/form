import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const RadioGroup = (props) => {
    const { label, value, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup
                value={value}
            >
                 {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.value} control={<Radio />} label={item.value} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup;
