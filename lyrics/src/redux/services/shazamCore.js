import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': 'dc4fd91516mshe459b548351796cp1a88d4jsn332d362b32cd',
//     'x-rapidapi-host': 'shazam-core.p.rapidapi.com'
//   }
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers)=>{
            headers.set('x-rapidapi-key','dc4fd91516mshe459b548351796cp1a88d4jsn332d362b32cd')

            return headers
        },
    }),
    endpoints: (builder)=>({
        getTopCharts: builder.query({ query: ()=> '/charts/world?country_code=DZ' }),

    }),
})

export const {
    useGetTopChartsQuery,
} = shazamCoreApi