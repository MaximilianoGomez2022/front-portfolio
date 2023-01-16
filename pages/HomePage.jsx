import { useState, useEffect } from "react"
import * as peliculasServices from "../services/peliculas.services.js"

function HomePage(){

    const [peliculas, setPeliculas] = useState([])

    useEffect(()=>{
        peliculasServices.findDestacadas()
        .then(data => {
            setPeliculas(data)
            console.log(data)
        })
    }, [])

   return ( 
            <div>
            <h2 className="mb-4">Películas destacadas del mes</h2>
            <div className="row">
                {peliculas.map(({_id, name, img}) =>
                <div key={_id} className="col-md-4">
                    {name}  
                    <img src={`${img}`} alt="portada de la pelicula"/>
                </div>
                )}
            </div>
            </div> 
          
          )}

export default HomePage