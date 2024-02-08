import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {twMerge} from "tailwind-merge";
import {MediaPlayer, MediaProvider, type ThumbnailImageInit} from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {VideoInfoEntry} from "~/hooks/useInfo/types.ts";
import {getPreviewImage, getSource} from "~/util";
import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";


interface Props {
    className?: string
    info: VideoInfoEntry
}


export default function VideoPlayer(props: Props) {
    const [searchParams] = useSearchParams();
    const { info } = props;

    const thumbnails = useMemo<ThumbnailImageInit[]>(() => {
        if (info.meta.chapters.length) {
            return info.meta.chapters.map<ThumbnailImageInit>((chapter, i) => ({
                startTime: chapter.start_time,
                url: getPreviewImage(info.path, i+1),
            }))
        } else {
            return [...Array(info.meta.n_previews)].map((_, i) => ({
                startTime: Math.floor(info.meta.duration / info.meta.n_previews * i),
                url: getPreviewImage(info.path, i+1),
            }))
        }
    }, [info]);

    return <>
        <MediaPlayer
            className={twMerge("", props.className)}
            src={getSource(info.path)}
            title={info.displayName}
            streamType="on-demand" load="eager"
            duration={info.meta.duration}
            currentTime={parseFloat(searchParams.get("initialTime") ?? "0")}
        >
            <MediaProvider>
                {/*{props.poster !== undefined && <Poster*/}
                {/*    className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-contain"*/}
                {/*    src={props.poster}*/}
                {/*    alt={props.title ?? ""}*/}
                {/*/>}*/}
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
                style={{
                    '--video-brand': '#f5f5f5',
                }}
                noScrubGesture={false}
                thumbnails={thumbnails}
            />
        </MediaPlayer>
    </>
}