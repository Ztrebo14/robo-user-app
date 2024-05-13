import { useEffect, useState } from 'react'
import UserProfile from './components/UserProfile'
import axios from 'axios'

function App() {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ] = useState([])
  const [ error, setError ] = useState('')

  useEffect(() => {
    const fetchFakeApi = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError(`${error}`)
        setLoading(false)
      }
    }
    fetchFakeApi()
  }, [])

  return (
    <>
    <h3>Welcome to Robo User App</h3>
    <pre>fetch data on fake api and generate random Robo on every user ID</pre>
    { loading && <p>Loading...</p> }
    { error && <p>Error: {error}</p> }
    { users.map((user) => (
      <UserProfile key={user.id} userId={user.id} userName={user.name} />
    )) }
  
    </>
  )
}

export default App
