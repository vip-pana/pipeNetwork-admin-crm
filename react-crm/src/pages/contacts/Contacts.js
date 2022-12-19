import { Datatable } from "../../components/datatable/Datatable"
import { Link } from "react-router-dom"

//ICONS AND STYLESHEETS
import './Contacts.scss'
import { Button } from "@mui/material"

export const Contacts = () => {
  return (
    <div className="list" style={{"display":"flex", "flexDirection":"column"}}>
      <Link to={"add"} style={{ textDecoration: "none", margin:10 }}>
        <Button variant="contained" color="success" size="small">Aggiungi</Button>
      </Link>
      <Datatable/>
    </div>
  )
}