/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function Method({ methodObj }) {
  const src = `${methodObj.image_url}`;
  return (
    <div className="method-circle">
      <div>
        <Link passHref href={`/read/recipes/${methodObj.id}`}>
          <a>
            <Image
              className="method-circle-content"
              loader={() => src}
              height={140}
              width={140}
              src={methodObj.image_url}
            />
          </a>
        </Link>
      </div>
      <h4>{methodObj.name}</h4>
    </div>
  );
}
Method.propTypes = {
  methodObj: PropTypes.shape(
    {
      id: PropTypes.number,
      image_url: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
    },
  ),
};
Method.defaultProps = {
  methodObj: PropTypes.shape(
    {
      id: '',
      image_url: '',
      description: '',
      name: '',
    },
  ),
};
