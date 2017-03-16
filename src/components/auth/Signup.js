import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
);

const validate = values => {
    const errors = {}

    if(!values.email) {
        errors.email = 'Please enter email';
    }

    if(!values.password) {
        errors.password = 'Please enter password';
    }

    if(!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter password confirmation';
    }

    if(values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

class Signup extends Component {
    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error: </strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  name="email"
                  label="Email"
                  type="text"
                  component={renderField}
                />
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={renderField}
                />
                <Field
                  name="passwordConfirm"
                  label="Confirm password"
                  type="password"
                  component={renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

Signup =  reduxForm({
    form: 'signup',
    validate
})(Signup);

export default connect(mapStateToProps, actions)(Signup);
