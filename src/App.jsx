import { useEffect, useState } from 'react'
import './styles/OGApp.css'
import UserProfile from './components/UserProfile'
import axios from 'axios'

function App() {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ] = useState([])
  const [ error, setError ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ filteredUsers, setFilteredUsers ] = useState([])
  const [ sortOrder, setSortOrder ] = useState('asc')

  useEffect(() => {
    const fetchFakeApi = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
        setFilteredUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError(`${error}`)
        setLoading(false)
      }
    }
    fetchFakeApi()
  }, [])

  useEffect(() => {
    const results = users.filter((user) => 
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    if ( sortOrder === 'asc' ) {
      results.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      results.sort((a, b) => b.name.localeCompare(a.name))
    }
    setFilteredUsers(results)
  }, [searchTerm, sortOrder, users])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (order) => {
    setSortOrder(order)
  }

  return (
    <>
    <div className="app-container">
      <h3>Welcome to Robo User App</h3>
      <pre>fetch data on fake api and generate random Robo on every user ID</pre>

      <input type="search" placeholder='Search names' value={searchTerm} onChange={handleSearchChange} />

      <button onClick={() => handleSortChange('asc')}>Sort Ascending</button>
      <button onClick={() => handleSortChange('desc')}>Sort Descending</button>

      <select name="" id="">
        <option value="">Sort by name</option>
        <option value="">Sort by id</option>
      </select>

      <h3>Robo User Profile:</h3>
      { loading && <p>Loading...</p> }
      { error && <p>Error: {error}</p> }
      <div className="users-container">
        { filteredUsers.map((user) => (
          <div className="each-user-container" key={user.id}>
              <UserProfile userId={user.id} userName={user.name} />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
