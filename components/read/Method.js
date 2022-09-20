import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function Method({ methodObj }) {
  const src = `${methodObj.imageUrl}`;
  return (
    <div className="method-circle">
      <div>
        <Link passHref href={`/read/recipes/${methodObj.firebaseKey}`}>
          <Image className="method-circle-content" loader={() => src} height={140} width={140} src={methodObj.imageUrl} />
        </Link>
      </div>
      <h4>{methodObj.name}</h4>
    </div>
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
