import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import { useState } from 'react';
import predefinedColors from './data/color';

function App() {
  const [categories, setCategories] = useState([
    { name: '일반', ...predefinedColors[0] },
    { name: '업무', ...predefinedColors[1] },
    { name: '개인', ...predefinedColors[2] },
    { name: '기타', ...predefinedColors[3] }
  ]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/main"
          element={
            <MainPage
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
