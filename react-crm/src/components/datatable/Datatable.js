import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cSharpAxios from "../../api/cSharpAxios";

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from "@mui/material";

//ICONS AND STYLESHEET
import EditIcon from '@mui/icons-material/Edit';
import MoonLoader from "react-spinners/MoonLoader";
import "./Datatable.scss";
import "../../App.css"

export const Datatable = () => {  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  // URL API
  const UTENTI_URL = '/api/Utente'
  
  const getUtenti = async ()=> {
    setLoading(true)
    await cSharpAxios.get(UTENTI_URL).then((res)=> {setUsers(res.data)}).then(()=>{setLoading(false)})
  }
  useEffect(()=>{getUtenti()},[])

  const utenteColumns = [
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
    ];

    const rows = users.map((row) => ({
      id: row.id, 
      nome: row.nome,
      cognome: row.cognome,
      email: row.email
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
          );
        },
      },
    ]; 


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
          columns={utenteColumns.concat(viewColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    }
   </>
    );
}

