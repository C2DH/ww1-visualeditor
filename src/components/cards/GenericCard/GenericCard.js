import React from 'react'
import { Card, CardTitle, Badge } from 'reactstrap'
import BackgroundPreview from '../../BackgroundPreview'
import './GenericCard.css'

const PublishedThemeLabel = ({ pos }) => (
  <div style={pos === 'top' ? { padding:3 } : { position: 'absolute', bottom: 65, left: 5 }}>
    <Badge>Published</Badge>
  </div>
)

const SelectedModuleLabel = () => (
  <div style={{ padding:3 }}>
    <Badge color="success">Selected</Badge>
  </div>
)


const GenericCard = ({
  title,
  backgroundType = 'image',
  backgroundImage,
  backgroundColor,
  backgroundColorOverlay,
  pubblished,
  selected,
  cardClick = null,
  footerButton = null,
  editButtons = null,
  className = 'GenericCard__card'
}) => (
  <div>
    <Card
      className={className}
      onClick={cardClick}
      >
      <BackgroundPreview
        containerClassName="GenericCard__div_img"
        overlayClassName="GenericCard__div_img_overlay"
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
        backgroundColorOverlay={backgroundColorOverlay}
        backgroundType={backgroundType}>
        {pubblished && <PublishedThemeLabel pos={editButtons ? 'bottom' : 'top'}  />}
        {selected && <SelectedModuleLabel />}
      </BackgroundPreview>
      <div className="GenericCard__editButtons_container">
        {editButtons}
      </div>
      <div className="GenericCard__textContainer">
        <CardTitle className="GenericCard__title">{title}</CardTitle>
        <div className="GenericCard_footerButton">{footerButton}</div>
      </div>
    </Card>
  </div>
)

export default GenericCard
