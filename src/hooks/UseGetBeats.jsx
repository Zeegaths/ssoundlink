
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { readOnlyProvider } from "../constants/provider";
import { getSoundlinkContract } from "../constants/contracts"; // Assume this utility provides the contract instance

const useGetBeats = () => {
    const [Beats, setBeats] = useState([]); // State to store the list of Beats

    // Function to fetch Beats from the contract
    const fetchBeats = useCallback(async () => {
        try {
            const contract = getSoundlinkContract(readOnlyProvider); // Read-only provider for public methods
            const genreList = await contract.getAllBeats(); // Call the `getBeats` method
            setBeats(genreList);
        } catch (error) {
            console.error("Error fetching Beats:", error);
        }
    }, []);

    // Function to handle the GenreAdded event
    const handleBeatAdded = useCallback((genre) => {
        setBeats((prevBeats) => [...prevBeats, genre]);
    }, []);

    // Function to handle the GenreRemoved event
    const handleBeatRemoved = useCallback((removedGenre) => {
        setBeats((prevBeats) =>
            prevBeats.filter((genre) => genre !== removedGenre)
        );
    }, []);

    useEffect(() => {
        fetchBeats();

        // const provider = new ethers.VITE_RPC_URL(
        //     import.meta.env.VITE_RPC_URL 
        // );

        const contract = getSoundlinkContract(readOnlyProvider); // Contract instance with WebSocket provider

        // Event filters
        const genreAddedFilter = contract.filters.GenreAdded();
        const genreRemovedFilter = contract.filters.GenreRemoved();

        // Set up listeners
        contract.on(genreAddedFilter, handleBeatAdded);
        contract.on(genreRemovedFilter, handleBeatRemoved);

        return () => {
            // Cleanup listeners on component unmount
            contract.off(genreAddedFilter, handleBeatAdded);
            contract.off(genreRemovedFilter, handleBeatRemoved);
        };
    }, [fetchBeats, handleBeatAdded, handleBeatRemoved]);

    return Beats;
};

export default useGetBeats;
