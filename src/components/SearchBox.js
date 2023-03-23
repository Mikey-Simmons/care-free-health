import React from 'react';

const SearchBox = ({searchfield, searchChange}) =>{
    return(
        <>
        
        <div className='container2'>
        <input
        className='form-control' 
        type='search'
        placeholder="Search for a speciality"
        onChange={searchChange}/>
        </div>
        </>
    );
}
export default SearchBox;