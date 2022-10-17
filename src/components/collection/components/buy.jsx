import { useState } from "react"
import Api from "../../../api/api";
import { Notifications } from '../../../helper/notifications';

function BuyModel({ singleNft, setShowBuyModel }) {
    const [quantity, setQuantity] = useState(0)
    const buyNFTHandle = async (e) => {
        e.preventDefault();
        if (singleNft.type === "multi") {
            if (quantity > singleNft.availableCopies) {
                Notifications("warning", `Maximum Limit is ${singleNft.availableCopies}`)
            } else if (quantity <= 0) {
                Notifications("warning", `Minimum Limit is 1`)
            } else {
                const res = await Api.buyFixedNFT(singleNft._id, { quantity })
                if (res.status === 200) {
                    setQuantity(0)
                    setShowBuyModel(false)
                }
            }
        } else {
            const res = await Api.buyFixedNFT(singleNft._id, { quantity })
            if (res.status === 200) {
                setQuantity(0)
                setShowBuyModel(false)
            }
        }
    }

    return (
        <div className="modal" style={{ background: '#00000036', display: "block", paddingRight: '17px' }}>
            <div className="modal-dialog modal-dialog-centered de-modal">
                <div className="modal-content">
                    <button type="button" className="btn-close" onClick={() => setShowBuyModel(false)}></button>
                    <div className="modal-body">
                        <form onSubmit={buyNFTHandle} className="p-3 form-border">
                            <h3>Checkout</h3>
                            You are about to purchase a <b>{singleNft?.title}</b> from <b>{singleNft?.creator.fullName}</b>
                            {
                                singleNft?.type === "multi" ? <>
                                    <div className="spacer-single"></div>
                                    <h6>Enter quantity. <span className="id-color-2">{singleNft?.availableCopies} available</span></h6>
                                    <input
                                        type="number"
                                        onChange={e => setQuantity(e.target.value)}
                                        maxLength={singleNft?.availableCopies}
                                        required
                                        className="form-control" />
                                </> : ''
                            }
                            <div className="spacer-single"></div>
                            <div className="de-flex">
                                <div>Your balance</div>
                                <div><b>10.67856 ETH</b></div>
                            </div>
                            <div className="de-flex">
                                <div>Service fee 2.5%</div>
                                <div><b>0.00325 ETH</b></div>
                            </div>
                            <div className="de-flex">
                                <div>You will pay</div>
                                <div><b>0.013325 ETH</b></div>
                            </div>
                            <div className="spacer-single"></div>
                            <button type="submit" className="btn-main btn-fullwidth">Buy</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BuyModel