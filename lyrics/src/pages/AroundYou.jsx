import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGetTopChartsCountryQuery } from '../redux/services/shazamCore';
import {Error, Loader, SongCard} from '../components'


const AroundYou = () => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying } = useSelector((state)=> state.player)
    const {data, isFetching, error} = useGetTopChartsCountryQuery();
console.log(country, data)
    useEffect(()=>{
        axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_vcU6v0MCrIdH0505xYMOLUntyLsUP')
        .then((res)=> setCountry(res?.data?.location?.country))
        .catch((err)=>console.log(err))
        .finally(()=> setLoading(false))
    }, [])

    if(isFetching) return <Loader title="Loading songs around you"/>

    if(error && country) return <Error />


    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around You in <span className='font-bold text-green-500'>{country}</span></h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i)=>(
                    <SongCard 
                        key={song.id}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
