import React, { useEffect } from 'react';

import { Alert, Container, Progress } from 'reactstrap';

const Prices = ({ loadConcerts, request, concerts }) => {

  useEffect(() => {
    loadConcerts();
  },[]);
  
  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
  else if (request.success) return (
    <Container>
      <h1>Prices</h1>
      <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
      
      <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>
      { concerts.sort((c1, c2) => (c1.day - c2.day)).map(({id, day, price, workshops}) => (
        <div key={id}>
          <h2>Day {day}</h2>
          <p>Price: {price}$</p>
          <p>Workshops: "{workshops.map(ws => ws.name).join('", ')}"</p>
        </div>
      )) }
    </Container>
  )
};

export default Prices;