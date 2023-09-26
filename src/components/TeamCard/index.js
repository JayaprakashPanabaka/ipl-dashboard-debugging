// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamsData} = props
  //   console.log(teamsData)

  const {id, name, imgUrl} = teamsData
  return (
    <>
      <Link className="link-style" to={`/team-matches/${id}`}>
        {/* <div>Team Card</div> */}
        <li className="listContainer" key={id}>
          <div className="logo-container">
            <img src={imgUrl} className="team-logo" alt={`${name}`} />
          </div>
          <div>
            <p className="name">{name}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default TeamCard
