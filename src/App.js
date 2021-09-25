import {useState} from "react";
import FormData from './formData.json';
import {Button as MuiButton, makeStyles} from '@material-ui/core';
import InputElements from "./components/InputElements";

import './App.css';

const useStyles = makeStyles(() => ({
    inputsRoot: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: '10px 0'
        },
        '& .MuiOutlinedInput-input': {
            padding: '9.5px'
        },
        '& .MuiInputLabel-outlined': {
            fontSize: '15px',
            margin: '-6px 0'
        }
    },
    btnLabel: {
        textTransform: 'none'
    }
}))

const App = () => {
    const [formData] = useState(FormData);
    const [formValue, setFormValue] = useState({});
    const [error, setError] = useState([]);
    // const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const setFieldValue = (field, value) => {
        setFormValue({...formValue, [field.field]: value})
        const regExp = field.validationPattern && new RegExp(field.validationPattern);
        if ((field.required && !value) || (regExp && !regExp.test(value))) {
            if (!error.includes(field.field)) {
                setError([...error, field.field])
            }
            return
        }
        if (error.includes(field.field)) {
            setError(error.filter(item => item !== field.field))
        }
    }

    const submitForm = () => {
        let errorRequired = error;
        formData.formRows.forEach((inputs) => {
            inputs.fields.forEach(input => {
                if (input.required && !formValue[input.field] && !errorRequired.includes(input.field)) {
                    errorRequired.push(input.field);
                }
            })
        })
        setError([...errorRequired]);
        if (errorRequired.length) {
            return
        }
        console.log(formValue);
    }

    return (
        <div className="wrapper">
            <div className='form-wrapper'>
                <h2 className='form-title'>{formData.formTitle}</h2>
                <form className={classes.inputsRoot}>
                    {formData.formRows.map((row, i) => (
                        <div key={i} className="form-group">
                            <h4>
                                {row.formGroupTitle}
                            </h4>
                            <div className="form-content">
                                {row.fields.map((field, j) => <InputElements
                                        setFieldValue={setFieldValue}
                                        key={j}
                                        field={field}
                                        error={error.includes(field.field)}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className='btn-wrapper'>
                        <MuiButton
                            variant="contained"
                            size="large"
                            color="primary"
                            classes={{label: classes.btnLabel}}
                            disabled={!!error.length || Object.keys(formValue).length === 0}
                            onClick={submitForm}
                        >
                            {formData.submitText}
                        </MuiButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
