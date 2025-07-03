const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} TaskManager Pro. All rights reserved.
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Built with React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer