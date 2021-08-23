import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import SongPage from './components/SongPage';
import TestAWS from './components/TestAWS';
import UserProfile from './components/UserProfilePage';
import BottomWaves from './components/BottomWaves';
import Feed from './components/FeedPage';
import About from './components/AboutPage';
import SignupFormModal from './components/SignupFormModal';
import LoginFormModal from './components/LoginFormModal';
import SearchResults from './components/SearchResults';
import AlbumPage from './components/AlbumPage';
// import UploadForm from './components/UploadFormPage';

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
						<BottomWaves />
					</Route>
					<Route path="/login">
						<LoginFormModal />
					</Route>
					<Route path="/signup">
						<SignupFormModal />
					</Route>
					<Route path="/feed">
						<Feed />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/albums/:albumId">
						<AlbumPage />
					</Route>
					<Route path="/search/:searchTerm">
						<SearchResults />
					</Route>
					{/* <Route path="/upload">
						<UploadForm />
					</Route> */}
					<Route path="/songs/:songId">
						<SongPage />
					</Route>
					<Route path="/users/:username">
						<UserProfile />
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
