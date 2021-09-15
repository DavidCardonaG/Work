import React, {Fragment} from 'react'
import Header from '../Components/Header'
import Slayder from '../Components/Slayder'
import Contenido from '../Components/Contenido';
import RegistroProducto from '../Components/RegistroProducto'
import '../Styles/main.css'
 
const Inicio = () => {
    return ( 
    <Fragment>
        <Header />
        <Slayder />
        <Contenido />
        <RegistroProducto/>
    </Fragment>
     );
}
 
export default Inicio;