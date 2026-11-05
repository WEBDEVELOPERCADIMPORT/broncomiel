import { defineAction } from "astro:actions"
import content from "../../data/places/places.json"
import { z } from "zod"

export interface Place {
    id: string;
    name: string;
    address: string;
    zipCode: string;
}

export interface GetPlacesResult {
    message: string;
    data: Place[];
}

export const getPlaces = defineAction({
    input: z.object({
        zipCode: z.string().optional()
    }).optional(),
    handler: async (input): Promise<GetPlacesResult> => {
        const zipCode = input?.zipCode;

        const filtered = content.places.filter(p => {
            const matchesZipCode = zipCode ? p.zipCode === zipCode : true;
            return matchesZipCode;
        });

        const data = filtered as Place[]
        return { message: "Places retrieved successfully", data }
    }
})