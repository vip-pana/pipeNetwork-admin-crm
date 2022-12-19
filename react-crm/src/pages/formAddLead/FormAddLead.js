import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cSharpAxios from "../../api/cSharpAxios";
import BeatLoader from "react-spinners/BeatLoader"

// ICONS & STYLESHEET
import { TextField, Grid, Card , CardContent, Button, Typography } from "@mui/material";
import { IconButton } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const FormAddLead = () => {
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [email, setEmail] = useState('')
    const [cellulare, setCellulare] = useState('')
    const [indirizzo, setIndirizzo] = useState('')
    const [stage, setStage] = useState(0)
    const [inNewsLetter, isInNewsLetter] = useState(false)
    const [isCalled, isInCalled] = useState(false)
    const [inFreeTrial, isInFreeTrial] = useState(false)


    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // API URL
    const ADD_LEAD_URL = `/api/Lead/`

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (stage === 1) {
            isInNewsLetter(true)
        } else if (stage === 2){
            isInNewsLetter(true)
            isInCalled(true)
        } else {
            isInNewsLetter(true)
            isInCalled(true)
            isInFreeTrial(true)
        }

        try {
            setLoading(true)
            await cSharpAxios.post(ADD_LEAD_URL, 
                JSON.stringify({
                nome, cognome, email, cellulare, indirizzo, stage, inNewsLetter, isCalled, inFreeTrial
            }), {headers: {'Content-Type': 'application/json'}}).then(setLoading(false))
            setNome('')
            setCognome('')
            setEmail('')
            setCellulare('')
            setIndirizzo('')
            setStage(0)
            isInNewsLetter(false)
            isInCalled(false)
            isInFreeTrial(false)
            navigate(-1);
        } catch (error) {
            setLoading(false)
            if (!error?.response) { setErrMsg('No Server response')}
            else if (error.response?.status === 400) { setErrMsg("Missing required data")} 
            else if (error.response?.status === 401) { setErrMsg("Unauthorized")} 
            else { setErrMsg('Edit failed')}
        }
    }

    console.log(stage)

    const valueStage = [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        }
      ];

    return (
        <Grid className="single">
            <Card className="singleContainer" style={{ maxWidth: 1000, padding: "10px 5px", margin: "0 auto" }}>
            <Link to={-1} > <IconButton><ArrowBackIcon/></IconButton></Link>
                <CardContent className="item">
                    <h1 className="title">New data</h1> 
                    <Typography variant="subtitle1" className="details" gutterBottom style={{color:'red'}}>{errMsg}</Typography>
                    <form onSubmit={handlesubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Nome"  
                                size="small"
                                onChange={(e)=>{setNome(e.target.value)}} 
                                fullWidth required />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Cognome"  
                                size="small"   
                                onChange={(e)=>{setCognome(e.target.value)}} 
                                fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" 
                                type="email" 
                                size="small"  
                                onChange={(e)=>{setEmail(e.target.value)}}
                                fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Indirizzo" 
                                size="small"  
                                onChange={(e)=>{setIndirizzo(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Cellulare" 
                                type="number" 
                                size="small" 
                                onChange={(e)=>{setCellulare(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Stage level"
                                helperText="Please select"
                                onChange={(e)=>{setStage(e.target.value)}}
                                >
                                {valueStage.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </Grid>
                            <Grid item xs={12}>
                        
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    disabled={loading}>
                                {loading?
                                <BeatLoader
                                    color={'#ffffff'}
                                    loading={loading}
                                    size={25}
                                    className="centra"
                                /> :
                                <p>Submit</p>
                                }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}