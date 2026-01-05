"use client";
import type { Composer, AggregateRecording } from "@/lib/music-types";
import RecordingGrid from "./RecordingGrid";
import RecordingFilterer from "./RecordingFilterer";
import { useState } from "react";

export interface FilterState {
  composers: number[]; // Array of IDs
  yearRange: [number, number];
}

export const INITIAL_FILTERS: FilterState = {
  composers: [],
  yearRange: [2004, new Date().getFullYear()],
};

export default function RecordingDisplayer({ recordings, composers }: { recordings: AggregateRecording[], composers: Composer[] }) {
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

    let filteredRecordings = filters.composers.length === 0
        ? recordings
        : recordings.filter(recording =>
            filters.composers.includes(recording.composer_id)
        );
    
    filteredRecordings = filteredRecordings.filter(recording => {
        const year = recording.recdate.getFullYear();
        return year >= filters.yearRange[0] && year <= filters.yearRange[1];
    });

    return (    
        <div className="flex flex-col md:flex-row md:space-x-4">
            <RecordingFilterer composers={composers} onFilterChange={setFilters} activeFilters={filters} />
            <RecordingGrid recordings={filteredRecordings}/>
        </div>
    );
}