import axios from 'axios';
import { CommentData,OmitValues } from "../types";
//Axios get request to fetch the API data
const get = async (url: string) => {
    return await axios.get(url)
        .then((response) => response.data)
        //If there is an error fetching the API data, an error is thrown here
        .catch((error) => {
            throw new Error(`API response error. ${error}`);
        });
};
interface GetCommentsParams {
    page?: number
    total?: number
    omit?: string
}
export const getComments = async ({
  page = 1,
  total = 25,
  omit = ''
}: GetCommentsParams) => {
    //These values allow the pagination logic implemented below in the return object
    const startOfPageEntry = (page * total) - total;
    const endOfPageEntry = (page * total);

    const url = `https://jsonplaceholder.typicode.com/comments`
    const response = await get(url) as Array<CommentData>;

    //This allows the Next button on the UI to disable once the last page has been reached
    const fullListLength: number = response.length as number;

    //Omitting
    if(omit) {
        const splitValues = omit.replace(/\s/g, "").split(',') as Array<OmitValues>
        response.map((x: CommentData) => {
            splitValues.forEach((y) => {
                delete x[y];
            });
        })
    }

    return {
        result: response.filter((item) => startOfPageEntry < item.id && item.id <= endOfPageEntry), //Pagination
        numberOfEntries: fullListLength
    };
};