import {Routes, Route} from 'react-router-dom'
import TestIndexPage from './components/tesIndexPage'
import Quiz from './components/quiz'



function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<TestIndexPage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  )
}

export default App
