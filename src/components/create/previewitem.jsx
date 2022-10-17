import React from 'react';

function PreviewItem({ imagePreview, createData, multi }) {
	return (
		<div className='col-lg-3 col-sm-6 col-xs-12'>
			<h5>Preview item</h5>
			<div className='nft__item'>
				<div className='author_list_pp'>
					<a href='#'>
						<img
							className='lazy'
							src='https://gigaland.io/images/author/author-1.jpg'
							alt=''
						/>
						<i className='fa fa-check'></i>
					</a>
				</div>
				<div className='nft__item_wrap'>
					<a href='#'>
						<img
							src={imagePreview}
							id='get_file_2'
							className='lazy nft__item_preview'
							alt=''
						/>
					</a>
				</div>
				<div className='nft__item_info'>
					<a href='#'>
						<h4>{createData.title}</h4>
					</a>
					<div className='nft__item_price'>
						{createData.minPrice} ETH
						{multi ? <span>0/{createData.copies}</span> : <span>0/1</span>}
					</div>
					{/* <div className="nft__item_action">
                        <a href="#">Place a bid</a>
                    </div> */}
				</div>
			</div>
		</div>
	);
}

export default PreviewItem;
