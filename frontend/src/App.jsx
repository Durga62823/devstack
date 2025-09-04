import './App.css'
import RoomAllocation from './components/RoomAllocation'
function App() {
  const userRole = 'coordinator';
  return (
    <>
    <div className='App'>
     <RoomAllocation userRole={userRole}/>
     </div>
    </>
  )
}

export default App
