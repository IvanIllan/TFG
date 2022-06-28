import Main from '../themes/main';

export const fieldElementProps = (fieldName, errors, locales) => {
  const helperErrorText = errors && errors[fieldName];
  const fieldNameId = fieldName
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

  return {
    name: fieldName,
    label: locales[fieldName],
    color: helperErrorText ? 'error' : 'secondary',
    inputProps: { 'data-testid': `${fieldNameId}-input` },
    FormHelperTextProps: { style: { color: `${Main.palette.error.main}`, fontWeight: '400' } },
    helperText: helperErrorText,
    focused: true
  };
};

export default fieldElementProps;