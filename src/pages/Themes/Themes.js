import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import TopSearchInput from '../../components/TopSearchInput'
import AddButton from '../../components/AddButton'
import ThemeCard from '../../components/cards/ThemeCard'
import {
  loadThemes,
  unloadThemes,
} from '../../state/actions'
import {
  getThemes,
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
    const { themes } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Themes">
          <TopSearchInput />
        </HeadingRow>

        <Row>
          <Col md="3" className="Themes__AddButton-container">
            <AddButton label="Add theme" />
          </Col>
          {themes && themes.map(theme => (
            <Col md="3" key={theme.id}>
              <Link to={`/themes/${theme.id}`}>
                <ThemeCard
                  title={theme.metadata.title.en_US}
                  cover="http://via.placeholder.com/350x150"
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
  themes: getThemes(state),
})

export default connect(mapStateToProps, {
  loadThemes,
  unloadThemes,
})(Themes)
