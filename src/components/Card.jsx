import { Link } from 'react-router-dom'

function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <article>
      {imageURL && (
        <img
          className="card-image"
          src={imageURL}
          alt={`${name} preview`}
        />
      )}

      <div>
        <h2>{name}</h2>
        <p>{description}</p>

        <div className="card-actions">
          <a href={url} target="_blank" rel="noreferrer" role="button">
            Visit Channel
          </a>
          <Link className="secondary" to={`/${id}`} role="button">
            View Details
          </Link>
          <Link to={`/edit/${id}`}>Edit</Link>
        </div>
      </div>
    </article>
  )
}

export default Card
