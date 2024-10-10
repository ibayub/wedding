import { useState, useEffect, useRef } from "react";
import { Button, Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle, Separator, Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/ui";

// Loader Component
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default function Component() {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // NEW state for tracking upload status
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch names for suggestions
  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch('/api/getNames');
        const data = await response.json();
        setSuggestions(data.names || []);
      } catch (err) {
        console.error('Error fetching names:', err);
      }
    }

    fetchNames();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setName(userInput);

    if (userInput.length >= 3 && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }

    setTableNumber(null);
    setError(null);
  };

  const handleClearName = () => {
    setName("");
    setFilteredSuggestions([]);
    setTableNumber(null);
    setError(null);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setTableNumber(null);
      return;
    }

    setIsLoadingTable(true);
    setError(null);

    try {
      const response = await fetch(`/api/getTableNumber?name=${encodeURIComponent(name)}`);
      const data = await response.json();

      if (response.ok) {
        setTableNumber(data.tableNumber);
      } else {
        setError(data.message || "An error occurred while fetching your table number.");
      }
    } catch (err) {
      console.error('Error fetching table number:', err);
      setError("An error occurred while fetching your table number. Please try again.");
    } finally {
      setIsLoadingTable(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setFilteredSuggestions([]);
  };

  // Handle photo uploads
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  // Handle photo submission with loader
  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (photos.length === 0) return;

    setIsUploading(true);  // Show the loader when upload starts

    try {
      const uploadPromises = photos.map(async (photo) => {
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'wedding_uploads');

        const res = await fetch('https://api.cloudinary.com/v1_1/movig/image/upload', {
          method: 'POST',
          body: formData,
        });

        return res.json();
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      console.log("All Cloudinary responses", uploadedFiles);

      setPhotos([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setIsDialogOpen(true);  // Show success dialog after upload
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
    } finally {
      setIsUploading(false);  // Hide the loader when done
    }
  };

  return (
    <div className="min-h-screen h-screen bg-custom-image bg-cover bg-center flex items-center justify-center p-4">
      {/* Show loader if uploading */}
      {isUploading && <Loader />}

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/header.jpg" alt="Wedding Header" className="w-full h-32 object-cover object-bottom mb-4" />
          <CardTitle className="text-2xl font-bold text-center">Neishay & Hussain Wedding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Find my Table</h2>
            <form onSubmit={handleNameSubmit} className="space-y-4 relative">
              <div className="space-y-2 relative">
                <Label htmlFor="name">Your Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Start typing your name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isLoadingTable}
                    autoComplete="off"
                    className="w-full pr-10"
                  />
                  {name && (
                    <button
                      type="button"
                      onClick={handleClearName}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-1 w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {filteredSuggestions.length > 0 && (
                  <ul className="border rounded bg-white max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button
                type="submit"
                className={`w-full ${!name ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                disabled={!name || isLoadingTable}
              >
                {isLoadingTable ? "Finding Table..." : "Find Table"}
              </Button>
            </form>
          </div>

          {tableNumber && (
            <div className="text-center p-4 bg-green-100 rounded-md">
              <p className="font-semibold">Welcome, {name}!</p>
              <p className="text-sm text-gray-700">Your table number is: {tableNumber}</p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-100 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Separator />

          {/* Photo upload form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Share your Photos!</h2>
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos</Label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  ref={fileInputRef}
                  required
                />
              </div>
              {photos.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Photo Preview</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className={`w-full ${photos.length === 0 ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-600'}`}
                disabled={photos.length === 0}
              >
                Submit Photos
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Made with ❤️ and ☕ by Ibrahim
        </CardFooter>
      </Card>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photos Uploaded Successfully</DialogTitle>
            <DialogDescription>Your photos have been uploaded. Thank you for sharing!</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
