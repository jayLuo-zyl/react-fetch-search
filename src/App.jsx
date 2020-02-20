import React, { Component } from 'react';
import './App.css';
import BillTable from './components/BillTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            billsData: [],
            searchedBill: [],
            searchedBillRealTime: []
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
        console.log('res Data', res)
        const billsData = await res.json()
        this.setState({ billsData });
    };

    componentDidMount() {
        this.billsApiInitFetch();
    }

    // Search Text and real-time return potential bills
    searchText = (event) => {
        this.setState({ text: event.target.value })
        console.log(this.state.text)
        const typingText = event.target.value.toUpperCase();
        const realTimeFilteredBills = this.state.billsData.filter((bill) => {
            const targetText = bill.measureNumber.slice(0, 7).toUpperCase();
            return bill ? targetText.includes(typingText) : null;
        });
        if (realTimeFilteredBills.length < 25) {
            console.log(realTimeFilteredBills);
            this.setState({ searchedBillRealTime: realTimeFilteredBills, searchedBill: []  });
        } else {
            this.setState({ searchedBillRealTime: this.state.billsData });
        }
    };

    // Search function 
    filterSearchText = () => {
        this.state.billsData.filter(bill => {
            const targetText = bill.measureNumber.slice(0, 7);
            if (targetText.toUpperCase() === this.state.text.toUpperCase()) {
                console.log(bill);
                this.setState({ searchedBill: [bill] });
            };
            return null;
        })
    };

    // Press enter key to start search
    pressEnter = (event) => {
        let code = event.keyCode || event.which;
        let isEnter = code === 13 ? true : null;
        if (isEnter) { this.filterSearchText() };
    };

    render() {
        const title = "App for Oregon State Legislature bills";
        return (
            <div className="wrapper">
                <div className="App">
                    <h1>
                        {title}
                    </h1>
                </div>
                <input className="inputStyle" placeholder=" Search... " type="text" value={this.state.text} onChange={this.searchText} onKeyPress={this.pressEnter}></input>
                <BillTable allBills={this.state.billsData} searched={this.state.searchedBill} realTimeSearched={this.state.searchedBillRealTime} />
            </div>

        )
    }
};

export default App;