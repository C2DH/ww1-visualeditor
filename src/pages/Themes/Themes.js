import React, { PureComponent } from 'react'
import { get, isNull } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import TopSearchInput from '../../components/TopSearchInput'
import AddButton from '../../components/AddButton'
import ThemeCard from '../../components/cards/ThemeCard'
import Spinner from '../../components/Spinner'
import {
  loadThemes,
  unloadThemes,
  deleteTheme,
  moveThemeAhead,
  moveThemeBack,
} from '../../state/actions'
import {
  getThemes,
  areThemesLoading,
  makeTranslator,
  getThemesPerformingMoving,
} from '../../state/selectors'
import './Themes.css'


class Themes extends PureComponent {
  state = {
    themeToDelete: null,
  }

  componentDidMount() {
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadThemes()
  }

  askDeleteTheme = theme => this.setState({ themeToDelete: theme })

  clearDeleteThemeModal = () => this.setState({ themeToDelete: null })

  deleteTheme = () => {
    this.props.deleteTheme(this.state.themeToDelete.id)
    this.setState({ themeToDelete: null })
  }

  render() {
    const { trans, themes, loading, deleting, performingMoving } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Themes">
          {/* <TopSearchInput /> */}
          {performingMoving && <Spinner noPadding x={1} />}
        </HeadingRow>

        <Row>
          <Col md="3" className="Themes__AddButton-container">
            <AddButton label="Add theme" tag={Link} to={'/themes/new'} />
          </Col>
          {(!themes && loading) && (
            <Col md={9}><Spinner /></Col>
          )}
          {themes && themes.map((theme, i) => (
            <Col md="3" key={theme.id}>
              <Link to={`/themes/${theme.id}`} style={deleting[theme.id] ? { pointerEvents: 'none' } : undefined}>
                <div style={deleting[theme.id] ? { opacity: 0.5 } : undefined}>
                  <ThemeCard
                    theme={theme}
                    showBackButton={i > 0}
                    showAheadButton={i < themes.length - 1}
                    onAheadClick={e => {
                      e.preventDefault()
                      this.props.moveThemeAhead(themes, i, theme.id)
                    }}
                    onBackClick={e => {
                      e.preventDefault()
                      this.props.moveThemeBack(themes, i, theme.id)
                    }}
                    onDeleteClick={e => {
                      e.preventDefault()
                      this.askDeleteTheme(theme)
                    }}
                  />
                </div>
              </Link>
            </Col>
          ))}
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
  themes: getThemes(state),
  loading: areThemesLoading(state),
  deleting: state.themes.deleting,
  performingMoving: getThemesPerformingMoving(state),
})

export default connect(mapStateToProps, {
  loadThemes,
  unloadThemes,
  deleteTheme,
  moveThemeAhead,
  moveThemeBack,
})(Themes)
