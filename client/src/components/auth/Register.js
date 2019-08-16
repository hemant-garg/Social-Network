import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/feed');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="register">
				{/* {user ? user.name : null} */}
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your SocialNetwork account
							</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="name"
									placeholder="Name"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>
								<TextFieldGroup
									name="email"
									placeholder="Email Address"
									type="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info="This site uses Gravatar so if you want a profile image, use
									a Gravatar email"
								/>
								<TextFieldGroup
									name="password"
									placeholder="Password"
									type="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<TextFieldGroup
									name="password2"
									placeholder="Confirm Password"
									type="password"
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
	return { auth, errors };
};

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
