import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCard({ item }) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}
function Home(props) {
    return (
        <div className="container">
            {<h4>Home</h4>}
            {RenderCard}
        </div>
    );
}

export default Home;   