import clientPromise from "./mongodb";

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

// export const getDbCollection = async (name: string) => {
//     const client = await clientPromise;
//     // creates and use a db called "test"
//     const db = client.db();
//     const collection = db.collection(name);
//     return collection;
// };
