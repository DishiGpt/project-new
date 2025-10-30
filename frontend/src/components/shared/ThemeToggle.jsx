import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

// ThemeToggle: simple accessible toggle that saves to localStorage
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || null;
    } catch (e) { return null; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // remove explicit preference
      localStorage.removeItem('theme');
    }
  }, [theme]);

  const toggle = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-card text-card-foreground hover:shadow-md transition-all duration-200"
      title="Toggle theme"
    >
      {typeof window !== 'undefined' && (document.documentElement.classList.contains('dark') || theme === 'dark') ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}


