
import React from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SearchableListCardProps {
  title: string;
  icon: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  itemCount: number;
  emptyMessage: string;
  noResultsMessage: string;
  children: React.ReactNode;
}

export function SearchableListCard({
  title,
  icon,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  itemCount,
  emptyMessage,
  noResultsMessage,
  children
}: SearchableListCardProps) {
  return (
    <Card className="border-orange-200 shadow-soft">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-orange-700 text-xl">
            {icon}
            {title} ({itemCount})
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-white border-orange-200 focus:border-orange-300"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {itemCount > 0 ? (
          children
        ) : (
          <p className="text-center text-muted-foreground py-8 text-base">
            {searchValue ? noResultsMessage : emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
