import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';

function Carousel1({ allNfts }) {
	return (
		<section id='section-hero' className='no-bottom' aria-label='section'>
			<div className='d-carousel' style={{ padding: '0 25px' }}>
				<Swiper
					modules={[Autoplay, Navigation]}
					slidesPerView={1}
					spaceBetween={20}
					navigation={true}
					breakpoints={{
						475: {
							slidesPerView: 1,
						},
						600: {
							slidesPerView: allNfts.length === 1 ? 1 : 2,
						},
						910: {
							slidesPerView:
								allNfts.length === 1 ? 1 : allNfts.length === 2 ? 2 : 3,
						},
						1260: {
							slidesPerView:
								allNfts.length === 1
									? 1
									: allNfts.length === 2
									? 2
									: allNfts.length === 3
									? 3
									: 4,
						},
					}}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
				>
					{allNfts.map((item) => (
						<SwiperSlide>
							<Slide
								id={item._id}
								title={item.title}
								fullName={item.creator.fullName}
								imageUrl={item.imageUrl}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}

function Slide({ id, fullName, title, imageUrl }) {
	return (
		<div className='nft_pic' key={id}>
			<Link to={`/detail/${id}`}>
				<span className='nft_pic_info'>
					<span className='nft_pic_title'>{title}</span>
					<span className='nft_pic_by'>{fullName}</span>
				</span>
			</Link>
			<div className='nft_pic_wrap' style={{ width: '100%', height: '302px' }}>
				<img
					crossOrigin='anonymous'
					src={imageUrl}
					className='lazy img-fluid h-100 w-100'
					style={{ objectFit: 'cover' }}
					alt=''
				/>
			</div>
		</div>
	);
}
export default Carousel1;
