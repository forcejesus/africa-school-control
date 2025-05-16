
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  const handleThemeChange = (value: string) => {
    if (value) {
      setTheme(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ToggleGroup type="single" value={theme} onValueChange={handleThemeChange}>
        <ToggleGroupItem value="light" aria-label="Mode clair">
          <Sun className="h-4 w-4 mr-2" />
          Clair
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Mode sombre">
          <Moon className="h-4 w-4 mr-2" />
          Sombre
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ThemeSwitcher;
