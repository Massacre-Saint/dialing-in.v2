import React from 'react';
import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';

export default function BrewButton() {
  const router = useRouter();
  const { id } = router.query;
  const handleClick = () => {
    router.push({
      pathname: '/read/brew',
      query: { id },
    });
  };
  return (
    <>
      <button type="button" className="btn-lg btn-span-lg-bottom" onClick={handleClick}>Start Brewing</button>
    </>
  );
}
