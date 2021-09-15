import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Detalles from '../Containers/Detalles'
import Inicio from '../Containers/Inicio'



function About() {
    return ( 
                 <BrowserRouter>
                     <Route exact path="/Inicio" component={Inicio} />
                     <Route path="/Detalles/:id">

                        <Detalles />
                     </Route>
                 </BrowserRouter>
     );
}
 
export default About;