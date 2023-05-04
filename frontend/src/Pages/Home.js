import {Link} from 'react-router-dom'
export default function Home() {

    return <div><h1>Home Pag</h1>
        <Link className="btn btn-primary" to="/Login">Log-In</Link>
    </div>
}
