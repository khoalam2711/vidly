import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar';
import Movies from './components/movies';
import Customers from './components/Customers/Customers';
import Rentals from './components/Rentals/rentals';
import NotFound from './components/common/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
class App extends Component {
	state = {};
	componentDidMount = () => {
		const user = auth.getCurrentUser();
		this.setState({ user });
	};
	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<Switch>
					<Route path='/customers' component={Customers}></Route>
					<Route path='/login' component={LoginForm}></Route>
					<Route path='/logout' component={Logout}></Route>
					<ProtectedRoute path='/movies/:id' component={MovieForm} />
					<Route
						path='/movies'
						render={(props) => <Movies {...props} user={this.state.user} />}
					></Route>
					<Route path='/rentals' component={Rentals}></Route>
					<Route path='/not-found' component={NotFound}></Route>
					<Route path='/registerForm' component={RegisterForm}></Route>
					<Redirect from='/' to='/movies' exact></Redirect>
					<Redirect to='/not-found'></Redirect>
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
