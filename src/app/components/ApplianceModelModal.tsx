import { useState } from "react";
import { Search, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export interface ApplianceModel {
  id: string;
  brand: string;
  modelNumber: string;
  productName: string;
  category: string;
}

interface ApplianceModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: ApplianceModel, serialNumber: string) => void;
}

// Mock database of appliances
const mockApplianceDatabase: ApplianceModel[] = [
  {
    id: "1",
    brand: "Whirlpool",
    modelNumber: "WFE550S0LZ",
    productName: "30-inch Electric Range",
    category: "Range/Oven",
  },
  {
    id: "2",
    brand: "Whirlpool",
    modelNumber: "WRS325SDHZ",
    productName: "Side-by-Side Refrigerator",
    category: "Refrigerator",
  },
  {
    id: "3",
    brand: "GE",
    modelNumber: "GDF630PSMSS",
    productName: "Dishwasher with Hidden Controls",
    category: "Dishwasher",
  },
  {
    id: "4",
    brand: "GE",
    modelNumber: "GTW465ASNWW",
    productName: "Top Load Washer",
    category: "Washer",
  },
  {
    id: "5",
    brand: "Samsung",
    modelNumber: "DVE45R6100C",
    productName: "Electric Dryer",
    category: "Dryer",
  },
  {
    id: "6",
    brand: "LG",
    modelNumber: "LMHM2237ST",
    productName: "Over-the-Range Microwave",
    category: "Microwave",
  },
  {
    id: "7",
    brand: "Frigidaire",
    modelNumber: "FFRA051WAE",
    productName: "Window Air Conditioner",
    category: "Air Conditioner",
  },
  {
    id: "8",
    brand: "Maytag",
    modelNumber: "MVWC465HW",
    productName: "Top Load Washer",
    category: "Washer",
  },
];

export function ApplianceModelModal({
  isOpen,
  onClose,
  onSelect,
}: ApplianceModelModalProps) {
  const [modelInput, setModelInput] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [searchResults, setSearchResults] = useState<ApplianceModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<ApplianceModel | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [inputMethod, setInputMethod] = useState<"search" | "manual">("search");
  const [manualType, setManualType] = useState("");
  const [manualMake, setManualMake] = useState("");
  const [manualModel, setManualModel] = useState("");

  const handleSearch = () => {
    if (!modelInput.trim()) return;

    setIsSearching(true);
    // Simulate API search delay
    setTimeout(() => {
      const results = mockApplianceDatabase.filter(
        (appliance) =>
          appliance.modelNumber.toLowerCase().includes(modelInput.toLowerCase()) ||
          appliance.brand.toLowerCase().includes(modelInput.toLowerCase()) ||
          appliance.productName.toLowerCase().includes(modelInput.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSelectModel = (model: ApplianceModel) => {
    setSelectedModel(model);
  };

  const handleConfirm = () => {
    if (selectedModel) {
      onSelect(selectedModel, serialNumber);
      handleReset();
    } else if (inputMethod === "manual" && manualType && manualMake) {
      const manualApplianceData: ApplianceModel = {
        id: "manual",
        brand: manualMake,
        modelNumber: manualModel,
        productName: manualType,
        category: manualType,
      };
      onSelect(manualApplianceData, serialNumber);
      handleReset();
    }
  };

  const handleSkip = () => {
    onClose();
    handleReset();
  };

  const handleReset = () => {
    setModelInput("");
    setSerialNumber("");
    setSearchResults([]);
    setSelectedModel(null);
    setIsSearching(false);
    setInputMethod("search");
    setManualType("");
    setManualMake("");
    setManualModel("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Appliance Details</DialogTitle>
          <DialogDescription>
            Enter your appliance model number to find product information and get tailored help.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Input Method Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setInputMethod("search")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inputMethod === "search"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Search by Model Number
            </button>
            <button
              onClick={() => setInputMethod("manual")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inputMethod === "manual"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Manual Entry
            </button>
          </div>

          {/* Search by Model Number */}
          {inputMethod === "search" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Model Number
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g., WFE550S0LZ"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!modelInput.trim() || isSearching}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Select Your Appliance
                  </label>
                  <div className="border border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
                    {searchResults.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleSelectModel(model)}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-start justify-between ${
                          selectedModel?.id === model.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {model.brand} {model.modelNumber}
                          </div>
                          <div className="text-sm text-gray-600">{model.productName}</div>
                          <div className="text-xs text-gray-500 mt-1">{model.category}</div>
                        </div>
                        {selectedModel?.id === model.id && (
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 && modelInput && !isSearching && (
                <div className="text-center py-6 text-gray-500">
                  No matches found. Try a different model number or skip this step.
                </div>
              )}

              {/* Serial Number (Optional) */}
              {selectedModel && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Serial Number <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <Input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Enter serial number if available"
                  />
                </div>
              )}
            </>
          )}

          {/* Manual Entry */}
          {inputMethod === "manual" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Type
                </label>
                <select
                  value={manualType}
                  onChange={(e) => setManualType(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="">Select appliance type...</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Dishwasher">Dishwasher</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Dryer">Dryer</option>
                  <option value="Oven">Oven</option>
                  <option value="Stove">Stove</option>
                  <option value="Microwave">Microwave</option>
                  <option value="Range Hood">Range Hood</option>
                  <option value="Garbage Disposal">Garbage Disposal</option>
                  <option value="Water Heater">Water Heater</option>
                  <option value="Furnace">Furnace</option>
                  <option value="Air Conditioner">Air Conditioner</option>
                  <option value="Freezer">Freezer</option>
                  <option value="Ice Maker">Ice Maker</option>
                  <option value="Trash Compactor">Trash Compactor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Make/Brand
                </label>
                <Input
                  type="text"
                  value={manualMake}
                  onChange={(e) => setManualMake(e.target.value)}
                  placeholder="e.g., Whirlpool, GE, Samsung"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Model <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <Input
                  type="text"
                  value={manualModel}
                  onChange={(e) => setManualModel(e.target.value)}
                  placeholder="e.g., WFE550S0LZ"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={inputMethod === "search" ? !selectedModel : !manualType || !manualMake}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}