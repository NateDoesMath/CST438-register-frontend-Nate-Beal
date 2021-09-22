import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCourse from './AddCourse';

class AddStudent extends Component {

    constructor(props) {
        super(props);
        this.state={
            studentName: '',
            studentEmail: '',
            statusCode: ''
        };
    }

    nameChangeHandler = (event) => {
        this.setState({studentName: event.target.value});
    }

    emailChangeHandler = (event) => {
        this.setState({studentEmail: event.target.value});
    }

    statusChangeHandler = (event) => {
        this.setState({statusCode: event.target.value});
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        
        const token = Cookies.get('XSRF-TOKEN');
        var name = this.state.studentName;
        var email = this.state.studentEmail;
        fetch(`${SERVER_URL}/student?email=` + email + `&name=` + name,
            {
                method: 'POST',
                headers: { 'X-XSRF-TOKEN': token }
            })
        .then(res => {
            if (res.ok) {
                toast.success("Student successfully added", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else {
                toast.error("Student add failed", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error('Delete http status =' + res.status);
        }})
            .catch(err => {
            toast.error("Student add failed", {
                    position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
            }) 
    }

    render() {
        return (
            <div>
                <h1> Please enroll a new student here. </h1>

                <form onSubmit={this.mySubmitHandler}>
                
                <p> Enter Student Name:</p>
                <input type='text' name='studentName' onChange={this.nameChangeHandler}/>
                
                <p> Enter Student Email:</p>
                <input type='email' name='studentEmail' onChange={this.emailChangeHandler}/>
               
                <p> Enter Status Code:</p>
                <input type='text' name='statusCode' onChange={this.statusChangeHandler}/>
                <br></br>
                <br></br>
                <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default AddStudent;