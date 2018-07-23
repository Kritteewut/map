import React, { Component } from 'react';
import firebase, { auth } from './config';
import { Link } from 'react-router-dom'
import logo from './Picture/Ling logo.png';
import './Login.css'
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerU = this.registerU.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    registerU(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            alert('Register Complete');
        }).catch((error) => {
            alert('username ที่ใส่ไม่ถูกต้อง หรือ ได้ถูกใช้ไปแล้ว')
            console.log(error);
        });

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    verifyEmail(e) {
        e.preventDefault();
        firebase.auth().currentUser.sendEmailVerification().then((u) => {
            alert("Please Check Your Mail");
        }).catch((error) => {
            console.log(error);
            alert("Error");
        });
    }
    renderRegister() {
        if (this.state.user) {
            return (
                <div>
                    <div class="loginpage"></div>
                    <div className="loading container wrapper LoginFont">
                        <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                            <div class="regisBtn">
                                <Link to="/Task" >เพิ่มงาน</Link><br />
                                <button type="submit" onClick={this.verifyEmail} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ส่งเมล</button>
                            </div>
                            <div class="form-group">
                            </div><br />
                        </p></div ></div >

            )
        } else {
            return (
                <div>
                    <div class="loginpage"></div>
                    <div className="App">
                        <div className="loading container wrapper LoginFont">
                            <p class="logo"><img src={logo} className="App-logo" alt="logo" />
                                <br />
                                สมัครสมาชิก</p>

                            <Form>
                                <FormGroup>
                                    <Label for="taskName"><p class="loginText">Username</p></Label>
                                    <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="startDate"><p class="loginText">Password</p></Label>
                                    <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </FormGroup>
                            </Form>
                            <br />
                            <button type="submit" onClick={this.registerU} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยืนยัน</button>  <br /><br />
                            <Link to="/" >Back</Link>
                            <br /> <br />


                        </div>

                    </div >
                </div >
            );
        }
    }
    render() {
        return (
            <div className="App">
                {this.renderRegister()}

            </div>
        );
    }
}
export default Register;