/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { updateRecipe } from '../../utils/data/apiData/recipes';

export default function Method({ methodObj, recipe }) {
  const router = useRouter();
  const payload = {
    methodId: methodObj.id,
  };
  const handleSubmit = () => {
    updateRecipe(recipe.id, payload).then(() => router.push(`/create/recipes/${recipe.id}`));
  };

  const src = `${methodObj.image_url}`;
  return (
    <div className="method-circle">
      <div>
        <Nav.Link type="submit" onClick={handleSubmit}>
          <Image className="method-circle-content" loader={() => src} height={140} width={140} src={methodObj.image_url} />
        </Nav.Link>
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
  ).isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
