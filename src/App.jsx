import {useState, useEffect} from 'react'
import HomePage from '../pages/HomePage'
import PeliculasListPage from '../pages/PeliculasList'
import PeliculasDetalle from '../pages/PeliculasDetalle'
import PeliculasNuevaPage from '../pages/PeliculasNuevaPage'
import LoginPage from '../pages/LoginPage'
import PeliculasEditPage from '../pages/PeliculasEditarPage'
import PeliculasDeletePage from '../pages/PeliculasDeletePage'
import AccesoDenegado from '../pages/AccesoDenegado'
import {Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'
import * as authService from '../services/auth.services.js'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'


function RoutePrivate( {isAutenticate, children}){
  return (
      <>
          {isAutenticate? children : <Navigate to="/login"/>}
      </>
  )
}

function RouteAdmin( {isAdmin, children}){
  return (
      <>
          {isAdmin ? children : <Navigate to="/acceso-denegado"/>}
      </>
  )
}

function App(){
  const navigate = useNavigate()
  const [isAuthenticate, setAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
        setAuthenticated(true)
        console.log('autenticado')
    }
}, [])

useEffect(() => {
  if(!isAuthenticate){
      navigate('/login')
  }   
  else {
    navigate('/')
    console.log('ingresaste')
  }

}, [isAuthenticate])

useEffect(() => {
  if(!isAdmin) {
    navigate('/')
  }
}, [isAdmin])

  function onLogin(user,token){
        
    setAuthenticated(true)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    if(user.role === 'admin'){
      console.log('Ingresó el admin')
      setIsAdmin(true)     
    } else {
      setIsAdmin(false)
      console.log('Ingresó', user.name)
    }
    navigate('/')
}

function onLogout(){
  authService.logout()
  setAuthenticated(false)
  setIsAdmin(false)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/login')
}

  return  <>
        <Header>
          <header className='mb-5'>
          <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div className='container'>
          <h1>Pelis.net</h1>
            <ul className='navbar-nav ms-auto text-center'>
              <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
              </li>
              <li className='nav-item'>
              <Link to="/peliculas" className='nav-link'>Peliculas</Link>
              </li>
              <li className='nav-item'>
              <Link to="/peliculas/nueva" className='nav-link'>Agregar Pelicula</Link>
              </li>
              {!isAuthenticate &&<><Link to="/login" className='nav-link' onClick={onLogout}>Iniciar sesión</Link> </>}
              <li>
              {isAuthenticate &&<><a className='nav-link' onClick={onLogout}>Logout</a> </>}
              </li>
            </ul>   
            </div>     
          </nav>
          </header>
        </Header>
        
        <Content>
          <Routes>

          <Route path='/' element={<HomePage/>}></Route>

          <Route path='/acceso-denegado' element={<AccesoDenegado/>}></Route>

          <Route path='/login' element={<LoginPage onLogin={onLogin} />}></Route>



          <Route path='/peliculas' element={<PeliculasListPage />}></Route>

          <Route path='/peliculas/:id' element={<RoutePrivate isAutenticate={isAuthenticate}><PeliculasDetalle /></RoutePrivate>}></Route>

          <Route path='/peliculas/nueva' element={<RoutePrivate isAutenticate={isAuthenticate}><RouteAdmin  isAdmin={isAdmin}><PeliculasNuevaPage /></RouteAdmin></RoutePrivate>}></Route>

          <Route path='/peliculas/:id/editar' element={<RoutePrivate isAutenticate={isAuthenticate}><RouteAdmin  isAdmin={isAdmin}><PeliculasEditPage /></RouteAdmin></RoutePrivate>}></Route>

          <Route path='/peliculas/:id/eliminar' element={<RoutePrivate isAutenticate={isAuthenticate}><RouteAdmin  isAdmin={isAdmin}><PeliculasDeletePage /></RouteAdmin></RoutePrivate>}></Route>
          
          <Route path='/*' element={<h1>Error 404</h1>}></Route>
          </Routes>
          </Content>

          <Footer>
          <footer className='bg-dark'>Maximiliano Gomez - Parcial 3</footer>
          </Footer>
          </>
}

export default App
