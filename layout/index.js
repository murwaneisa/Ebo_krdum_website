import Footer from "../components/footer/Footer";
import Nav from "../components/Nav";

const Layout = (props) => {
  return (
    <div>
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
