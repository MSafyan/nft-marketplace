import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Router>
        <Header />

        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={ItemDetail} />
        <Route exact path="/collections/:id" component={MyCollections} />
        <Route exact path="/collection/:uid/:cid" component={Collection} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/active-bids" component={ActiveBid} />
        <ProtectedRoute path="/create" component={Create} />
        <ProtectedRoute path="/single-create" component={SingleCreate} />
        <ProtectedRoute path="/multi-create" component={MultiCreate} />

        <ScrollTop />
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme={"dark"}
      />

    </>
  );
}

export default App;
