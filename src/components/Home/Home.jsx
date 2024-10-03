import { getGames } from '../../api/api';
import { useEffect, useState } from 'react';
import Popular from '../Popular/Popular';

export default function Home() {
  return (
    <>
      <Popular />
    </>
  );
}
