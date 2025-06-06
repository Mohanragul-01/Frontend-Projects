export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} 3D Customizer. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}