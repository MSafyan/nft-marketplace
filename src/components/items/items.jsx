import React from 'react'
import { useRecoilValue } from 'recoil';
import { getProfileMe_ } from '../../data/atom';
import Item from './item/item'

function Items({ title, allNfts }) {
    const profileMe = useRecoilValue(getProfileMe_);
    return (
        < div className="row  fadeIn" >
            <div className="col-lg-12">
                <h2 className="style-2">{title}</h2>
            </div>
            {
                allNfts.map((item) => (
                    <Item
                        id={item._id}
                        userId={item.creator._id}
                        profile={item.creator.avatar}
                        fullName={item.creator.fullName}
                        artwork={item.imageUrl}
                        method={item.method}
                        bid_start_date={item.bid_start_date}
                        bid_expire_date={item.bid_expire_date}
                        title={item.title}
                        minPrice={item.minPrice}
                        totalCopies={item.totalCopies}
                        usedCopies={item.usedCopies}
                        likes={item.likes.length}
                        isLike={item.likes.includes(profileMe._id)}
                        allNfts={allNfts}
                    />
                ))
            }
        </div >
    )
}

export default Items