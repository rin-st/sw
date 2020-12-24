import { ListGroup } from 'react-bootstrap';

export const Menu = ({ list, currentFilm, handleMenuItemClick }) => {
  return (
    <ListGroup as='ul'>
      {
        list.map(({
          title,
          episode_id
        }) => (
          <ListGroup.Item
            as='li'
            active={episode_id === currentFilm.episode_id}
            onClick={handleMenuItemClick(title)}
            action
            key={episode_id}
          >
            {title}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}