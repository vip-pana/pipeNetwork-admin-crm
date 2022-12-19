import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cSharpAxios from "../../api/cSharpAxios";
import BeatLoader from "react-spinners/BeatLoader"

// ICONS
import { TextField, Grid, Card , CardContent, Button, Typography } from "@mui/material";
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const FormAddContacts = () => {
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [email, setEmail] = useState('')
    const [indirizzo, setIndirizzo] = useState('')
    const [cellulare, setCellulare] = useState('')
    const [nascita, setNascita] = useState('')
    const [iscrizione, setIscrizione] = useState('')
    const [paese, setPaese] = useState('')

    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // API URL
    const ADD_USER_URL = `/api/Utente/`

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await cSharpAxios.post(ADD_USER_URL, 
                JSON.stringify({
                nome, cognome, email, cellulare, indirizzo, nascita, iscrizione, paese
            }), {headers: {'Content-Type': 'application/json'}}).then(setLoading(false))
            setNome('')
            setCognome('')
            setEmail('')
            setIndirizzo('')
            setCellulare('')
            setIndirizzo('')
            setNascita('')
            setIscrizione('')
            setPaese('')
            navigate(-1);
        } catch (error) {
            setLoading(false)
            if (!error?.response) { setErrMsg('No Server response')}
            else if (error.response?.status === 400) { setErrMsg("Missing required data")} 
            else if (error.response?.status === 401) { setErrMsg("Unauthorized")} 
            else { setErrMsg('Edit failed')}
        }
    }

    return (
        <Grid className="single">
            <Card className="singleContainer" style={{ maxWidth: 1000, padding: "10px 5px", margin: "0 auto" }}>
            <Link to={-1}><IconButton><ArrowBackIcon/></IconButton></Link>
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
                            <Grid item xs={12} sm={6} >
                                <TextField label="Email" 
                                type="email" 
                                size="small"  
                                onChange={(e)=>{setEmail(e.target.value)}}
                                fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField label="Indirizzo" 
                                size="small"  
                                onChange={(e)=>{setIndirizzo(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField label="Cellulare" 
                                type="number" 
                                size="small" 
                                onChange={(e)=>{setCellulare(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField label="Paese" 
                                size="small" 
                                onChange={(e)=>{setPaese(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <label>Data di nascita</label>
                                <TextField  
                                type="date" 
                                size="small" 
                                onChange={(e)=>{setNascita(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <label>Data di iscrizione</label>
                                <TextField 
                                type="date" 
                                size="small" 
                                onChange={(e)=>{setIscrizione(e.target.value)}}
                                fullWidth />
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