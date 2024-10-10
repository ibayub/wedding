"use client"

import { useState, useRef, useCallback, forwardRef } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/ui";

// Forward Ref for Input Component to support file input ref
export const ForwardedInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
));

ForwardedInput.displayName = "ForwardedInput";

export default function Component() {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setTableNumber(null);
    setError(null);
  };

  const handleNameSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim() === "") {
        setTableNumber(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/getTableNumber?name=${encodeURIComponent(name)}`
        );
        const data = await response.json();

        if (response.ok) {
          setTableNumber(data.tableNumber);
        } else {
          setError(
            data.message ||
              "An error occurred while fetching your table number."
          );
        }
      } catch (err) {
        setError(
          "An error occurred while fetching your table number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [name]
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setPhotos([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Neishay & Hussain Wedding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Find my Table
            </h2>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Finding Table..." : "Find Table"}
              </Button>
            </form>
          </div>

          {tableNumber && (
            <div className="text-center p-4 bg-green-100 rounded-md">
              <p className="font-semibold">Welcome, {name}!</p>
              <p className="text-sm text-gray-700">
                Your table number is: {tableNumber}
              </p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-100 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Share your Photos!
            </h2>
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos</Label>
                <ForwardedInput
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
                className="w-full"
                disabled={photos.length === 0}
              >
                Submit Photos
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Share your wedding memories
        </CardFooter>
      </Card>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photos Uploaded Successfully</DialogTitle>
            <DialogDescription>
              Your photos have been uploaded. Thank you for sharing your wedding
              memories!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
