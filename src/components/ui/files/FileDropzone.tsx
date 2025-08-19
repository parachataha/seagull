"use client";

import React, { useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../button";
import { ArrowLeft, ImageIcon, Trash2 } from "lucide-react";
import { Input } from "../input";

type AcceptType = "image" | "video" | "text";

interface FileDropzoneProps {
  className?: string;
  variant?: "default" | "dashed-border"

  accept: AcceptType;
  multiple?: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;

  placeholderFileType?: string;

  showPreview?: boolean;
  descriptions?: string[];
  setDescriptions?: React.Dispatch<React.SetStateAction<string[]>>;
}

// Mapping from accept prop to actual accept object for react-dropzone
const ACCEPT_MAP: Record<AcceptType, Accept> = {
  image: {
    "image/*": [
      ".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".bmp", ".ico",
    ],
  },
  video: {
    "video/*": [".mp4", ".webm", ".ogg", ".mov", ".avi"],
  },
  text: {
    "text/markdown": [".md"],
    "text/plain": [".txt"],
  },
};

export function FileDropzone({
  className = "",
  variant="default",
  accept,
  multiple = false,
  files,
  setFiles,

  placeholderFileType = "file",

  showPreview = true,
  descriptions,
  setDescriptions,
}: FileDropzoneProps) {
  /** Selected image state for preview mode */
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  /**
   * @function onDrop - Handles files dropped into the dropzone
   * @param acceptedFiles Array of files dropped or selected
   */
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => (multiple ? [...prev, ...acceptedFiles] : acceptedFiles));

    // Initialize descriptions for newly added files if setDescriptions exists
    if (setDescriptions) {
      setDescriptions((prev) => [...prev, ...acceptedFiles.map(() => "")]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT_MAP[accept],
    multiple,
    onDrop,
  });

  /**
   * @function handleDelete - Removes a file from the state and its description if applicable
   * @param file File to delete
   */
  const handleDelete = (file: File) => {
    const index = files.indexOf(file);
    setFiles((prev) => prev.filter((f) => f !== file));
    if (setDescriptions && descriptions) {
      setDescriptions((prev) => prev.filter((_, i) => i !== index));
    }
    setSelectedImg(null);
  };

  /**
   * @function handleDescriptionChange - Updates description of the currently selected file
   * @param value New description string
   */
  const handleDescriptionChange = (value: string) => {
    if (!descriptions || !setDescriptions || !selectedImg) return;
    const index = files.indexOf(selectedImg);
    const newDescs = [...descriptions];
    newDescs[index] = value;
    setDescriptions(newDescs);
  };

  return (
    <>
      {/* Show selected image preview or dropzone */}
      {selectedImg ? (
        <Card className="relative flex items-center justify-center h-60 p-0">

          {/* DISPLAY IMAGE */}
          <Image
            src={URL.createObjectURL(selectedImg)}
            alt={selectedImg.name}
            className="object-contain h-full w-full !rounded-xl"
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedImg))}
            fill
          />

          {/* BACK AND DELETE BUTTONS */}
          <div className="buttons absolute top-3 left-3 backdrop-blur-2xl flex flex-col gap-2">
            <Button
              variant="ghost"
              className="!px-2 !bg-muted"
              onClick={() => setSelectedImg(null)}
            >
              <ArrowLeft />
            </Button>

            <Button
              variant="destructive"
              className="text-red-500 !px-2"
              onClick={() => handleDelete(selectedImg)}
            >
              <Trash2 />
            </Button>
          </div>

          {/* DESCRIPTION INPUT, only if descriptions prop is provided */}
          {descriptions && setDescriptions && (
            <Input
              placeholder="Description"
              id="img-description"
              className="!absolute bottom-0 left-0 w-full"
              value={descriptions[files.indexOf(selectedImg)] || ""}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          )}

        </Card>
      ) : (
        // DROPZONE CARD
        <Card
          className={`
            !p-0 !m-0
            w-full flex flex-col justify-center
            rounded-xl
            transition-color
            ${variant == "default" ? 
              `bg-muted ${isDragActive && "bg-muted-foreground"}` : 
              `!border-dashed border-2 ${isDragActive ? "!bg-primary/10 border-primary" : "!bg-transparent"}`
            }
            ${className}
          `}
        >
          <CardContent className="!p-0 !m-0">
            <div
              {...getRootProps()}
              className="!px-0 !py-0 !m-0 text-center cursor-pointer transition mb-2"
            >
              <input {...getInputProps()} className="w-full h-full" />
              {!multiple && files.length > 0 ? 
              <div>
                {files.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);
                  
                  if (file.type.startsWith("image/")) {
                    return (
                        <div className="relative" key={index}>
                        <Button
                          variant="destructive"
                          className="text-red-500 !px-2 absolute top-3 left-3 z-20 backdrop-blur-lg"
                          onClick={() => setFiles([])}
                        >
                          <Trash2 />
                        </Button>
                          <Image  
                            src={previewUrl}
                            alt={file.name}
                            className="object-contain h-full w-full !relative rounded-md"
                            onLoad={() => URL.revokeObjectURL(previewUrl)}
                            fill
                          />
                        </div>
                    );
                  }

                  if (file.type.startsWith("video/")) {
                    return (
                      <video
                        key={index}
                        src={previewUrl}
                        controls
                        className="rounded-lg"
                        onLoadedData={() => URL.revokeObjectURL(previewUrl)}
                      />
                    );
                  }

                  return (
                    <div key={index} className="text-sm text-muted-foreground">
                      {file.name}
                    </div>
                  );
                })}
              </div>
              :
              <>
                {isDragActive ? (
                  <div 
                    className={`
                      w-full h-full gap-2 
                      font-medium text-primary 
                      flex flex-col items-center justify-center py-20
                    `}>
                    <ImageIcon size={56} strokeWidth={1.5}/>
                    Drop the {placeholderFileType}{multiple && "s"} here…
                  </div>
                ) : (
                  <div 
                    className={`
                      w-full h-full gap-2 
                      font-medium text-muted-foreground 
                      flex flex-col items-center justify-center py-20
                    `}>
                    <ImageIcon size={56} strokeWidth={1.2}/>
                    Drag your {placeholderFileType}{multiple && "s"} here or click to select {!multiple && "one"}
                  </div>
                )}
              </>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FILE PREVIEW AREA FOR MULTIPLE FILES */}
      {multiple && showPreview && files.length > 0 && (
        <Card className="py-2 mt-3">
          <div className="flex items-center flex-wrap gap-3 px-3">
            {files.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              
              if (file.type.startsWith("image/")) {
                return (
                  <Button
                    onClick={() => setSelectedImg(file)}
                    variant="ghost"
                    key={index}
                    className={`relative rounded-md overflow-hidden h-15 !p-1.5 ${
                      (selectedImg && selectedImg?.name === file.name) ? "!bg-foreground" : "!bg-muted"
                    }`}
                  >
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      className="object-contain h-full w-full !relative rounded-md"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                      fill
                    />
                  </Button>
                );
              }

              if (file.type.startsWith("video/")) {
                return (
                  <video
                    key={index}
                    src={previewUrl}
                    controls
                    className="rounded-lg"
                    onLoadedData={() => URL.revokeObjectURL(previewUrl)}
                  />
                );
              }

              return (
                <div key={index} className="text-sm text-muted-foreground">
                  {file.name}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}
