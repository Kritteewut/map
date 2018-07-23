import React, { Component } from 'react';
import firebase, { auth, provider, provider2 } from '../config/firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './Login.css'
import {
    Form,
    FormGroup,
} from 'reactstrap';
import { Button } from '../../node_modules/@material-ui/core';
import Plans from './Plans';

import logo from './Picture/Ling logo.png'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Drawer from '@material-ui/core/Drawer';
import PermanentDrawer from './Navigation'


const drawerWidth = '25vw';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },

});

class Login extends Component {

    static async getInitialProps() {
        return console.log('get init!')
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user });
        //         console.log(user)
        //     }
        // });
    }
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            email: '',
            password: '',
        };
        this.loginFacebook = this.loginFacebook.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginE = this.loginE.bind(this);
        this.logout = this.logout.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    loginE(e) {
        e.preventDefault();
        var email = this.state.email
        var password = this.state.password
        firebase.auth().signInWithEmailAndPassword(email, password).then((u) => {
            console.log(email);
            console.log(password);
        }).catch((error) => {
            alert("Username or Password incorrect")
            console.log(error);
        });
    }

    loginFacebook = () => {
        var that = this;
        auth.signInWithPopup(provider).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({ user: user });
            that.props.onSetUser(user)
        }).catch(function (error) {

        });
    }

    loginGoogle = () => {
        var that = this;
        auth.signInWithPopup(provider2).then(function (result) {
            var user = result.user;
            console.log(user);
            that.setState({
                user: user
            });
            that.props.onSetUser(user)
        }).catch(function (error) {
        });

    }

    logout() {
        firebase.auth().signOut();
        this.setState({ user: null });
    }

    componentWillMount() {
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user });
        //     }
        // });
    }

    renderLogin() {

        if (this.state.user) {
            return (
                <div>
                    <PermanentDrawer
                        planData={this.props.planData}
                        currentPlanData={this.props.currentPlanData}
                        onSelectCurrentPlanData={this.props.onSelectCurrentPlanData}
                        user={this.state.user}
                    />
                    <button onClick={this.logout}>logout</button>
                </div>
            )
        } else {

            return (
                //loading container wrapper LoginFont
                <div>
                    <div className="loadingpage">
                        <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                            <br /> Log In </p>
                        <div class="inputLogin">
                            <Form>
                                <FormGroup>
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item>
                                            <AccountCircle />
                                        </Grid>
                                        <Grid item>
                                            <TextField value={this.state.email} onChange={this.handleChange} name="email" type="email" id="input-with-icon-grid" label="Enter email" />
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                                <FormGroup>
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item>
                                            <Lock />
                                        </Grid>
                                        <Grid item>
                                            <TextField value={this.state.password} onChange={this.handleChange} name="password" type="password" id="input-with-icon-grid" label="Enter Password" />
                                        </Grid>
                                    </Grid>
                                </FormGroup>
                            </Form>
                        </div>
                        <br />
                        <div class="LoginButton">
                            <button type="submit" onClick={this.loginE} class="loginBtn loginBtn--L">&nbsp;Log In with email</button>
                            <br />
                            <p class='Or'> or </p>

                            <button className="loginBtn loginBtn--facebook" onClick={this.loginFacebook}> Log In with Facebook</button>
                            <button className="loginBtn loginBtn--google" onClick={this.loginGoogle}>Log In with Google</button><br />
                        </div>
                        <br />
                        <div class="regisBtn">
                            สมัครสมาชิก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   ลืมรหัสผ่าน
                    </div>
                        <br /> <br />

                    </div>
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
                {this.renderLogin()}
            </Drawer>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);