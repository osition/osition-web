import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {twMerge} from "tailwind-merge";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';


interface Props {
    className?: string
    src: string
    poster?: string
    title?: string
    autoplay?: boolean
}

export default function VideoPlayer(props: Props) {
    return <>
        <MediaPlayer className={twMerge("", props.className)} title={props.title} src={props.src} load="eager" autoplay={props.autoplay}>
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
            />
        </MediaPlayer>
    </>
}
