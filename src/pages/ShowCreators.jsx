import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../client'

function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function getCreators() {
      setIsLoading(true)
      setErrorMessage('')

      let { data, error } = await supabase
        .from('creators')
        .select()
        .order('created_at', { ascending: false })

      if (error?.message?.includes('created_at')) {
        const fallbackResponse = await supabase.from('creators').select()
        data = fallbackResponse.data
        error = fallbackResponse.error
      }

      if (error) {
        setErrorMessage('Unable to load creators right now.')
        setCreators([])
      } else {
        setCreators(data)
      }

      setIsLoading(false)
    }

    getCreators()
  }, [])

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <h1>Creatorverse</h1>
          <p>Explore your favorite content creators.</p>
        </div>
        <Link to="/new" role="button">
          Add Creator
        </Link>
      </header>

      {isLoading && <p>Loading creators...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && creators.length === 0 && (
        <section className="empty-state">
          <h2>No creators yet</h2>
          <p>Add your first creator to get started.</p>
        </section>
      )}

      {!isLoading && !errorMessage && creators.length > 0 && (
        <section className="card-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </section>
      )}
    </main>
  )
}

export default ShowCreators
