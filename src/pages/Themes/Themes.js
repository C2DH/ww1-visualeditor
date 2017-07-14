import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import TopSearchInput from '../../components/TopSearchInput'
import AddButton from '../../components/AddButton'
import ThemeCard from '../../components/cards/ThemeCard'
import Spinner from '../../components/Spinner'
import {
  loadThemes,
  unloadThemes,
} from '../../state/actions'
import {
  getThemes,
  areThemesLoading,
  makeTranslator,
} from '../../state/selectors'
import './Themes.css'


class Themes extends PureComponent {
  componentDidMount() {
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadThemes()
  }

  render() {
    const { trans, themes, loading } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Themes">
          <TopSearchInput />
        </HeadingRow>

        <Row>
          <Col md="3" className="Themes__AddButton-container">
            <AddButton label="Add theme" tag={Link} to={'/themes/new'} />
          </Col>
          {(!themes && loading) && (
            <Col md={9}><Spinner /></Col>
          )}
          {themes && themes.map(theme => (
            <Col md="3" key={theme.id}>
              <Link to={`/themes/${theme.id}`}>
                <ThemeCard
                  status={theme.status}
                  title={trans(theme, 'data.title')}
                  cover={get(theme, 'covers[0].attachment', "http://placehold.it/200x150.png&text=Noimage") }
                 />
               </Link>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  themes: getThemes(state),
  loading: areThemesLoading(state),
})

export default connect(mapStateToProps, {
  loadThemes,
  unloadThemes,
})(Themes)
