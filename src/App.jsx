import React, { Component } from 'react';
import './App.css';
import BillTable from './components/BillTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            billsData: [],
            searchedData: []
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
        const billsData = await res.json()
        this.setState({ billsData });
    };

    componentDidMount() {
        this.billsApiInitFetch();
    }

    // Search Text and real-time return potential bills
    searchText = (event) => {
        console.log(event.target.value)
        const typingText = event.target.value.toUpperCase();
        this.setState({ text: typingText })
    };

    // Press enter key to start search
    pressEnter = (event) => {
        let code = event.keyCode || event.which;
        let isEnter = code === 13 ? true : null;
        if (isEnter) {};
    };

    render() {
        const title = "App for Oregon State bills";
        let billsData = this.state.billsData;
        let filteredData = this.state.billsData.filter((bill) => {
            const billText = bill.measureNumber.slice(0, 7).toUpperCase();
            return billText.includes(this.state.text) ? bill : null;
        });
        console.log('filteredData :', filteredData);
        if (filteredData.length === 0 && this.state.text !== "") {
            filteredData = [];
        } else if (filteredData.length === 0) {
            filteredData = billsData;
        }

        return (
            <div className="wrapper">
                <div className="App">
                    <h1>
                        {title}
                    </h1>
                </div>
                <input className="inputStyle" placeholder=" Search... " type="text" value={this.state.text} onChange={this.searchText} onKeyPress={this.pressEnter}></input>
                <BillTable bills={filteredData} />
            </div>

        )
    }
};

export default App;