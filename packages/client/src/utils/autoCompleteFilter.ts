const autoCompleteFilter = (
    inputValue: string,
    option: { value: string } | undefined
) =>
    option
        ? option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        : false;

export default autoCompleteFilter;
