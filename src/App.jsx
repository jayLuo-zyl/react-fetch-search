import React, { Component } from 'react';
import './App.css';
import InfoTable from './components/InfoTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Search...",
            rawData: [],
        }
    };

    // fetch data from provided url endpoint
    fetchData = () => {
        // console.log("It's going to fetch Data from 'https://pure-wave-91339.herokuapp.com/sample-data' ");
        const url = 'https://pure-wave-91339.herokuapp.com/sample-data';
        fetch(url,
            {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            }
        ).then(res => {
            // console.log(res);  // first level of fetch promise response
            // console.log(`\nResponse: ${res.status}, ${res.statusText}, ${res.url}`);
            return res.json();
        }).then((data) => {  // second level of fetch promise response
            // console.log('fetch res.JSON() in array:', data);
            let newArr = []
            data.forEach((el) => {
                let newObj = Object.keys(el).reduce((obj, key) => {
                    let newKey = key.split(' ').join('')
                    obj[newKey] = el[key];
                    return obj;
                }, {});
                newArr.push(newObj);
            });
            this.setState({ rawData: newArr });
        });
    };
    // Search Text 
    searchText = (event)=>{
        this.setState({ text: event.target.value })
        console.log(this.state.text)
    }

    render() {
        const title = "Fetch-Search App";
        const inputStyle = {
            margin: '10px',
            padding: '10px'
        };
        return (
            <div className="wrapper">
                <div className="App">
                    <h1>
                        {title}
                    </h1>
                </div>
                <button style={inputStyle} onClick={this.fetchData}>Get Data</button>
                <input style={inputStyle} type="text" value={this.state.text} onChange={this.searchText} ></input>
                <InfoTable infos={this.state.rawData} />
            </div>

        )
    }



};

export default App;