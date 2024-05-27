import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
    error: null,
  }

  async componentDidMount() {
    try {
      const data = await fetchData();
      this.setState({ data, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleCountryChange = async (country) => {
    try {
      const data = await fetchData(country);
      this.setState({ data, country, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { data, country, error } = this.state;

    return (
      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default App;