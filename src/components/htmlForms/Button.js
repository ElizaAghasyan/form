import { Button as MuiButton, makeStyles } from "@material-ui/core";
import {useContext} from "react";
import {FormContext} from "../../FormContext";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = (props) => {
    const classes = useStyles();
    const { fields } = useContext(FormContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(JSON.stringify(fields))
    }

    return (
        <MuiButton
            variant="contained"
            size="large"
            color="primary"
            classes={{ root: classes.root, label: classes.label }}
            onClick={handleSubmit}
        >
            {props.text}
        </MuiButton>
    );
}

export default Button;
