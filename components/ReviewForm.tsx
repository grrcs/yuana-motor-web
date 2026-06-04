"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface ReviewFormProps {
  bookingId: string;
  bookingNumber: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ bookingId, bookingNumber, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("Anda harus login untuk memberikan review");
      return;
    }

    if (rating === 0) {
      setError("Pilih rating terlebih dahulu");
      return;
    }

    if (!comment.trim()) {
      setError("Tulis komentar Anda");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("reviews")
        .insert({
          booking_id: bookingId,
          user_id: user.id,
          rating,
          comment: comment.trim(),
        });

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from("bookings")
        .update({ reviewed: true })
        .eq("id", bookingId);

      if (updateError) throw updateError;

      setSuccess(true);
      setRating(0);
      setComment("");
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-green-400 fill-green-400" />
        </div>
        <h3 className="text-xl font-bold text-neutral-100 mb-2">
          Terima kasih atas review Anda!
        </h3>
        <p className="text-neutral-400">
          Review Anda sangat membantu kami untuk meningkatkan layanan
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-neutral-100 mb-4">
          Review Booking #{bookingNumber}
        </h3>

        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-300 mb-3">
            Rating Layanan
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-neutral-600"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-neutral-400 mt-2">
              {rating === 5 && "Sangat Puas"}
              {rating === 4 && "Puas"}
              {rating === 3 && "Cukup"}
              {rating === 2 && "Kurang Puas"}
              {rating === 1 && "Tidak Puas"}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Komentar
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalaman Anda dengan layanan kami..."
            rows={4}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || rating === 0 || !comment.trim()}
          className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim Review"
          )}
        </button>
      </div>
    </form>
  );
}
