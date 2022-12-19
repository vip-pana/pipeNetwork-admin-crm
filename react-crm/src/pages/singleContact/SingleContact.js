import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import cSharpAxios from "../../api/cSharpAxios";
import { TicketsTable } from "../../components/ticketsTable/TicketsTable"

//ICONS AND STYLESHEET
import { IconButton, Modal, Typography, Box, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import MoonLoader from "react-spinners/MoonLoader";
import "./SingleContact.scss"

export const SingleContact = () => {
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // API URL
  const SINGLE_USER_URL = `/api/Utente/${useParams().id}`
  
  const getData = async () => {
    setLoading(true)
    await cSharpAxios.get(SINGLE_USER_URL).then((res)=> setUser(res.data)).then(()=>{setLoading(false)})
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{getData()},[])

  const Email = () => {
  if (user.email) {
    return (
    <div className="detailItem">
      <span className="itemKey">Email :</span>
      <span className="itemValue">{user.email}</span>
    </div>)
  }}

  const Cellulare = () => {
    if(user.cellulare){
        return (
        <div className="detailItem">
          <span className="itemKey">Cellulare :</span>
          <span className="itemValue">{user.cellulare}</span>
        </div>)
    }}

  const Nascita = () =>{
    if(user.nascita){
      return (
      <div className="detailItem">
        <span className="itemKey">Nascita :</span>
        <span className="itemValue">{user.nascita}</span>
      </div>)
  }}

  const Indirizzo = () =>{
    if(user.indirizzo){
      return (
      <div className="detailItem">
        <span className="itemKey">Indirizzo :</span>
        <span className="itemValue">{user.indirizzo}</span>
      </div>)
  }}

  const CartaDebito = () => {
    if(user.cartaDebito){
      return (
      <div className="detailItem">
        <span className="itemKey">CartaDebito :</span>
        <span className="itemValue">{user.cartaDebito}</span>
      </div>)
  }}
  
  const Iscrizione = () =>{
    if(user.iscrizione){
      return (
      <div className="detailItem">
        <span className="itemKey">Iscrizione :</span>
        <span className="itemValue">{user.iscrizione}</span>
      </div>)
  }}

  const Paese = () =>{
    if(user.paese){
      return (
      <div className="detailItem">
        <span className="itemKey">Paese :</span>
        <span className="itemValue">{user.paese}</span>
      </div>)
  }} 

  const handleDelete = async () => {
    try {
      await cSharpAxios.delete(SINGLE_USER_URL, {headers: {'Content-Type': 'application/json'}})
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
            <div className="editButton" onClick={()=>navigate('edit')}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
            <>
              {
                loading?
                <MoonLoader
                  color={'#3a3a47'}
                  loading={loading}
                  size={50}
                  className="centra"
                /> :
                <div className="details">
                  <h1 className="itemTitle">{user.nome} {user.cognome}</h1>
                  <Email/>
                  <Cellulare/>
                  <Indirizzo/>
                  <Nascita/>
                  <Iscrizione/>
                  <CartaDebito/>
                  <Paese/>
                </div>
              }</>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="bottom">
          <h1 className="title">Tickets</h1>
          <TicketsTable/>
        </div>
      </div>
    </div>
  )
}