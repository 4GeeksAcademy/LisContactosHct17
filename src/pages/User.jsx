import React, { useState, useEffect } from 'react';

const API_URL = 'https://playground.4geeks.com/contact/agendas/hect17Contactos/contacts';
const imagenMuestra = 'https://i.pravatar.cc/150?img=5';

export default function User() {
  const [contactos, setContactos] = useState([
    { 
      id: "sample", 
      name: 'Minerva Garcia', 
      address: 'Calle Principal 123, Madrid', 
      phone: '+34 600 000 000', 
      email: 'minerva.garcia@example.com' 
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [datosContacto, setDatosContacto] = useState({
    name: '', email: '', phone: '', address: ''
  });

  const obtenerContactos = async () => {
   try {
      const response = await fetch(API_URL);
      
      if (response.status === 404) {
        console.log("La agenda no existe, creando...");
        await crearAgenda();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.contacts) {
          setContactos(data.contacts);
        }
      }
    } catch (error) {
      console.error("Error cargando contactos:", error);
    }
  };

  const crearAgenda = async () => {
    try {
      await fetch('https://playground.4geeks.com/contact/agendas/hect17Contactos', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      // Después de crearla, intentamos obtener los contactos de nuevo
      obtenerContactos();
    } catch (error) {
      console.error("Error al crear la agenda:", error);
    }
  };

  useEffect(() => { obtenerContactos(); }, []);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    // SEGURIDAD: La API falla si envías campos vacíos. 
    // Aquí les ponemos un valor por defecto si el usuario no escribió nada.
    const contactoParaEnviar = {
      name: datosContacto.name,
      email: datosContacto.email,
      phone: datosContacto.phone || "No phone",
      address: datosContacto.address || "No address"
    };

    const urlFinal = editandoId ? `${API_URL}/${editandoId}` : API_URL;
    const metodo = editandoId ? "PUT" : "POST";

    try {
      const response = await fetch(urlFinal, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactoParaEnviar)
      });

      if (response.ok) {
        // En lugar de añadirlo manualmente, refrescamos de la API para estar seguros
        await obtenerContactos();
        cerrarModal();
      } else {
        const errorData = await response.json();
        alert("Error del servidor: " + (errorData.detail || "Revisa que el nombre no esté repetido"));
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  const eliminarContacto = async (id) => {
    if (id === "sample") {
        setContactos(contactos.filter(c => c.id !== id));
        return;
    }
    if (!confirm("¿Eliminar contacto?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setContactos(contactos.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  const manejarCambio = (e) => {
    setDatosContacto({ ...datosContacto, [e.target.name]: e.target.value });
  };

  const abrirParaEditar = (c) => {
    setDatosContacto({ name: c.name, email: c.email, phone: c.phone, address: c.address });
    setEditandoId(c.id);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditandoId(null);
    setDatosContacto({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-success shadow-sm px-4" onClick={() => setShowModal(true)}>
          Add a new contact
        </button>
      </div>

      <h2 className="text-center mb-5 fw-bold text-dark">Agenda de Contactos</h2>

      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, backdropFilter: 'blur(4px)' }}>
          <div className="bg-white p-4 rounded-4 shadow-lg w-100 mx-3" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h4 m-0 fw-bold">{editandoId ? 'Edit Contact' : 'New Contact'}</h3>
              <button className="btn-close border-0 bg-transparent" onClick={cerrarModal}>&times;</button>
            </div>
            <form onSubmit={enviarFormulario}>
              <div className="mb-2">
                <label className="small fw-bold">Full Name</label>
                <input type="text" name="name" className="form-control" required value={datosContacto.name} onChange={manejarCambio} placeholder="Full Name" />
              </div>
              <div className="mb-2">
                <label className="small fw-bold">Email</label>
                <input type="email" name="email" className="form-control" required value={datosContacto.email} onChange={manejarCambio} placeholder="Email" />
              </div>
              <div className="mb-2">
                <label className="small fw-bold">Phone</label>
                <input type="text" name="phone" className="form-control" value={datosContacto.phone} onChange={manejarCambio} placeholder="Phone" />
              </div>
              <div className="mb-3">
                <label className="small fw-bold">Address</label>
                <input type="text" name="address" className="form-control" value={datosContacto.address} onChange={manejarCambio} placeholder="Address" />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary shadow-sm">Save Changes</button>
                <button type="button" className="btn btn-light" onClick={cerrarModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row flex-column align-items-center">
        {contactos.length === 0 ? (
            <div className="text-center p-5 text-muted">No contacts found. Add your first one!</div>
        ) : (
            contactos.map((c) => (
                <div key={c.id} className="col-12 col-lg-8 mb-3">
                  <div className="p-4 bg-white rounded-4 border shadow-sm d-flex align-items-center">
                    <img src={imagenMuestra} className='rounded-circle border border-2' style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="profile" />
                    <div className="ms-4 flex-grow-1 text-start">
                      <h4 className="h5 fw-bold mb-1">{c.name}</h4>
                      <p className="text-secondary mb-0 small"><i className="fa-solid fa-location-dot me-2"></i>{c.address}</p>
                      <p className="text-secondary mb-0 small"><i className="fa-solid fa-phone me-2"></i>{c.phone}</p>
                      <p className="text-secondary mb-0 small"><i className="fa-solid fa-envelope me-2"></i>{c.email}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-link text-secondary p-0" onClick={() => abrirParaEditar(c)}><i className="fa-solid fa-pencil"></i></button>
                      <button className="btn btn-link text-danger p-0" onClick={() => eliminarContacto(c.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              ))
        )}
      </div>
    </div>
  );
}