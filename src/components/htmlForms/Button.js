import { Button as MuiButton, makeStyles } from "@material-ui/core";
import {useContext} from "react";
import {FormContext} from "../../FormContext";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = (props) => {
    const classes = useStyles();
    const { elements } = useContext(FormContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(JSON.stringify(elements))
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
