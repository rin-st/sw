import { Row, Col, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  review: yup.string().required()
});

const ReviewForm = ({ handleSubmitReview }) => {
  return (
    <Row>
      <Col md={{ span: 8, offset: 3 }}>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmitReview}
          initialValues={{
            username: '',
            email: '',
            review: ''
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.username}
                    isValid={touched.username && !errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback>{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group md="12" controlId="validationFormik03">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Review"
                    name="review"
                    as='textarea'
                    value={values.review}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.review}
                    isValid={touched.review && !errors.review}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.review}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default ReviewForm;