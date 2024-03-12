import {Link, useSearchParams} from "react-router-dom";
import {encodePath, seededRandom, shuffled} from "~/util";
import MediaCard from "src/components/MediaCard";
import usePagination from "~/hooks/usePagination.tsx";
import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import sortBy from "sort-by";
import * as filtersFunctions from "./filters.ts";


const filters = {
    "random-galleries": filtersFunctions.filterRandomGalleries,
    "random-videos": filtersFunctions.filterRandomVideos,
    "recently-updated-galleries": filtersFunctions.filterRecentlyUpdatedGalleries,
    "newest-galleries": filtersFunctions.filterNewestGalleries,
    "newest-videos": filtersFunctions.filterNewestVideos,
};


export default function MediaListPage() {
    let entries = useMedia();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("filter");
    entries = useMemo(() => {
        const filterFunction = filters[filterValue as keyof typeof filters];
        return filterFunction ? filterFunction(entries) : entries;
    }, [entries, filterValue]);

    const sortValues = searchParams.getAll("sort");
    entries = useMemo(() => {
        if (sortValues.includes("__random__")) {
            return shuffled(entries, seededRandom());
        } else {
            return [...entries].sort(sortBy(...sortValues, (_, v) => typeof v === "string" ? v.toLowerCase() : v));
        }
    }, [entries, sortValues]);

    const pagination = usePagination(entries);
    const { values: pageEntries } = pagination;

    return <>
        <div className="flex flex-wrap gap-4 p-2 items-stretch">
            {pageEntries.map(entry => (
                <div key={entry.path} className="grow h-mixed">
                    <Link to={`/media/info/${encodePath(entry.path)}`} className="h-full hover:scale-105">
                        <MediaCard className="w-full h-full" key={entry.path} media={entry} />
                    </Link>
                </div>
            ))}
        </div>
        {pagination.component}
    </>;
}