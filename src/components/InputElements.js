import Input from './htmlForms/Input';
import Button from  './htmlForms/Button';
import Checkbox from './htmlForms/Checkbox';
import RadioGroup from "./htmlForms/RadioGroup";
import Select from "./htmlForms/Select";
import CustomDateTimePicker from "./htmlForms/Date";


const InputElements = ({ field: { type, id, label, items, format, placeholder, value, options, text, title }}) => {
    switch (type) {
        case 'text':
            return (<Input
                id={id}
                label={label}
                placeholder={placeholder}
                value={value}
            />)
        case 'select':
            return (<Select
                id={id}
                label={label}
                placeholder={placeholder}
                value={value}
                options={options}
                title={title}
            />)
        case 'date':
            return(<CustomDateTimePicker
                id={id}
                label={label}
                format={format}
                value={value}
            />)
        case 'checkbox':
            return (<Checkbox
                id={id}
                label={label}
                value={value}
            />)
        case 'radioGroup':
            return (
                <RadioGroup
                    id={id}
                    label={label}
                    value={value}
                />)
        case 'submit':
            return(<Button
                id={id}
                text={text}
                />)
        case 'number':
            return(<Input
                id={id}
                placeholder={placeholder}
                label={label}
            />)
        case 'radio':
            return(<RadioGroup
                id={id}
                items={items}
                label={label}
                format={format}
                value={value}
            />)
        default:
            return null;
    }
}

export default InputElements;
