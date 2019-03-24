import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="schedule-page">
                    <header className="date-picker">
                        <div className="date-display">
                        Display <br />date
                        </div>
                        <div className="date-select">
                            Select date
                        </div>
                    </header>
                    <main className="schedule">
                        Schedule items
                    </main>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));