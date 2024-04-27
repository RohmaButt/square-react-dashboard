import TeamCard from 'components/Common/TeamCard'
import React from 'react'
import { fetchTeams } from 'store/teams/actions'
import { ITeamsState } from 'store/teams/types'

interface IContentTeamsProps {
  fetchTeams: typeof fetchTeams
  teams: ITeamsState[] // Correct the type to match the structure of the teams array
}

const TeamCards: React.FC<IContentTeamsProps> = props => {
  return props.teams.map((team: ITeamsState) => (
    <TeamCard id={0} avatar={''} name={''} users={[]} key={team.id} {...team} /> // Assuming 'id' is a property of ITeamState
  ))
}

export default TeamCards
