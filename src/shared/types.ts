// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordingGetDesktopSources = () => Promise<{ label: string; id: string }[]>
export type RecordingSaveCameraVideo = (blob: Buffer) => Promise<void>
export type RecordingSaveScreenVideo = (blob: Buffer) => Promise<void>
export type RecordingSaveAudio = (blob: Buffer) => Promise<void>
export type ResizeWindow = (width: number, height: number) => Promise<void>
