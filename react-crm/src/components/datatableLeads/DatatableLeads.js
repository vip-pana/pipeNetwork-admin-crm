import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import javaAxios from "../../api/javaAxios";

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from "@mui/material";

//ICONS AND STYLESHEET
import MoonLoader from "react-spinners/MoonLoader";
import EditIcon from '@mui/icons-material/Edit';
import "../datatable/Datatable.scss"

export const DatatableLeads = () => { 
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)

  // URL API
  const LEADS_URL = "/Leads"

  const getLeads = async ()=> {
    setLoading(true)
    await javaAxios.get(LEADS_URL).then((res)=> {setLeads(res.data)}).then(()=>{setLoading(false)})
  }
  useEffect(()=>{getLeads()},[])

  const leadColumns = [
      {
        field: "nome",
        headerName: "Nome",
        width: 150,
      },
      {
        field: "cognome",
        headerName: "Cognome",
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
          field: "stage",
          headerName: "Stage",
          width: 250,
        }
    ]

  const rows = leads.map((row) => ({
    id: row.id, 
    nome: row.nome,
    cognome: row.cognome,
    email: row.email,
    stage: row.stage,
  }))

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{display: "flex"}}>
            <Link to={`${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">
                <IconButton variant="outlined" size="small" className="viewButton"><EditIcon className="icon"/></IconButton>
              </div>
            </Link>
          </div>
        )
      }
    }
    ]

  return (
  <>
  {
    loading?
    <MoonLoader
      color={'#3a3a47'}
      loading={loading}
      size={50}
      className="centra"
    /> :
    <div style={{height : 700, width: "100%"}}>
        <DataGrid 
            rows={rows}
            columns={leadColumns.concat(viewColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
        />
    </div>
  }   
  </>
  )
}