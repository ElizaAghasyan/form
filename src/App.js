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
            lineHeight: '1px',
            fontSize: '15px'
        }
    },
    btnLabel: {
        textTransform: 'none'
    }
}))

const App = () => {
    const [formData] = useState(FormData);
    const [formValue, setFormValue] = useState({});
    // const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const setFieldValue = (filed, value) => {
        setFormValue({...formValue, [filed]: value})
    }

    const submitForm = () => {
        console.log(formValue);
    }

    return (
        <div className="wrapper">
            <div className='form-wrapper'>
                <h2 className='form-title'>{formData.formTitle}</h2>
                <form className={classes.inputsRoot}>
                    <div className="form content">
                        {formData.fields.map((field, i) => <InputElements
                                setFieldValue={setFieldValue}
                                key={i}
                                field={field}
                            />
                        )}
                    </div>
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
    );
}

export default App;
