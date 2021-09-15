import React, {Fragment,useState} from 'react'
import { Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {TitleH, HEADERstyle, BTNcar, UBICACION, C,H1M , H2M, PRM} from '../Styles/Rejistro_Styled'
import Swal from 'sweetalert2'

const Header = () => {

    const [vent,setVent] = useState(false)
    const toggle = () => setVent(!vent);
    let data = JSON.parse(localStorage.getItem('Producto'))
    console.log(data);

    const Comprar = () =>{
        Swal.fire(
            'Tu Compra Ha Sido Aceptada!',
            'Gracias Por Comprar En Mi Tiendita!',
            'success'
          )
    }

    return ( 
 <Fragment>

        <HEADERstyle>
            <TitleH>Tiendita</TitleH>
            <i class="ubi fas fa-map-marker-alt"></i>
            <UBICACION>México City Marriott Reforma Hotel... </UBICACION>
        
            <BTNcar onClick={toggle}><i class="fas fa-cart-arrow-down"></i><C>  5</C></BTNcar>
        </HEADERstyle>

        <Modal isOpen={vent} toggle={toggle}  >
                    <H1M>CARRITO DE COMPRAS</H1M>
                    <ModalHeader style={{display: 'block'}}>
                    </ModalHeader>
                    <ModalBody>
                    <H2M>{data.nombre}</H2M>
                    <PRM>{data.precio}</PRM>
                    <img className="imgModal" alt="modal" src={data.imagen}/>
                    <H2M>{data.iva}</H2M>

                    </ModalBody>
                    <ModalFooter className="footer">
                        <button className="btnCom" onClick={Comprar}>COMPRAR</button>
                        <button className="btnCan" onClick={toggle}>CANCELAR</button>
                    </ModalFooter>
                </Modal>
        
 </Fragment>
 
     );
}
 
export default Header;