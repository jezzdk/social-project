import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputGroup = ({ name, placeholder, value, label, error, icon, type, info, onChange, disabled }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
