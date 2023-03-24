const ColumnTitleParser = (column: string) =>
    column
        .replace(/_/g, " ")
        .replace(/(^\w)|(\s+\w)/g, (letter) => letter.toUpperCase());

export default ColumnTitleParser;
