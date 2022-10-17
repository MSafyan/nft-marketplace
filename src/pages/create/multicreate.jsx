import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from "recoil"
import { getProfileMe_ } from "../../data/atom";
import Cookies from 'js-cookie'
import Form from '../../components/create/form';
import PreviewItem from '../../components/create/previewitem';
import Subheader from '../../components/subheader/subheader';
import Api from '../../api/api';
import { useHistory } from 'react-router-dom';

function MultiCreate() {
    const history = new useHistory();
    const setProfileMe = useSetRecoilState(getProfileMe_);

    const [createData, setCreateData] = useState({
        minPrice: 0, method: 'fixed', type: 'multi',
        title: 'Title', description: '',
        collection: '', copies: 0, royalties: 0,
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
            <Subheader title={"Create Multi Collectible"} />

            <section aria-label="section">
                <div className="container">
                    <div className="row wow fadeIn">
                        <Form
                            multi={true}
                            createData={createData}
                            setCreateData={setCreateData}
                            inputChangeHandle={inputChangeHandle}
                            submitHandle={submitHandle}
                        />
                        <PreviewItem
                            multi={true}
                            createData={createData}
                            imagePreview={imagePreview}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MultiCreate