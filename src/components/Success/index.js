import { Row, Col, Button } from 'react-bootstrap';

export const Success = ({ reviewData, currentFilmTitle, goBack }) => {
  if (!reviewData) {
    return null;
  }

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <h3>Success!</h3>
        <h4>{`Thanks for reviewing ${currentFilmTitle}`}</h4>
        <h5>Your data:</h5>
        <p>{`Username: ${reviewData.username}`}</p>
        <p>{`Email: ${reviewData.email}`}</p>
        <p>{`review: ${reviewData.review}`}</p>
        <Button
          variant="primary"
          onClick={goBack}
        >
          Back
                </Button>
      </Col>
    </Row>
  )
}
