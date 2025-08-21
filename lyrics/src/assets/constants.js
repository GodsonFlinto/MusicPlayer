import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'Trending now', value: 'trending now tamil songs' },
  { title: 'Hip-Hop', value: 'hip hop rap hits' },
  { title: 'Dance', value: 'thalapathy vijay songs' },
  { title: 'Electronic', value: 'electronic music' },
  { title: 'Soul', value: 'soul rnb' },
  { title: 'Alternative', value: 'alternative rock' },
  { title: 'Rock', value: 'rock hits' },
  { title: 'Latin', value: 'latin hits' },
  { title: 'Film', value: 'film tv music' },
  { title: 'Country', value: 'country hits' },
  { title: 'Worldwide', value: 'worldwide hits' },
  { title: 'Reggae', value: 'reggae dancehall' },
  { title: 'House', value: 'house music' },
  { title: 'K-Pop', value: 'k pop hits' },
];


export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];
