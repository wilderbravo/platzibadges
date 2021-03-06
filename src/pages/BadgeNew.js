import React from 'react';
import './styles/BadgeNew.css';
import header from '../images/badge-header.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log("Pilas " + this.state.loading)
  };

  handleSubmit = async e => {
    e.preventDefault(); //Se debe detener el evento porque sino el navegador va a enviar los datos a una página que no hemos espeficado
    this.setState ({ loading: true, error: null})
    try {
      await api.badges.create(this.state.form);
      this.setState ({loading: false});
      this.props.history.push('/badges');
    }catch(error){
      this.setState ({ loading: false, error: error})
      console.log("Error " + this.state.loading);
    }
  }

  render() {
    console.log("Estado loading: " + this.state.loading);
    if (this.state.loading){
      console.log("Momento de carga " + this.state.loading)
      return <PageLoading />
    }
    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6 BadgeNew__text">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                twitter={this.state.form.twitter || 'twitter'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITTLE'}
                email={this.state.form.email || 'EMAIL'}
                avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
              />
            </div>

            <div className="col-6">
            <h1>New Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
