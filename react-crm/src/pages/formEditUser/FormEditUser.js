import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import cSharpAxios from "../../api/cSharpAxios";
import BeatLoader from "react-spinners/BeatLoader"

// ICONS & STYLESHEETS
import { TextField, Grid, Card , CardContent, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material"
import "../../components/datatable/Datatable.scss"
import "./formEditUser.scss"


export const FormEditUser = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    // API URL
    const SINGLE_USER_URL = `/api/Utente/${useParams().id}`
    
    const getData = async () => {
        await cSharpAxios.get(SINGLE_USER_URL).then((res)=> setUser(res.data)).then(()=>{
            setEditNome(user.nome)
            setEditCognome(user.cognome)
            setEditEmail(user.email)
            setEditCellulare(user.cellulare)
            setEditIndirizzo(user.indirizzo)
            setEditNascita(user.nascita)
            setEditIscrizione(user.iscrizione)
            setEditPaese(user.paese)
        })
        }
    useEffect(()=>{getData()}, [])


    const navigate = useNavigate()
    // EDITABLE DATA AND ID
    const { id } = useParams()
    const [editNome, setEditNome] = useState("")
    const [editCognome, setEditCognome] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editCellulare, setEditCellulare] = useState("")
    const [editIndirizzo, setEditIndirizzo] = useState("")
    const [editNascita, setEditNascita] = useState("")
    const [editIscrizione, setEditIscrizione] = useState("")
    const [editPaese, setEditPaese] = useState("")

    // IN THE CASE OF ERROR
    const [errMsg, setErrMsg] = useState('')

    const  handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await cSharpAxios.put(SINGLE_USER_URL,
                JSON.stringify({
                    id, nome: editNome, cognome :editCognome, email: editEmail, cellulare: editCellulare, indirizzo: editIndirizzo, nascita: editNascita, iscrizione: editIscrizione, paese: editPaese
                }), {headers: {'Content-Type': 'application/json'}}).then(()=>{setLoading(false)})
            setEditNome('')
            setEditCognome('')
            setEditEmail('')
            setEditCellulare('')
            setEditIndirizzo('')
            navigate(-1);

        } catch (error) {
            setLoading(false)
            console.log(error.response)
            if (!error?.response) { setErrMsg('No Server response')}
            else if (error.response?.status === 400) { setErrMsg("Missing required data")} 
            else if (error.response?.status === 401) { setErrMsg("Unauthorized")} 
            else { setErrMsg('Edit failed')}
        }
    } 

    return (
        <Grid className="single">
            <Card className="singleContainer" style={{ maxWidth: 1000, padding: "10px 5px", margin: "0 auto" }}>
            <Link to={`/dashboard/contacts/${id}`} > <IconButton><ArrowBackIcon/></IconButton></Link>
                <CardContent className="item">
                    <h1 className="title">Nuovi dati</h1> 
                    <Typography variant="subtitle1" className="details" style={{color:'red'}}>{errMsg}</Typography>
                    <Typography variant="subtitle1" className="details" gutterBottom>I campi lasciati vuoti saranno riempiti con i dati precedenti, se esistenti</Typography>
                    <form onSubmit={handlesubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Nome"  
                                size="small"
                                onChange={(e)=>{setEditNome(e.target.value)}} 
                                defaultValue={user.nome}
                                fullWidth  
                                required/>
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Cognome"  
                                size="small"   
                                onChange={(e)=>{setEditCognome(e.target.value)}} 
                                fullWidth  
                                required/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" 
                                type="email" 
                                size="small"  
                                onChange={(e)=>{setEditEmail(e.target.value)}}
                                fullWidth  
                                required/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Indirizzo" 
                                size="small"  
                                onChange={(e)=>{setEditIndirizzo(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Cellulare" 
                                type="number" 
                                size="small" 
                                onChange={(e)=>{setEditCellulare(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <label>Nascita</label>
                                <TextField
                                type="date" 
                                size="small"  
                                onChange={(e)=>{setEditNascita(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <label>Iscrizione</label>
                                <TextField 
                                type="date" 
                                size="small" 
                                onChange={(e)=>{setEditIscrizione(e.target.value)}}
                                fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Paese" 
                                size="small" 
                                onChange={(e)=>{setEditPaese(e.target.value)}}
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