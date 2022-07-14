import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Detail from '@pages/Detail';
import Write from '@pages/Write';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<Detail />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:postId" element={<Write />} />
    </Routes>
  );
}

export default Root;
