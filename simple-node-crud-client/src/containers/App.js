import React, { useState } from 'react';
import Cards from '../components/CardList';
import Header from '../components/Header';
import Details from '../containers/Detail';
import Edit from '../containers/Edit';
import Create from '../containers/Create';
import Pagenation from '../elements/Pagenation';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App () {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState([]);
  const [count, setcount] = useState(1);

  return (
    <div className="min-h-screen">
      <Header setdata={setdata}/>
      <BrowserRouter>
        <Route exact path = '/'>
          <Cards setcount={setcount} page={page} Maindata={data} setMaindata={setdata} />
          <Pagenation count={count} getpage={setpage}/>
        </Route>
        <Route exact path="/details/:id">
          <Details/>
        </Route>
        <Route exact path="/new">
          <Create/>
        </Route>
        <Route exact path="/edit/:id">
          <Edit/>
        </Route>
      </BrowserRouter>
    </div>
  );
}
