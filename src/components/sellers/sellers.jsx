import React from 'react';
import { nftLink } from '../../common/link';

function Sellers({ topCollectors }) {
	return (
		<div className='row'>
			<div className='col-lg-12'>
				<h2 className='style-2'>Trending Collectors</h2>
			</div>
			<div className='col-md-12  fadeIn'>
				<ol className='row'>
					{topCollectors.map((item, index) => (
						<Item
							index={index}
							id={item.id}
							userId={item.userId}
							fullName={item.fullName}
							avatar={item.avatar}
							totalEarnings={item.totalEarnings}
						/>
					))}
				</ol>
			</div>
		</div>
	);
}

function Item({ index, id, fullName, avatar, totalEarnings, userId }) {
	return (
		<li
			key={id}
			className='col-lg-3 col-6 col-md-4'
			style={{ position: 'relative', marginBottom: '30px' }}
		>
			<div className='author_list_pp'>
				<a href={`${nftLink}/create/${userId}`}>
					<img crossOrigin='anonymous' className='lazy' src={avatar} alt='' />
					{/* <i className="fa fa-check"></i> */}
				</a>
			</div>
			<div className='author_list_info'>
				<a href='#'>{fullName}</a>
				<span>{totalEarnings} eth</span>
			</div>
		</li>
	);
}

export default Sellers;
