import React from 'react';
import { Card, CardImg, CardText, CardBody, Button, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Label, Row, Col, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Component } from 'react';

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>comments</h4>
        {comments.map(c => {
          return (
            <div key={c.id}>
              <p>
                {c.text}
                <br />
                  --{c.author},
                  {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                }).format(new Date(Date.parse(c.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm campstieId={campstieId} addComment={addComment} />
      </div>
    );
  }
  return <div />;
}
function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      rating: '',
      author: '',
      comment: '',
      touched: {
        rating: false,
        author: false,
        comment: false,
      }
    }
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  valueCheck(values) {
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, values.rating, valures.author, valures.text)
  }

  render() {

    return (
      <div>
        <Button outline color="primary" onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" />Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader> Submit Comment </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.valueCheck(values)}>
              <Row className="form-group">
                <Col>
                  <Label >Rating</Label>
                  <Control.select className="form-control" model='.rating' id='rating' >
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Author</Label>
                  <Control.text model='.author' className="form-control" id="Author" validators={{ required, minLength: minLength(2), maxLength: maxLength(15) }}></Control.text>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"

                    messages={{
                      required: 'required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Text</Label>
                  <Control.textarea model='.text' className="form-control" id="Text"></Control.textarea>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button color="primary" model="./submit" type='submit' value='submit' validators={{ required, minLength: minLength(2), maxLength: maxLength(15) }} >Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div >
    );
  }
}
function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campstieId={props.campsite.id} />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
