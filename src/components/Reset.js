import React, { Component } from 'react';
import firebase from './config';
import { Link } from 'react-router-dom'
import logo from './Picture/Ling logo.png';
import './Login.css'
import {
    Input,
} from 'reactstrap';
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.resetPass = this.resetPass.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    resetPass(e) {
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.email).then((u) => {
            alert('Password Reset Email Sent!');
        }).catch((error) => {
            console.log(error);
            alert('อีเมลที่ใส่ไม่ถูกต้อง')
        });

    }
    render() {

        return (
            <div>
                <div class="loginpage"></div>
                <div className="loading container wrapper LoginFont">
                    <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                        <br /> กรอก Email ที่ใช้สมัคร
                    </p>
                    <div class="form-group"><br />
                        <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Enter email" /><br /><br /><br />
                        <button type="submit" onClick={this.resetPass} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยืนยัน</button> <br /> <br />
                        <Link to="/" >Back</Link>
                    </div>
                    <div class="form-group">
                    </div><br /></div ></div >
        );
    }



}

export default Reset;