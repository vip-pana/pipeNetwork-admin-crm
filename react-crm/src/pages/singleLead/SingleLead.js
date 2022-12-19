import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cSharpAxios from "../../api/cSharpAxios";

import { IconButton, Modal, Typography, Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'


export const SingleLead = () => {
    const [lead, setLead] = useState({})
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const SINGLE_LEAD_URL = `/api/Lead/${useParams().id}`

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = async () => {
        await cSharpAxios.get(SINGLE_LEAD_URL).then((res)=> setLead(res.data))
      }
      useEffect(()=>{getData()}, [getData])

    // IF SINGLE DATA IN USER SHOW SINGLE DATA
    const Email = () => {
        if (lead.email) {
          return (
          <div className="detailItem">
            <span className="itemKey">cellulare :</span>
            <span className="itemValue">{lead.email}</span>
          </div>
          )
        }
      }

    const Cellulare = () => {
        if(lead.cellulare){
            return (<div className="detailItem">
            <span className="itemKey">Email :</span>
            <span className="itemValue">{lead.cellulare}</span>
          </div>)
        }
      }
    const Nascita = () =>{if(lead.nascita){
        return (<div className="detailItem">
        <span className="itemKey">nascita :</span>
        <span className="itemValue">{lead.nascita}</span>
      </div>)
    }}
    const Indirizzo = () =>{if(lead.indirizzo){
        return (<div className="detailItem">
        <span className="itemKey">indirizzo :</span>
        <span className="itemValue">{lead.indirizzo}</span>
      </div>)
    }}
    const ArrivoLead = () =>{if(lead.arrivoLead){
        return (<div className="detailItem">
        <span className="itemKey">arrivo Lead :</span>
        <span className="itemValue">{lead.arrivoLead}</span>
      </div>)
    }}
    const InNewsLetter = () =>{if(lead.inNewsLetter){
        return (<div className="detailItem">
        <span className="itemKey">inNewsLetter :</span>
        <span className="itemValue">{lead.inNewsLetter}</span>
      </div>)
    }}
    const IsCalled = () =>{if(lead.isCalled){
        return (<div className="detailItem">
        <span className="itemKey">isCalled :</span>
        <span className="itemValue">{lead.isCalled}</span>
      </div>)
    }}
    const InFreeTrial = () =>{if(lead.inFreeTrial){
        return (<div className="detailItem">
        <span className="itemKey">inFreeTrial :</span>
        <span className="itemValue">{lead.inFreeTrial}</span>
      </div>)
    }}
    const Stage = () =>{if(lead.stage){
        return (<div className="detailItem">
        <span className="itemKey">stage :</span>
        <span className="itemValue">{lead.stage}</span>
      </div>)
    }}
    
    const handleDelete = async () => {
      try {
        await cSharpAxios.delete(SINGLE_LEAD_URL, {headers: {'Content-Type': 'application/json'}})
        navigate(-1)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }

  return (
    <div className="single">
      <div className="deleteButton">
      <IconButton variant="outlined" size="small" color="danger" className="viewButton" onClick={()=>setOpen(true)}><DeleteIcon/></IconButton>
      <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="ModaleDelCazzo">
          <Typography id="modal-modal-title centrati" variant="h6" component="h2" gutterBottom>
            Sei sicuro? Anche i dati correlati saranno eliminati
          </Typography>
          <Button variant="contained" color="error" onClick={(e) => handleDelete(e)}>Cancella</Button>
          <Button variant="contained" color="success" sx={{"marginLeft":5}} onClick={()=>setOpen(false)}>
            Annulla
          </Button>
        </Box>
      </Modal>
    </div>
    <div className="singleContainer">
      <div className="top">
        <div className="left">
          <div className="editButton" /* onClick={()=>navigate('edit')} */>Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <div className="details">
              <h1 className="itemTitle">{lead.nome} {lead.cognome}</h1>
              <Email/>
              <Cellulare/>
              <Indirizzo/>
              <Nascita/>
              <ArrivoLead/>
              <InNewsLetter/>
              <IsCalled/>
              <InFreeTrial/>
              <Stage/>
            </div>
          </div>
        </div>
        <div className="right"></div>
        </div>
        <div className="bottom">
          <h1 className="title">Tickets</h1>
        </div>
      </div>
    </div>
  );
}