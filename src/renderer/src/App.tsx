import { Toaster } from "@renderer/components/ui/toaster"
import Editing from "@renderer/screens/editing"
// import Recording from "@renderer/screens/recording"

function App(): JSX.Element {
  return (
    <div className="dark">
      {/* <Recording /> */}
      <Editing />
      <Toaster />
    </div>
  )
}

export default App
