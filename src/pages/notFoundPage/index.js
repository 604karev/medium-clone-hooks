import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='container page text-xs-center'>
            <h1>This page doesn't exist. Go <Link to="/">home</Link></h1>
        </div>
    )
}

export { NotFoundPage };
