import {useEffect, useState} from "react";
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
    useEffect(() => {
        document.title = formData.formTitle
    }, [formData.formTitle]);

    formData.formRows.forEach((inputs) => {
        inputs.fields.forEach((input) => {
            switch (input.type) {
                case 'radio':
                    initialFormValue[input.field] = input.items[0].value;
                    break
                case 'checkbox':
                    initialFormValue[input.field] = false
                    break
                default:
                    initialFormValue[input.field] = '';
            }
        })
    })

    const [formValue, setFormValue] = useState(initialFormValue);
    const [error, setError] = useState(new Set());
    const classes = useStyles();

    const setFieldValue = (field, value) => {
        setFormValue({...formValue, [field.field]: value})
    }

    const submitForm = () => {
        let validationArr = new Set(error);
        const datePickers = [];
        formData.formRows.forEach((inputs) => {
            inputs.fields.forEach(input => {
                if (input.type === 'datePicker') {
                    datePickers.push(input.field);
                }

                const regExp = input.validationPattern && new RegExp(input.validationPattern);
                const value = formValue[input.field];

                if ((input.required && !value) || (regExp && !regExp.test(value))) {
                    if (!validationArr.has(input)) {
                        validationArr.add(input);
                    }
                } else if (validationArr.has(input)) {
                    validationArr.delete(input);
                }
            })
        })

        setError(validationArr);
        if (validationArr.size) {
            return
        }

        const valueToSubmit = {...formValue}
        datePickers.forEach((field) => {
            valueToSubmit[field] = valueToSubmit[field].toLocaleDateString('en-ZA').replaceAll('/', '');
        })

        valueToSubmit.recaptcha = recaptcha;

        fetch(formData.endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(valueToSubmit),
            credentials: 'include',
        }).then(() => {
            window.location.href = formData.redirectUrl;
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
                                <h4>{row.formGroupTitle}</h4>
                                <div className="form-content">
                                    {row.fields.map((field, j) => <InputElements
                                            formValue={formValue}
                                            setFieldValue={setFieldValue}
                                            key={j}
                                            field={field}
                                            error={error.has(field)}
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
                        <div className="warningStyles">
                            {Array.from(error).map((field, i) => {
                                return <div key={i}>
                                    <span>{field.label}</span>: <span>{field.errorText}</span>
                                </div>
                            })}
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
