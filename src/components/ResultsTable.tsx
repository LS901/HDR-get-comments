import InputTable from "./InputTable.tsx";
import { useEffect, useState } from "react";
import { getComments } from "../service/get-comments.ts"
import { CommentData } from "../types.ts";
const ResultsTable = () => {
     const [commentData, setCommentData] = useState<Array<CommentData>>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(25);
    const [excludedFields, setExcludedFields] = useState('');
    const [numberOfEntries, setNumberOfEntries] = useState(1);
    const finalPage = Math.ceil(numberOfEntries / totalPerPage);

    //Fetch the comments data from the getComments service. This will be called on every intial render, and anytime after this where the input fields are changed.
    useEffect(() => {
        const getCommentData = async (pageNumber: number,totalPerPage: number,excludedFields: string) => {
            const { result, numberOfEntries } = await getComments({page: pageNumber, total: totalPerPage, omit: excludedFields})
            setCommentData(result);
            setNumberOfEntries(numberOfEntries)
        }
        getCommentData(pageNumber, totalPerPage, excludedFields).catch((e) => console.error(`Failed to fetch comment data: ${e}`));
    },[excludedFields, pageNumber, totalPerPage])
    const applyChanges = (page: number, total: number, omit: string) => {
        setPageNumber(page);
        setTotalPerPage(total);
        setExcludedFields(omit);
    }

    return (
        <div className='m-14 p-4 flex flex-col bg-gray-100 rounded-lg'>
            <InputTable applyChanges={() => applyChanges} pageNumber={pageNumber} totalPerPage={totalPerPage} excludedFields={excludedFields}/>
            <table>
                <thead>
                    <tr>
                        {!excludedFields.includes('postId') && <th>postId</th> }
                        {!excludedFields.includes('id') && <th>Id</th> }
                        {!excludedFields.includes('name') && <th>Name</th> }
                        {!excludedFields.includes('email') && <th>Email</th> }
                        {!excludedFields.includes('body') && <th>Comment</th> }
                    </tr>
                </thead>
                <tbody>
                {!!commentData && commentData.map((comment: CommentData) => {
                    return(
                        <tr key={comment.id}>
                            <td>{comment.postId}</td>
                            <td>{comment.id}</td>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.body}</td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
            <div className="flex justify-center mt-8">
                <button onClick={pageNumber > 1 ? () => setPageNumber(pageNumber - 1) : undefined} className={`${pageNumber === 1 && 'cursor-not-allowed'} flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                    Previous
                </button>
                <button onClick={pageNumber < finalPage ? () => setPageNumber(pageNumber + 1) : undefined} className={`${pageNumber === finalPage && 'cursor-not-allowed'} flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                    Next
                </button>
            </div>
        </div>
    );
};
export default ResultsTable;
