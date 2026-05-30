import { Link } from 'react-router-dom'

function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <article className="card">
      {imageURL && (
        <img
          className="card-image"
          src={imageURL}
          alt={`${name} preview`}
        />
      )}

      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{description}</p>

        <div className="card-actions">
          <a href={url} target="_blank" rel="noreferrer">
            Visit Channel
          </a>
          <Link to={`/${id}`}>View Details</Link>
          <Link to={`/edit/${id}`}>Edit</Link>
        </div>
      </div>
    </article>
  )
}

export default Card
