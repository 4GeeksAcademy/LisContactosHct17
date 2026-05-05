import React, { useState } from 'react';

/**
 * Componente de botón para abrir el modal.
 * Recibe la función onOpen para cambiar el estado del padre.
 */
const Boton = ({ onOpen }) => {
  return (
    <div className="container d-flex justify-content-end p-0 mb-4">
      <button className="btn btn-success shadow-sm px-4 py-2" onClick={onOpen}>
        Add a new contact
      </button>
    </div>
  );
};

// Se utiliza una URL externa para evitar errores de compilación por archivos locales inexistentes en la previsualización
const imagenMarcador = 'https://i.pravatar.cc/150?img=5';

export default function App() {
  // Estado para la lista de contactos
  const [contactos, setContactos] = useState([
    { 
      id: 1, 
      nombre: 'Minerva Garcia', 
      direccion: 'Calle Principal 123, Madrid', 
      telefono: '+34 600 000 000', 
      email: 'minerva.garcia@example.com' 
    }
  ]);

  // Estados para el Modal y los datos del nuevo contacto
  const [showModal, setShowModal] = useState(false);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  // Maneja los cambios en los inputs del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoContacto({ ...nuevoContacto, [name]: value });
  };

  // Agrega el contacto a la lista y cierra el modal
  const agregarContacto = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!nuevoContacto.nombre || !nuevoContacto.email) return;

    const contactoFinal = {
      ...nuevoContacto,
      id: Date.now() // ID único temporal
    };
    
    setContactos([...contactos, contactoFinal]);
    
    // Resetear formulario y cerrar modal
    setNuevoContacto({ nombre: '', direccion: '', telefono: '', email: '' });
    setShowModal(false);
  };

  // Elimina un contacto por ID
  const eliminarContacto = (id) => {
    setContactos(contactos.filter((c) => c.id !== id));
  };

  return (
    <div className="container mt-5">
      {/* Botón superior para abrir el formulario */}
      <Boton onOpen={() => setShowModal(true)} />
      
      <h2 className="text-3xl font-bold text-center mb-5 text-dark">Agenda de Contactos</h2>

      {/* ESTRUCTURA DEL MODAL (Aparece de frente) */}
      {showModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.6)', 
            zIndex: 2000,
            backdropFilter: 'blur(4px)' 
          }}
        >
          <div className="bg-white p-4 rounded-4 shadow-2xl w-100 mx-3 border-0" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h4 m-0 font-bold text-primary">Añadir Nuevo Contacto</h3>
              <button 
                className="btn-close" 
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={agregarContacto}>
              <div className="mb-3">
                <label className="form-label font-semibold text-secondary">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre" 
                  className="form-control form-control-lg text-base" 
                  placeholder="Ej. Juan Pérez"
                  required 
                  value={nuevoContacto.nombre}
                  onChange={manejarCambio}
                />
              </div>
              <div className="mb-3">
                <label className="form-label font-semibold text-secondary">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control form-control-lg text-base" 
                  placeholder="ejemplo@correo.com"
                  required 
                  value={nuevoContacto.email}
                  onChange={manejarCambio}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label font-semibold text-secondary">Teléfono</label>
                  <input 
                    type="tel" 
                    name="telefono" 
                    className="form-control form-control-lg text-base" 
                    placeholder="600 000 000"
                    value={nuevoContacto.telefono}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label font-semibold text-secondary">Dirección</label>
                  <input 
                    type="text" 
                    name="direccion" 
                    className="form-control form-control-lg text-base" 
                    placeholder="Calle, Ciudad"
                    value={nuevoContacto.direccion}
                    onChange={manejarCambio}
                  />
                </div>
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button type="submit" className="btn btn-primary btn-lg font-bold">
                  Guardar Contacto
                </button>
                <button 
                  type="button" 
                  className="btn btn-link text-secondary text-decoration-none" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LISTADO DE TARJETAS DE CONTACTOS */}
      <div className="row flex-column align-items-center">
        {contactos.length > 0 ? (
          contactos.map((contacto) => (
            <div key={contacto.id} className="col-12 col-lg-8 mb-3">
              <div className="p-4 bg-white rounded-4 border border-light shadow-sm d-flex flex-column flex-md-row align-items-center transition-all hover-shadow">
                <div className="flex-shrink-0">
                  <img 
                    src={imagenMarcador} 
                    className='rounded-circle shadow-sm border border-2 border-white'  
                    alt={contacto.nombre} 
                    style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  />
                </div>
                
                <div className="flex-grow-1 ms-md-4 mt-3 mt-md-0 text-center text-md-start">
                  <h4 className="h5 font-bold mb-2 text-dark">{contacto.nombre}</h4>
                  <div className="text-secondary small">
                    <p className="mb-1"><i className="fa-solid fa-location-dot me-2 text-primary"></i>{contacto.direccion || 'No disponible'}</p>
                    <p className="mb-1"><i className="fa-solid fa-phone me-2 text-primary"></i>{contacto.telefono || 'No disponible'}</p>
                    <p className="mb-0"><i className="fa-solid fa-envelope me-2 text-primary"></i>{contacto.email}</p>
                  </div>
                </div>

                <div className="ms-md-auto mt-3 mt-md-0 d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm border-0 rounded-circle p-2" title="Editar">
                    <i className="fa-solid fa-pencil fs-5"></i>
                  </button>
                  <button 
                    onClick={() => eliminarContacto(contacto.id)} 
                    className="btn btn-outline-danger btn-sm border-0 rounded-circle p-2" 
                    title="Borrar"
                  >
                    <i className="fa-solid fa-trash-can fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <i className="fa-solid fa-address-book text-light display-1 mb-3"></i>
            <p className="text-muted fs-5">No hay contactos en tu lista. ¡Añade el primero!</p>
          </div>
        )}
      </div>
    </div>
  );
}