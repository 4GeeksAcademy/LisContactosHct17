import React, { useState } from 'react';
import Boton from './Boton';
import miImagen from './imgMujer.jpg';


export default function User() {
  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() === '') return;
    setLista([...lista, tarea]);
    setTarea('');
  };

  const eliminarTarea = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  return (
    
    <>
    <Boton/>
    <div className='container'>
        <div className="mt-12 bg- p-6 bg-secundary  rounded-x5 border border-slate-100 d-flex flex-column flex-md-row">
          
          <img src={miImagen} className='rounded-circle d-fle align-items-center col-12 col-lg-6 col-md-6 mt-4 ms-4 mb-4'  alt="Logo" style={{width: '150px', height: '150px'}}></img>
          <div className="col-12 col-lg-3 col-md-3 ms-5 mt-4">
            <h4>Minerva Garcia</h4>
            <p>direction</p>
            <p>telefono</p>
            <p>Email</p>
          </div>

           <div className="col-12 col-lg-3 col-md-3 ms-5 mt-4">
  
          </div>

          <div className="col-12 col-lg-3 col-md-3 ms-5 mt-4 d-flex gap-3">
         
           <div className = 'icon'><button onclick = "addUsername(event)" className='btn'><i className ="fa-solid fa-pencil"></i></button><button onclick = "deleteUsername(event)" className = 'btn'><i className ="fa-solid fa-trash-arrow-up "></i></button></div>
               
          </div>
         </div>
    </div>
    </>
  );
}