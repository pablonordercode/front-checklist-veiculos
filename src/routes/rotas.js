import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"


// import Footer from '../components/Footer'
import Home from '../pages/Home'
import CheckList from '../pages/CheckList'
import Login from '../pages/Login'
import CadastrarUser from "../pages/CadastrarUser";
import Historico from '../pages/Historico'
import Cabecalho from '../components/Cabecalho'
import Sobre from '../pages/Sobre'
import Dashboard from '../pages/Dashboard'
import PaginaInicial from '../pages/PaginaInicial'
import GestaoDeMotorista from '../pages/GestaoDeMotorista'
import Gestao from  "../pages/Gestao"
import HistoricoParaGestao from "../pages/HistoricoParaGestao"



function RotesApp() {
  return (

    <BrowserRouter>
    <Cabecalho/>
    
        <Routes>
        <Route path="/login" element={ <Login/>}/>
        <Route path='/' element={<PaginaInicial/>}/>
        
                {/* Rotas privadas */}
                
          <Route path="/home" element={<Home /> }/>
          <Route path="/checklist" element={<CheckList/> }/>
          <Route path="/historico" element={<Historico/> }/>
          <Route path="/importante" element={<Sobre/> }/>
          <Route path="/dashboard" element={<Dashboard/> }/>
          <Route path='/cadastrar' element={<CadastrarUser/>}/>
          <Route path='/gestaodemotorista' element={<GestaoDeMotorista/>}/>
          <Route path='/gestao' element={<Gestao/>}/>
          <Route path='/histgestao' element={<HistoricoParaGestao/>}/>
    

        </Routes>
    </BrowserRouter>
    
  )
}

export default RotesApp 













