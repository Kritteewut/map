import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Timeline from '@material-ui/icons/Timeline';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import SendIcon from '@material-ui/icons/Send';
import Place from '@material-ui/icons/Place';
// import Category from '@material-ui/icons/Category';

const styles = theme => ({
    buttonGrab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 59,
        right: theme.spacing.unit,
    },
    buttonPoint: {
        position: 'absolute',
        bottom: theme.spacing.unit * 51,
        right: theme.spacing.unit,
    },
    buttonLine: {
        position: 'absolute',
        bottom: theme.spacing.unit * 44,
        right: theme.spacing.unit,


    },
    buttonPolygon: {
        position: 'absolute',
        bottom: theme.spacing.unit * 37,
        right: theme.spacing.unit,
    },
    buttonMarker: {
        position: 'absolute',
        bottom: theme.spacing.unit * 30,
        right: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

function IconLabelButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="contained" color="secondary" className={classes.buttonGrab}
                onClick={() => props.onAddListenerGrabBtn()}
            >
                <DeleteIcon className={classes.leftIcon} />
                Grab

      </Button>
            <Button variant="contained" color="primary" className={classes.buttonPoint}
                onClick={() => props.onAddListenerMarkerBtn()}
            >
                <SendIcon className={classes.leftIcon} />
                Point

      </Button>
            <Button variant="contained" color="default" className={classes.buttonLine}
                onClick={() => props.onAddListenerPolylineBtn()}>
                <Timeline className={classes.leftIcon} />
                Polyline

      </Button>
            <Button variant="contained" color="secondary" className={classes.buttonPolygon}
                onClick={() => props.onAddListenerPolygonBtn()}>
                <KeyboardVoiceICon className={classes.leftIcon} />
                Polygon
      </Button>
            <Button variant="contained" className={classes.buttonMarker}
                onClick={() => props.onSaveToFirestore()}>
                <Place className={classes.leftIcon} />
                Marker
      </Button>
        </div>
    );
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
