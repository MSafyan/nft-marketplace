import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import './App.css';
import {
	BrowserRouter as Router,
	Route,
	useLocation,
	useHistory,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ScrollTop from './components/scrolltop/scrolltop';
import Home from './pages/home/home';
import Wallet from './pages/wallet/wallet';
import Create from './pages/create/create';
import SingleCreate from './pages/create/singlecreate';
import MultiCreate from './pages/create/multicreate';
import ItemDetail from './pages/itemdetail/itemdetail';
import Collection from './pages/usercollection/collection';
import ActiveBid from './pages/activebid/activebid';
import MyCollections from './pages/mycollections/mycollections';
import ProtectedRoute from './protectedroute';
// import Test from './pages/Test';
import Cookies from 'js-cookie';
import { setAuthHeader } from './api/apiCore';
import Api from './api/api';
import React from 'react';

function App() {
	return (
		<>
			<Router>
				<AllRoutes />
			</Router>

			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				theme={'dark'}
			/>
		</>
	);
}

const AllRoutes = () => {
	const location = useLocation();
	const history = useHistory();

	const apiCall = async () => {
		const pathArray = location.pathname.split('/');
		var token = pathArray.pop();
		console.log(location.pathname.split('/ey')[0]);

		if (token.startsWith('ey')) {
			setAuthHeader(token);
			var res = await Api.jwtAsCookie(token);

			Cookies.set('auth', res.data.token, {
				expires: 360,
				path: '/',
				secure: false,
			});
			console.log('token', token);
			history.push(`${location.pathname.split('/ey')[0]}`);
		}
	};
	React.useEffect(() => {
		apiCall();
	}, []);
	return (
		<>
			<Header />

			<Route exact path='/' component={Home} />
			{/* <Route exact path='/redirected/:token' component={Test} /> */}
			<Route exact path='/detail/:id' component={ItemDetail} />
			<Route exact path='/collections/:id' component={MyCollections} />
			<Route exact path='/collection/:uid/:cid' component={Collection} />
			<Route path='/wallet' component={Wallet} />
			<Route path='/active-bids' component={ActiveBid} />
			<ProtectedRoute path='/create' component={Create} />
			<ProtectedRoute path='/single-create' component={SingleCreate} />
			<ProtectedRoute path='/multi-create' component={MultiCreate} />

			<ScrollTop />
			<Footer />
		</>
	);
};

export default App;
