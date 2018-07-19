import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Form } from 'react-form';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
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
    absolute2: {
        position: 'absolute',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit,
        background: 'linear-gradient(45deg, red 30%, red 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    absolute3: {
        position: 'absolute',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 9,
        background: 'linear-gradient(45deg, #76ff03 30%, #76ff03 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    absolute4: {
        position: 'absolute',
        background: 'white',
        color: 'black',
        top: theme.spacing.unit * 2.5,
    },

});

class SimpleModal extends React.Component {
    state = {
        open: false,
        inputValue: '',
    };

    handleOpen = () => {
        this.setState({
            open: true,
            inputValue: ''
        });
    };
    handleClose = () => {
        this.setState({
            open: false,
            inputValue: ''
        });
    };
    handleAdd = () => {
        if (this.state.inputValue === '') {
            alert('กรุณากรอกชื่อแปลง')
        } else {
            this.props.onAddPlan(this.state.inputValue)
            this.handleClose()
        }
    }
    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Tooltip title="Add Plan" placement="left">
                    <Button variant="fab" className={classes.absolute} onClick={this.handleOpen}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>

                    <div style={getModalStyle()} className={classes.paper}>
                        <Tooltip title="Close Window" placement="top" >
                            <Button className={classes.absolute2} onClick={this.handleClose}>
                                X
                            </Button>
                        </Tooltip>

                        <Tooltip title="Add Plan" placement="top" >
                            <Button className={classes.absolute3} onClick={this.handleAdd}>
                                +
                            </Button>
                        </Tooltip>
                        <input className={classes.absolute4} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
                    </div>


                </Modal>

            </div>

        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const NiceModal = withStyles(styles)(SimpleModal);

export default NiceModal;
