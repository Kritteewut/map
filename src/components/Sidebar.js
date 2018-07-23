import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Login from './Login';

const styles = {
    list: {
        width: '27vw',
    },
    // fullList: {
    //   width: 'auto',
    // },
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
                <Login/>
            </div>
        );

        // const fullList = (
        //   <div className={classes.fullList}>
        //     <List></List>
        //     <Divider />
        //     <List></List>
        //   </div>
        // );

        return (
            <div>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleDrawer('left', true)} style={{ margin: '100px 0px 0px 10px' }} >Open Left</Button>
                <SwipeableDrawer
                    open='left'
                    // onClose={this.toggleDrawer('left', false)}
                    // onOpen={this.toggleDrawer('left', true)}
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