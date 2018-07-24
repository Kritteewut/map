import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
<<<<<<< HEAD
import Login from './Login';

=======
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
>>>>>>> 26537cb807a40d78b016c16fb24dcb941757c684
const styles = {
    list: {
        width: '27vw',
    },
    fullList: {
        width: 'auto',
    },
};

class Sidebar extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
<<<<<<< HEAD
                <Login/>
=======
                <List>
                    User info
                </List>
                <Divider />
                {this.props.planData.map(value => {
                    return (
                        <ListItem
                            button
                            key={value.planId}
                            onClick={() => this.props.onSelectCurrentPlanData(value)}>
                            <ListItemText primary={value.planName} >
                            </ListItemText>
                        </ListItem>
                    )
                })}
>>>>>>> 26537cb807a40d78b016c16fb24dcb941757c684
            </div>
        );
        return (
            <div>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleDrawer('left', true)} style={{ margin: '100px 0px 0px 10px' }} >Plan: {this.props.currentPlanData.planName}</Button>
                <SwipeableDrawer
<<<<<<< HEAD
                    open='left'
                    // onClose={this.toggleDrawer('left', false)}
                    // onOpen={this.toggleDrawer('left', true)}
=======
                    open={true}
                    shadow={false}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}

>>>>>>> 26537cb807a40d78b016c16fb24dcb941757c684
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);