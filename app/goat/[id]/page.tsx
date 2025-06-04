"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { goatsData } from "../../data/goats";
import VideoPlayer from "../../components/video-player";
import ShareButton from "../../components/share-button";
import FavoriteButton from "../../components/favorite-button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GoatDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const goat = goatsData.find((g) => g.id === id);

  if (!goat) {
    notFound();
  }

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in Goat ID: ${goat.id}`;
    const whatsappUrl = `https://wa.me/919167880272?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Gallery</span>
            </Link>
            <div className="flex items-center space-x-2">
              <FavoriteButton goatId={goat.id} />
              <ShareButton goat={goat} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Video Section - Full Width */}
        <div className="w-full mb-8">
          <Card className="overflow-hidden">
            <div className="bg-stone-100 min-h-[60vh] max-h-[80vh] flex items-center justify-center">
              <VideoPlayer
                videoUrl={goat.videoUrl}
                thumbnail={goat.thumbnail}
                title={`Goat ${goat.id}`}
              />
            </div>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Goat Information */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-stone-800 mb-2">
                        Goat ID: {goat.id}
                      </h1>
                      <Badge
                        variant={
                          goat.status === "available" ? "default" : "secondary"
                        }
                        className={`text-sm ${
                          goat.status === "available"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {goat.status === "available"
                          ? "Available for Sale"
                          : "Sold"}
                      </Badge>
                    </div>
                  </div>

                  {goat.price && (
                    <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-lg">
                      <div className="text-sm text-stone-500">Price</div>

                      <div className="text-3xl font-bold text-amber-600">
                        ₹{goat.price.toLocaleString()}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Description */}
                  {goat.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-stone-800 mb-3">
                        Description
                      </h3>
                      <p className="text-stone-600 leading-relaxed">
                        {goat.description}
                      </p>
                    </div>
                  )}

                  {/* Additional Details */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {goat.dateListed && (
                      <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-stone-500" />
                        <div>
                          <div className="text-sm text-stone-500">
                            Date Listed
                          </div>
                          <div className="font-medium text-stone-800">
                            {formatDate(goat.dateListed)}
                          </div>
                        </div>
                      </div>
                    )}
                    {goat.weight && (
                      <div>
                        <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-lg">
                          <Scale className="w-5 h-5 text-stone-500" />
                          <div className="flex-1">
                            <div className="text-sm text-stone-500">
                              Approx. Weight
                            </div>
                            <div className="font-medium text-stone-800 mb-1">
                              {goat.weight} kg
                            </div>
                          </div>
                        </div>
                        <div className="text-xs mt-2 text-stone-400 leading-relaxed">
                          <strong>Note:</strong> This is an approximate weight
                          based on visual assessment. Actual weight may vary by
                          ±3-4 kg. Final weight should be confirmed at purchase.
                        </div>
                      </div>
                    )}

                    {/* <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-stone-500" />
                      <div>
                        <div className="text-sm text-stone-500">Location</div>
                        <div className="font-medium text-stone-800">A.B Livestocks Farm</div>
                      </div>
                    </div> */}
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleWhatsAppContact}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact via WhatsApp
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50"
                    >
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
