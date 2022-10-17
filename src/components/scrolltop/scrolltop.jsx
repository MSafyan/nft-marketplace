import { Link } from 'react-router-dom'

function ScrollTop() {
    const scrollTop = () => window.scrollTo(0, 0);
    return (
        <>
            <Link
                onClick={scrollTop}
                to="#"
                id="back-to-top"
                className="show">
            </Link>
        </>
    )
}

export default ScrollTop