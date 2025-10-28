export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 mt-16">
      <div className="max-w-6xl mx-auto text-center py-6 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} MindWeave. All rights reserved.</p>
      </div>
    </footer>
  );
}
