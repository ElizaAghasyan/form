import {Paper, makeStyles } from '@material-ui/core';
import Button from './components/htmlForms/Button';
import Checkbox from './components/htmlForms/Checkbox';
import Input from './components/htmlForms/Input';
import RadioGroup from "./components/htmlForms/RadioGroup";
import Select from "./components/htmlForms/Select";

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(10),
    padding: theme.spacing(5)
  }
}))

const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Paper className={classes.pageContent}>
        {/*<RadioGroup />*/}
        <Select />
        <Input />
        <Button />
        <Checkbox />
      </Paper>
    </div>
  );
}

export default App;
