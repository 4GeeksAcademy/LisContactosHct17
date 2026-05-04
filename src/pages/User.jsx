import React, { useState } from 'react';


const User = () => {
    return (
        <div className="bg-success text-center">
            <div id="carta-contenedor" className="container bg-white mt-4 shadow" 
                 style={{ borderRadius: "10px", width: "300px", height: "450px", overflow: "hidden" }}>
                <div className="row d-flex justify-content-start ps-4 sibul" 
                     style={{ height: "150px", fontSize: "80px" }}>
                </div>
                <div className="row d-flex justify-content-center align-items-center text-center" 
                     id="cards" style={{ height: "150px", fontSize: "100px" }}>
                </div>
                <div className="row d-flex justify-content-end pe-4 sibul text-end" 
                     style={{ height: "150px", fontSize: "80px" }}>
                </div>
            </div>
            
            <div className="container d-flex justify-content-center mt-4">
                <button id="btn-cambiar" className="btn btn-light form-control w-25">Cambiar Carta</button>
            </div>
            
            <div className="container d-flex justify-content-center mt-4">
                <input type="text" id="inputWidth" className="form-control w-25" placeholder="width" style={{ textAlign: "center" }} />
                <input type="text" id="inputHeight" className="form-control w-25" placeholder="height" style={{ textAlign: "center" }} />
            </div>
        </div>
    );
};

export default User;