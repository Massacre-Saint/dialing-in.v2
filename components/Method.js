import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export default function Method({ methodObj }) {
  return (
    <Link passHref href={`/recipes/${methodObj.fbKey}`}>
      <h1>{methodObj.name}</h1>
    </Link>
  );
}
Method.propTypes = {
  methodObj: PropTypes.shape(
    {
      fbKey: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
    },
  ),
};
Method.defaultProps = {
  methodObj: PropTypes.shape(
    {
      fbKey: '',
      imageUrl: '',
      description: '',
      name: '',
    },
  ),
};
