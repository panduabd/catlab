import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PawIcon } from './PawIcon';

export const VideoSection: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative overflow-hidden bg-surface py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <PawIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-text-secondary">
                {t.video.tag}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-charcoal md:text-5xl">
              {t.video.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-text-secondary">
              {t.video.desc}
            </p>
          </div>
        </div>

        {/* Video Card */}
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div
            className="group relative overflow-hidden rounded-3xl bg-charcoal shadow-2xl"
            style={{ aspectRatio: '16/9' }}
          >
            <video
              ref={videoRef}
              src="/videos/demo-en.mp4"
              autoPlay
              muted
              loop
              playsInline
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full object-cover cursor-pointer"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-charcoal/90 to-transparent px-4 pb-4 pt-12 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 sm:px-6 sm:pb-6">
              <div className="flex items-center gap-3 text-white">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow text-charcoal transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Video progress"
                  className="h-1 min-w-0 flex-1 cursor-pointer accent-yellow"
                />

                <span className="min-w-[76px] text-right text-xs font-medium tabular-nums sm:text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Badges under Video */}
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {t.video.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-yellow/10 shrink-0">
                  <PawIcon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <p className="font-bold text-charcoal text-xs sm:text-sm uppercase tracking-wide">
                  {badge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
