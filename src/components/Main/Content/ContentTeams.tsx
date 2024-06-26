import React from 'react'
import { AppState } from 'store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loader from 'components/Common/Loader'
import { getTeams } from 'store/teams/selectors'
import { fetchTeams } from 'store/teams/actions'
import IconOval from 'components/Common/Icons/Common/Oval'
import { IContentTeamsProps } from 'store/teams/types'
import AddBigButton from 'components/Common/Buttons/AddBigButton'
import TeamCards from './TeamCards'

const Wrapper = styled.div`
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const TeamsTitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`
const TeamsMore = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  @media (max-width: 450px) {
    display: none;
  }
`
const Teams = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ContentTeams: React.FC<IContentTeamsProps> = props => {
  const { teams } = props

  React.useEffect(() => {
    !teams.length && props.fetchTeams()
  }, [])

  return (
    <Wrapper>
      <Header>
        <TeamsTitle>Teams</TeamsTitle>
        <TeamsMore>
          <IconOval />
        </TeamsMore>
      </Header>
      <Teams>
        {teams.length ? <TeamCards {...props} /> : <Loader height={'none'} />}
        <AddBigButton name='Add team' />
      </Teams>
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    teams: getTeams(state)
  }
}

const mapDispatchToProps = {
  fetchTeams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTeams)
