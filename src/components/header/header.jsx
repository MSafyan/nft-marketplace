import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/api';
import logo from '../../assets/logo.png';
import Search from './components/search';

function Header() {
	const [allNfts, setAllNFTs] = useState([]);

	const getAllNFT = useCallback(async (isSubscribe) => {
		const res = await Api.getAllNFT();
		if (isSubscribe) {
			if (res.status === 200) {
				setAllNFTs(res.data.data);
			}
		}
	}, []);

	useEffect(() => {
		let isSubscribe = true;
		getAllNFT(isSubscribe);
		return () => (isSubscribe = false);
	}, []);

	return (
		<header className='transparent header-light smaller scroll-light'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='de-flex sm-pt10'>
							<div className='de-flex-col'>
								<div className='de-flex-col'>
									{/* <!-- logo begin --> */}
									<div id='logo'>
										<Link to='/'>
											<img
												crossOrigin='anonymous'
												src={logo}
												style={{ width: '35px' }}
												lazyloading='true'
												alt='logo'
												decoding='async'
												className='img-fluid lazyload logo-2'
											/>
										</Link>
									</div>
									{/* <!-- logo close --> */}
								</div>
								<Search allNfts={allNfts} />
							</div>
							<div className='de-flex-col header-col-mid'>
								{/* <!-- mainmenu begin --> */}
								<ul id='mainmenu'>
									<li>
										<Link to='/'>
											Explore<span></span>
										</Link>
									</li>
									<li>
										<Link to='/create'>
											Create<span></span>
										</Link>
									</li>
								</ul>
								<div className='menu_side_area'>
									<Link to='/wallet' className='btn-main btn-wallet'>
										<i className='icon_wallet_alt'></i>
										<span>Connect Wallet</span>
									</Link>
									<span id='menu-btn'></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
