import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import './staff.css';

import "react-datepicker/dist/react-datepicker.css";

export default class CalcSalary extends Component {
    constructor(props) {
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeBasicSalary = this.onChangeBasicSalary.bind(this);
        this.onChangeOTHours = this.onChangeOTHours.bind(this);
        this.onChangeOTPay = this.onChangeOTPay.bind(this);
        this.onChangeChanellingFee = this.onChangeChanellingFee.bind(this);
        this.onChangeNoOfAppointments = this.onChangeNoOfAppointments.bind(this);
        this.onChangeTotalSalary = this.onChangeTotalSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: '',
            name: '',
            date: new Date(),
            basicSalary: '',
            otHours: '',
            otPay: '',
            chanellingFee: '',
            noOfAppointments: '',
            totalSalary: '',
        }
    }

    onChangeID(e) {
        this.setState({
            _id: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onChangeBasicSalary(e) {
        this.setState({
            basicSalary: e.target.value
        });
    }

    onChangeOTHours(e) {
        this.setState({
            otHours: e.target.value
        });
    }

    onChangeOTPay(e) {
        this.setState({
            otPay: e.target.value
        });
    }

    onChangeChanellingFee(e) {
        this.setState({
            chanellingFee: e.target.value
        });
    }

    onChangeNoOfAppointments(e) {
        this.setState({
            noOfAppointments: e.target.value
        });
    }

    onChangeTotalSalary(e) {
        this.setState({
            totalSalary: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const salary = {
            _id: this.state._id,
            name: this.state.name,
            date: this.state.date,
            basicSalary: this.state.basicSalary,
            otHours: this.state.otHours,
            otPay: this.state.otPay,
            chanellingFee: this.state.chanellingFee,
            noOfAppointments: this.state.noOfAppointments,
            totalSalary: this.state.totalSalary
        }

        console.log(salary);

        axios.post('http://localhost:5000/salary/add', salary)
            .then(res => console.log(res.data));

        alert("Salary Entry Added!");
        window.location = '/viewSalary'
    }


    render() {
        return (

            <div className="calcSalaryPage">
                <button className="viewAllSalaryBtn"><Link className="linkToViewSalary" to="/viewSalary">View All Salary Details</Link></button>
                <button className="searchSalaryBtn"><Link className="linkToViewSalary" to="/searchSalary">Search Salary Details</Link></button>
                <form onSubmit={this.onSubmit} className="container" id="calcForm">
                    <h3 className="calcSalaryTitle">EMPLOYEE SALARY CALCULATION</h3>
                    <br />
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                        <br />
                    </div>
                    <div className="form-group">
                        <label>Employee ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state._id}
                            onChange={this.onChangeID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>

                    <br />
                    <div className="form-group">
                        <label>Basic Salary:
                            <select value={this.state.basicSalary}
                                onChange={this.onChangeBasicSalary}>
                                <option disabled>Doctor</option>
                                <option value="7000">7000</option>
                                <option disabled>Management Staff</option>
                                <option value="4500">4500</option>
                                <option disabled>Minor Staff</option>
                                <option value="3500">3500</option>
                            </select>
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>OT Hours: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.otHours}
                            onChange={this.onChangeOTHours}
                        />
                    </div>
                    <div className="form-group">
                        <label>OT Pay: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.otPay}
                            onChange={this.onChangeOTPay}
                        />
                    </div>
                    <div className="form-group">
                        <label>Chanelling Fee: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.chanellingFee}
                            onChange={this.onChangeChanellingFee}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Appointments: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.noOfAppointments}
                            onChange={this.onChangeNoOfAppointments}
                        />
                    </div>
                    <label>Total Salary: </label>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            value={parseInt((this.state.basicSalary) + (this.state.otHours * this.state.otPay) + (this.state.chanellingFee * this.state.noOfAppointments))}
                            onClick={this.getTotal}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Add to Database" className="btn btn-primary" onClick={this.getTotal} />
                        <br />

                    </div>
                </form>




                <br />
            </div>

        )

    }

}