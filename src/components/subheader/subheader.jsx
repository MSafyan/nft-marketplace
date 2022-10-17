import subheader from '../../assets/subheader.jpg'

function Subheader({ title }) {
    return (
        <section id="subheader" className="text-light"
            style={{ backgroundImage: `url(${subheader})`, backgroundPosition: 'top', backgroundSize: 'cover' }}>
            <div className="center-y relative text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>{title}</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subheader