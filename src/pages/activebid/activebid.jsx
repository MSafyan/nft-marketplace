import { useCallback, useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { getProfileMe_ } from "../../data/atom";
import Cookies from 'js-cookie'
import Items from "../../components/items/items";
import Loader from "../../components/loader/loader";
import Api from "../../api/api";
import Subheader from "../../components/subheader/subheader";

function ActiveBid() {
    const [loader, setLoader] = useState(true);
    const [allNfts, setAllNFTs] = useState([]);
    const setProfileMe = useSetRecoilState(getProfileMe_);

    const getActiveNFT = useCallback(async (isSubscribe) => {
        const res = await Api.getActiveNFT();
        if (isSubscribe) {
            if (res.status === 200) {
                setLoader(false);
                setAllNFTs(res.data.data)
            }
        }
    }, [])

    const getProfileMe = useCallback(async (isSubscribe) => {
        const res = await Api.getProfileMe();
        if (isSubscribe) {
            if (res.status === 200) {
                setProfileMe(res.data.data)
            }
        }
    }, [])

    useEffect(() => {
        if (Cookies.get('auth') !== undefined) {
            let isSubscribe = true;
            getProfileMe(isSubscribe);
            return () => isSubscribe = false
        }
    }, []);

    useEffect(() => {
        let isSubscribe = true;
        getActiveNFT(isSubscribe);
        return () => isSubscribe = false
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {loader ?
                <Loader />
                :
                <div className="no-bottom no-top" id="content">
                    <div id="top"></div>
                    <Subheader title={"Active Bids"} />
                    <section id="section-collections">
                        <div className="container">
                            {/* <div className="spacer-single"></div> */}
                            {allNfts && allNfts.length > 0 && <Items title={""} allNfts={allNfts} />}
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export default ActiveBid