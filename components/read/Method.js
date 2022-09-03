import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export default function Method({ methodObj }) {
  return (
    <Link passHref href={`/read/recipes/${methodObj.firebaseKey}`}>
      <h1>{methodObj.name}</h1>
    </Link>
  );
}
Method.propTypes = {
  methodObj: PropTypes.shape(
    {
      firebaseKey: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
    },
  ),
};
Method.defaultProps = {
  methodObj: PropTypes.shape(
    {
      firebaseKey: '',
      imageUrl: '',
      description: '',
      name: '',
    },
  ),
};
