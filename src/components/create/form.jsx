import { useState } from "react";

function Form({ createData, setCreateData, inputChangeHandle, submitHandle, multi }) {
    const [isTabActive, setIsTabActive] = useState({ tab1: true, tab2: false, tab3: false })


    const activeTabHandle = (key) => {
        switch (key) {
            case 1:
                setCreateData(prev => ({ ...prev, method: 'fixed' }))
                setIsTabActive({ tab1: true, tab2: false, tab3: false })
                break;
            case 2:
                setCreateData(prev => ({ ...prev, method: 'open' }))
                setIsTabActive({ tab1: false, tab2: true, tab3: false })
                break;
            case 3:
                setCreateData(prev => ({ ...prev, method: 'auction' }))
                setIsTabActive({ tab1: false, tab2: false, tab3: true })
                break;
            default:
                break;
        }
    }

    return (
        <div className="col-lg-7 offset-lg-1">
            <form onSubmit={submitHandle} id="form-create-item" className="form-border" >
                <div className="field-set">
                    <h5>Upload file</h5>

                    <div className="d-create-file">
                        <p id="file_name">PNG, JPG, GIF, WEBP. Max 20mb.</p>
                        <label style={{ color: 'white' }} htmlFor="upload_file" className="btn-main">Browse</label>
                        <input required accept="image/png,image/jpeg,image/gif,image/webp" type="file" id="upload_file" name="file" onChange={inputChangeHandle} />
                    </div>

                    <div className="spacer-40"></div>

                    <h5>Select method</h5>
                    <div className="de_tab tab_methods">
                        <ul className="de_nav">
                            <li
                                onClick={() => activeTabHandle(1)}
                                className={isTabActive.tab1 ? "active" : ''}>
                                <span><i className="fa fa-tag"></i>Fixed price</span>
                            </li>
                            {!multi && <li
                                onClick={() => activeTabHandle(3)}
                                className={isTabActive.tab3 ? "active" : ''}>
                                <span><i className="fa fa-hourglass-1"></i>Timed auction</span>
                            </li>}
                            <li
                                onClick={() => activeTabHandle(2)}
                                className={isTabActive.tab2 ? "active" : ''}
                            ><span><i className="fa fa-users"></i>Open for bids</span></li>
                        </ul>
                        {isTabActive.tab1 && <div className="de_tab_content">
                            <div>
                                <h5>Price</h5>
                                <input required type="number" name="minPrice" className="form-control" onChange={inputChangeHandle} placeholder="enter price for one item (ETH)" />
                            </div>
                        </div>}
                        {isTabActive.tab3 && <>
                            <div className="de_tab_content">
                                <div>
                                    <h5>Minimum bid</h5>
                                    <input required type="number" name="minPrice" className="form-control" onChange={inputChangeHandle} placeholder="enter minimum bid" />
                                </div>
                            </div>
                            <div className="spacer-20"></div>
                            <div className="row" >
                                <div className="col-md-6" >
                                    <h5>Starting date</h5>
                                    <input type="datetime-local" name="bid_start_date" className="form-control" onChange={inputChangeHandle} />
                                </div>
                                <div className="col-md-6" >
                                    <h5>Expiration date</h5>
                                    <input type="datetime-local" name="bid_expire_date" className="form-control" onChange={inputChangeHandle} />
                                </div>
                            </div>
                        </>
                        }
                    </div>
                    <div className="spacer-20"></div>
                    <h5>Title</h5>
                    <input required type="text" name="title" className="form-control" onChange={inputChangeHandle} placeholder="e.g. 'Crypto Funk" />
                    {/* <div className="spacer-20"></div> */}
                    <h5>Collection</h5>
                    <input value={createData.collection} type="text" required name="collection" onChange={inputChangeHandle} className="form-control" placeholder="Enter unique collection name" />
                    {/* <div className="spacer-20"></div> */}
                    <h5>Description</h5>
                    <textarea value={createData.description} required data-autoresize name="description" onChange={inputChangeHandle} className="form-control" placeholder="e.g. 'This is very limited item'"></textarea>
                    {/* <div className="spacer-20"></div> */}
                    <h5>Royalties</h5>
                    <input value={createData.royalties} required type="number" maxLength={70} name="royalties" onChange={inputChangeHandle} className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                    <div className="spacer-20"></div>
                    {multi && (<>
                        <h5>Copies</h5>
                        <input required type="number" name="copies" onChange={inputChangeHandle} className="form-control" placeholder="eg: 25" />
                        <div className="spacer-single"></div>
                    </>)}

                    <button type="submit" className="btn-main">Create Item</button>
                    <div className="spacer-single"></div>
                </div>
            </form>
        </div>
    )
}

export default Form