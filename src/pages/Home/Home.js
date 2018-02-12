import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isNull } from 'lodash'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Badge } from 'reactstrap';
import AddButton from '../../components/AddButton'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'
import ThemeCard from '../../components/cards/ThemeCard'
import EducationalCard from '../../components/cards/EducationalCard'
import './Home.css'
import {
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
  deleteTheme,
  loadEducationals,
  unloadEducationals,
  deleteEducational,
} from '../../state/actions'
import {
  makeTranslator,
  getStaticStories,
  getThemes,
  getEducationals,
  areEducationalsLoading,
  areThemesLoading,
  areStaticStoriesLoading,
} from '../../state/selectors'


class Home extends PureComponent {
  state = {
    themeToDelete: null,
    educationalToDelete: null,
  }

  componentDidMount() {
    this.props.loadStaticStories()
    this.props.loadThemes()
    this.props.loadEducationals()
  }

  componentWillUnmount() {
    this.props.unloadStaticStories()
    this.props.unloadThemes()
    this.props.unloadEducationals()
  }

  // theme modal

  askDeleteTheme = theme => this.setState({ themeToDelete: theme })

  clearDeleteThemeModal = () => this.setState({ themeToDelete: null })

  deleteTheme = () => {
    this.props.deleteTheme(this.state.themeToDelete.id)
    this.setState({ themeToDelete: null })
  }

  // edu modal

  askDeleteEducational = educational =>
    this.setState({ educationalToDelete: educational })

  clearDeleteEducationalModal = () =>
    this.setState({ educationalToDelete: null })

  deleteEducational = () => {
    this.props.deleteEducational(this.state.educationalToDelete.id)
    this.setState({ educationalToDelete: null })
  }

  render() {
    const {
      staticStories,
      loadingStaticStories,
      themes,
      educationals,
      deletingThemes,
      deletingEducationals,
      trans,
      loadingThemes,
      loadingEducationals,
    } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md={4}>
            <div className="Home__Col-title-container">
              <h4>Themes</h4>
            </div>
            <div className="Home__Addbtn_container">
              <AddButton label="Add theme" tag={Link} to={'/themes/new'}/>
            </div>

            <div className="Home__Col-card-container">
              {(!themes && loadingThemes) && <Spinner />}
              {themes && themes.map((theme, i) => (
                <Link
                  key={theme.id}
                  to={`/themes/${theme.id}`}
                  style={deletingThemes[theme.id] ? { pointerEvents: 'none' } : undefined}>
                  <div style={deletingThemes[theme.id] ? { opacity: 0.5 } : undefined}>
                    <ThemeCard
                      theme={theme}
                      onDeleteClick={e => {
                        e.preventDefault()
                        this.askDeleteTheme(theme)
                      }}
                    />
                  </div>
                 </Link>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="Home__Col-title-container">
              <h4>Educational</h4>
            </div>
            <div className="Home__Addbtn_container">
              <AddButton label="Add educational" tag={Link} to={'/educationals/new'}/>
            </div>
            <div className="Home__Col-card-container">
              {(!educationals && loadingEducationals) && <Spinner />}
              {educationals && educationals.map((educational, i) => (
                <Link
                  key={i}
                  to={`/educationals/${educational.id}`}
                  style={deletingEducationals[educational.id] ? { pointerEvents: 'none' } : undefined}>
                  <div style={deletingEducationals[educational.id] ? { opacity: 0.5 } : undefined}>
                    <EducationalCard
                      educational={educational}
                      onDeleteClick={e => {
                        e.preventDefault()
                        this.askDeleteEducational(educational)
                      }}
                    />
                  </div>
                 </Link>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="Home__Col-title-container">
              <h4>Static Pages</h4>
            </div>
            {(!staticStories && loadingStaticStories) && <Spinner />}
            <div>
              {staticStories && staticStories.map(story => (
                <Button tag={Link} to={`/static/${story.id}`} key={story.id} block>{story.slug}</Button>
              ))}
            </div>
          </Col>
        </Row>
        <Modal isOpen={!isNull(this.state.themeToDelete)} toggle={this.clearDeleteThemeModal}>
          <ModalHeader>Delete theme</ModalHeader>
          <ModalBody>
            Delete theme {trans(this.state.themeToDelete, 'data.title')}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearDeleteThemeModal}>Undo</Button>
            <Button color="danger" onClick={this.deleteTheme}>Delete</Button>{' '}
          </ModalFooter>
        </Modal>
        <Modal isOpen={!isNull(this.state.educationalToDelete)} toggle={this.clearDeleteEducationalModal}>
          <ModalHeader>Delete educational</ModalHeader>
          <ModalBody>
            Delete educational {trans(this.state.educationalToDelete, 'data.title')}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearDeleteEducationalModal}>Undo</Button>
            <Button color="danger" onClick={this.deleteEducational}>Delete</Button>{' '}
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  staticStories: getStaticStories(state),
  loadingStaticStories: areStaticStoriesLoading(state),
  themes: getThemes(state),
  deletingThemes: state.themes.deleting,
  loadingThemes: areThemesLoading(state),
  educationals: getEducationals(state),
  deletingEducationals: state.educationals.deleting,
  loadingEducationals: areEducationalsLoading(state),
})

export default connect(mapStateToProps, {
  deleteTheme,
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
  loadEducationals,
  unloadEducationals,
  deleteEducational,
})(Home)
