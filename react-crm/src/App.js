import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import { Login } from './pages/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Contacts } from './pages/contacts/Contacts'
import { SingleContact } from './pages/singleContact/SingleContact';
import { FormEditUser } from './pages/formEditUser/FormEditUser';
import { Leads } from './pages/leads/Leads';
import { SingleLead } from './pages/singleLead/SingleLead'
import { NotFound } from './pages/notFound/NotFound';
import { FormAddContacts } from './pages/formAddContact/FormAddContact';
import { RequireAuth } from './components/requireAuth/RequireAuth';
import { FormAddLead } from './pages/formAddLead/FormAddLead';
/* import { SingleTicket } from './pages/singleTicket/SingleTicket'; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className='App'><Login/></div>}/>
        <Route element={<RequireAuth></RequireAuth>}>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route path='contacts' element={<Contacts/>} />
            <Route path='contacts/:id' element={<SingleContact/>} />
            <Route path='contacts/add' element={<FormAddContacts/>}/>
            <Route path='contacts/:id/edit' element={<FormEditUser/>} />
            {/* <Route path='contacts/:id/singleTicket/:idTick' element={<SingleTicket/>}/> */}
            <Route path='leads' element={<Leads/>} />
            <Route path='leads/:id' element={<SingleLead/>} />
            <Route path='leads/add' element={<FormAddLead/>} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
