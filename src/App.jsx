import Footer from "./component/Footer";
import Header from "./component/Header";
import HeroSection from "./component/HeroSection";
import TaskBoard from "./component/task/TaskBoard";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;
