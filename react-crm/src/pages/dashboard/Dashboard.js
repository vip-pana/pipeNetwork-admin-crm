import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import { Widget } from "../../components/widget/widget"
import { Outlet, useLocation } from "react-router-dom";
// STYLESHEET
import "./Dashboard.scss";

export const Dashboard = ()=> {
    const location = useLocation()
    const isInDashboard = location.pathname === "/dashboard";
    
    const IsDashboard = () => {
        if (isInDashboard){
            return ( 
                <>
                    <div className="widgets">
                        <Widget type="utenti" />
                        <Widget type="leads" />
                        <Widget type="tickets" />
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }
    
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar/>
                <Outlet/>
             <IsDashboard/>
            </div>
        </div>
    )
}