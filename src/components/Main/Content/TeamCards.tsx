import TeamCard from 'components/Common/TeamCard'
import React from 'react'
import { IContentTeamProps } from 'store/teams/types'

const TeamCards: React.FC<IContentTeamProps> = props => {
  return props.teams.map((team: any) => (
    <TeamCard
      id={0}
      avatar={team.avatar}
      name={team.name}
      key={team.id}
      users={team.users}
      {...team}
    />
  ))
}

export default TeamCards
