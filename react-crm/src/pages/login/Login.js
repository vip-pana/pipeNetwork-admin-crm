import { useState } from "react"
import { useNavigate, useLocation} from "react-router-dom"
import cSharpAxios from "../../api/cSharpAxios"

// STYLESHEETS 
import { TextField, Stack, Box, Typography, Button } from "@mui/material"
import BeatLoader from "react-spinners/BeatLoader";
import "../../components/datatable/Datatable.scss"


export const Login = () => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "dashboard"

    //URL API
    const RESPONSABILE_LOGIN_URL = '/api/responsabile/login'
    const AUTH_URL = '/api/Auth/Login'


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await cSharpAxios.post(RESPONSABILE_LOGIN_URL, JSON.stringify({email, pwd}), {headers: {'Content-Type': 'application/json'}})
            const token = await cSharpAxios.post(AUTH_URL, JSON.stringify({email, pwd}), {headers: {'Content-Type': 'application/json'}})

            localStorage.setItem("token",token.data)
            setEmail('') 
            setPwd('')
            
            setLoading(false)
            navigate(from, {replace: true})
        } catch (error) {
            setLoading(false)
            console.log(error)
            if (!error?.response) { setErrMsg('No Server response')
        console.log(error)} 
            else if (error.response?.status === 400) { setErrMsg("Missing username or Password")} 
            else if (error.response?.status === 401) { setErrMsg("Unauthorized")} 
            else { setErrMsg('Login failed')}
        }
    }

    return (
    <section>
        <Typography variant="h4" marginTop={"2rem"}>Login</Typography>
        <Stack 
            direction="column" 
            justifyContent="center" 
            alignItems="center" 
            spacing={2}>
            <form onSubmit={handleSubmit}>
                <Box 
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={550}
                    width={300}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={3}
                    padding={3}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                    sx={{":hover" : { boxShadow:'5px 5px 10px #ccc' }}}>

                    <Typography variant="subtitle1" gutterBottom style={{color:'red'}}>{errMsg}</Typography>
                    <TextField 
                        label="Email" 
                        type="email" 
                        margin="normal" 
                        autoComplete="off" 
                        fullWidth 
                        onChange={(e) => {
                            setEmail(e.target.value) 
                            setErrMsg('')
                            }}/>
                    <TextField 
                    label="Password" 
                    type="password" 
                    margin="normal" 
                    sx={{marginTop:3 }} 
                    fullWidth 
                    onChange={(e) => {
                        setPwd(e.target.value)
                        setErrMsg('')
                        }}/>

                    <Button variant="contained" margin="normal" type="submit" sx={{marginTop:1}} disabled={loading}>

                    {loading?
                    <BeatLoader
                        color={'#ffffff'}
                        loading={loading}
                        size={20}
                        className="centra"
                    /> :
                        <p style={{width:"120px"}}>login</p>
                    }
                    </Button>
                </Box>
            </form>
        </Stack>
    </section>
    )
}