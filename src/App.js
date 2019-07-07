import React from "react";
import "./App.css";
import Characters from "./components/Characters";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Film from './components/Film';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={Characters}/>
					<Route exact path='/film/:id' component={Film}/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
