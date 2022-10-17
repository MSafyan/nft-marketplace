import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from "recoil"
import { getProfileMe_ } from "../../data/atom";
import Cookies from 'js-cookie'
import Api from '../../api/api';
import Form from '../../components/create/form';
import PreviewItem from '../../components/create/previewitem';
import Subheader from '../../components/subheader/subheader';

function SingleCreate() {
    const history = new useHistory();
    const setProfileMe = useSetRecoilState(getProfileMe_);

    const [createData, setCreateData] = useState({
        method: 'fixed', type: 'single',
        minPrice: 0, title: 'Title',
        description: '', collection: '', copies: 1,
        royalties: 0, bid_start_date: '', bid_expire_date: '',
        image: 'https://gigaland.io/images/collections/coll-item-3.jpg'
    })
    const [imagePreview, setImagePreview] = useState("https://gigaland.io/images/collections/coll-item-3.jpg");

    const inputChangeHandle = (e) => {
        if (e.target.name === "file") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                    setCreateData((obj) => ({
                        ...obj,
                        image: e.target.files[0],
                    }))
                }
            };
            return
        }
        setCreateData((obj) => ({ ...obj, [e.target.name]: e.target.value }))
    }

    const submitHandle = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', createData.image)
        formData.append('collection', createData.collection)
        formData.append('type', createData.type)
        formData.append('method', createData.method)
        formData.append('title', createData.title)
        formData.append('description', createData.description)
        formData.append('minPrice', createData.minPrice)
        formData.append('royalties', createData.royalties)
        formData.append('copies', createData.copies)
        formData.append('bid_start_date', createData.bid_start_date)
        formData.append('bid_expire_date', createData.bid_expire_date)

        const res = await Api.createFixedNFT(formData)
        if (res.status === 201) {
            console.log(createData);
            history.push('/')
        }
    }

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
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <Subheader title={"Create Single Collectible"} />

            <section aria-label="section">
                <div className="container">
                    <div className="row wow fadeIn">
                        <Form
                            multi={false}
                            createData={createData}
                            setCreateData={setCreateData}
                            inputChangeHandle={inputChangeHandle}
                            submitHandle={submitHandle}
                        />
                        <PreviewItem
                            multi={false}
                            createData={createData}
                            imagePreview={imagePreview}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SingleCreate