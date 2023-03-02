export const capitalize = (word: string) => {
    if (word.length === 0) return '';

    return (
        word
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character of each word
            .replace(/^./, function (str) {
                return str.toUpperCase();
            })
    );
};
