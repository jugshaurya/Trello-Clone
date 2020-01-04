import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllCardsInBoardASYNC,
  createCardASYNC
} from "../../redux/cards/cards.actions";

import SingleCard from "../single-card/singleCard";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ListCards extends Component {
  state = {
    title: ""
  };

  componentDidMount() {
    this.props.getAllCardsInBoardASYNC();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, listId) => {
    e.preventDefault();
    this.props.createNewCard(listId, this.state.title, this.state.description);
  };

  handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  render() {
    const {
      isFetchingCards,
      isCreatingCard,
      cards,
      list,
      uploadImage
    } = this.props;

    const { title } = this.state;
    return isFetchingCards ? (
      <Container className="col-12">
        <Row>
          <Spinner animation="border" variant="info" />
        </Row>
      </Container>
    ) : (
      <Container className="col-12">
        <Row>
          {cards &&
            cards
              .filter(card => card.listId === list._id)
              .map(card => (
                <Col className="col-12" key={card._id}>
                  <SingleCard
                    card={card}
                    draggable
                    onDragStart={e => this.handleDragStart(e, card)}
                    updateCard={this.props.updateCard}
                    uploadImage={uploadImage}
                  />
                </Col>
              ))}
          {isCreatingCard ? (
            <Col className="col-12 mt-5">
              <Spinner animation="border" variant="info" />
            </Col>
          ) : (
            <Col
              className="col-12 mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Card
                bg="info"
                text="white"
                className="p-4"
                style={{ width: "18rem", padding: "10px" }}
              >
                <Form onSubmit={e => this.handleSubmit(e, list._id)}>
                  <Form.Group controlId="formBasicCardname">
                    <Form.Label>Create Card</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      placeholder="Enter Card Title"
                      onChange={this.handleChange}
                      value={title}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Create Card
                  </Button>
                </Form>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingCard: state.board.boardCards.isCreatingCard,
  isFetchingCards: state.board.boardCards.isFetchingCards,
  cards: state.board.boardCards.cards
});

const mapDispatchToProps = dispatch => ({
  getAllCardsInBoardASYNC: () => dispatch(getAllCardsInBoardASYNC()),
  createCardASYNC: (listId, title) => dispatch(createCardASYNC(listId, title))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCards);
