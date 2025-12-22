export default function EventFooter() {
  return (
    <footer className="mt-20 border-t border-gold/20 py-10 text-center text-gray-400">
      <p>Download the app</p>

      <div className="flex justify-center gap-6 mt-4 text-2xl">
        <a
          href="https://instagram.com/theredcarpetbhopal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold"
        >
          📸
        </a>
      </div>

      <p className="mt-6 text-xs">
        © The Red Carpet · All Rights Reserved
      </p>
    </footer>
  );
}
