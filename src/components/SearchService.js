import React, { useState } from 'react';
import ServiceTable from './ServiceTable';

function SearchService() {
    const [search, setSearch] = useState('');

    const onChangeSearch = e => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <div className="header-search-text-ser">
                <font size='4'>จัดการบริการ</font>   
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <input 
                    className="search-ser-text"
                    type='text'
                    placeholder='ค้นหา'
                    //name="search"
                    value={search}
                    onChange={onChangeSearch}
                />
                <button disabled className='search-btn' ><i class="fa fa-search"></i></button>
            </div>
            <ServiceTable search={search}></ServiceTable>
        </div>
    );
};

export default SearchService;