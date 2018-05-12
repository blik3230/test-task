import React from 'react';

export default ({onFilter}) => (
    <div className="filter" style={{maxWidth: 320}}>
        <label htmlFor="postsFilter">Filter of posts by title</label>
        <input type="text" id="postsFilter" onChange={(e) => {onFilter(e.target.value)}}/>
    </div>
);