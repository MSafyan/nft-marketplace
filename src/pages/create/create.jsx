import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getProfileMe_ } from '../../data/atom';
import Cookies from 'js-cookie';
import Subheader from '../../components/subheader/subheader';
import Api from '../../api/api';

function Create() {
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
			<Subheader title={'Create Collectible'} />

			<section aria-label='section'>
				<div className='container'>
					<div className='row wow fadeIn'>
						<div className='col-md-6 offset-md-3'>
							<p>
								Choose "Single" if you want your collectible to be one of a kind
								or "Multiple" if you want to sell one collectible times
							</p>
							<Link to='/single-create' className='opt-create'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/misc/coll-single.png'
									alt=''
								/>
								<h3>Single</h3>
							</Link>
							<Link to='/multi-create' className='opt-create'>
								<img
									crossOrigin='anonymous'
									src='https://gigaland.io/images/misc/coll-multiple.png'
									alt=''
								/>
								<h3>Multiple</h3>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Create;
