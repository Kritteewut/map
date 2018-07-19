import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 20,
    right: theme.spacing.unit,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

function AddBtn(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title="Add Plan" placement="bottom">
        <Button variant="fab" className={classes.absolute}
          onClick={() => props.onAddPlan()}
        >
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

AddBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBtn);