import { useEffect, useState } from "react";
import cSharpAxios from "../../api/cSharpAxios"
import javaAxios from "../../api/javaAxios";

// STYLESHEETS AND ICONS
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import MoonLoader from "react-spinners/MoonLoader";

export const Widget = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([])
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  let data;

  // URL API
  const UTENTI_URL = '/api/Utente'
  const LEADS_URL = "/Leads"
  const TICKETS_URL = '/api/Ticket'

  const getUtenti = async () => {
    await cSharpAxios.get(UTENTI_URL).then(res => setUsers(res.data))
  }
  useEffect(()=>{getUtenti()},[])  

  const getLeads = async ()=> {
    setLoading(true)
    await javaAxios.get(LEADS_URL).then((res)=> {setLeads(res.data)}).then(()=>{setLoading(false)})
  }
  useEffect(()=>{getLeads()},[])

  const getTickets = async ()=> {
    setLoading(true)
    await cSharpAxios.get(TICKETS_URL).then((res)=> {setTickets(res.data)}).then(()=>{setLoading(false)})
  }
  useEffect(()=>{getTickets()},[])

  switch (type) {
    case "utenti":
    data = {
      title: "UTENTI",
      num: users.length,
      icon: (
        <PersonOutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      )
    }
    break

    case "leads":
    data = {
      title: "LEADS",
      num: leads.length,
      icon: (
        <PersonSearchIcon
          className="icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }}
        />
      )
    }
    break

    case "tickets":
    data = {
      title: "TICKETS",
      num: tickets.length,
      icon: (
        <AssistantPhotoIcon
          className="icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
      )
    }
    break
    default:
    break;
    }
  
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          {
            loading?
            <MoonLoader
              color={'#3a3a47'}
              loading={loading}
              size={50}
              className="centra"
            /> 
            :
            <span className="counter">
              {data.num}
            </span>
          }
        </div>
        <div className="right">
          {data.icon}
        </div>
      </div>
    )
  }
