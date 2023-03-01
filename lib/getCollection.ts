import clientPromise from "./mongodb";

const getDbCollection = async (name: string) => {
    // try {

    const client = await clientPromise;
    // creates and use a db called "test"
    const db = client.db();
    const collection = db.collection(name);
    return collection;
    // } catch (error) {
    //     console.log("🚀 ~ file: getCollection.ts:12 ~ getDbCollection ~ error:", error);
    //     console.log("Couldn't get collection");
    // }
};

export default getDbCollection;

// export const test = 'test';