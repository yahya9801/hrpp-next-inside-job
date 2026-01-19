"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LocationSearchMultiSelect() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchLocations = async (q: string) => {
    setLoading(true);
    const res = await fetch(
      `https://admin.hrpostingpartner.com/api/locations?q=${encodeURIComponent(
        q
      )}`
    );
    const data = await res.json();
    setLocations(data.map((l: any) => l.text));
    setLoading(false);
  };

  useEffect(() => {
    const query = searchParams.get("locations");
    if (query) {
      const values = query.split(",").map((val) => val.trim());
      setSelected(values);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchLocations("");
  }, []); 
  useEffect(() => {
    // Immediate fetch on mount (initial load)
    // fetchLocations("");

    // Debounced fetch on search input change
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchLocations(search);
    }, 300);
    setDebounceTimer(timer);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelected(selectedOptions);
  };

  return (
    <div className="space-y-2">
      {/* Hidden input to submit selected locations as CSV */}
      <h2 className="font-semibold">Locations:</h2>
      <input type="hidden" name="locations" value={selected.join(",")} />

      {/* Search input */}
      <input
        type="text"
        placeholder="Search locations: Remote, Karachi etc"
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading indicator */}
      {loading && <p className="text-xs text-gray-400">Searching...</p>}

      {/* Multi-select list */}
      <select
        multiple
        value={selected}
        onChange={handleChange}
        className="w-full h-44 border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500 italic">
        Hold <kbd className="px-1 bg-gray-200 border rounded">Ctrl</kbd> /{" "}
        <kbd className="px-1 bg-gray-200 border rounded">Cmd</kbd> to select
        multiple
      </p>
    </div>
  );
}
