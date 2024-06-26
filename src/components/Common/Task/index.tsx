import React from 'react'
import { AppState } from 'store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Avatar from 'components/Common/Avatar'
import { ITaskState } from 'store/tasks/types'
import TaskModal from 'components/Common/TaskModal'
import { ITeamListUserState } from 'store/teams/types'
import { getKanbanOption } from 'store/show/selectors'
import TasksIcon from 'components/Common/Icons/Menu/Tasks'
import AttachIcon from 'components/Common/Icons/Common/Attach'
import ActivityIcon from 'components/Common/Icons/Menu/Activity'

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props: ITaskProps) => !props.option && 'space-around'};
  flex-direction: ${(props: ITaskProps) => (props.option ? 'column' : 'row')};
  cursor: move;
  border-radius: 20px;
  padding: 15px;
  margin: 0 5px 10px 5px;
  background: ${props =>
    props.drag
      ? `repeating-linear-gradient(
    45deg,
    white,
    white 5px,
    #f1f1f5 5px,
    #f1f1f5 10px
  )`
      : 'white'};
  border: ${props => (props.drag ? '1px dashed #92929d' : '1px dashed white')};
  opacity: ${props => (props.drag ? '0.999' : '1')};
`
const TextStyles = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #92929d;
`
const Titles = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled(TextStyles)`
  color: #171725;
  margin-bottom: 7px;
  text-decoration: ${(props: ITaskProps) =>
    props.data.score.days === 0 && 'line-through'};
`
const Team = styled(TextStyles)`
  color: #696974;
`
const Attach = styled(TextStyles)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`
const Status = styled(TextStyles)`
  margin: 0 15px 0 20px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    fill: #92929d;
    width: 14px;
    height: 14px;
  }
`
const Activity = styled(Status)`
  background-color: ${(props: ITaskProps) => props.data.score.colors.bg};
  color: ${(props: ITaskProps) => props.data.score.colors.text};
  padding: 5px;
  border-radius: 5px;
  margin: 0;
  span:last-child {
    margin-left: 5px;
  }
  svg {
    fill: ${(props: ITaskProps) => props.data.score.colors.text};
  }
`
const Info = styled.div`
  display: flex;
  margin: 15px 0 10px 0;
`
const Score = styled.div`
  display: flex;
  flex-direction: ${(props: ITaskProps) =>
    props.option ? 'column' : 'row-reverse'};
  align-items: ${(props: ITaskProps) => !props.option && 'center'};
`
const ScoreLine = styled.div`
  background-color: #e2e2ea;
  width: 100%;
  height: 3px;
  border-radius: 2.5px;
  min-width: ${(props: ITaskProps) => !props.option && '150px'};
  div {
    height: 3px;
    background-color: #3dd598;
    width: ${(props: ITaskProps) => `${props.data.line}%`}
`
const ScoreLineTitle = styled(Team)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: ${(props: ITaskProps) => !props.option && '10px'};
`
const Users = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  margin: 10px 0 0 0;
`

interface ITaskProps {
  data: ITaskState
  key: string
  option: boolean
  drag?: boolean
}

const Task: React.FC<ITaskProps> = props => {
  const { data } = props

  const [modal, setModal] = React.useState<boolean>(false)
  const [drag, setDrag] = React.useState<boolean>(false)

  const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    setDrag(prevState => !prevState)
    e.dataTransfer.setData('text/html', data.id)
  }

  const toggleModal = (): void => {
    setModal(prevState => !prevState)
  }

  const users = data.users.map(
    (user: ITeamListUserState, idx: number): object => (
      <Avatar key={idx} {...user} />
    )
  )

  return (
    <>
      <Wrapper
        {...props}
        draggable={true}
        onDragStart={onDragStart}
        onClick={toggleModal}
        drag={drag}
      >
        <Titles>
          <Title {...props}>{data.title}</Title>
          <Team>{data.team}</Team>
        </Titles>
        <Info>
          <Attach>
            <AttachIcon />
            {data.attach}
          </Attach>
          <Status>
            <TasksIcon />
            {data.status}
          </Status>
          {data.score.days > 0 && (
            <Activity {...props}>
              <ActivityIcon />
              <span>{data.score.days}</span>
              <span>days left</span>
            </Activity>
          )}
        </Info>
        <Score {...props}>
          <ScoreLineTitle {...props}>{data.line}%</ScoreLineTitle>
          <ScoreLine {...props}>
            <div />
          </ScoreLine>
        </Score>
        <Users>{users}</Users>
      </Wrapper>
      <>{modal && <TaskModal {...data} onClose={toggleModal} />}</>
    </>
  )
}
const mapStateToProps = (state: AppState) => {
  return {
    option: getKanbanOption(state)
  }
}

export default connect(mapStateToProps)(Task)
