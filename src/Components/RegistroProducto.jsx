import axios from 'axios';
import {fileUpload} from '../helpers/fileUpload';
import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
const url = "https://apitiendita.herokuapp.com/productos/";


function RegistroProducto() {

    const [modalInsertar, setTipoModalInsertar] = useState(false);
    const [modalEliminar, setTipoModalEliminar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [tipoModal, setTipoModal] = useState("");
   const [productos, setProductos] = useState([]);
 
   const searchref = useRef()
    const [values, setValues] = useState({
        id: '',
        imagen: '',
        nombre: '', 
        precio: '',
        iva: '',
        descripcion: '',
       
    })
    const {  id, imagen, nombre, precio, iva, descripcion} = values;
 
    const modalInsertar1 = () => {
        setTipoModalInsertar(!modalInsertar)
    }
    const peticionGet = async () => {
       const res =  await fetch(url);
       const data = await res.json();
       console.log(data)
       setProductos(data)
    }
    const seleccionar = (prod) => {
        setTipoModal('actualizar')
        setValues({
            id: prod.id,
            imagen: prod.imagen,
            nombre: prod.nombre, 
            precio: prod.precio,
            iva: prod.iva,
            descripcion: prod.descripcion,

        })
        console.log(prod)
   }
    const peticionPost = async () => {
       await axios.post(url,values)
       .then(response => {
         console.log(response);
         peticionGet();
         modalInsertar1()
       })
       .catch(error => {
          console.log(error.message)
       })
    }
    const peticionPut = async () => {
        await axios.put(url+id,values)
        .then(response => {
            modalInsertar1();
            peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }
    const handleChange = ({target}) => {
          setValues({
            ...values,
            [target.name]: target.value
          })
          console.log(values);
    }
    const peticionDelete = async () => {
        await axios.delete(url+id)
        .then(response => {
            setTipoModalEliminar(false);
           peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }
   const handlePictureClick = () => {
         document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
        .then(response => {
            document.getElementById('image').value = response;
            values.imagen = response;
           
        }).catch(error => {
            console.log(error.message)
        })
        
    }
  const handleChangeBusca = (e) => {
      console.log(searchTerm)
    setSearchTerm(e.target.value )
  }
  const filtro = (e) => {
      e.preventDefault()
    console.log(searchTerm)
            
    let filtro = productos.filter(fil => fil.nombre.toLowerCase()  === searchTerm.toLowerCase() )
  
    console.log(filtro)
    setProductos(filtro)
  }
    useEffect((url) => {
            peticionGet(url)
        },[searchTerm]);
 
console.log(setValues)
    return (
        <div className="App">
                <button className="btn btn-primary" style={{display: 'flex', margin: "20px auto"}}
                onClick={() => {setTipoModal('insertar');modalInsertar1()}}
                >Registrar Nuevo Producto</button>
                <form onSubmit={filtro} >
                <input type="text"  name="buscar" style={{display: 'flex', margin: "5px auto"}}  onChange={handleChangeBusca} placeholder="Ingrese el producto a buscar"/>
                </form>
                <button className="btn btn-success" style={{display: 'flex', margin: "5px auto"}}
                onClick={filtro}
                >Buscar</button>
                <br /> <br />
                <h1 className="titleBodega">BODEGA MI TIENDITA</h1>
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th></th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Iva</th>
                            <th>Descripcion</th>
                            <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(produc => {
                                return(
                                    <tr key={produc.id}>
                                        <td><img src={produc.imagen} width="100px" height="120px" alt=""/></td>
                                        <td>{produc.nombre}</td>
                                        <td>{produc.precio}</td>
                                        <td>{produc.iva}</td>
                                        <td>{produc.descripcion}</td>
                                       <td> <button className="btn btn-primary"
                                         onClick={() => {seleccionar(produc); modalInsertar1()}}><BiEdit/></button>
                                        <br/><br/>
                                       <button className="btn btn-danger"
                                         onClick={() => {seleccionar(produc); setTipoModalEliminar(true)}}><RiDeleteBin5Line/></button></td>
                                    </tr>
                                )
                            })
                        }
                      
                    </tbody>
                </table>
<Modal isOpen={modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span onClick={() =>{ modalInsertar1();setValues({}) }  } style={{float: 'right', cursor: 'pointer'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                        <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display:'none'}}
                            onChange={handleFileChange}
                            />
                        <button className="btn btn-success" 
                            onClick={handlePictureClick}  style={{marginTop: "-5px"}}
                            >Imagen</button>

                        <input 
                            type="text"
                            name="imagen"
                            style={{marginLeft: "5px"}}
                            id="image"
                            value={values?values.imagen:''}
                            onBlur={handleChange}
                            onChange={handleChange}
                            required
                            />
                       
                        <input className="form-control" ref={searchref} required type="text" hidden name="id" id="id" readOnly onChange={handleChange} value={values?values.id:''}/>
                            <br/>
                           <label htmlFor="nombre">Nombre</label>
                        <input className="form-control" type="text" required name="nombre" id="nombre" onChange={handleChange} value={values.nombre}/>
                            <br/>
                            <label htmlFor="precio">Precio</label>
                        <input className="form-control" type="text" required name="precio" id="precio" onChange={handleChange} value={precio}/>
                            <br/>
                            <label htmlFor="iva">Iva</label>
                        <input className="form-control" type="text" required name="iva" id="iva" onChange={handleChange} value={values?values.iva:''}/>
                            <br/>
                            <label htmlFor="descripcion">Descripcion</label>
                        <input className="form-control" type="text" required name="descripcion" id="descripcion" onChange={handleChange} value={values?values.descripcion:''}/>
                            <br/>
  
                                     </div>

                    </ModalBody>
                    <ModalFooter>
                       {tipoModal ==='insertar'}
                        <button className="btn btn-success"
                        onClick={() =>{ peticionPost();setValues({}) }}>
                            Insertar
                        </button>
                        
                        <button className="btn btn-primary" 
                        onClick={() =>{ peticionPut();setValues({}) }}>
                            Actualizar
                        </button>
                        <button className="btn btn-danger"
                         onClick={() =>{ modalInsertar1();setValues({}) }}
                           >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEliminar}>
                    <ModalBody>
                        Está seguro de eliminar {values && values.nombres}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger"
                       onClick={peticionDelete}>Sí</button>
                        <button className="btn btn-secundary"
                       onClick={() => setTipoModalEliminar(false)}>No</button>
                    </ModalFooter>
                </Modal>
       
    </div>
    )
}

export default RegistroProducto