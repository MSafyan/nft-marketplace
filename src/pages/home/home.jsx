import { useCallback, useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { getProfileMe_ } from "../../data/atom";
import Cookies from 'js-cookie'
import Carousel1 from "../../components/carousel/carousel1";
import Collection from "../../components/collection/collection";
import Items from "../../components/items/items";
import Sellers from "../../components/sellers/sellers";
import Loader from "../../components/loader/loader";
import Api from "../../api/api";

function Home() {
    const [loader, setLoader] = useState(true);
    const [allNfts, setAllNFTs] = useState([]);
    const [topCollectors, setTopCollectors] = useState([]);
    const [allCollectionsNFT, setAllCollectionsNFT] = useState([]);
    const setProfileMe = useSetRecoilState(getProfileMe_);

    const getAllNFT = useCallback(async (isSubscribe) => {
        const res = await Api.getAllNFT();
        if (isSubscribe) {
            if (res.status === 200) {
                setLoader(false);
                setAllNFTs(res.data.data)
            }
        }
    }, [])

    const getTopCollectors = useCallback(async (isSubscribe) => {
        const res = await Api.getTopCollectors();
        if (isSubscribe) {
            if (res.status === 200) {
                setTopCollectors(res.data.data.collectors)
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

    const getAllCollectionsNFT = useCallback(async (isSubscribe) => {
        const res = await Api.getAllCollectionsNFT();
        if (isSubscribe) {
            if (res.status === 200) {
                setAllCollectionsNFT(res.data.data)
            }
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        let isSubscribe = true;
        getTopCollectors(isSubscribe);
        return () => isSubscribe = false
    }, []);

    useEffect(() => {
        if (Cookies.get('auth') !== undefined) {
            let isSubscribe = true;
            getProfileMe(isSubscribe);
            return () => isSubscribe = false
        }
    }, []);

    useEffect(() => {
        let isSubscribe = true;
        getAllCollectionsNFT(isSubscribe);
        return () => isSubscribe = false
    }, []);

    useEffect(() => {
        let isSubscribe = true;
        getAllNFT(isSubscribe);
        return () => isSubscribe = false
    }, []);

    return (
        <>
            {loader && <Loader />}
            {/* <!-- content begin --> */}
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                {allNfts && allNfts.length > 0 && <Carousel1 allNfts={allNfts} />}
                <section id="section-collections" className="pt30">
                    <div className="container">
                        <div className="spacer-single"></div>
                        {allNfts && allNfts.length > 0 && <Items title={"NFTs"} allNfts={allNfts} />}
                        <div className="spacer-single"></div>
                        {allCollectionsNFT && allCollectionsNFT.length > 0 && <Collection title="Hot Collections" allCollectionsNFT={allCollectionsNFT} />}
                        <div className="spacer-single"></div>
                        {topCollectors && topCollectors.length > 0 && <Sellers topCollectors={topCollectors} />}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home