"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SearchAndFilterProps {
  onFiltersChange?: (filters: {
    searchTerm: string
    statusFilter: string
    priceRange: string
    weightRange: string
    sortBy: string
  }) => void
}

export default function SearchAndFilter({ onFiltersChange }: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [weightRange, setWeightRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const notifyFiltersChange = (newFilters: {
    searchTerm: string
    statusFilter: string
    priceRange: string
    weightRange: string
    sortBy: string
  }) => {
    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    notifyFiltersChange({
      searchTerm: value,
      statusFilter,
      priceRange,
      weightRange,
      sortBy
    })
  }

  const handleFilterChange = (type: string, value: string) => {
    let newStatusFilter = statusFilter
    let newPriceRange = priceRange
    let newWeightRange = weightRange
    let newSortBy = sortBy

    if (type === "status") {
      newStatusFilter = value
      setStatusFilter(value)
      updateActiveFilters("status", value)
    } else if (type === "price") {
      newPriceRange = value
      setPriceRange(value)
      updateActiveFilters("price", value)
    } else if (type === "weight") {
      newWeightRange = value
      setWeightRange(value)
      updateActiveFilters("weight", value)
    } else if (type === "sort") {
      newSortBy = value
      setSortBy(value)
      updateActiveFilters("sort", value)
    }

    notifyFiltersChange({
      searchTerm,
      statusFilter: newStatusFilter,
      priceRange: newPriceRange,
      weightRange: newWeightRange,
      sortBy: newSortBy
    })
  }

  const updateActiveFilters = (type: string, value: string) => {
    const newFilters = activeFilters.filter((f) => !f.startsWith(type))
    if (value !== "all" && value !== "newest") {
      newFilters.push(`${type}: ${value}`)
    }
    setActiveFilters(newFilters)
  }

  const clearFilter = (filterToRemove: string) => {
    const [type] = filterToRemove.split(": ")
    if (type === "status") setStatusFilter("all")
    if (type === "price") setPriceRange("all")
    if (type === "weight") setWeightRange("all")
    if (type === "sort") setSortBy("newest")
    setActiveFilters(activeFilters.filter((f) => f !== filterToRemove))
    
    // Notify with updated filters
    notifyFiltersChange({
      searchTerm,
      statusFilter: type === "status" ? "all" : statusFilter,
      priceRange: type === "price" ? "all" : priceRange,
      weightRange: type === "weight" ? "all" : weightRange,
      sortBy: type === "sort" ? "newest" : sortBy
    })
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriceRange("all")
    setWeightRange("all")
    setSortBy("newest")
    setActiveFilters([])
    
    // Notify with cleared filters
    notifyFiltersChange({
      searchTerm: "",
      statusFilter: "all",
      priceRange: "all",
      weightRange: "all",
      sortBy: "newest"
    })
  }

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <Input
            placeholder="Search by Goat ID, description..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 bg-white border-stone-200 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-12 px-6 bg-white border-stone-200 hover:bg-stone-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Goats</SheetTitle>
              <SheetDescription>Refine your search to find the perfect goat</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Status Filter */}
              <div>
                <Label className="text-base font-medium mb-3 block">Status</Label>
                <RadioGroup value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="status-all" />
                    <Label htmlFor="status-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="available" id="status-available" />
                    <Label htmlFor="status-available">Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sold" id="status-sold" />
                    <Label htmlFor="status-sold">Sold</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-base font-medium mb-3 block">Price Range</Label>
                <RadioGroup value={priceRange} onValueChange={(value) => handleFilterChange("price", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="price-all" />
                    <Label htmlFor="price-all">All Prices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-22000" id="price-under-22000" />
                    <Label htmlFor="price-under-22000">Under ₹22,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="22000-26000" id="price-22000-26000" />
                    <Label htmlFor="price-22000-26000">₹22,000 - ₹26,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="26000-30000" id="price-26000-30000" />
                    <Label htmlFor="price-26000-30000">₹26,000 - ₹30,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over-30000" id="price-over-30000" />
                    <Label htmlFor="price-over-30000">Over ₹30,000</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Weight Range */}
              <div>
                <Label className="text-base font-medium mb-3 block">Weight Range</Label>
                <RadioGroup value={weightRange} onValueChange={(value) => handleFilterChange("weight", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="weight-all" />
                    <Label htmlFor="weight-all">All Weights</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-35" id="weight-under-35" />
                    <Label htmlFor="weight-under-35">Under 35 kg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="35-45" id="weight-35-45" />
                    <Label htmlFor="weight-35-45">35 - 45 kg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45-55" id="weight-45-55" />
                    <Label htmlFor="weight-45-55">45 - 55 kg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over-55" id="weight-over-55" />
                    <Label htmlFor="weight-over-55">Over 55 kg</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Sort By */}
              <div>
                <Label className="text-base font-medium mb-3 block">Sort By</Label>
                <RadioGroup value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="sort-newest" />
                    <Label htmlFor="sort-newest">Newest First</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oldest" id="sort-oldest" />
                    <Label htmlFor="sort-oldest">Oldest First</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-low" id="sort-price-low" />
                    <Label htmlFor="sort-price-low">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-high" id="sort-price-high" />
                    <Label htmlFor="sort-price-high">Price: High to Low</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Clear Filters */}
              {activeFilters.length > 0 && (
                <Button variant="outline" onClick={clearAllFilters} className="w-full">
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-stone-600 mr-2">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
              onClick={() => clearFilter(filter)}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
