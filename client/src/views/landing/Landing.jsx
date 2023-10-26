import { Link } from "react-router-dom";


function Landing({ handleEntry }) {

    return(
        <div>
            <h2>This is the Landing</h2>
            <div>
                <Link to='/home'><button>Entry</button></Link>
            </div>
        </div>
    )
}

export default Landing