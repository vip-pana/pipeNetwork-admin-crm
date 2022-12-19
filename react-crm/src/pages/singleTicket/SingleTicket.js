import cSharpAxios from "../../api/cSharpAxios"
import { useState, useEffect } from "react"

import { TextField, Typography } from "@mui/material"
import "./singleTicket.scss"

export const SingleTicket = () => {
    const [loading, setLoading] = useState(false)


    const getData = async () => {
        setLoading(true)
        //await cSharpAxios.get(SINGLE_USER_URL).then((res)=> setUser(res.data)).then(()=>{setLoading(false)})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(()=>{getData()},[])

    return (<>
    <div className="single">
        <div className="singleContainer">
            <div className="bottom">
    <Typography variant="h5" gutterBottom>Single Ticket</Typography>
    <Typography variant="subtitle1" gutterBottom>Ticket open: </Typography>
    <Typography variant="subtitle1" gutterBottom>Status: </Typography>
    <Typography variant="subtitle1" gutterBottom>Client Name: </Typography>
            </div>
    <Typography variant="h6" gutterBottom>Messages: </Typography>
    <div className="bottom" style={{"display":"flex", "flexDirection":"column"}}>

    <TextField
          id="outlined-multiline-static"
          label="USER"
          multiline
          rows={4}
          defaultValue="Default Value"
          disabled
          gutterBottom
          sx={{"marginBottom":"1rem"}}
          />
          <TextField
          id="outlined-multiline-static"
          label="ADMIN"
          multiline
          rows={4}
          defaultValue="Default Value"
          disabled
          />
          </div>
          </div>
    </div>
    </>)
}