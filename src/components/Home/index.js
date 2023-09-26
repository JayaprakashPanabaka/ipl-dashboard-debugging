// Write your code here
import {useState, useEffect} from 'react'
// import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard/index'
import './index.css'

const Home = () => {
  const [teamsData, setTeamsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getTeamsData = async () => {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const jsonData = await response.json()

      const updatedData = jsonData.teams.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imgUrl: eachItem.team_image_url,
      }))
      //   console.log(jsonData)
      //   console.log(updatedData)

      setTeamsData(updatedData)
      setIsLoading(false)
    }
    getTeamsData()
  }, [])
  //   console.log(teams)

  return (
    <>
      <div className="bg-container">
        {/* <div>Home</div> */}
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <ul className="teams-list">
            {teamsData.map(team => (
              <TeamCard teamsData={team} key={team.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Home
