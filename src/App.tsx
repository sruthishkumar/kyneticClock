import Container from "./sharedtsx/container";
import Footer from "./sharedtsx/footer";
import Header from "./sharedtsx/header";

function App() {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 flex-col">
        <div className="min-w-full max-w-full">
          <Header />
        </div>
        <Container />
        <Footer />
      </div>
    </>
  );
}

export default App;
