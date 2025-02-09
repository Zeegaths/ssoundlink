import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";
import MainAppWrapper from "./MainAppWrapper";
import useGetGenres from "../hooks/UseGetGenres";
const CreateProfile = () => {
  const [currentStep, setCurrentStep] = useState("roleSelection"); // Initial step
  const [selectedRole, setSelectedRole] = useState(""); // Track selected role
  const [selectedGenres, setSelectedGenres] = useState([]); // Track selected genres

  // Use the custom hook to fetch genres from the contract
  const genres = useGetGenres();

  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setCurrentStep("genreSelection");
  };

  const toggleGenreSelection = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = () => {
    const profile = { role: selectedRole, genres: selectedGenres };
    console.log("Profile data:", profile);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/"); // Navigate to the root route or next step
  };

  return (
    <MainAppWrapper>
      <div className="max-w-lg mx-auto mt-20">
        {/* Role Selection */}
        {currentStep === "roleSelection" && (
          <div className="text-center">
            <h3 className="text-3xl font-bold">Choose Your Role</h3>
            <p className="mt-4">Are you a Producer or a Collector?</p>
            <div className="mt-6 flex justify-center gap-6">
              {/* Producer Card */}
              <div
                className={`cursor-pointer border rounded-lg p-6 ${
                  selectedRole === "Producer" ? "border-blue-500" : "border-gray-300"
                } hover:shadow-lg`}
                onClick={() => handleRoleSelection("Producer")}
              >
                <h4 className="text-xl font-bold text-blue-500">Producer</h4>
                <p className="text-sm mt-2">Create and share your beats.</p>
              </div>

              {/* Collector Card */}
              <div
                className={`cursor-pointer border rounded-lg p-6 ${
                  selectedRole === "Collector" ? "border-blue-500" : "border-gray-300"
                } hover:shadow-lg`}
                onClick={() => handleRoleSelection("Collector")}
              >
                <h4 className="text-xl font-bold text-green-500">Collector</h4>
                <p className="text-sm mt-2">Discover and collect great music.</p>
              </div>
            </div>
          </div>
        )}

        {/* Genre Selection */}
        {currentStep === "genreSelection" && (
          <div className="text-center">
            <h3 className="text-3xl font-bold">Pick Your Favorite Genres</h3>
            <p className="mt-4">Select the genres you're interested in.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Display genres dynamically */}
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <div
                    key={genre}
                    className={`cursor-pointer border rounded-lg p-4 ${
                      selectedGenres.includes(genre)
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    } hover:shadow-lg`}
                    onClick={() => toggleGenreSelection(genre)}
                  >
                    <p className="text-sm font-medium">{genre}</p>
                  </div>
                ))
              ) : (
                <p>Loading genres...</p> // Show loading state if genres are not fetched yet
              )}
            </div>
            <div className="mt-8">
              <LoadingButton
                className="px-6 py-3 text-white bg-blue-500 rounded-md"
                onClick={handleSubmit}
                loading={false}
              >
                Submit
              </LoadingButton>
            </div>
          </div>
        )}
      </div>
    </MainAppWrapper>
  );
};

export default CreateProfile;
