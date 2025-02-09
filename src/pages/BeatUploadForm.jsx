import { useState } from "react";
import { pinata } from "../config";
import useGetGenres from "../hooks/UseGetGenres";
import useUploadBeats from "../hooks/UseUploadBeats";

const BeatUploadForm = () => {
  const { uploadBeat, isLoading, error } = useUploadBeats();
  const genres = useGetGenres();
  const [beatData, setBeatData] = useState({
    audio: null,
    cover: null,
    description: "",
    genre: "",
    name: "",
    price: "",
  });

  const [ipfsHashes, setIpfsHashes] = useState({
    audio: "",
    cover: "",
  });

  const [preview, setPreview] = useState({
    audio: null,
    cover: null,
  });

  const [isUploading, setIsUploading] = useState(false); // Define as a boolean to track overall upload status

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeatData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToIPFS = async (file, type) => {
    try {
      setIsUploading(true); // Set global uploading state
      const formData = new FormData();
      formData.append("file", file);

      const response = await pinata.upload.file(file);
      if (response?.cid) {
        setIpfsHashes((prev) => ({
          ...prev,
          [type]: response.cid,
        }));
        return `https://ipfs.io/ipfs/${response.cid}`;
      } else {
        throw new Error("Failed to upload to IPFS");
      }
    } catch (error) {
      console.error(`Error uploading ${type} to IPFS:`, error);
      return null;
    } finally {
      setIsUploading(false); // Reset global uploading state
    }
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setBeatData((prev) => ({ ...prev, [name]: file }));

    const hash = await uploadToIPFS(file, name);
    if (!hash) return;

    if (name === "cover") {
      const reader = new FileReader();
      reader.onload = () =>
        setPreview((prev) => ({ ...prev, cover: reader.result }));
      reader.readAsDataURL(file);
    }

    if (name === "audio") {
      const audioURL = URL.createObjectURL(file);
      setPreview((prev) => ({ ...prev, audio: audioURL }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ipfsHashes.audio || !ipfsHashes.cover) {
      alert("Please ensure all files are uploaded successfully.");
      return;
    }

    try {
      const result = await uploadBeat(
        ipfsHashes.audio,
        ipfsHashes.cover,
        beatData.name,
        beatData.genre,
        beatData.price
      );

      if (result) {
        alert("Beat uploaded successfully! 🎉");
        console.log("Uploaded Beat:", result);
      }
    } catch (err) {
      console.error("Error uploading beat:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Upload Your Beat
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Beat Name */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Beat Name</label>
          <input
            type="text"
            name="name"
            value={beatData.name}
            onChange={handleInputChange}
            placeholder="Enter beat name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Description <span className="text-sm text-gray-500">(Max 50 characters)</span>
          </label>
          <textarea
            name="description"
            value={beatData.description}
            onChange={handleInputChange}
            placeholder="Enter a short description"
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
          <p className="text-sm text-gray-500">{beatData.description.length}/50</p>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Genre</label>
          <select
            name="genre"
            value={beatData.genre}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Price (ETH)</label>
          <input
            type="number"
            name="price"
            value={beatData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Cover Image</label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isUploading}
            required
          />
          {preview.cover && (
            <img
              src={preview.cover}
              alt="Cover Preview"
              className="w-full mt-4 rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Audio File */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Audio File</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isUploading}
            required
          />
          {preview.audio && (
            <audio controls src={preview.audio} className="mt-4 w-full rounded-lg" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
          disabled={isUploading || isLoading}
        >
          {isLoading || isUploading ? "Uploading..." : "Upload Beat"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
      </form>
    </div>
  );
};

export default BeatUploadForm;
