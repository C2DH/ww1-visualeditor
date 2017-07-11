import React from 'react'
import { Card, CardImg, CardTitle, Badge } from 'reactstrap'
import './GenericCard.css'

const PublishedThemeLabel = () => (
  <div style={{margin:3}}>
    <Badge>Published</Badge>
  </div>
)


const GenericCard = ({ title="", cover="", footerButton=null, editButtons=null, status=null }) => (
  <div>
    <Card className="GenericCard__card">
      {/* <CardImg top width="100%" src={cover} alt="Card image cap" className="GenericCard__img" /> */}
      <div className="GenericCard__div_img" style={{backgroundImage: `url(${cover})`}}>
        {(status === 'public') && <PublishedThemeLabel />}
      </div>
        <div className="GenericCard__editButtons_container">
          { editButtons }
        </div>
      <div className="GenericCard__textContainer">
        <CardTitle className="GenericCard__title">{title}</CardTitle>
        <div className="GenericCard_footerButton">{ footerButton }</div>
      </div>
    </Card>
    </div>
)

export default GenericCard
