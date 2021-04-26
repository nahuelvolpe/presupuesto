import React, {useState, useEffect} from 'react';
import Pregunta from './componentes/Pregunta';
import Formulario from './componentes/Formulario'
import Listado from './componentes/Listado';
import ControlPresupuesto from './componentes/ControlPresupuesto';


function App() {

  //State
  const[presupuesto, guardarPresupuesto] = useState(0);
  const[restante, guardarRestante] = useState(0);
  const[mostrarpregunta, actualizarPregunta] = useState(true);
  const[gastos, guardarGastos] = useState([]);
  const[gasto, guardarGasto] = useState({});
  const[creargasto, guardarCrearGasto] = useState(false);

  //UseEffect que actualiza el restante
  useEffect(() => {
    if(creargasto){
      guardarGastos([
        ...gastos,
        gasto
      ]);

      guardarCrearGasto(false);

      //resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);
    }
  }, [gasto, creargasto, gastos, restante]);


  return (
    <div className="container">
      <header>
        <h1>Administra tu presupuesto</h1>
        
        <div className="contenido-principal contenido">
          {mostrarpregunta ? ( //el parentesis es necesario para dar por implicito el return (que lo retorne)
              <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
              /> 
          ): (
             <div className="row">
               <div className="one-half column">
                <Formulario 
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
               </div>
               <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />

                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
               </div>
            </div>
           )
          }


        </div>
        <h3>App by Int&reg;</h3>
      </header>
    </div>
  );
}

export default App;
