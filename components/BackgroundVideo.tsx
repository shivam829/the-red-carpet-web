"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ opacity: 0.15 }} // Very transparent
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        {/* Fallback to image if video doesn't load */}
      </video>

      {/* Dark overlay to ensure text remains readable */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
}

// Add this to your layout.tsx:
// import BackgroundVideo from "@/components/BackgroundVideo";
// 
// <body>
//   <BackgroundVideo />
//   {children}
// </body>