import { DatatableLeads } from "../../components/datatableLeads/DatatableLeads"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const Leads = () => {
  return (
    <div className="list" style={{"display":"flex", "flexDirection":"column"}}>
      <Link to={"add"} style={{ textDecoration: "none", margin:10 }}>
        <Button variant="contained" color="success" size="small">Aggiungi</Button>
      </Link>
      <DatatableLeads/>
    </div>
  )
}