import {Paper, makeStyles, Button as MuiButton} from '@material-ui/core';
import formData from './formData.json';
import { useState, useEffect } from "react";
import { FormContext } from './FormContext';
import InputElements from "./components/InputElements";

const useStyles = makeStyles(theme => ({
   pageContent: {
     margin: theme.spacing(10),
     padding: theme.spacing(2),
   },
   muiForm: {
     display: "flex",
     flexWrap: "nowrap",
     flexDirection: "column"
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
      <FormContext.Provider value={{ handleChange, fields }}>
          <div className="App">
              <Paper className={classes.pageContent}>
                  <div className='container'>
                      <h2 className='page_label'>{page_label}</h2>
                      <form className={classes.muiForm}>
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
