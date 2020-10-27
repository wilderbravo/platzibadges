import React from 'react';
import './styles/ApiSercop.css';
//import Table from 'react-bootstrap/Table';
class ApiSercop extends React.Component{
    state = {//Inicialización del estado de elementos
        loading: true,
        error: null,
        data: [],
    };
    componentDidMount(){//Inicio/Carga del componente principal
        this.fetchDatos();
        //this.setState({data: []})
    }

    fetchDatos = async () => {//Petición asíncrona
        //this.setState({ loading: true, error: null });//Resetear valores de loading y error por cada nueva petición al API
        try {
            const rutaapi = 'http://172.18.9.85:9090/api/clientes'; 
            await fetch(rutaapi)
                 .then(response => response.json())
                 .then(data => this.setState ( { data: data} ));
        } catch (error) {//Control de errores
            this.setState({ loading: false, error: error });
        }
    }
    
    render() {
        return (
            <div className="container">
            <div className="App">
                <table >
                    <thead>
                        <tr key="0">
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                this.state.data.map(datos => (
                        <tr key={datos.id}>
                            <td>{datos.id}</td>
                            <td>{datos.nombre}</td>
                            <td>{datos.apellido}</td>
                            <td>{datos.email}</td>
                        </tr>
                )) 
                }
                    </tbody>
                </table>
            </div>
        </div>
        );
    } 
}

export default ApiSercop;
