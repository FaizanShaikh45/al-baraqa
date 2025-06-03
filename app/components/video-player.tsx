"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoUrl: string
  thumbnail?: string
  title: string
}

export default function VideoPlayer({ videoUrl, thumbnail, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('cover')
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedMetadata = () => {
        setVideoAspectRatio(video.videoWidth / video.videoHeight)
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const toggleObjectFit = () => {
    setObjectFit(prev => prev === 'contain' ? 'cover' : 'contain')
  }

  // Determine if video is portrait or landscape
  const isPortrait = videoAspectRatio !== null && videoAspectRatio < 1

  return (
    <div
      className="relative w-full h-full group cursor-pointer bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className={`w-full h-full ${
          objectFit === 'contain' 
            ? 'object-contain' 
            : 'object-cover'
        }`}
        poster={thumbnail || undefined}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-stone-800 rounded-full w-20 h-20 shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-stone-800 rounded-full w-10 h-10 p-0 shadow-md"
              onClick={(e) => {
                e.stopPropagation()
                toggleMute()
              }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-stone-800 rounded-full w-10 h-10 p-0 shadow-md"
              onClick={(e) => {
                e.stopPropagation()
                toggleObjectFit()
              }}
              title={objectFit === 'contain' ? 'Fill screen (may crop)' : 'Fit to screen (show all)'}
            >
              <Expand className="w-4 h-4" />
            </Button>
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-stone-800 rounded-full w-10 h-10 p-0 shadow-md"
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Video Info Overlay */}
        {videoAspectRatio !== null && (
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
              {isPortrait ? 'Portrait' : 'Landscape'} • {objectFit === 'cover' ? 'Fill' : 'Fit'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
