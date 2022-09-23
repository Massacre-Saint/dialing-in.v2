import React from 'react';
import { useRouter } from 'next/router';

export default function BrewButton() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const handleClick = () => {
    router.push({
      pathname: '/read/brew',
      query: { firebaseKey },
    });
  };
  return (
    <button type="button" className="btn-lg btn-span-lg-bottom" onClick={handleClick}>Start Brewing</button>
  );
}
