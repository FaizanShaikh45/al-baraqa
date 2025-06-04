"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { Heart, Play, Pause, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Goat } from "../types/goat";

interface GoatCardProps {
  goat: Goat;
  isFavorite: boolean;
  onToggleFavorite: (goatId: string) => void;
}

export default function GoatCard({
  goat,
  isFavorite,
  onToggleFavorite,
}: GoatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(goat.id);
  };

  const handleWhatsAppContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in Goat ID: ${goat.id}`;
    const whatsappUrl = `https://wa.me/919167880272?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className="group overflow-hidden bg-white border-stone-200 hover:border-amber-300 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/goat/${goat.id}`}>
        <div className="relative aspect-video overflow-hidden bg-stone-100">
          <video
            ref={videoRef}
            className="w-full h-full object-cover bg-stone-100 transition-transform duration-300 group-hover:scale-105"
            poster={goat.thumbnail || undefined}
            muted={false}
            loop
            playsInline
            onEnded={() => setIsPlaying(false)}
          >
            <source src={goat.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-stone-800 rounded-full w-16 h-16"
              onClick={handleVideoToggle}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={goat.status === "available" ? "default" : "secondary"}
              className={
                goat.status === "available"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }
            >
              {goat.status === "available" ? "Available" : "Sold"}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="secondary"
            className={`absolute top-3 right-3 w-10 h-10 rounded-full p-0 transition-all duration-200 ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-white/90 hover:bg-white text-stone-600"
            }`}
            onClick={handleFavoriteToggle}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Goat ID */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-stone-800">ID: {goat.id}</h3>
            {goat.price && (
              <div className="flex items-center text-amber-600 font-semibold">
                ₹{goat.price.toLocaleString()}
              </div>
            )}
          </div>

          {/* Description */}
          {goat.description && (
            <p className="text-stone-600 text-sm mb-3 line-clamp-2">
              {goat.description}
            </p>
          )}

          {/* Date Listed */}
          {goat.dateListed && (
            <div className="flex items-center text-xs text-stone-500 mb-3">
              <Calendar className="w-3 h-3 mr-1" />
              Listed on {formatDate(goat.dateListed)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
            >
              View Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
