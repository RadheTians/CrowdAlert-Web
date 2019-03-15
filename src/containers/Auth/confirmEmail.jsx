/* global window */
import React, { PureComponent } from 'react';
import {
  Container,
  Segment,
  Grid,
  Message,
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { sendEmailVerificationAuth, verifyEmailAuth } from './actions';
import { Auth } from '../../utils/firebase';

const Verifying = () => (
  <Message icon>
    <Icon name="circle notched" loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are verifying the email ID.
    </Message.Content>
  </Message>

);
const Verified = () => (
  <div>
    <Message
      attached
      success
      icon="check circle outline"
      header="Email ID is verified"
      content="Your email ID is now verified."
    />
    <Segment attached>
      <p> Thank you for verifying your email ID.</p>
      <Button icon labelPosition="left" color="green">
        <Icon name="check" /> Finish
      </Button>
    </Segment>
  </div>


);
const EmailSent = props => (
  <div>
    <Message
      attached
      warning
      icon="warning sign"
      header="Please confirm your email"
      content="In order to prevent spam, we need to verify your email address"
    />
    <Segment attached>
      <p>An email was sent to your registered email ID {props.user.email}.</p>
      <p>Click on the link in email to verify your account. Once confirmed, you will be able to post incidents nearby with your new CrowdAlert account.</p>
      <p style={{ marginBottom: 0 }}>Best wishes,</p>
      <p>Team CrowdAlert</p>
    </Segment>
    <Segment attached textAlign="right">
      <p>Did not receive the mail ?</p>
      <Button
        primary
        style={{ backgroundColor: '#573a08' }}
        onClick={props.sendEmailVerification}
      >
        Resend verification email
      </Button>
    </Segment>
  </div>
);

EmailSent.propTypes = {
  sendEmailVerification: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const EmailPrompt = () => (
  <div>
    <Message
      attached
      warning
      icon="warning sign"
      header="Please confirm your email"
      content="In order to prevent spam, we need to verify your email address"
    />
    <Segment attached>
      <p>Due to security concerns, please re-enter your email ID</p>
      <Form>
        <Form.Field>
          <Form.Input
            label="Email"
            fluid
            placeholder="Re-enter your email here"
          />
        </Form.Field>
        <Button primary icon labelPosition="left" floated="right">
          <Icon name="check" /> Verify
        </Button>
        <br />
        <br />
      </Form>
    </Segment>
  </div>
);

class ConfirmEmail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  sendEmailVerification(event) {
    event.preventDefault();
    const email = window.localStorage.getItem('email');
    this.props.sendEmailVerificationAuth(email);
  }
  render() {
    const isEmailLink = Auth.isSignInWithEmailLink(window.location.href);
    const email = window.localStorage.getItem('email');
    return (
      <Container>
        <Grid stackable columns="equal" style={{ padding: '1rem' }}>
          <Grid.Row style={{ marginTop: '5%', position: 'inherit', textAlign: 'center' }} >
            <h1 style={{ margin: '0 auto' }} >Welcome, username!</h1>
          </Grid.Row>
          <Grid.Row style={{ position: 'inherit', padding: '0 0 0 0' }}>
            <h3 style={{ margin: '0 auto' }} >Glad to have you on board.</h3>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '1%', position: 'inherit' }}>
            <Grid.Column style={{ maxWidth: 600, margin: '0 auto' }}>
              {this.props.confirmEmailForm.errors ?
                <Message
                  negative
                  header="Error"
                  content={this.props.confirmEmailForm.message}
                />
              : null}

              {this.props.confirmEmailForm.isVerified ?
                <Verified />
              : null }
              {this.props.confirmEmailForm.isVerifying ?
                <Verifying />
              : null}
              {isEmailLink && !email ?
                <EmailPrompt
                  email={this.state.email}
                  handleInputChange={this.handleInputChange}
                />
              : null}
              {!isEmailLink ?
                <EmailSent
                  sendEmailVerification={this.props.sendEmailVerificationAuth}
                  user={this.props.user}
                />
              : null}

            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '1%', position: 'inherit' }}>
            <Grid.Column style={{ textAlign: 'center' }}>
              <Link to="/">
                <Button primary>Go to Feed</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

ConfirmEmail.propTypes = {
  confirmEmailForm: PropTypes.shape({
    email: PropTypes.bool,
    isVerified: PropTypes.bool,
    isVerifying: PropTypes.bool,
    errors: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
  }).isRequired,
  sendEmailVerificationAuth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { confirmEmailForm } = state.auth;
  const { user } = state.auth;
  return {
    confirmEmailForm,
    user,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    verifyEmailAuth,
    sendEmailVerificationAuth,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
