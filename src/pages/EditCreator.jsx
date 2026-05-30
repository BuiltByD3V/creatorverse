import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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
      } else {
        setCreator({
          name: data.name,
          url: data.url,
          description: data.description,
          imageURL: data.imageURL || '',
        })
      }

      setIsLoading(false)
    }

    getCreator()
  }, [id])

  function handleChange(event) {
    const { name, value } = event.target

    setCreator((currentCreator) => ({
      ...currentCreator,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    const updatedCreator = {
      name: creator.name.trim(),
      url: creator.url.trim(),
      description: creator.description.trim(),
      imageURL: creator.imageURL.trim(),
    }

    const { error } = await supabase
      .from('creators')
      .update(updatedCreator)
      .eq('id', id)

    if (error) {
      setErrorMessage('Unable to update creator right now.')
      setIsSaving(false)
      return
    }

    navigate(`/${id}`)
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this creator?',
    )

    if (!shouldDelete) {
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    const { error } = await supabase.from('creators').delete().eq('id', id)

    if (error) {
      setErrorMessage('Unable to delete creator right now.')
      setIsSaving(false)
      return
    }

    navigate('/')
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Edit Creator</h1>
          <p>Update this creator&apos;s details or remove them.</p>
        </div>
        <Link className="button secondary-button" to={`/${id}`}>
          Back to Details
        </Link>
      </header>

      {isLoading && <p>Loading creator...</p>}

      {!isLoading && errorMessage && !creator.name && (
        <section className="empty-state">
          <h2>Creator Not Found</h2>
          <p>{errorMessage}</p>
          <Link className="button" to="/">
            Back Home
          </Link>
        </section>
      )}

      {!isLoading && creator.name && (
        <form className="creator-form" onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={creator.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="url">
            URL
            <input
              id="url"
              name="url"
              type="url"
              value={creator.url}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              value={creator.description}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="imageURL">
            Image URL
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              value={creator.imageURL}
              onChange={handleChange}
            />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" disabled={isSaving} onClick={handleDelete}>
              Delete Creator
            </button>
            <Link to={`/${id}`}>Cancel</Link>
          </div>
        </form>
      )}
    </main>
  )
}

export default EditCreator
