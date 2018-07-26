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
import Pic from './Picture/User-dummy-300x300.png';
import firebase, { auth, provider, provider2 } from '../config/firebase';
import '../App.css';



const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: '25vw',

    }, avatar: {
        margin: 0,
    },
    card: {
        maxWidth: 400,
    },
});

class PermanentDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onSetUser = this.onSetUser.bind(this)
        this.logout = this.logout.bind(this)
    }

    onSetUser(user) {
        this.setState({
            user: user
        }, () => console.log(this.state.user.uid))
        this.props.onSetUser(user)
    }

    logout() {
        firebase.auth().signOut();
        this.setState({ user: null });
    }

    renderDrawer() {
        const { classes } = this.props;
        if (this.state.user) {
            return (
                <div>
                    {this.state.user ?
                        <div className={classes.userName}>
                            <ListItem>
                                <Avatar
                                    alt={this.state.user.email}
                                    src={this.state.user.photoURL || Pic}
                                    className={classNames(classes.bigAvatar)}
                                />
                                <ListItemText primary={this.state.user.email} secondary={this.props.currentDate} />
                            </ListItem>
                        </div>
                        :
                        <Avatar
                            alt="No User"
                            src="/static/images/uxceo-128.jpg"
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    }

                    <div>
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
                        <button>
                            บันทึก
                    </button>
                        <button className="logout logout--L" onClick={this.logout}>
                            logout
                        </button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Login
                        onSetUser={this.onSetUser}
                    />
                </div>

            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'left'}
            >
                {this.renderDrawer()}
            </Drawer>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
