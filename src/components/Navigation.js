import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Login from './Login';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Pic from './Picture/Ling logo.png';
import firebase, { auth, provider, provider2 } from '../config/firebase';
import '../App.css';



const styles = theme => ({
    drawerPaper: {
        position: 'relative',
<<<<<<< HEAD
        width: drawerWidth,
        zIndex: 1,
    },
=======
        width: '25vw',

    }, avatar: {
        margin: 0,
    },
    card: {
        maxWidth: 400,
    },
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
});

class PermanentDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
            email: null,
        }
        this.onSetUser = this.onSetUser.bind(this)
        this.logout = this.logout.bind(this)
    }

    onSetUser(user, email) {
        this.setState({
            user: user,
            email: email
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
                        <ListItem>
                            <Avatar
                                alt={this.state.user.email}
                                src={this.state.user.photoURL || Pic}
                                className={classNames(classes.bigAvatar)}
                            />
                            <ListItemText primary={this.state.user.email || this.state.email} secondary={this.state.user.displayName} />
                        </ListItem>
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
        const { anchor } = this.state;
        return (
<<<<<<< HEAD
            <div>
                <Drawer
                    variant="persistent"
                    anchor={anchor}
                    open={this.props.openSide}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {this.renderDrawer()}
                </Drawer>
            </div>


=======
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'left'}
            >
                {this.renderDrawer()}
            </Drawer>
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
