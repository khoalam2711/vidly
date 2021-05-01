import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import Counters from './components/counters';
class App extends Component {
    state = {
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 3 },
            { id: 3, value: 0 },
            { id: 4, value: 4 },
        ],
    };
    handleDelete = (counterId) => {
        //console.log("Called event", counterId);
        let counters = this.state.counters.filter((c) => c.id != counterId);
        this.setState({ counters });
    };

    handleReset = () => {
        // let counters = this.state.counters.forEach((c) => (c.value = 0));
        let counters = this.state.counters.map((c) => {
            c.value = 0;
            return c;
        });
        this.setState({ counters });
    };
    handleIncrement = (counter) => {
        // let counter = this.state.counter + 1;
        // this.setState({counter});
        let counters = [...this.state.counters];
        let index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters });
    };

    handleDecrement = (counter) => {
        let counters = [...this.state.counters];
        let index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value--;
        this.setState({ counters });
    };
    render() {
        return (
            // <main className="container">
            //     <h1>Hello World</h1>
            // </main>
            <React.Fragment>
                <NavBar totalCounters={this.state.counters.length}></NavBar>
                <Counters
                    counters={this.state.counters}
                    onDelete={this.handleDelete}
                    onReset={this.handleReset}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                ></Counters>
            </React.Fragment>
        );
    }
}

// export default App;
// function App() {
//     state = {
//         counters: [
//             { id: 1, value: 0 },
//             { id: 2, value: 3 },
//             { id: 3, value: 0 },
//             { id: 4, value: 4 },
//         ],
//     };
//     return (
//         // <main className="container">
//         //     <h1>Hello World</h1>
//         // </main>
//         <React.Fragment>
//             <nav className='navbar navbar-expand-lg navbar-light bg-light'>
//                 <a className='navbar-brand' href='#'>
//                     There are {this.state.counters.length()} counters
//                 </a>
//             </nav>
//         </React.Fragment>
//     );
// }

export default App;
