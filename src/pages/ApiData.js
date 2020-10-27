import React from 'react';
//import ReactDOM from "react-dom";
import './styles/ApiData.css';
import logo from '../images/ricky.png';
import PageLoading from '../components/PageLoading';

function CharacterCard(props) {//Función para mostrar las cards con sus avatars
    const { character } = props;
    return (
    <div
        className="CharacterCard"
        style={{ backgroundImage: `url(${character.image})` }}
    >
    <div className="CharacterCard__name-container text-truncate">
        {character.name}
        </div>
    </div>
    );
}

class ApiData extends React.Component{

    state = {//Inicialización del estado de elementos
        loading: true,
        error: null,
        data: {
        info: {},
        results: []
        },
        nextPage: 1
    };
    componentDidMount(){//Inicio/Carga del componente principal
        this.fetchCaracteres();
        console.log(this.state.nextPage);
    }

    fetchCaracteres = async () => {
        this.setState({ loading: true, error: null });//Resetear valores de loading y error por cada nueva petición al API

        try {
            const response = await fetch(
                //'https://rickandmortyapi.com/api/character'
                `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`//Se colocan este símbolo ` porque se reciben variables
                //'http://172.18.9.85:9090/api/clientes'
            );
            const data = await response.json();

            this.setState({
                loading: false,//Se cambia a falso porque los datos han sido cargados
                data: {
                    info: data.info,
                    results: [].concat(this.state.data.results, data.results)
                },
                nextPage: this.state.nextPage + 1
            });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
        console.log(this.state.nextPage);
    }
    //https://rick-and-morty-api.now.sh/api/morty/:page
    render() {
        if (this.state.error) {
            return "¡Error en la carga de la información!";
        }

        return (
            <div className="container">
                <div className="App">
                <img className="Logo" src={logo} alt="Rick y Morty" />
                    <ul className="row">
                        { this.state.data.results.map(character => (
                            <li className="col-6 col-md-3" key={character.id}>
                                <CharacterCard character={character} />      
                            </li>
                        )) }
                    </ul>
                    {
                    this.state.loading && 
                        //<p className="text-center">Cargando...</p>
                        <PageLoading className="text-center" />
                    }

                    {!this.state.loading && this.state.data.info.next && (
                        <button onClick={() => this.fetchCaracteres()}>Cargar más</button>
                        //() => this.fetchCaracteres() Se hace de esta manera para pasar un evento 
                    )}
                </div>
            </div>
        )
    }
}
//https://www.w3schools.com/howto/howto_css_loader.asp
export default ApiData; 