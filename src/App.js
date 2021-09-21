import { useState, useEffect } from "react";
import { FormContext } from './FormContext';
import formData from './formData.json';
import { Paper, makeStyles } from '@material-ui/core';
import InputElements from "./components/InputElements";

import './App.css';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
     margin: theme.spacing(3),
     padding: theme.spacing(2),
     width: "600px",
   }
}))

const App = () => {
  const [elements, setElements] = useState()
  const classes = useStyles();

  useEffect(() => {
    setElements(formData[0])
  }, [])

  const { fields, page_label } = elements ?? {}

   const handleChange = (elementId, e) => {
      const newElements = {...elements}
       newElements.fields.forEach(field => {
           const { id } = field;
           if(elementId === id) {
               field.value = e.target.value;
           }
           setElements(newElements);
       })
   }

    return (
      <FormContext.Provider value={{ handleChange, elements }}>
          <div className="App">
              <Paper className={classes.pageContent}>
                  <div className='container'>
                      <h2 className='page_label'>{page_label}</h2>
                      <form className={classes.root}>
                          {fields ? fields.map((field, i) =>
                                  <InputElements key={i} field={field} />)
                              :
                              null
                          }
                      </form>
                  </div>
              </Paper>
          </div>
      </FormContext.Provider>
  );
}

export default App;
