import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getProfileMe_ } from '../../data/atom';
import Cookies from 'js-cookie';
import BidModel from '../../components/collection/components/bid';
import BidList from '../../components/collection/components/bidlist';
import BuyModel from '../../components/collection/components/buy';
import ItemAuthor from '../../components/collection/components/itemauthor';
import Loader from '../../components/loader/loader';
import Api from '../../api/api';
import Countdown from '../../components/countdown/countdown';

function ItemDetail() {
	const { id } = useParams();
	const links = ['Details', /*"Bids",*/ 'History'];
	const [selected, setSelected] = useState(0);
	const [showBuyModel, setShowBuyModel] = useState(false);
	const [showBidModel, setShowBidModel] = useState(false);
	const [loader, setLoader] = useState(true);
	const [singleNft, setSingleNFT] = useState([]);
	const [profileMe, setProfileMe] = useRecoilState(getProfileMe_);

	const getSingleNFT = useCallback(async (isSubscribe) => {
		const res = await Api.getSingleNFT(id);
		if (isSubscribe) {
			if (res.status === 200) {
				setSingleNFT(res.data.data);
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
		window.scrollTo(0, 0);
		let isSubscribe = true;
		getSingleNFT(isSubscribe);
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
				<>
					<div className='no-bottom no-top' id='content'>
						<div id='top'></div>
						<section
							id='nft-item-details'
							style={{ marginTop: 0 }}
							aria-label='section'
							className='sm-mt-0'
						>
							<div className='container'>
								<div className='row g-5'>
									<div className='col-md-6 text-center'>
										<div className='nft-image-wrapper'>
											<img
												crossOrigin='anonymous'
												style={{ position: 'relative' }}
												src={singleNft?.imageUrl}
												className='image-autosize img-fluid img-rounded mb-sm-30'
												alt=''
											/>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='item_info'>
											{singleNft.method === 'auction' && (
												<div>
													Auctions ends in{' '}
													<Countdown
														bid_expire_date={singleNft.bid_expire_date}
													/>
												</div>
											)}
											<h2>{singleNft?.title}</h2>
											<div className='item_info_counts'>
												{/* <div className="item_info_type"><i className="fa fa-image"></i>Art</div> */}
												{/* <div className="item_info_views"><i className="fa fa-eye"></i>250</div> */}
												<div className='item_info_like'>
													<i className='fa fa-heart'></i>
													{singleNft?.likes?.length}
												</div>
											</div>
											<p>{singleNft?.description}</p>

											<div className='d-flex flex-row'>
												<div className='mr40'>
													<ItemAuthor
														name={singleNft?.creator?.fullName}
														image={singleNft?.creator?.avatar}
														title={'Creator'}
													/>
												</div>
												<div>
													<ItemAuthor
														name={singleNft?.collectionID?.collectionName}
														image={singleNft?.imageUrl}
														title={'Collection'}
													/>
												</div>
											</div>
											<div className='spacer-40'></div>
											<div className='de_tab tab_simple'>
												<ul className='de_nav'>
													{links.map((link, index) => (
														<li
															key={index}
															onClick={() => setSelected(index)}
															className={selected === index ? 'active' : ''}
														>
															<span>{link}</span>
														</li>
													))}
												</ul>

												<div className='de_tab_content'>
													{selected === 0 && (
														<div>
															<h6>Properties</h6>
															<div className='row gx-2'>
																<div className='col-lg-4 col-md-6 col-sm-6'>
																	<a className='nft_attr'>
																		<h5>Accessories</h5>
																		<h4>Heart Necklace</h4>
																		<span>33% have this trait</span>
																	</a>
																</div>
																<div className='col-lg-4 col-md-6 col-sm-6'>
																	<a className='nft_attr'>
																		<h5>Hat</h5>
																		<h4>Cute Panda</h4>
																		<span>62% have this trait</span>
																	</a>
																</div>
																<div className='col-lg-4 col-md-6 col-sm-6'>
																	<a className='nft_attr'>
																		<h5>Clothes</h5>
																		<h4>Casual Purple</h4>
																		<span>78% have this trait</span>
																	</a>
																</div>
															</div>
															<div className='spacer-20'></div>
														</div>
													)}
													{selected === 1 && (
														<div>
															{singleNft?.history.length > 0 &&
																singleNft?.history
																	.map((item) => (
																		<BidList
																			id={item._id}
																			avatar={item.user.avatar}
																			fullName={item.user.fullName}
																			message={item.message}
																			at={item.createdAt}
																			bid={item.bid}
																		/>
																	))
																	.reverse()}
														</div>
													)}
													{/* {selected === 2 && <div>
                                                <BidList />
                                                <BidList />
                                                <BidList />
                                                <BidList />
                                                <BidList />
                                                <BidList />
                                            </div>} */}
												</div>

												<div className='spacer-10'></div>
												<h6>Price</h6>
												<div className='nft-item-price'>
													<img
														src='https://gigaland.io/images/misc/ethereum.svg'
														alt=''
													/>
													<span>{singleNft?.minPrice}</span>
												</div>

												{/* <!-- Button trigger modal --> */}
												{Cookies.get('auth') !== undefined &&
												singleNft.availableCopies > 0 &&
												singleNft.creator._id !== profileMe._id ? (
													singleNft?.method === 'fixed' ? (
														<Link
															to='#'
															className='btn-main btn-lg'
															onClick={() => setShowBuyModel(true)}
														>
															Buy Now
														</Link>
													) : (
														<Link
															to='#'
															className='btn-main btn-lg'
															onClick={() => setShowBidModel(true)}
														>
															Place a Bid
														</Link>
													)
												) : (
													''
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					{showBuyModel && (
						<BuyModel singleNft={singleNft} setShowBuyModel={setShowBuyModel} />
					)}
					{showBidModel && (
						<BidModel singleNft={singleNft} setShowBidModel={setShowBidModel} />
					)}
				</>
			)}
		</>
	);
}

export default ItemDetail;
