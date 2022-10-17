function BidList({ id, avatar, fullName, message, at, bid }) {
	return (
		<div className='p_list' key={id}>
			<div className='p_list_pp'>
				<a>
					<img
						crossOrigin='anonymous'
						style={{ height: '50px', objectFit: 'cover' }}
						className='lazy'
						src={avatar}
					/>
					{/* <i className="fa fa-check"></i> */}
				</a>
			</div>
			<div className='p_list_info'>
				{message} <b>{bid} ETH</b>
				<span>
					by <b>{fullName}</b> at {at.slice(0, 10)}
				</span>
			</div>
		</div>
	);
}

export default BidList;
