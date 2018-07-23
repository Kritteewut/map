import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ColorPicker from '../components/ColorPicker';
import Login from './Login';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pic from './Picture/User-dummy-300x300.png';

const drawerWidth = '25vw';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    }, avatar: {
        margin: 0,
    },

});

class PermanentDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.user ?
                    <div className={classes.userName}>
                        <Avatar
                            alt={this.state.user.email}
                            src={this.state.user.photoURL || Pic}
                            className={classNames(classes.bigAvatar)}
                        />
                        <Typography variant="title">{this.state.user.email}  </Typography>
                    </div>
                    :
                    <Avatar
                        alt="No User"
                        src="/static/images/uxceo-128.jpg"
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                }

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor={'left'}
                >
                    <Divider />
                    <List>
                        {this.props.currentPlanData.planName}
                    </List>
                    <Divider />
                    {this.props.planData.map(value => {
                        return (
                            <div>
                                {
                                    <ListItem
                                        button
                                        key={value.planId}
                                        onClick={() => this.props.onSelectCurrentPlanData(value)}>

                                        <ListItemText primary={value.planName}>
                                        </ListItemText>
                                    </ListItem>
                                }
                            </div>
                        )
                    })}
                    <Divider />
                    <button style={{
                        bottom: 0,
                        position: 'absolute',
                    }}
                    >
                        บันทึก
                    </button>
                </Drawer>
            </div>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);