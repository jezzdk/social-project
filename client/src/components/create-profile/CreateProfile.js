import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.createProfile(
      {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram
      },
      this.props.history
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;

    const statusOptions = [
      {
        label: '* Select Professional Status',
        value: '0'
      },
      {
        label: 'Developer',
        value: 'Developer'
      },
      {
        label: 'Junior Developer',
        value: 'Junior Developer'
      },
      {
        label: 'Senior Developer',
        value: 'Senior Developer'
      },
      {
        label: 'Manager',
        value: 'Manager'
      },
      {
        label: 'Student or Learning',
        value: 'Student or Learning'
      },
      {
        label: 'Instructor',
        value: 'Instructor'
      },
      {
        label: 'Intern',
        value: 'Intern'
      },
      {
        label: 'Other',
        value: 'Other'
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  error={errors.handle}
                  onChange={this.onChange}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  error={errors.status}
                  options={statusOptions}
                  onChange={this.onChange}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  error={errors.website}
                  onChange={this.onChange}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChange}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  error={errors.skills}
                  onChange={this.onChange}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  onChange={this.onChange}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  error={errors.bio}
                  onChange={this.onChange}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {this.state.displaySocialInputs && (
                  <div>
                    <InputGroup
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      value={this.state.twitter}
                      error={errors.twitter}
                      onChange={this.onChange}
                      icon="fab fa-twitter"
                    />
                    <InputGroup
                      placeholder="Facebook Page URL"
                      name="facebook"
                      value={this.state.facebook}
                      error={errors.facebook}
                      onChange={this.onChange}
                      icon="fab fa-facebook"
                    />
                    <InputGroup
                      placeholder="Linkedin Profile URL"
                      name="linkedin"
                      value={this.state.linkedin}
                      error={errors.linkedin}
                      onChange={this.onChange}
                      icon="fab fa-linkedin"
                    />
                    <InputGroup
                      placeholder="YouTube Channel URL"
                      name="youtube"
                      value={this.state.youtube}
                      error={errors.youtube}
                      onChange={this.onChange}
                      icon="fab fa-youtube"
                    />
                    <InputGroup
                      placeholder="Instagram Page URL"
                      name="instagram"
                      value={this.state.instagram}
                      error={errors.instagram}
                      onChange={this.onChange}
                      icon="fab fa-instagram"
                    />
                  </div>
                )}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
