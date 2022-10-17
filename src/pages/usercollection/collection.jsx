import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getProfileMe_ } from '../../data/atom';
import Cookies from 'js-cookie';
import Api from '../../api/api';
import Item from '../../components/items/item/item';
import Loader from '../../components/loader/loader';

function Collection() {
	const { uid, cid } = useParams();
	const [loader, setLoader] = useState(true);
	const [selected, setSelected] = useState(0);
	const [collection, setCollection] = useState({});
	const [NFTs, setNFTs] = useState([]);
	const [profileMe, setProfileMe] = useRecoilState(getProfileMe_);

	const setNFTsHandle = (key) => {
		let data = [];
		setSelected(key);
		switch (key) {
			case 0:
				data = collection.nfts.filter((item) => item.creator._id === uid);
				setNFTs(data);
				break;
			case 1:
				let arr = [];
				collection.nfts.map((item) => {
					if (item.owner.includes(uid)) {
						arr.push(item);
					}
				});
				setNFTs(arr);
				break;

			default:
				break;
		}
	};

	const getCollection = useCallback(async (isSubscribe) => {
		const res = await Api.getSingleCollectionNFT(uid, cid);
		if (isSubscribe) {
			if (res.status === 200) {
				setCollection(res.data.data);
				setNFTs(res.data.data.nfts.filter((item) => item.creator._id === uid));
				setLoader(false);
			}
		}
	}, []);

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
		let isSubscribe = true;
		getCollection(isSubscribe);
		return () => (isSubscribe = false);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<div className='no-bottom no-top' id='content'>
					<div id='top'></div>

					{/* <!-- section begin --> */}
					<section
						id='profile_banner'
						aria-label='section'
						className='text-light'
						style={{
							backgroundImage: `url(${collection.collection.owner.coverUrl})`,
							backgroundPosition: 'top',
						}}
					></section>
					{/* <!-- section close --> */}

					<section aria-label='section' className='d_coll no-top'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<div className='d_profile'>
										<div className='profile_avatar'>
											<div className='d_profile_img'>
												<img
													crossOrigin='anonymous'
													src={collection.collection.owner.avatar}
													alt=''
												/>
												{/* <i className="fa fa-check"></i> */}
											</div>
											<div className='profile_name'>
												<h4>{collection.collection.collectionName}</h4>
											</div>
										</div>
									</div>
								</div>

								<div className='col-md-12'>
									<div className='de_tab tab_simple'>
										<ul className='de_nav'>
											{['Created', 'Owned'].map((item, index) => (
												<li
													key={index}
													onClick={() => setNFTsHandle(index)}
													class={selected === index && 'active'}
												>
													<span>{item}</span>
												</li>
											))}
										</ul>

										<div className='de_tab_content'>
											{selected === 0 ? (
												<div>
													<div className='row'>
														{NFTs && NFTs.length > 0
															? NFTs.map((item) => (
																	<Item
																		id={item._id}
																		userId={item.creator._id}
																		profile={item.creator.avatar}
																		fullName={item.creator.fullName}
																		artwork={item.imageUrl}
																		title={item.title}
																		minPrice={item.minPrice}
																		totalCopies={item.totalCopies}
																		usedCopies={item.usedCopies}
																		likes={item.likes.length}
																		isLike={item.likes.includes(profileMe._id)}
																		allNfts={NFTs}
																	/>
															  ))
															: 'No data'}
													</div>
												</div>
											) : (
												<div>
													<div className='row'>
														{NFTs && NFTs.length > 0
															? NFTs.map((item) => (
																	<Item
																		id={item._id}
																		userId={item.creator._id}
																		profile={item.creator.avatar}
																		fullName={item.creator.fullName}
																		artwork={item.imageUrl}
																		title={item.title}
																		minPrice={item.minPrice}
																		totalCopies={item.totalCopies}
																		usedCopies={item.usedCopies}
																		likes={item.likes.length}
																		isLike={item.likes.includes(profileMe._id)}
																		allNfts={NFTs}
																	/>
															  ))
															: 'No data'}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}

export default Collection;
