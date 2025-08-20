import React from 'react';
import { Link } from 'react-router-dom';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong.artwork} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        <Link to={`/songs/${activeSong.id}`}>{activeSong?.title ? activeSong?.title : 'No active Song'}</Link>
      </p>
      <p className="truncate text-gray-300">
        <Link to={`/artists/${activeSong.artistId || 'unknown'}`}> {activeSong?.artistName ? activeSong?.artistName : 'No active Song'}</Link>
      </p>
    </div>
  </div>
);

export default Track;
