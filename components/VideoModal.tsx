"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mediaType: string;
}

export default function VideoModal({ isOpen, onClose, title, mediaType }: VideoModalProps) {
  const videoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"; // CDN-hosted video

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mediaType === 'movie' ? 'Movie' : 'TV Show'}
          </DialogDescription>
        </DialogHeader>

        {/* Video player */}
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="h-full w-full"
              poster="/placeholder.jpg" // You can add a poster image
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-lg">No video available</p>
          )}
        </div>

        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
