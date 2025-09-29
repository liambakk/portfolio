"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  style?: React.CSSProperties;
  className?: string;
  unoptimized?: boolean;
  useOptimized?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  quality = 85,
  style,
  className,
  unoptimized = false,
  useOptimized = true
}) => {
  const [loaded, setLoaded] = useState(false);

  // Function to get optimized image path
  const getOptimizedPath = (originalSrc: string, size: string, format: string) => {
    // Skip optimization for GIFs and external URLs
    if (originalSrc.endsWith('.gif') || originalSrc.startsWith('http') || !useOptimized) {
      return originalSrc;
    }

    // Extract filename without extension and path
    const pathParts = originalSrc.split('/');
    const filename = pathParts[pathParts.length - 1];
    const nameWithoutExt = filename.split('.')[0];

    // List of images that failed optimization
    const failedOptimization: string[] = [];
    if (failedOptimization.includes(nameWithoutExt)) {
      return originalSrc;
    }

    // Return optimized path based on original path
    if (originalSrc.includes('/previews/')) {
      return `/previews-optimized/${nameWithoutExt}-${size}.${format}`;
    }
    return `/project-images-optimized/${nameWithoutExt}-${size}.${format}`;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (format: string) => {
    if (!useOptimized || src.endsWith('.gif') || src.startsWith('http')) {
      return undefined;
    }

    // Check if this image failed optimization
    const pathParts = src.split('/');
    const filename = pathParts[pathParts.length - 1];
    const nameWithoutExt = filename.split('.')[0];
    const failedOptimization: string[] = [];
    
    if (failedOptimization.includes(nameWithoutExt)) {
      return undefined;
    }

    return `${getOptimizedPath(src, 'sm', format)} 640w,
            ${getOptimizedPath(src, 'md', format)} 1280w,
            ${getOptimizedPath(src, 'lg', format)} 1920w`;
  };

  // Check if this image failed optimization
  const pathParts = src.split('/');
  const filename = pathParts[pathParts.length - 1];
  const nameWithoutExt = filename.split('.')[0];
  const isFailedOptimization = false; // All images are now optimized

  // If using Next.js Image with optimization
  if (useOptimized && !src.endsWith('.gif') && !src.startsWith('http') && !isFailedOptimization) {
    return (
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          ...style
        }}
        className={className}
      >
        <picture>
          <source
            type="image/webp"
            srcSet={generateSrcSet('webp')}
            sizes={sizes || `(max-width: 768px) 100vw, ${width}px`}
          />
          <source
            type="image/png"
            srcSet={generateSrcSet('png')}
            sizes={sizes || `(max-width: 768px) 100vw, ${width}px`}
          />
          <Image
            src={getOptimizedPath(src, 'md', 'png')} // Default to medium PNG
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            sizes={sizes || `(max-width: 768px) 100vw, ${width}px`}
            unoptimized={unoptimized}
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: 'auto'
            }}
          />
        </picture>
      </div>
    );
  }

  // Fallback to regular Image component
  return (
    <div
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        ...style
      }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes || `(max-width: 768px) 100vw, ${width}px`}
        unoptimized={unoptimized || src.endsWith('.gif')}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
};

export default OptimizedImage;