import { Row, Col } from 'react-bootstrap';
import { Menu } from '../Menu';
import { Film } from '../Film';

export const Main = ({ films, handleMenuItemClick, currentFilm }) => {
  if (!films.length) {
    return null
  }

  return (
    <Row>
      <Col xs={3}>
        <Menu
          list={films}
          currentFilm={currentFilm}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Col>
      <Col xs={9}>
        <Film data={currentFilm} />
      </Col>
    </Row>
  )
}