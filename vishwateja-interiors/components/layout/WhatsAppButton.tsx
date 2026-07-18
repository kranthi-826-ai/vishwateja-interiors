export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi, I'm interested in interior design services from Vishwateja Interiors."
  );
  return (
    <a
      href={`https://wa.me/919885034309?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:scale-110 transition-transform duration-300 rounded-full p-4 shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="white">
        <path d="M16 2.7A13.3 13.3 0 0 0 4.6 21.9L2.7 29l7.3-1.9A13.3 13.3 0 1 0 16 2.7zm0 24.2a10.9 10.9 0 0 1-5.6-1.5l-.4-.2-4.3 1.1 1.2-4.2-.3-.4A10.9 10.9 0 1 1 16 26.9zm6-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}