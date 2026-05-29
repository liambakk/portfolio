"use client";

import React, { useEffect, useRef } from "react";

interface ScholaraVideoProps {
  src: string;
  width: number;
  height: number;
  caption?: string;
}

/**
 * Lazy, autoplaying demo video. The source is attached and playback starts only
 * once the element scrolls near the viewport, and pauses when it leaves — so the
 * page never downloads all of the Scholara clips up front.
 */
export default function ScholaraVideo({ src, width, height, caption }: ScholaraVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <figure style={{ margin: 0, width: "100%" }}>
      <video
        ref={videoRef}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={caption}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${width} / ${height}`,
          display: "block",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
