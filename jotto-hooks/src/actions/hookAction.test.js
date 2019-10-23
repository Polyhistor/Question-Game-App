import moxios from "moxios";

import { getSecretWord } from "./hookAction";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("calls the getSecretWord callback on axios response", async () => {
    const secretWord = "party";
  });
});
