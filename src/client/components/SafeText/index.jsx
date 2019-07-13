import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SafeText extends Component {
  constructor(props) {
    super(props);
    let visible = true;
    let userFlagged = false;
    let toxic = false;
    const { spam } = this.props;

    if (spam.count && spam.count > 2) {
      visible = false;
      userFlagged = true;
    }
    if (spam.toxic && spam.toxic.toxic > 0.9) {
      visible = false;
      toxic = true;
    }
    this.state = {
      visible,
      userFlagged,
      toxic,
      spam: this.props.spam,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      ...this.state,
      visible: true,
    });
  }
  render() {
    let alttext = 'This text was hidden. ';
    if (this.state.userFlagged) {
      alttext += 'Some users found the text inappropriate. ';
    }
    if (this.state.toxic) {
      alttext += 'Text might contain harsh words, ';
      if (this.state.spam.toxic.identity_hate) {
        alttext += 'hate, ';
      }
      if (this.state.spam.toxic.obscene) {
        alttext += 'obscenity, ';
      }
      if (this.state.spam.toxic.threats) {
        alttext += 'threats, ';
      }
      if (this.state.spam.toxic.severe_toxic) {
        alttext += 'toxicity, ';
      }
    }
    alttext += 'click to view text';

    return (
      <div data-test="component-safe-text">
        {this.state.visible ? this.props.children :
          // eslint-disable-next-line
          <a onClick={this.handleClick} data-test="jsx-a">{alttext}</a>
        }
      </div>
    );
  }
}

SafeText.propTypes = {
  spam: PropTypes.shape({
    errors: PropTypes.bool,
    message: PropTypes.string,
    modal: PropTypes.shape({
      open: PropTypes.bool,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default SafeText;
