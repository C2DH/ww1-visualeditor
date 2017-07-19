import React from 'react'
import { Card, CardTitle, Badge } from 'reactstrap'
import BackgroundPreview from '../../BackgroundPreview'
import './GenericCard.css'

const PublishedThemeLabel = () => (
  <div style={{ padding:3 }}>
    <Badge>Published</Badge>
  </div>
)

const GenericCard = ({
  title,
  backgroundType = 'image',
  backgroundImage,
  backgroundColor,
  backgroundColorOverlay,
  pubblished,
  footerButton = null,
  editButtons = null,
}) => (
  <div>
    <Card className="GenericCard__card">
      <BackgroundPreview
        containerClassName="GenericCard__div_img"
        overlayClassName="GenericCard__div_img_overlay"
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
        backgroundColorOverlay={backgroundColorOverlay}
        backgroundType={backgroundType}>
        {pubblished && <PublishedThemeLabel />}
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
