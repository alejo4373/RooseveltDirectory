import React from "react";
import Blurb from "./Blurb";
import axios from "axios";
import SearchResults from "./searchResults";
import { css } from '@emotion/core'
import GridLoader from 'react-spinners/GridLoader'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      loading: false,
      searchTerms: ''
    };
    this.timerID = 0
  }

  searchBusinesses = async (searchTerms) => {
    try {
      let res = await axios.get('/api/biz', {
        params: { q: searchTerms }
      })
      this.setState({
        businesses: res.data.payload,
        loading: false
      })
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      })
    };
  };

  handleSearchTerms = (e) => {
    this.setState({
      searchTerms: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.searchBusinesses(this.state.searchTerms)
  }

  render() {
    const override = css`
      display: block;
      margin: 10vh auto 0 auto;
    `;

    const { businesses, loading } = this.state

    return (
      <div className="home">
        <div className="jumbotron">
          <p className="jumbotron__cta">
            To explore local businesses click on a category above or search here.
          </p>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="search-form__field"
              placeholder="Search for a specific business."
              onChange={this.handleSearchTerms}
            />
            <input type="submit" value="Search" className="search-form__button" />
          </form>
        </div>

        {loading ?
          (
            <div className="loader">
              <GridLoader
                loading={loading}
                css={override}
                size={50}
                color={"#9242b0"}
              />
            </div>
          ) :
          businesses.length ? <SearchResults loading={loading} businesses={businesses} /> : <Blurb />}
      </div>
    );
  }
}

export default Home;
