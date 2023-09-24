export default utility = {
    // fetch movies on homescreen
    fetchMovies: async (page_no) => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page_no}`)
        const data = await response.json();
        return data;
    },
    fetchTvShows: async (page_no) => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page_no}`)
        const data = await response.json();
        return data;
    }
    ,
    // fetch details of movie on the basis of id
    fetchMovieDetail: async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
        const data = await response.json();
        return data;
    },
    // fetch the trailer details of movie on the basis of id
    fetchMovieTrailer: async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
        const data = await response.json();
        return data;

    },
    fetchTvDetail: async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
        const data = await response.json();
        return data;
    },
    // fetch the trailer details of movie on the basis of id
    fetchTvTrailer: async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
        const data = await response.json();
        return data;

    }







}