import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isNull } from 'lodash'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Badge } from 'reactstrap';
import AddButton from '../../components/AddButton'
import { Link } from 'react-router-dom'
import ThemeCard from '../../components/cards/ThemeCard'
import './Home.css'
import {
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
  deleteTheme,
} from '../../state/actions'
import {
  makeTranslator,
  getStaticStories,
  getThemes,
  areThemesLoading,
} from '../../state/selectors'


class Home extends PureComponent {
  state = {
    themeToDelete: null,
  }

  componentDidMount() {
    this.props.loadStaticStories()
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadStaticStories()
    this.props.unloadThemes()
  }

  askDeleteTheme = theme => this.setState({ themeToDelete: theme })

  clearDeleteThemeModal = () => this.setState({ themeToDelete: null })

  deleteTheme = () => {
    this.props.deleteTheme(this.state.themeToDelete.id)
    this.setState({ themeToDelete: null })
  }

  render() {
    const { staticStories, themes, deleting, trans } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md={4}>
            <div className="Home__Col-title-container">
              <h4>Last Themes</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div className="Home__Addbtn_container">
              <AddButton label="Add theme" tag={Link} to={'/themes/new'}/>
            </div>
            <div className="Home__Col-card-container">
              {themes && themes.map((theme, i) => (
                <Link key={i} to={`/themes/${theme.id}`} style={deleting[theme.id] ? { pointerEvents: 'none' } : undefined}>
                  <div style={deleting[theme.id] ? { opacity: 0.5 } : undefined}>
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
              <h4>Last Educational</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div>
              <AddButton label="Add Educational"/>
            </div>
          </Col>
          <Col md={4}>
            <div className="Home__Col-title-container">
              <h4>Static Pages</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
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
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  staticStories: getStaticStories(state),
  themes: getThemes(state),
  loading: areThemesLoading(state),
  deleting: state.themes.deleting,
})

export default connect(mapStateToProps, {
  deleteTheme,
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
})(Home)
