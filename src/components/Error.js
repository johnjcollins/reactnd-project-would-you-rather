import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Error = props => {
  return (
    <Fragment>
      <Typography variant="h4" gutterBottom="true">
        Sorry, that page was not found.
      </Typography>
      <Typography variant="subtitle1">
        Please <Link to="/">sign in</Link> to continue.
      </Typography>
    </Fragment>
  );
};

export default Error;
