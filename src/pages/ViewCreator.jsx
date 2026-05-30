import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function getCreator() {
      setIsLoading(true)
      setErrorMessage('')

      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        setErrorMessage('Unable to load this creator.')
        setCreator(null)
      } else {
        setCreator(data)
      }

      setIsLoading(false)
    }

    getCreator()
  }, [id])

  return (
    <main className="page">
      {isLoading && <p>Loading creator...</p>}

      {!isLoading && errorMessage && (
        <section className="empty-state">
          <h1>Creator Not Found</h1>
          <p>{errorMessage}</p>
          <Link className="button" to="/">
            Back Home
          </Link>
        </section>
      )}

      {!isLoading && creator && (
        <>
          <header className="page-header">
            <div>
              <h1>{creator.name}</h1>
              <p>{creator.description}</p>
            </div>
            <div className="form-actions">
              <Link className="button" to={`/edit/${creator.id}`}>
                Edit Creator
              </Link>
              <Link to="/">Back Home</Link>
            </div>
          </header>

          <section className="creator-details">
            {creator.imageURL && (
              <img
                className="creator-image"
                src={creator.imageURL}
                alt={`${creator.name} preview`}
              />
            )}

            <a href={creator.url} target="_blank" rel="noreferrer">
              Visit Creator
            </a>
          </section>
        </>
      )}
    </main>
  )
}

export default ViewCreator
