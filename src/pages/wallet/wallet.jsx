import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getProfileMe_ } from '../../data/atom';
import Cookies from 'js-cookie';
import Subheader from '../../components/subheader/subheader';
import Api from '../../api/api';

function Wallet() {
	const setProfileMe = useSetRecoilState(getProfileMe_);

	const getProfileMe = useCallback(async (isSubscribe) => {
		const res = await Api.getProfileMe();
		if (isSubscribe) {
			if (res.status === 200) {
				setProfileMe(res.data.data);
			}
		}
	}, []);

	useEffect(() => {
		if (Cookies.get('auth') !== undefined) {
			let isSubscribe = true;
			getProfileMe(isSubscribe);
			return () => (isSubscribe = false);
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='no-bottom no-top' id='content'>
			<div id='top'></div>
			<Subheader title={'Wallet'} />

			<section aria-label='section'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<span className='box-url-label'>Most Popular</span>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/1.png'
									alt=''
									className='mb20'
								/>
								<h4>Metamask</h4>
								<p>
									Start exploring blockchain applications in seconds. Trusted by
									over 1 million users worldwide.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/2.png'
									alt=''
									className='mb20'
								/>
								<h4>Bitski</h4>
								<p>
									Bitski connects communities, creators and brands through
									unique, ownable digital content.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/3.png'
									alt=''
									className='mb20'
								/>
								<h4>Fortmatic</h4>
								<p>
									Let users access your Ethereum app from anywhere. No more
									browser extensions.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/4.png'
									alt=''
									className='mb20'
								/>
								<h4>WalletConnect</h4>
								<p>
									Open source protocol for connecting decentralised applications
									to mobile wallets.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/5.png'
									alt=''
									className='mb20'
								/>
								<h4>Coinbase Wallet</h4>
								<p>
									The easiest and most secure crypto wallet. ... No Coinbase
									account required.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/6.png'
									alt=''
									className='mb20'
								/>
								<h4>Arkane</h4>
								<p>
									Make it easy to create blockchain applications with secure
									wallets solutions.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/7.png'
									alt=''
									className='mb20'
								/>
								<h4>Authereum</h4>
								<p>
									Your wallet where you want it. Log into your favorite dapps
									with Authereum.
								</p>
							</Link>
						</div>

						<div className='col-lg-3 mb30'>
							<Link className='box-url' href='#'>
								<span className='box-url-label'>Most Simple</span>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/wallet/8.png'
									alt=''
									className='mb20'
								/>
								<h4>Torus</h4>
								<p>
									Open source protocol for connecting decentralised applications
									to mobile wallets.
								</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Wallet;
