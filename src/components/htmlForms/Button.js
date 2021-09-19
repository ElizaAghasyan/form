import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = () => {
    const classes = useStyles();

    return (
        <MuiButton
            variant="contained"
            size="large"
            color="primary"
            classes={{ root: classes.root, label: classes.label }}>
            Submit
        </MuiButton>
    );
}

export default Button;
