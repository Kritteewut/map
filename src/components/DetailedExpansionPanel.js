import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
<<<<<<< HEAD
    root: {
        position: 'absolute',
        left: '60vw',
        right: '15vw',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        alignItems: 'center',
    },
=======
  root: {
    position: 'absolute',
    left: '60vw',
    right: '15vw',
    justifyContent: 'flex-end',
    alignItems: 'center'

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
});


function DetailedExpansionPanel(props) {
<<<<<<< HEAD
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ExpansionPanel >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div style={{ alignItems: 'center' }} >
                        <Typography className={classes.heading}>{props.yourLocation}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Typography>{props.userLocation}</Typography>
                </ExpansionPanelDetails>
                <Divider />
            </ExpansionPanel>
        </div>
    );
}

DetailedExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
=======
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div style={{alignItems:'center'}} >
            <Typography className={classes.heading}>{props.yourLocation}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography>{props.userLocation}</Typography>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
};

export default withStyles(styles)(DetailedExpansionPanel);