import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addPost } from "../../actions/postActions";
import "./Posts.scss";
class PostForm extends Component {
	state = {
		text: "",
		errors: {}
	};
	componentWillReceiveProps(nextprops) {
		if (nextprops.errors) {
			this.setState({ errors: nextprops.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
			handle: user.handle
		};
		this.props.addPost(newPost);
		this.setState({ text: "" });
	};
	render() {
		const { errors, text } = this.state;
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1rem;
			box-sizing: border-box;
		`;

		return (
			<Segment>
				<form onSubmit={this.onSubmit}>
					<TextareaFieldGroup
						name="text"
						error={errors.text}
						rows={3}
						onChange={this.onChange}
						value={text}
						placeholder="Write Something here..."
					/>
					<div className="postform-bottom">
						<div style={{ fontWeight: "bold" }}>
							<Icon color="blue" name="pencil" /> Write a Post
							<span style={{ marginLeft: "1.5rem", cursor: "pointer" }}>
								<Icon color="green" name="image" /> Upload a photo
							</span>
						</div>

						<Button animated primary>
							<Button.Content visible>Post</Button.Content>
							<Button.Content hidden>
								<Icon name="send" />
							</Button.Content>
						</Button>
					</div>
				</form>
			</Segment>
		);
	}
}

const mapStateToProps = ({ auth, errors, profile }) => {
	return { auth, errors, profile };
};

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
