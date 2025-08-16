"use client";

import React from "react";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AcceptType = "image" | "video" | "text";

interface FileDropzoneProps {
  className?: string,
  accept: AcceptType;
  multiple?: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  showPreview?: boolean
}

// Mapping from accept prop to actual accept object for react-dropzone
const ACCEPT_MAP: Record<AcceptType, Accept> = {
  image: {
    "image/*": [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".avif",
      ".svg",
      ".bmp",
      ".ico",
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
  accept,
  multiple = false,
  files,
  setFiles,
  showPreview = true,
}: FileDropzoneProps) {
  
  /**
   * @function onDrop - Handles all dropped files
   * @param acceptedFiles 
   */
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => (multiple ? [...prev, ...acceptedFiles] : acceptedFiles));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT_MAP[accept],
    multiple,
    onDrop,
  });

  return (
    <Card className={`
      w-full bg-popover h-50 flex flex-col justify-center 
      ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"}
      ${className}
    `}>
      <CardContent>
        <div
          {...getRootProps()}
          className={`p-6 text-center cursor-pointer transition mb-2 `}
        >
          <input {...getInputProps()} 
            className="w-full h-full"
          />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the files here…</p>
          ) : (
            <p className="text-muted-foreground">
              Drag your files here or click to select
            </p>
          )}
        </div>

        {(showPreview && files.length > 0) && 
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              if (file.type.startsWith("image/")) {
                return (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      fill
                      className="object-cover"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
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
                    className="w-full rounded-lg"
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
        }
      </CardContent>
    </Card>
  );
}
