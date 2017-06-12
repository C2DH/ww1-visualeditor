import React from 'react'
import { Card, CardImg, CardBlock, CardTitle, Button } from 'reactstrap'
import './ThemesCard.css'

const ThemesCard = (props) => (
  <div>
    <Card className="ThemesCard__card">
      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
      <div className="ThemesCard__textContainer">
        <CardTitle>{props.title}</CardTitle>
        <Button className="ThemesCard__deleteBtn">Button</Button>
      </div>
    </Card>
    </div>
)

export default ThemesCard
