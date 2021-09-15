import React, {Fragment} from 'react'
import Header from '../Components/Header'
import Slayder from '../Components/Slayder'
import Contenido from '../Components/Contenido';
import AgregarProducto from '../Components/AgregarProducto'
import '../Styles/main.css'
 
const Inicio = () => {
    return ( 
    <Fragment>
        <Header />
        <Slayder />
        <Contenido />
        <AgregarProducto/>
    </Fragment>
     );
}
 
export default Inicio;