'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type PannellumInstance = {
  destroy: () => void;
  resize?: () => void;
  setYaw?: (yaw: number) => void;
  getYaw?: () => number;
  loadScene?: (sceneId: string) => void;
};

type PannellumApi = {
  viewer: (id: string, config: unknown) => PannellumInstance;
  getViewer?: () => { setYaw?: (yaw: number) => void };
};

declare global {
  interface Window {
    pannellum?: PannellumApi;
    virtualShowroomViewer?: PannellumInstance;
  }
}

interface PannellumViewerProps {
  config: unknown;
  id?: string;
  className?: string;
}

export default function PannellumViewer({ config, id = 'panorama', className = '' }: PannellumViewerProps) {
  const viewerRef = useRef<PannellumInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && window.pannellum && containerRef.current) {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
      // Initialize viewer
      viewerRef.current = window.pannellum.viewer(containerRef.current.id, config);
      window.virtualShowroomViewer = viewerRef.current;
      
      // Trigger resize after a short delay to ensure canvas dimensions are correct
      setTimeout(() => {
        if (viewerRef.current && typeof viewerRef.current.resize === 'function') {
          viewerRef.current.resize();
        }
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }

    return () => {
      if (viewerRef.current) {
        const activeViewer = viewerRef.current;
        viewerRef.current.destroy();
        viewerRef.current = null;
        if (window.virtualShowroomViewer === activeViewer) {
          window.virtualShowroomViewer = undefined;
        }
      }
    };
  }, [loaded, config]);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
      <Script 
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js" 
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      <div 
        ref={containerRef} 
        id={id} 
        className={className} 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
}
