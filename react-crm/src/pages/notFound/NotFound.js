import { Link } from "react-router-dom"

// STYLESHEETS
import "../../App.css"

export const NotFound = () => {
    return (
        <div className="App">
            <h1>Page not found, turn back to</h1>
            <Link to="/">Login</Link>
        </div>
    )
}