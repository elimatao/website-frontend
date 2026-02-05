"use client";
import type { Composer, AggregateRecording } from "@/lib/music-types";
import RecordingGrid from "./RecordingGrid";
import RecordingFilterer from "./RecordingFilterer";
import { useState } from "react";

export interface FilterState {
  composers: number[]; // Array of IDs
  yearRange: [number, number];
}


export default function RecordingDisplayer({ recordings, composers }: { recordings: AggregateRecording[], composers: Composer[] }) {
    const recordingYears = recordings.map(r => r.recdate.getFullYear());
    const newestRecordingYear = Math.max(...recordingYears);
    const oldestRecordingYear = Math.min(...recordingYears);

    const defaultFilters: FilterState = {
        composers: [],
        yearRange: [oldestRecordingYear, newestRecordingYear],
    }
    
    const [filters, setFilters] = useState<FilterState>(defaultFilters);

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
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4 md:h-[calc(100vh-138px)]">
            <RecordingFilterer composers={composers} onFilterChange={setFilters} defaultFilters={defaultFilters} activeFilters={filters} />
            <RecordingGrid recordings={filteredRecordings}/>
        </div>
    );
}