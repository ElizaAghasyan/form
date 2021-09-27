import {useState} from "react";
import FormData from './formData.json';
import {Button as MuiButton, makeStyles} from '@material-ui/core';
import InputElements from "./components/InputElements";
import {GoogleReCaptcha, GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
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
            margin: '-8px 0'
        }
    },
    btnLabel: {
        textTransform: 'none'
    }
}))

const App = () => {
    const [formData] = useState(FormData);
    const initialFormValue = {};
    let recaptcha;
    formData.formRows.forEach((inputs) => {
        inputs.fields.forEach((input) => {
            initialFormValue[input.field] = '';
        })
    })
    const [formValue, setFormValue] = useState(initialFormValue);
    const [error, setError] = useState([]);
    // const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const setFieldValue = (field, value) => {
        setFormValue({...formValue, [field.field]: value})
    }

    const submitForm = () => {
        let errorRequired = error;
        formData.formRows.forEach((inputs) => {
            inputs.fields.forEach(input => {
                const regExp = input.validationPattern && new RegExp(input.validationPattern);
                const value = formValue[input.field];
                if ((input.required && !value) || (regExp && !regExp.test(value))) {
                    if (!errorRequired.includes(input.field)) {
                        errorRequired.push(input.field);
                    }
                } else if (errorRequired.includes(input.field)) {
                    errorRequired = errorRequired.filter(item => item !== input.field)
                }
            })
        })

        setError([...errorRequired]);
        if (errorRequired.length) {
            return
        }

        formValue.recaptcha = recaptcha;
        console.log(formValue);
        fetch(formData.endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formValue),
            credentials: 'include',
        }).then(() => {
            setFormValue({});
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <GoogleReCaptchaProvider reCaptchaKey={formData.siteKey}>
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
                                            formValue={formValue}
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
                                onClick={submitForm}
                            >
                                {formData.submitText}
                            </MuiButton>
                        </div>
                    </form>
                </div>
            </div>
            <GoogleReCaptcha onVerify={(token) => {
                recaptcha = token
            }}/>
        </GoogleReCaptchaProvider>
    );
}

export default App;
