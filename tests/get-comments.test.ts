import { getComments } from "../src/service/get-comments";
// import mockResponseData from "./mocks/mock-comment-data.json"
import '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios';

const mockResponseData = require("./mocks/mock-comment-data.json")

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const defaultProps = {
    page: 1,
    total: 25,
    omit: ''
}

describe('GIVEN I am a developer using the get comments service' , () => {
    beforeEach(() => {
        jest.mocked(mockedAxios.get).mockResolvedValue(mockResponseData);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('WHEN I call the service with the default arguments', () => {
        it('THEN I get the expected response returned', async () => {
            const { result} = await getComments({})
            expect(result[0].id).toEqual(1);
            expect(result.length).toEqual(25);
        });
    });

    describe('WHEN I call the service with an omit argument', () => {
        it('THEN I am provided with the correct response omitting the fields I have specified', async () => {
            const { result } = await getComments({...defaultProps, omit: 'name'})
            expect(result[0]).toEqual({
                postId: 1,
                id: 1,
                body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
                email: "Eliseo@gardner.biz",
            })
        });

        it('AND the default pagination methods are observed', async () => {
            const { result} = await getComments({...defaultProps, omit: 'name'})
            expect(result[0].id).toEqual(1);
            expect(result.length).toEqual(25);
        });
    });

    describe('WHEN I call the service with a total argument', () => {
        it('THEN I am provided with an overriden pagination response of total data items', async () => {
            const { result } = await getComments({...defaultProps, total: 40})
            expect(result[0].id).toEqual(1);
            expect(result.length).toEqual(40);
        });
    });

    describe('WHEN I call the service with a page argument', () => {
        it('THEN I am provided with a response containing the default number of data items from the specified page.', async () => {
            const { result } = await getComments({...defaultProps, page: 3})
            expect(result[0].id).toEqual(51);
            expect(result.length).toEqual(25);
        });
    });

    describe('WHEN I call the service with total and omit arguments', () => {
        it('THEN I am provided with a response of total data items and omitted fields', async () => {
            const { result } = await getComments({...defaultProps, total: 10, omit: 'name, body'})
            expect(result.length).toEqual(10);
            expect(result[0]).toEqual({
                postId: 1,
                id: 1,
                email: "Eliseo@gardner.biz",
            })
        });
    });

    describe('WHEN the API response contains errors', () => {
        it('THEN it should throw an API error', async () => {
            jest.mocked(mockedAxios.get).mockRejectedValue(new Error('Error'));
            await expect(getComments({})).rejects.toThrow('API response error. Error: Error');
        });
    })
})