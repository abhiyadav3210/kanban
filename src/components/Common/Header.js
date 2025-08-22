import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {
  setSearchTerm,
  setFilter,
  setSortBy,
  clearFilters,
} from "../../store/slices/boardSlice";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { filters } = useSelector((state) => state.board);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilterChange = (type, value) => {
    dispatch(setFilter({ type, value }));
  };

  const handleSortChange = (sortBy) => {
    dispatch(setSortBy(sortBy));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const severityOptions = ["Critical", "High", "Medium", "Low"];
  const sourceOptions = ["Hypejab", "Source Code", "Getastra"];
  const sortOptions = [
    { value: "date", label: "Sort by Date" },
    { value: "severity", label: "Sort by Severity" },
    { value: "score", label: "Sort by Score" },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-4 lg:hidden">
          {/* Mobile Header Row */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Vulnerabilities
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileFiltersOpen ? (
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div className="flex items-center space-x-2 border-l border-gray-300 pl-2">
                <UserCircleIcon className="w-6 h-6 text-gray-400" />
                <button
                  onClick={handleLogout}
                  className="text-sm text-error-600 hover:text-error-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vulnerabilities..."
              value={filters.searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Mobile Filters (Collapsible) */}
          {mobileFiltersOpen && (
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.selectedSeverity}
                onChange={(e) =>
                  handleFilterChange("selectedSeverity", e.target.value)
                }
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Severity</option>
                {severityOptions.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>

              <select
                value={filters.selectedSource}
                onChange={(e) =>
                  handleFilterChange("selectedSource", e.target.value)
                }
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white col-span-2"
              >
                <option value="">All Sources</option>
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>

              {(filters.searchTerm ||
                filters.selectedSeverity ||
                filters.selectedSource) && (
                <button
                  onClick={handleClearFilters}
                  className="col-span-2 text-sm text-primary-600 hover:text-primary-700 py-2 border border-primary-200 rounded-lg hover:bg-primary-50"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Vulnerabilities
            </h1>

            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by issue name..."
                value={filters.searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.selectedSeverity}
                onChange={(e) =>
                  handleFilterChange("selectedSeverity", e.target.value)
                }
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Severity</option>
                {severityOptions.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>

              <select
                value={filters.selectedSource}
                onChange={(e) =>
                  handleFilterChange("selectedSource", e.target.value)
                }
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Sources</option>
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>

              {(filters.searchTerm ||
                filters.selectedSeverity ||
                filters.selectedSource) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 px-3 py-2"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button className="p-2 text-primary-600 bg-primary-50 rounded-l-lg">
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 rounded-r-lg">
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3 border-l border-gray-300 pl-4">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 hidden xl:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-error-600 hover:text-error-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
