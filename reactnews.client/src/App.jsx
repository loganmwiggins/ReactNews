import { useEffect, useState } from 'react';
import './App.css';
import HomeFeed from './components/HomeFeed';

function App() {

    return (
        <div>
            <HomeFeed></HomeFeed>
        </div>
        // <BrowserRouter>
        //     <Routes>
        //         {/* <Route path="/" element={<HomeFeed />}> */}
        //             <Route index element={<HomeFeed />} />
        //             <Route path="results" element={<SearchResults />} />
        //             {/* <Route path="*" element={<NoPage />} /> */}
        //         {/* </Route> */}
        //     </Routes>
        // </BrowserRouter>
    );
}

export default App;