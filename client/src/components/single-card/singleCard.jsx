import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
class SingleCard extends Component {
  render() {
    const { card, ...otherProps } = this.props;
    const { _id, title } = card;

    return (
      <Container className="col-12" {...otherProps}>
        <Row>
          <Col className="col-12" data-id={_id} key={_id}>
            <Card bg="info" text="white" style={{ padding: "5px" }}>
              <Card.Title>{title}</Card.Title>
              {/* <Card.Text>{description}</Card.Text> */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SingleCard;
