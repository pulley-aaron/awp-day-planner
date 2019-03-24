import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Hello World from Aaron!
                    </p>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                </header>
                <main>
                    Main
                </main>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));