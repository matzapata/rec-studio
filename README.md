# Instructions

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

## File structure

### Renderer JOI state management

Reference:

https://jotai.org/


Example: 

Add to `renderer/store/notes.ts`

```ts
const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)
```


### Communicate main process with renderer

1. Define function types in `@shared/types`

```ts
export type GetNotes = () => Promise<NoteInfo[]>
```

2. Define function in `main/lib`

```ts
export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    // create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}
```

3. Register listener in `main/index.ts` 

```ts
ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
```

4. Add to `preload/index.ts`

```ts
contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    // Here
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
  })
```

5. Add type to `context` in `preload/index.d.ts`
6. Call from renderer through window -> `window.context.getNotes()`

## Utils

### App root folder

```ts
import {appDirectoryName} from "@shared/constants"

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}
```