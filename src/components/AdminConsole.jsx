import '../styles/AdminConsole.css';
import { NavLink } from 'react-router';

const AdminConsole = () => {

    return (
        <div className="admin-console-wrapper">
            <div className="admin-info">
                <h2>Admin Console</h2>
                {/* <p>Här kan du hantera produkter.</p> */}
                <p>Vänligen välj en åtgärd nedan:</p>
            </div>
            <div className="buttons-div">
                <NavLink to={"/components/addNewProduct/"} className="blue-btn" style={{textDecoration: "none"}}>Lägg till ny produkt</NavLink>
                <NavLink to={"/components/editProduct/:productId?"} className="blue-btn" style={{textDecoration: "none"}}>Redigera/ Ta bort</NavLink>
                {/* <NavLink to={"/components/editProduct/:productId?"} className="blue-btn" style={{textDecoration: "none"}}>Ta bort</NavLink> */}
            </div>
        </div>

    )
}

export default AdminConsole;