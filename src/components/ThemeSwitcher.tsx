
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative transition-all duration-500 hover:bg-purple-100 dark:hover:bg-purple-900"
      aria-label="Changer le thème"
    >
      {theme === 'dark' ? (
        <Moon className="h-6 w-6 transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="h-6 w-6 transition-all duration-300 rotate-90 scale-100" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
