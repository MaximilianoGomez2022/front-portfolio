import {Link} from 'react-router-dom'

function AccesoDenegado(){

   return ( 
            <div className="mb-4 text-center">
            <h2 >Lo siento no tenés permiso para acceder a esta sección</h2>
            <Link to="/peliculas">Seguí navegando en nustro sitio.</Link>
            </div> 
          
          )}

export default AccesoDenegado