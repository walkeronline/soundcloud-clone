import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import SongPage from './components/SongPage';
import TestAWS from './components/TestAWS';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<SplashPage />
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/songs/:songId">
						<SongPage />
					</Route>
					<Route path="/test">
						<TestAWS />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
