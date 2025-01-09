import React from 'react'

function HomeFeed() {
    // JAVASCRIPT


    // HTML
    return (
    <>
        <h1>Today's Top Stories</h1>
        
        {/* Search */}
        <form method="post" action="">
            <input type="text" placeholder="Search for articles" />
        </form>

        {/* Filters */}
        <form method="post" action="">
            <div class="filter-row">
                <button type="submit" name="filter" value="United States" className="">U.S.</button>
                <button type="submit" name="filter" value="Technology" className="">Technology</button>
                <button type="submit" name="filter" value="Entertainment" className="">Entertainment</button>
                <button type="submit" name="filter" value="Sports" className="">Sports</button>
                <button type="submit" name="filter" value="Science" className="">Science</button>
                <button type="submit" name="filter" value="Health" className="">Health</button>
            </div>
        </form>
    </>
    );
}

export default HomeFeed;