import React, { Component } from 'react';
import './App.css';
import BillTable from './components/BillTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            bills: [],
            showVetoIssues: false
        }
    };

    // fetch data from provided url endpoint
    billsApiInitFetch = async () => {
        const url = 'https://pure-wave-91339.herokuapp.com/sample-data';
        const res = await fetch(url,
            {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            }
        );
        // console.log('res Data', res)
        const bills = await res.json()
        this.setState({ bills });
    };

    componentDidMount() {
        this.billsApiInitFetch();
    }

    // Search Text and real-time return potential bills
    searchText = (event) => {
        console.log(event.target.value)
        const typingText = event.target.value.toUpperCase();
        this.setState({ text: typingText, vetosOrSignedData: [] })
    };

    // Flag for veto button and changing the state
    displayVetos = () => {
        if (this.state.showVetoIssues) {
            this.setState({ showVetoIssues: false });
        } else {
            this.setState({ showVetoIssues: true });
        }
    };

    render() {
        // Helper function 
        const filterBills = (bills) => {
            return bills.filter((bill) => {
                const billText = bill.measureNumber.slice(0, 7).toUpperCase();
                return billText.includes(this.state.text) ? bill : null;
            });
        };

        // Filters all bills from search bar input
        let bills = this.state.bills;
        let filteredData = filterBills(bills);
        // console.log('filteredData :', filteredData);

        // Filters the vetos by conditions, assigns data to variable
        if (this.state.showVetoIssues === true) {
            let vetos = this.state.bills.filter((bill) => {
                return Number(bill.voterSupport) >= 50 && bill.signedOrVetoed === "Vetoed" ? bill : null;
            });
            let sortedVetos = vetos.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            });
            filteredData = filterBills(sortedVetos);
        };

        // Display all bills or none bills conditionaly
        if (filteredData.length === 0 && this.state.text !== "") {
            filteredData = [];
        } else if (filteredData.length === 0) {
            filteredData = bills;
        };
        
        // Flag for Vetos issues
        let lableForVetoButton = this.state.showVetoIssues ? "All" : "Veto";

        return (
            <div className="wrapper">
                <div className="appTitle">
                    <p>Oregon Bills</p>
                </div>
                <div className="searchBar" >
                    <input className="inputStyle" placeholder=" Search... " type="text" value={this.state.text} onChange={this.searchText}></input>
                </div>
                <div className="left-box">
                    <button type="button" className="vetos" onClick={this.displayVetos}>Show {lableForVetoButton} Issue</button>
                </div>
                <div className="right-box">
                    <BillTable bills={filteredData} />
                </div>
            </div>
        )
    }
};

export default App;