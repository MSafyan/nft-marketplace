import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nftLink } from '../../../common/link';
import Cookies from 'js-cookie';
import Api from '../../../api/api';
import Countdown from '../../countdown/countdown';

function Item({
	allNFT,
	id,
	userId,
	fullName,
	profile,
	artwork,
	title,
	minPrice,
	totalCopies,
	usedCopies,
	likes,
	isLike,
	method,
	bid_start_date,
	bid_expire_date,
}) {
	const [isSaved, setIsSaved] = useState(false);
	const [NFTlikes, setNFTLikes] = useState(0);

	const NFTsaveHandle = async () => {
		setIsSaved((prev) => !prev);
		if (isSaved) {
			setNFTLikes((prev) => prev - 1);
		} else {
			setNFTLikes((prev) => prev + 1);
		}
		await Api.NFTSave(id);
	};

	useEffect(() => {
		setIsSaved(isLike);
		setNFTLikes(likes);
	}, [allNFT, isLike]);

	return (
		<div className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12' key={id}>
			<div className='nft__item'>
				{method === 'auction' && (
					<Countdown bid_expire_date={bid_expire_date} />
				)}
				<div className='author_list_pp'>
					<a
						href={`${nftLink}/create/${userId}`}
						target='_blank'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title={`Creator: ${fullName}`}
					>
						<img
							crossOrigin='anonymous'
							className='lazy'
							src={profile}
							alt=''
						/>
						{/* <i className="fa fa-check"></i> */}
					</a>
				</div>
				<div className='nft__item_wrap'>
					<Link to={`/detail/${id}`}>
						{/*<div className="d-placeholder"></div>*/}
						<img
							crossOrigin='anonymous'
							src={artwork}
							className='lazy '
							alt=''
						/>
					</Link>
				</div>
				<div className='nft__item_info'>
					<Link to={`/detail/${id}`}>
						<h4>{title}</h4>
					</Link>
					<div className='nft__item_price'>
						{minPrice} ETH
						<span>
							{usedCopies}/{totalCopies}
						</span>
					</div>
					<div className='nft__item_action'>
						<Link to={`/detail/${id}`}>Place a bid</Link>
					</div>
					{Cookies.get('auth') !== undefined ? (
						<div className='nft__item_like'>
							<i
								onClick={NFTsaveHandle}
								className='fa fa-heart'
								style={{ color: isSaved && '#ff6559', fontSize: '12px' }}
							></i>
							<span>{NFTlikes}</span>
						</div>
					) : (
						<div className='nft__item_like'>
							<i
								className='fa fa-heart'
								style={{ color: '#dddddd', fontSize: '12px' }}
							></i>
							<span>{NFTlikes}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Item;
