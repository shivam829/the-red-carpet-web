export default function EventVideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover opacity-10 -z-30"
    >
      <source src="/nye-bg.mp4" type="video/mp4" />
    </video>
  );
}
