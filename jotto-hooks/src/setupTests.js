// this file is for enzyme configuration before every test. Jest looks for this file and make sure that we don't have to add Enzyme setup
// to every file
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdapter()
});
