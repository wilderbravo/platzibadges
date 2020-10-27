import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import api from '../api';

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  }
  constructor(props) {
    super(props);
    console.log('1. constructor()');

  //   this.state = {
  //     data: [],
  //   };
  }
  componentDidMount() {//Si llega aquí es porque está todo listo para iniciar
    console.log('3. componentDidMount()');
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading:true, error: null })
    try {
      //const data = []
      const data = await  api.badges.list(); //Para poder usar await tenemos que declarar la función como asíncrona
      this.setState( { loading:false, data:data } )
    } catch(error){
      this.setState( { loading:false, data:error } )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('5. componentDidUpdate()');
    console.log({
      prevProps: prevProps,
      prevState: prevState,
    });

    console.log({
      props: this.props,
      state: this.state,
    });
  }

  componentWillUnmount() {
    console.log('6. componentWillUnmount');
    //clearTimeout(this.timeoutId);
  }

  render() {
    console.log('2/4. render()');
    if (this.state.loading === true){
      return < PageLoading/>;
    }
    if (this.state.error){
      return `Error: ${this.state.error.message}`;
      //`badges/${badgeId}`
    }
    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>

          <BadgesList badges={this.state.data} />
          {/* <div className="Badges__buttons">
            <div className="row">
              <div className="col-6 md-3">
                <Link to="/api/data" className="btn btn-primary">
                  API
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
