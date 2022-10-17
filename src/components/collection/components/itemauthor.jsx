function ItemAuthor({ title, name, image }) {
	return (
		<>
			<h6>{title}</h6>
			<div className='item_author'>
				<div className='author_list_pp'>
					<a>
						<img
							crossOrigin='anonymous'
							className='lazy'
							src={image}
							alt=''
							style={{ height: '50px' }}
						/>
						{/* <i className="fa fa-check"></i> */}
					</a>
				</div>
				<div className='author_list_info'>
					<a>{name}</a>
				</div>
			</div>
		</>
	);
}

export default ItemAuthor;
