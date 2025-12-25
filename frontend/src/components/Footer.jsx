import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div>&copy; {new Date().getFullYear()} CropVision — Built with ♥</div>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a className="hover:underline" href="/terms">Terms</a>
          <a className="hover:underline" href="/privacy">Privacy</a>
          <a className="hover:underline" href="mailto:hello@example.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
