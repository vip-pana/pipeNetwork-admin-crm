import cSharpAxios from "../../api/cSharpAxios"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import MoonLoader from "react-spinners/MoonLoader";
import "../datatable/Datatable.scss"
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export const TicketsTable = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  // API
  const TICKET_API = `/api/Ticket/byUser/${useParams().id}`
          
  const getTickets = async ()=> {
    try {
      setLoading(true)
      await cSharpAxios.get(TICKET_API).then((res)=> setTickets(res.data)).then(()=>{setLoading(false)})
      } catch (error) {
        setLoading(false)
      }
    
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{getTickets()},[])

  const ticketColumns = [
      {
        field: "id",
        headerName: "Id",
        width: 50,
      },
      {
          field: "status",
          headerName: "status",
          width: 130,
        },
      {
        field: "mainObject",
        headerName: "Oggetto",
        width: 350,
      },
      
    ];

  const rows = tickets.map((row) => ({
    id: row.id, 
    status: row.status,
    mainObject: row.mainObject,
    utente: row.utente
  }))

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{display: "flex"}}>
              <div className="viewButton">
                <Link to={`singleTicket/${params.id}`} >
                  <IconButton variant="outlined" size="small" className="viewButton"><EditIcon className="icon"/></IconButton>
                </Link>
              </div>
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
    <div style={{height : 250, width: "100%"}}>
      <DataGrid 
        rows={rows}
        columns={ticketColumns.concat(viewColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
}   </>
  ) 
}