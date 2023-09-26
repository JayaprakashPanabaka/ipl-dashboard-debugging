// Write your code here
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'

import './index.css'

const TeamMatches = props => {
  const [matchesData, setMatchesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {match} = props
  //   console.log(props)

  //   console.log(match)
  const {params} = match

  const {id} = params

  useEffect(() => {
    const getMatchesData = async () => {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

      const fetchedData = await response.json()

      /*  console.log(fetchedData)
        console.log(fetchedData.team_banner_url)
        console.log(fetchedData.latest_match_details)
        console.log(fetchedData.recent_matches) */

      const updatedData = {
        teamBannerUrl: fetchedData.team_banner_url,
        latestMatchDetails: {
          id: fetchedData.latest_match_details.id,
          competingTeam: fetchedData.latest_match_details.competing_team,
          competingTeamLogo:
            fetchedData.latest_match_details.competing_team_logo,
          date: fetchedData.latest_match_details.date,
          firstInnings: fetchedData.latest_match_details.first_innings,
          manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
          matchStatus: fetchedData.latest_match_details.match_status,
          result: fetchedData.latest_match_details.result,
          secondInnings: fetchedData.latest_match_details.second_innings,
          umpires: fetchedData.latest_match_details.umpires,
          venue: fetchedData.latest_match_details.venue,
        },
        recentMatches: fetchedData.recent_matches.map(recentMatch => ({
          umpires: recentMatch.umpires,
          result: recentMatch.result,
          manOfTheMatch: recentMatch.man_of_the_match,
          id: recentMatch.id,
          date: recentMatch.date,
          venue: recentMatch.venue,
          competingTeam: recentMatch.competing_team,
          competingTeamLogo: recentMatch.competing_team_logo,
          firstInnings: recentMatch.first_innings,
          secondInnings: recentMatch.second_innings,
          matchStatus: recentMatch.match_status,
        })),
      }

      setMatchesData(updatedData)
      setIsLoading(false)
    }

    getMatchesData()
  }, [id])

  //   const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesData
  /* console.log(teamBannerUrl)
  console.log(latestMatchDetails)
  console.log(recentMatches) */

  return (
    <>
      {isLoading ? (
        <div data-testid="loader" className="loader-container">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
        </div>
      ) : (
        <div className={`team-match-details ${id}`}>
          <div className="banner-img-container">
            <img
              src={matchesData.teamBannerUrl}
              alt="team banner"
              className="banner-img"
            />
          </div>
          <LatestMatch latestMatch={matchesData.latestMatchDetails} />
          <ul className="recent-matches-list">
            {matchesData.recentMatches.map(eachMatch => (
              <MatchCard matchData={eachMatch} key={eachMatch.id} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default TeamMatches
