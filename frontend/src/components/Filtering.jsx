
import { OpinionsContext } from '../store/opinions-context';
import './filteringStyling.css';

import { useState, useContext } from 'react';

const mockCategories = ["Technology", "Lifestyle", "Food", "Politics", "Sports", "Mental Health"];

function Filtering() {
    const { setSortedOpinions,mostVoted, latestOpinions, categoryFiltering,searching } = useContext(OpinionsContext);

    const [activeButton, setActiveButton] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (e) => {
        const categoryName = e.target.value;
        setSelectedCategory(category);
        setActiveButton(null);
        categoryFiltering(categoryName);
    };

    const handleSortClick = (sortType) => {
        setActiveButton(sortType);
        setSelectedCategory(null);
        if (sortType === 'popular') {
            mostVoted();
        } else {
            latestOpinions();
        }
        //onFilterChange('sort', sortType);
    };

    let searchQuery;

    const handleSearch = (e) => {
        setActiveButton(null);
        searchQuery = e.target.value;
        if(searchQuery === ''){
            setSortedOpinions(null);
        }
        searching(searchQuery);
    }
    return (
        <section className='filter-bar'>
            <div className="filter-sort-buttons">
                <button
                    className={activeButton === "popular" ? "active" : ""}
                    onClick={() => handleSortClick("popular")}
                >
                    Most Voted
                </button>
                <button
                    className={activeButton === "newest" ? "active" : ""}
                    onClick={() => handleSortClick("newest")}
                >
                    Newest
                </button>
            </div>
            <div className="filter-controls-right">
                <div className="filter-search">
                    <input
                        type="text"
                        placeholder="Search opinions..."
                        defaultValue={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="filter-category">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {mockCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}

export default Filtering;
