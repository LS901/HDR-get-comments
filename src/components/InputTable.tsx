import React, { ChangeEvent, useState } from "react";
interface InputTableProps {
    // eslint-disable-next-line no-unused-vars
   applyChanges: (page: number, total: number, omit: string) => void;
   pageNumber: number,
   totalPerPage: number,
   excludedFields: string
}
const InputTable: React.FC<InputTableProps> = ({applyChanges, pageNumber, totalPerPage, excludedFields}) => {
    const [page, setPage] = useState(pageNumber);
    const [total, setTotal] = useState(totalPerPage);
    const [omit, setOmit] = useState(excludedFields);

    //Change handler that deals with the logic behind changing the state variables when the input values are changed
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        switch (id) {
            case 'page-number':
                setPage(Number(value))
                break;
            case 'total-per-page':
                setTotal(Number(value))
                break;
            case 'excluded-fields':
                setOmit(value);
                break;
        }
    };

    //Apply the changes of the values that have been altered and update the results table accordingly
    const handleApplyChanges = () => {
        applyChanges(page, total, omit);
    }

    return (
        <div className='flex justify-center items-center p-10 bg-purple-300 mb-2 rounded-lg'>
            <label className='pr-3'>Page Number:</label><input type='number' id='page-number' value={page} onChange={handleChange}/>
            <label className='px-3'>Total items per page:</label><input type='number' id='total-per-page' value={total} onChange={handleChange}/>
            <label className='px-3'>Fields to exclude:</label><input type='text' id='excluded-fields' value={omit} onChange={handleChange}/>
            <button className='px-3 bg-gray-300 rounded-lg ml-6' onClick={handleApplyChanges}>Apply</button>
        </div>
    );
};
export default InputTable;
