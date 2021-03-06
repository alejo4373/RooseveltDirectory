import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import './App.css';
import "./Stylesheets/Categories.css";
import "./Stylesheets/Navigation.css";
import "./Stylesheets/Front.css";
import "./Stylesheets/Food.css";
import "./Stylesheets/Home.css";
import "./Stylesheets/Blurb.css";
import "./Stylesheets/Services.css";
import "./Stylesheets/Nightlife.css";
import "./Stylesheets/Tile.css";
import "./Stylesheets/StoreInfo.css";
import Home from "./Navigation/Home";
import Search from "./Navigation/Search/Search";
import BusinessCategories from "./Navigation/BusinessCategories";
import About from "./Navigation/About";
import BusinessPage from "./Navigation/BusinessPage";
import TopMenu from "./Navigation/TopMenu";


class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <TopMenu />
        <div className="categories">
          <div className="foodCat"><Link to='/food'><span>FOOD</span></Link></div>
          <div className="storesCat"><Link to='/stores'><span>STORES</span></Link></div>
          <div className="servicesCat"><Link to='/services'><span>SERVICES</span></Link></div>
          <div className="nightlifeCat"><Link to='/nightlife'><span>NIGHTLIFE</span></Link></div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route path="/biz/:slug" component={BusinessPage} />
          <Route path="/about" component={About} />
          <Route path="/:category" component={BusinessCategories} />
        </Switch>
      </div>
    );
  }
}

export default App;
