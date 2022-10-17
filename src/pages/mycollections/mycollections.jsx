import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil"
import { getProfileMe_ } from "../../data/atom";
import Cookies from 'js-cookie'
import Collection from "../../components/collection/collection";
import Loader from "../../components/loader/loader";
import Api from "../../api/api";
import Subheader from "../../components/subheader/subheader";

function MyCollections() {
    const { id } = useParams()
    const [loader, setLoader] = useState(true);
    const [allCollectionsNFT, setAllCollectionsNFT] = useState([]);
    const setProfileMe = useSetRecoilState(getProfileMe_);

    const getMyCollectionNFT = useCallback(async (isSubscribe) => {
        const res = await Api.getMyCollectionNFT(id);
        if (isSubscribe) {
            if (res.status === 200) {
                setAllCollectionsNFT(res.data.data)
                setLoader(false);
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
        getMyCollectionNFT(isSubscribe);
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
                    <Subheader title={"My Collections"} />
                    <section id="section-collections" className="pt30">
                        <div className="container">
                            {allCollectionsNFT && allCollectionsNFT.length > 0 && <Collection title="" allCollectionsNFT={allCollectionsNFT} />}
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export default MyCollections