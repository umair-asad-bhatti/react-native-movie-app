export default utility = {
    // fetch movies or tv on homescreen
    fetchMoviesOrTv: async (page_no, category) => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${category}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=115a80b1f5855a7a34cb5deeeefee1a2&page=${page_no}`)
        const data = await response.json();
        return data;
    },
    // fetch details of movie or tv show on the basis of id
    fetchMovieOrTvDetail: async (id, category) => {
        const response = await fetch(`https://api.themoviedb.org/3/${category}/${id}?api_key=115a80b1f5855a7a34cb5deeeefee1a2`)
        const data = await response.json();
        return data;
    },
    // fetch the trailer details of movie on the basis of id
    fetchMovieOrTvTrailer: async (id, category) => {
        const response = await fetch(`https://api.themoviedb.org/3/${category}/${id}/videos?language=en-US&api_key=115a80b1f5855a7a34cb5deeeefee1a2`)
        const data = await response.json();
        return data;

    },
    fetchSearchedMovieOrTv: async (searchQuery, category) => {
        const uri = `https://api.themoviedb.org/3/search/${category}?query=${searchQuery}&api_key=115a80b1f5855a7a34cb5deeeefee1a2`
        const response = await fetch(uri);
        const data = await response.json()
        return data;
    }
}