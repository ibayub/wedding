import { useState, useEffect } from "react";
import { Button, Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/ui";

export default function Component() {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch('/api/getNames'); // Adjust this to your API endpoint
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

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setTableNumber(null);
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion); // Set the full name when a suggestion is clicked
    setFilteredSuggestions([]);
  };

  return (
    <div className="min-h-screen h-screen bg-custom-image bg-cover bg-center flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* Updated the image to show the bottom part and crop from the top */}
          <img 
            src="/header.jpg" 
            alt="Wedding Header" 
            className="w-full h-32 object-cover object-bottom mb-4" 
          />
          <CardTitle className="text-2xl font-bold text-center">Neishay & Hussain Wedding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Find my Table</h2>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Start typing your name" // Updated placeholder text
                  value={name}
                  onChange={handleNameChange}
                  disabled={isLoading}
                  autoComplete="off"
                />
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Finding Table..." : "Find Table"}
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
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Made with ❤️ and ☕ by Ibrahim
        </CardFooter>
      </Card>
    </div>
  );
}
