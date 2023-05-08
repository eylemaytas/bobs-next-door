import React from "react"

function Search({updateSearchText}) {
    return(
        <div className="search-container">
            <input type="text" placeholder="Search names..." onChange={updateSearchText} />
        </div>
    );
}

export default Search;