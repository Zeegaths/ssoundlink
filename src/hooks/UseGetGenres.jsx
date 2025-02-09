
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { readOnlyProvider } from "../constants/provider";
import { getSoundlinkContract } from "../constants/contracts"; // Assume this utility provides the contract instance

const useGetGenres = () => {
    const [genres, setGenres] = useState([]); // State to store the list of genres

    // Function to fetch genres from the contract
    const fetchGenres = useCallback(async () => {
        try {
            const contract = getSoundlinkContract(readOnlyProvider); // Read-only provider for public methods
            const genreList = await contract.getGenres(); // Call the `getGenres` method
            setGenres(genreList);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    }, []);

    // Function to handle the GenreAdded event
    const handleGenreAdded = useCallback((genre) => {
        setGenres((prevGenres) => [...prevGenres, genre]);
    }, []);

    // Function to handle the GenreRemoved event
    const handleGenreRemoved = useCallback((removedGenre) => {
        setGenres((prevGenres) =>
            prevGenres.filter((genre) => genre !== removedGenre)
        );
    }, []);

    useEffect(() => {
        fetchGenres();

        // const provider = new ethers.VITE_RPC_URL(
        //     import.meta.env.VITE_RPC_URL 
        // );

        const contract = getSoundlinkContract(readOnlyProvider); // Contract instance with WebSocket provider

        // Event filters
        const genreAddedFilter = contract.filters.GenreAdded();
        const genreRemovedFilter = contract.filters.GenreRemoved();

        // Set up listeners
        contract.on(genreAddedFilter, handleGenreAdded);
        contract.on(genreRemovedFilter, handleGenreRemoved);

        return () => {
            // Cleanup listeners on component unmount
            contract.off(genreAddedFilter, handleGenreAdded);
            contract.off(genreRemovedFilter, handleGenreRemoved);
        };
    }, [fetchGenres, handleGenreAdded, handleGenreRemoved]);

    return genres;
};

export default useGetGenres;
