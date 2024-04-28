import { fetchTeams } from './actions'

export const FETCH_TEAMS = 'FETCH_TEAMS'

export interface ITeamListUserState {
  size: number
  name: string
  color: string
  avatar: string
}

export interface ITeamListState {
  id: number
  avatar: string
  name: string
  users: ITeamListUserState[]
}

export interface ITeamsState {
  list: ITeamListState[]
}

export interface ITeamsFetchTeamsAction {
  type: typeof FETCH_TEAMS
  payload: ITeamsState
}

export interface IContentTeamsProps {
  fetchTeams: typeof fetchTeams
  teams: ITeamsState[] // Correct the type to match the structure of the teams array
}

export interface IContentTeamProps {
  teams: ITeamsState[] // Correct the type to match the structure of the teams array
}
