import React from 'react';
import Select, { components } from 'react-select';

function Option(props) {
  const { isSelected, label } = props;
  return (
    <div>
      <components.Option>
        <input type="checkbox" checked={isSelected} onChange={() => null} /> <label>{label}</label>
      </components.Option>
    </div>
  );
}

const { ValueContainer, Placeholder } = components;

function CustomValueContainer({ children, ...props }) {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
}

export default function CustomSelect({ options = [], defaultValue = null, onChange, isMulti = false, getOptionLabel, getOptionValue, placeholder }) {
  return (
    <Select
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onChange={onChange}
      defaultValue={defaultValue || options?.filter((option) => (isMulti ? defaultValue?.includes(option?.value) : option?.value === defaultValue))}
      components={isMulti && { Option } && { ValueContainer: CustomValueContainer }}
      isSearchable
      isMulti={isMulti}
      isDisable={false}
      placeholder={placeholder}
      styles={{
        container: (provided, _state) => ({
          ...provided,
          // marginTop: 50,
        }),
        valueContainer: (provided, _state) => ({
          ...provided,
          overflow: 'visible',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          position: 'absolute',
          top: state.hasValue || state.selectProps.inputValue ? -13 : '20%',
          transition: 'top 0.1s, font-size 0.1s',
          fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
          background: 'white',
          margin: '0px 20',
        }),
      }}
    />
  );
}
