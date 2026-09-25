import { Flag, Star, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { ReportBookReviewModal } from '@/presentation/shared/components/reportBookReviewModal/ReportBookReviewModal';

export interface BookReviewProps {
  containSpoilers: boolean;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  reviewerEmail: string;
  reviewDate: string;
}

export function BookReview({
  containSpoilers,
  rating,
  reviewTitle,
  reviewText,
  reviewerEmail,
  reviewDate,
}: BookReviewProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:gap-6 bg-secondary-bg border border-border rounded-md p-4">
          {containSpoilers && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:gap-6 bg-background border border-border rounded-md p-4">
                <h1 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold">
                  <TriangleAlert size={20} className="text-brand" />
                  Atenção: esta resenha pode conter spoilers.
                </h1>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 lg:gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {Array.from({ length: fullStars }).map((_, index) => (
                  <Star
                    key={`full-${index}`}
                    className="w-6 h-6 text-active fill-active"
                  />
                ))}

                {hasHalfStar && (
                  <div className="relative inline-block w-6 h-6">
                    <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden text-active">
                      <Star className="w-6 h-6 fill-active" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <button
                  data-testid="btn-report"
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex items-center gap-2 text-xs text-text-secondary hover:opacity-80 cursor-pointer"
                >
                  <Flag className="w-4 h-4 lg:w-5 lg:h-5 " />
                  <span>Denunciar</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-text-primary text-sm lg:text-md">
              <h2 className="font-semibold">{reviewTitle}</h2>
              <p>{reviewText}</p>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 text-text-secondary text-xs lg:text-md lg:text-sm">
              <span>{reviewerEmail}</span>
              <span>{reviewDate}</span>
            </div>
          </div>
        </div>
      </div>
      <ReportBookReviewModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onConfirm={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
