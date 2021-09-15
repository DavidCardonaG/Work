import axios from "axios";
import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const url = "https://apitiendita.herokuapp.com/productos";

export default class AgregarProducto extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                imagen: '',
                nombre: '',
                precio: '',
                iva: '',
                descripcion: '',
            },
            tipoModal: ''
        }
    }

    componentDidMount(){
        this.peticionGet();
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }

    handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }

    cargarProducto = (product) => {

         this.setState({
             tipoModal: 'actualizar',
             form: {
                id: product.id,
               imagen: product.imagen,
                nombre: product.nombre,
                precio: product.precio,
                iva: product.iva,
                descripcion: product.descripcion,
             }
         })
         console.log(product)
    }

    peticionGet=()=>{
        axios.get(url)
        .then(response => {
            this.setState({data: response.data})
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    peticionesPost = async () => {
        delete this.state.form.id;
        await axios.post(url,this.state.form)
        .then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
             console.log(error.message);
        })
    }
   
    peticionPut = async () => {
        await axios.put(url+this.state.form.id,this.state.form)
        .then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionDelete = async () => {
        await axios.delete(url+this.state.form.id)
        .then(response => {
            this.setState({modalEliminar:false});
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    render() {
        const {form} = this.state;
        return (
            <div className="container">
                <br />
                <button className="btn btn-dark"
                onClick={() => {this.setState({form: null, tipoModal: 'insertar'});this.modalInsertar()}}
                >BODEGA</button>
                <br /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IMAGEN</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>IVA</th>
                            <th>DESCRIPCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(pro => {
                                return(
                                    <tr key={pro.id}>
                                        <td>{pro.id}</td>
                                        <td><img src={pro.imagen} width="50px" height="70px" alt=""/></td>
                                        <td>{pro.nombre}</td>
                                        <td>{pro.precio}</td>
                                        <td>{pro.iva}</td>
                                        <td>{pro.descripcion}</td>
                                        <button className="btnEdit" id="btnEdit"
                                         onClick={() => {this.cargarProducto(pro); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                         {" "}
                                         <button className="btnEliminar" id="btnEliminar"
                                         onClick={() => {this.cargarProducto(pro); this.setState({modalEliminar: true})}}><FontAwesomeIcon className="iconE" icon={faTrashAlt}/></button>
                                    </tr>
                                )
                            })
                        }
                      
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <h1>AGREGAR PRODUCTO</h1>
                    <ModalHeader style={{display: 'block'}}>
                    <button className="btn btn-danger"
                         onClick={() => this.modalInsertar()}
                           >
                            X
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id:''}/>
                            <br/>
                            <br/>
                            <label htmlFor="nombres">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre:''}/>
                            <br/>
                            <label htmlFor="nombres">Imagen</label>
                            <input className="form-control" type="text" name="imagen" id="imagen" onChange={this.handleChange} value={form?form.imagen:''}/>
                            <br/>
                            <label htmlFor="apellidos">Precio</label>
                            <input className="form-control" type="text" name="precio" id="precio" onChange={this.handleChange} value={form?form.precio:''}/>
                            <br/>
                            <label htmlFor="telefono">Iva</label>
                            <input className="form-control" type="text" name="iva" id="iva" onChange={this.handleChange} value={form?form.iva:''}/>
                            <br/>
                            <label htmlFor="celular">Descripcion</label>
                            <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion:''}/>
                            <br/>
                            <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display: 'none'}}
                            onChange={this.handleFileChange}
                            />

                        </div>

                    </ModalBody>
                    <ModalFooter>
                       {this.state.tipoModal==='insertar'}
                        <button className="btn btn-success"
                        onClick={() => this.peticionesPost()}>
                            Insertar
                        </button>
                        <button className="btn btn-primary"
                        onClick={() => this.peticionPut()}>
                            Actualizar
                        </button>
                        <button className="btn btn-danger"
                         onClick={() => this.modalInsertar()}
                           >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Está seguro que desea eliminar el producto {form && form.id}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btnDel"
                       onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btnC"
                       onClick={() => this.setState({modalEliminar:false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>

        
        )
    }
}
