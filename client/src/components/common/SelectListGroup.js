import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectListGroup = ({ name, placeholder, value, label, error, info, onChange, disabled, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        disabled={disabled}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
