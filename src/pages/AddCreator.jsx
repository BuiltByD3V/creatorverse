import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator() {
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

    const newCreator = {
      name: creator.name.trim(),
      url: creator.url.trim(),
      description: creator.description.trim(),
      imageURL: creator.imageURL.trim(),
    }

    const { error } = await supabase.from('creators').insert(newCreator)

    if (error) {
      setErrorMessage('Unable to add creator right now.')
      setIsSaving(false)
      return
    }

    navigate('/')
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Add Creator</h1>
          <p>Add a creator to your Creatorverse collection.</p>
        </div>
        <Link className="button secondary-button" to="/">
          Back Home
        </Link>
      </header>

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
            {isSaving ? 'Adding...' : 'Add Creator'}
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default AddCreator
