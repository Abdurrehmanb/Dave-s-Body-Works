import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  MessageSquare, 
  Filter, 
  Sparkles
} from 'lucide-react';
import { REVIEWS_DATA, SHOP_INFO } from '../data';

export const ReviewsSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('All');

  const filterTags = [
    { label: 'All', count: 54 },
    { label: 'bumper replacement', count: 3 },
    { label: 'family owned shop', count: 4 },
    { label: 'headlight change', count: 2 },
    { label: 'rental car assistance', count: 3 }
  ];

  const filteredReviews = activeTag === 'All'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.serviceTags.includes(activeTag));

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Big 4.7 Score Block */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-2.5 lg:border-r lg:border-slate-200 lg:pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>Google Maps Verified</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-black text-[#0b1a30] tracking-tight">4.7</span>
                <div className="space-y-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium text-left">
                    Based on 54 authentic customer reviews
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ranked among the top auto body shops on Spring Mountain Road for integrity, speed, and craftsmanship.
              </p>
            </div>

            {/* Google Tags Breakdown */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-xs sm:text-sm font-bold text-[#0b1a30] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" />
                  <span>Popular Review Topics (Google Maps):</span>
                </h3>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 underline"
                >
                  <span>View All 54 on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Tags Filters */}
              <div className="flex flex-wrap gap-2">
                {filterTags.map((tag) => {
                  const isActive = activeTag === tag.label;
                  return (
                    <button
                      key={tag.label}
                      onClick={() => setActiveTag(tag.label)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#0b1a30] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="capitalize">{tag.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {tag.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Google Verified Banner */}
              <div className="text-xs text-slate-600 flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  All testimonials originate from verified Las Vegas drivers who serviced their vehicles at {SHOP_INFO.address}.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="space-y-3.5">
                {/* Author Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0b1a30]">{rev.author}</span>
                      {rev.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          {rev.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {rev.reviewCount ? `${rev.reviewCount} reviews` : ''} 
                      {rev.photoCount ? ` · ${rev.photoCount} photos` : ''} 
                      {rev.reviewCount ? ` · ` : ''}{rev.date}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Highlight Quote */}
                {rev.quoteHighlight && (
                  <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-200/60 text-xs font-semibold text-[#0b1a30] italic">
                    "{rev.quoteHighlight}"
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Service Tag Badges on bottom */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                {rev.serviceTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 capitalize"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Review on Google Maps CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={SHOP_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-red-500 text-slate-800 hover:text-red-600 text-xs sm:text-sm font-bold shadow-xs transition-colors text-center"
          >
            <MessageSquare className="w-4 h-4 text-red-600 shrink-0" />
            <span>Read All 54 Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};
