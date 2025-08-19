import Container from "./sharedtsx/container";
import Footer from "./sharedtsx/footer";
import { GridBackground } from "@/components/ui/grid-background";

function App() {
  return (
    <>
      <GridBackground
        gridSize="6:6"
        beams={{
          count: 8,
          colors: ["bg-gray-400", "bg-black", "bg-blue-900"],
          speed: 5,
          shadow: "shadow-lg shadow-current/60",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between h-screen ">
          <Container />
          <Footer />
        </div>
      </GridBackground>
    </>
  );
}

export default App;
