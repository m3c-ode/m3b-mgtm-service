import assert from "assert";
import { DeliveryInput, NewDeliveryInput } from "../src/types/deliveries";
import { updateBeerQuantity } from "./beers";
import getDbCollection from "./getCollection";

export const adjustInventoryVolumes = async (delivery: NewDeliveryInput) => {
    const { products } = delivery;
    console.log("🚀 ~ file: deliveries.ts:7 ~ adjustInventoryVolumes ~ products:", products);
    assert(products && products?.length! > 0, new Error('Was there an issue with the data?'));
    try {
        for (const product of products!) {
            const isUpdated = await updateBeerQuantity(product.beer.value, product.qty);
            console.log("🚀 ~ file: deliveries.ts:12 ~ products?.forEach ~ isUpdated:", isUpdated);
            if (!isUpdated) {
                throw new Error("Inventory could not be updated");
            }

        }
    } catch (error: any) {
        throw new Error(error);
    }

};

export const getAllDeliveriesAsync = async () => {
    const collection = await getDbCollection("deliveries");
    const data = await collection.find({}).toArray();
    console.log("🚀 ~ file: deliveries.ts:28 ~ getAllDeliveriesAsync ~ data:", data);
    return JSON.parse(JSON.stringify(data));
};