
interface SchoolHeaderProps {
  schoolName: string;
  city: string;
  country: string;
}

export function SchoolHeader({ schoolName, city, country }: SchoolHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
        {schoolName}
      </h1>
      <p className="text-lg text-muted-foreground">
        {city}, {country}
      </p>
    </div>
  );
}
