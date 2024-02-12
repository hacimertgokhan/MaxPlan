import Navigation from "../components/Navigation.jsx";
import ClassActions from "./components/ClassActions.jsx";
import UserActions from "./components/UserActions.jsx";
import PdfActions from "./components/PdfActions.jsx";

export default function Home() {
    return (
      <>
          <Navigation/>
          <UserActions/>
          <ClassActions/>
          <PdfActions/>
      </>
    );
}