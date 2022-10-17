import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';

function Collection({ title, allCollectionsNFT }) {
	return (
		<div className='row'>
			<div className='col-lg-12'>
				<h2 className='style-2'>{title}</h2>
			</div>
			<Swiper
				modules={[Autoplay, Navigation]}
				slidesPerView={1}
				spaceBetween={20}
				navigation={true}
				breakpoints={{
					768: {
						slidesPerView: 2,
					},
					990: {
						slidesPerView: 5,
					},
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
			>
				{allCollectionsNFT.map((item) => (
					<SwiperSlide>
						<Item
							id={item._id}
							collectionName={item.collectionName}
							ownerId={item.owner._id}
							avatar={item.owner.avatar}
							cover={item.owner.coverUrl}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

function Item({ id, avatar, collectionName, ownerId, cover }) {
	return (
		<div className='nft_coll' key={id}>
			<div className='nft_wrap' style={{ height: '100px' }}>
				<Link to={`/collection/${ownerId}/${id}`}>
					<img
						crossOrigin='anonymous'
						src={cover}
						style={{ width: '100%', height: '100px', objectFit: 'cover' }}
						className='lazy img-fluid'
						alt=''
					/>
				</Link>
			</div>
			<div className='nft_coll_pp'>
				<Link to={`/collection/${ownerId}/${id}`}>
					<img
						crossOrigin='anonymous'
						className='lazy pp-coll'
						src={avatar}
						alt=''
					/>
				</Link>
				{/* <i className="fa fa-check"></i> */}
			</div>
			<div className='nft_coll_info'>
				<Link to={`/collection/${ownerId}/${id}`}>
					<h4>{collectionName}</h4>
				</Link>
				{/* <span>ERC-192</span> */}
			</div>
		</div>
	);
}

export default Collection;
